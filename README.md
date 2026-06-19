# > whoami

Infrastructure engineer & offensive security practitioner.
Building and defending a self-hosted homelab — 53 LXC containers + 1 VM across 4 Proxmox nodes — operated day-to-day with **Claude Code (Max)** as AI pair-operator: writing the tooling, running the playbooks, auditing the infra.

[pixelium.win](https://pixelium.win) | [blog](https://blog.pixelium.win) | [contributions](https://pixelium.win/contributions) | [lab](https://pixelium.win/ia)

> **Currently**: single-agent AIops — Hermes (Telegram correspondent, 4 scheduled crons incl. doc-sync that auto-edits the wiki from infra deltas and an Astro radar that opens an upgrade brief when this stack's own framework moves) backed by native detection (Wazuh 38 agents, CrowdSec, Beszel, Uptime-Kuma 39 monitors → ntfy) and Dagu orchestration (WOL-driven PBS backups, Cloudflare KV metrics every 5 min). Plus RAPTOR (source-code security audit, distrobox). Grafana SOC dashboard, LiteLLM hub with 4-provider failback (MiniMax → Gemini → Groq → OpenRouter), VictoriaMetrics, Loki 30-day retention.

---

## Stack

**Infrastructure** : Proxmox · Ansible · Traefik · CrowdSec · Wazuh · Headscale · step-ca
**AI Agents** : Hermes · RAPTOR · opencode (CTF/red-team) · MiniMax M3 · Ollama (RTX 3090)
**Cloud** : Cloudflare Workers · R2 · KV · D1 · Workers AI
**Code** : Rust · Python · Bash · TypeScript
**Web** : Astro · Pure CSS · Cloudflare Workers
**Monitoring** : VictoriaMetrics · Grafana · Beszel · Uptime-Kuma · Patchmon · Loki · Healthchecks · ntfy
**Orchestration** : LiteLLM (4-provider failback) · Dagu · Node-RED · MQTT (Mosquitto) · 4 Hermes crons + 5 Dagu DAGs
**AI workflow** : Claude Code (Max) — primary driver for infra ops, IaC & security audits · custom skills + MCP servers (Proxmox, Forgejo, NetBox, Cloudflare, Semble code search)

## CTF Profiles

[![HTB Badge](https://www.hackthebox.com/badge/image/1161145)](https://pixelium.win/ctf)
[![THM Badge](https://tryhackme-badges.s3.amazonaws.com/ferr0.png)](https://tryhackme.com/p/ferr0)

[Root-Me — Ferr0 (765 pts)](https://www.root-me.org/Ferr0?lang=en)

## GitHub Stats

![Stats](https://github-readme-stats.vercel.app/api?username=ferr079&show_icons=true&theme=tokyonight&hide_border=true)
![Langages](https://github-readme-stats.vercel.app/api/top-langs/?username=ferr079&layout=compact&theme=tokyonight&hide_border=true)

## Recent OSS contributions

- **[gadievron/raptor#777](https://github.com/gadievron/raptor/pull/777)** ✅ *fix merged* — *fix(sandbox): env-overridable default profile for rootless podman/distrobox.* On rootless podman the sandbox's kernel isolation (mount-ns, Landlock) can't engage, so the `full` profile half-engages: `semgrep`/`codeql` emit nothing and `raptor scan` silently reports **0 findings in 0 files** instead of failing loudly — a security scanner that looks clean when it never ran. The maintainer declined my env-override on trust-model grounds but shipped his own fail-loud fix ([#800](https://github.com/gadievron/raptor/pull/800) — silence env-warning under strict_env + route Landlock-only attribution), which I validated end to end on rootless distrobox incl. `--extra-config` — **merged**.
- **[BerriAI/litellm#29412](https://github.com/BerriAI/litellm/pull/29412)** — review: MiniMax-M3's context window is 1M, not the 512K **billing threshold**; the cost-map merged with the wrong value and my follow-up fix PRs were swallowed by litellm's ephemeral staging pipeline — a lesson in reading a repo's merge flow before contributing.
- **[ublue-os/bluefin#4741](https://github.com/ublue-os/bluefin/issues/4741)** — *bug: default JXL wallpaper renders blank on F44 (no gdk-pixbuf JXL loader).* `libjxl` ships the codec but no pixbuf loader, so `gnome-bg` can't decode the default `.jxl` background. Root-caused to [`03-packages.sh#L202`](https://github.com/projectbluefin/bluefin/blob/main/build_files/base/03-packages.sh#L202), cross-referenced the sibling LTS fix (bluefin-lts#1230) and why it doesn't transpose to Fedora.
- **[community-scripts/ProxmoxVE#14870](https://github.com/community-scripts/ProxmoxVE/pull/14870)** ✅ *merged* — Infisical update aborted and left the service down: the script read `Database Password:` but `setup_postgresql_db` writes `Password:`. Diagnosed from a production incident on my own CT, reported as [#14868](https://github.com/community-scripts/ProxmoxVE/issues/14868), fixed upstream.
- **[community-scripts/ProxmoxVE#14995](https://github.com/community-scripts/ProxmoxVE/pull/14995)** ✅ *merged* — changedetection: migrated the Python install from pip `--ignore-installed` (duplicate dist-info + deferred crash on restart) to the project's own `setup_uv` venv helper, with automatic migration of existing installs — fixing the root cause behind their earlier #13548 band-aid (+33 −17).
- **[community-scripts/ProxmoxVE#14996](https://github.com/community-scripts/ProxmoxVE/pull/14996)** ✅ *merged* — homelable: preserve the MCP server config across updates (it was overwritten on every run).
- **[RightNow-AI/openfang#1060](https://github.com/RightNow-AI/openfang/pull/1060)** ✅ *merged* — fix(security): unified SSRF protection for WASM host calls. Closed a gap where `host_functions.rs` validated targets less strictly than `web_fetch.rs`; −42 net lines, 908 tests green.
- **[grafana/alloy#6474](https://github.com/grafana/alloy/issues/6474)** ✅ *fix merged* — *usage reporting retries with no backoff → fleet-wide DNS storm.* When a DNS blocklist NXDOMAINs `stats.grafana.org`, Alloy retried it every ~3s — one unreachable endpoint became ~900k DNS queries a day across 57 agents. Reported with the repro and mechanism; the maintainer shipped the fix the same day ([#6478](https://github.com/grafana/alloy/pull/6478) — back off on persistent failure), which I reviewed against my fleet — **merged**.
- **[grafana/alloy#6108](https://github.com/grafana/alloy/pull/6108)** ✅ *merged* — *docs: systemd journal example for the Promtail migration guide.* The guide only covered file-based scrape configs; I added the journal pattern used on most Linux hosts. Approved and merged by clayton-cornell — a friendly ping unblocked it after it had stalled mid-v1.17-release.
- **[wazuh/wazuh-documentation#9512](https://github.com/wazuh/wazuh-documentation/pull/9512)** — reported that `wazuh-agent` silently uninstalls `wazuh-manager` on the same host via dpkg `Conflicts`/`Replaces` — hit the bug in production ([incident write-up](https://blog.pixelium.win/wazuh-silent-uninstall-incident/)).
- **[requarks/wiki#8022](https://github.com/requarks/wiki/discussions/8022)** & **[#7986](https://github.com/requarks/wiki/discussions/7986)** — two bug reports on the non-atomic page pipeline. #8022: `pages.update` without `tags` half-applies (content saved, render/search/storage skipped) then reports failure — root cause `pages.js#L443` vs the guarded `createPage`, with a verified repro. #7986: `render IS NULL` causes a silent HTTP 500 with no recovery path.

## Featured

- [pixelium.win](https://github.com/ferr079/pixelium-site) — Bilingual portfolio (Astro + Cloudflare Workers), 13 pages EN+FR, live KV stats, tri-state service status, SessionImprint (each page signed with its own commit SHA), interactive topology map (64 nodes), Workers AI chat
- [blog.pixelium.win](https://github.com/ferr079/blog-pixelium) — 34 articles on homelab ops, AIOps, self-hosting, incidents, and OSS contributions (three formats: dossier / pr-notes / incident)
- [homelab-public](https://github.com/ferr079/homelab-public) — Architecture & design notes for a 4-node, 50+ LXC fully self-hosted homelab (no paid cloud): topology, building-blocks rationale, security posture
- [promtail-to-alloy](https://github.com/ferr079/promtail-to-alloy) — Migrate a logging fleet from Grafana Promtail (EOL) to Alloy: component mapping, ready-to-adapt `.alloy` templates, and production gotchas (born from the alloy [#6474](https://github.com/grafana/alloy/issues/6474) fleet-wide DNS storm)
- [homelab-scripts](https://github.com/ferr079/homelab-scripts) — monitoring & backup scripts (cert-check, http-check, pve-status, loki-query, pbs-backup)
- [claude-code-cybersec-skills](https://github.com/ferr079/claude-code-cybersec-skills) — 31 cybersecurity slash commands for Claude Code (17 offensive + 14 defensive)
- [kv-push](https://github.com/ferr079/kv-push) — Push 15+ homelab metrics (services tri-state, Proxmox 4 nodes, Claude usage stats) to Cloudflare KV for live dashboards
- [pbs-autobackup](https://github.com/ferr079/pbs-autobackup) — Proxmox Backup Server orchestration with Wake-on-LAN
- [cert-check](https://github.com/ferr079/cert-check) — TLS certificate expiration monitor for self-hosted services
