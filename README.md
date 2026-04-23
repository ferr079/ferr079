# > whoami

Infrastructure engineer & offensive security practitioner.
Building and defending a 55-service self-hosted homelab (55 CTs + 1 VM, 4 Proxmox nodes) — with Claude as AI partner.

[pixelium.win](https://pixelium.win) | [blog](https://blog.pixelium.win) | [contributions](https://pixelium.win/contributions) | [lab](https://pixelium.win/ia)

> **Currently running the AIops v2 trio**: OpenFang sentinel (8 Guardian crons) → MQTT → Hermes Telegram triage (3 crons) → SSH spawn Claude CT 196 for ephemeral remediation. Plus PentAGI (autonomous pentest, pve3 on-demand) and RAPTOR (source-code audit, distrobox). Grafana SOC dashboard with 14 panels, LiteLLM hub with 4-provider failback (MiniMax → Gemini → Groq → OpenRouter), VictoriaMetrics scraping 5 targets, Loki 30-day retention.

---

## Stack

**Infrastructure** : Proxmox · Ansible · Traefik · CrowdSec · Wazuh · Headscale · step-ca
**AI Agents** : OpenFang · Hermes · Claude CT 196 (spawnable) · PentAGI · RAPTOR · MiniMax M2.7 · Ollama (RTX 3090)
**Cloud** : Cloudflare Workers · R2 · KV · D1 · Workers AI
**Code** : Rust · Python · Bash · TypeScript
**Web** : Astro · Pure CSS · Cloudflare Workers
**Monitoring** : VictoriaMetrics · Grafana · Beszel · Patchmon · Loki · Healthchecks · ntfy
**Orchestration** : LiteLLM (4-provider failback) · Dagu · n8n · MQTT (Mosquitto) · 11 automated crons (8 Guardian + 3 Hermes)

## CTF Profiles

[![HTB Badge](https://www.hackthebox.com/badge/image/1161145)](https://app.hackthebox.com/users/1161145)
[![THM Badge](https://tryhackme-badges.s3.amazonaws.com/ferr0.png)](https://tryhackme.com/p/ferr0)

[Root-Me — Ferr0 (765 pts)](https://www.root-me.org/Ferr0?lang=en)

## GitHub Stats

![Stats](https://github-readme-stats.vercel.app/api?username=ferr079&show_icons=true&theme=tokyonight&hide_border=true)
![Langages](https://github-readme-stats.vercel.app/api/top-langs/?username=ferr079&layout=compact&theme=tokyonight&hide_border=true)

## Recent OSS contributions

- **[grafana/alloy#6108](https://github.com/grafana/alloy/pull/6108)** — *docs: add systemd journal example to Promtail migration guide.* The guide only covered file-based scrape configs; added the journal pattern that's used on most Linux hosts.
- **[wazuh/wazuh-documentation#9512](https://github.com/wazuh/wazuh-documentation/pull/9512)** — *warn that wazuh-agent conflicts with wazuh-manager on the same host.* The agent package silently uninstalls the manager via dpkg `Conflicts`/`Replaces` — hit the bug in production, fixed the install doc with a warning admonition.
- **[requarks/wiki#7986](https://github.com/requarks/wiki/discussions/7986)** — *bug report: `render IS NULL` causes silent HTTP 500 with no recovery path.* Minimal repro + root cause (`server/models/pages.js#L952-L969`) + suggested fix.
- **[ublue-os/homebrew-experimental-tap#309](https://github.com/ublue-os/homebrew-experimental-tap/pull/309)** — *first cask for `claude-code-linux`*, with a livecheck that tracks the npm registry instead of the slower Google Cloud Storage endpoint.

## Featured

- [pixelium.win](https://github.com/ferr079/pixelium-site) — Bilingual portfolio (Astro + Cloudflare Workers), 13 pages EN+FR, live KV stats, tri-state service status, SessionImprint (each page signed with its own commit SHA), interactive topology map (62 nodes), Workers AI chat
- [blog.pixelium.win](https://github.com/ferr079/blog-pixelium) — 24 articles on homelab ops, AIOps, self-hosting, incidents, and OSS contributions (three formats: dossier / pr-notes / incident)
- [homelab-scripts](https://github.com/ferr079/homelab-scripts) — monitoring & backup scripts (cert-check, http-check, pve-status, loki-query, pbs-backup)
- [claude-code-cybersec-skills](https://github.com/ferr079/claude-code-cybersec-skills) — 31 cybersecurity slash commands for Claude Code (17 offensive + 14 defensive)
- [kv-push](https://github.com/ferr079/kv-push) — Push 15+ homelab metrics (services tri-state, Proxmox 4 nodes, Claude usage stats) to Cloudflare KV for live dashboards
- [pbs-autobackup](https://github.com/ferr079/pbs-autobackup) — Proxmox Backup Server orchestration with Wake-on-LAN
- [cert-check](https://github.com/ferr079/cert-check) — TLS certificate expiration monitor for self-hosted services
