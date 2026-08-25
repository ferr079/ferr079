#!/usr/bin/env node
/**
 * render-readme — résout les {{clés}} de README.tpl.md depuis les stats live du
 * homelab et écrit README.md.
 *
 * Pourquoi ce script existe : les compteurs de ce profil étaient rafraîchis à la
 * main. Le dernier passage manuel (2026-08-22) a tenu trois jours — le 25, huit
 * des douze chiffres avaient déjà dérivé, et ils sous-vendaient : rang HTB
 * annoncé #296 pour #253 réel, 111 flags pour 115, 27 flags de Fortress pour 36.
 * Un profil GitHub est la première surface qu'un lecteur ouvre ; c'est la
 * dernière où un chiffre devrait être recopié à la main.
 *
 *   node scripts/render-readme.mjs           # écrit README.md
 *   node scripts/render-readme.mjs --check   # échoue si README.md n'est pas à jour
 *
 * Codes de sortie : 0 inchangé/écrit · 1 erreur · 10 diverge (avec --check).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const TPL = join(root, 'README.tpl.md');
const OUT = join(root, 'README.md');
const ENDPOINT = 'https://pixelium.win/api/stats';

const check = process.argv.includes('--check');

const res = await fetch(ENDPOINT, { signal: AbortSignal.timeout(20000) });
if (!res.ok) {
  console.error(`[readme] ${ENDPOINT} → HTTP ${res.status}`);
  process.exit(1);
}
const payload = await res.json();
const stats = payload?.stats ?? payload;
if (!stats || typeof stats !== 'object') {
  console.error('[readme] réponse inattendue : pas d’objet stats');
  process.exit(1);
}

const tpl = readFileSync(TPL, 'utf8');

// Un jeton non résolu ne doit JAMAIS être publié : « {{htb_flags}} » en clair sur
// un profil est pire qu'un chiffre périmé, parce qu'il dit que la mécanique est
// cassée. On collecte tous les manquants d'un coup plutôt que d'échouer au premier.
const missing = new Set();
const rendered = tpl.replace(/\{\{([a-z_0-9]+)\}\}/g, (_, key) => {
  const v = stats[key];
  if (v === undefined || v === null || v === '') { missing.add(key); return `{{${key}}}`; }
  return String(v);
});

if (missing.size) {
  console.error(`[readme] clés absentes de ${ENDPOINT} : ${[...missing].join(', ')}`);
  console.error('[readme] README.md non écrit — corriger le template ou publier la clé côté kv-push.');
  process.exit(1);
}

const current = (() => { try { return readFileSync(OUT, 'utf8'); } catch { return null; } })();

if (current === rendered) {
  console.log('[readme] déjà à jour');
  process.exit(0);
}

if (check) {
  console.error('[readme] README.md diverge des stats live — lancer `node scripts/render-readme.mjs`');
  process.exit(10);
}

writeFileSync(OUT, rendered);
console.log('[readme] README.md régénéré');
