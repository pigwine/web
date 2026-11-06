# VPS preview deployment

The `ocr-vps` SSH alias points to an Ubuntu 24.04 host. Its port 443 is occupied by an existing Xray service. KaimaFind runs separately on `127.0.0.1:3101` as the unprivileged `kaimafind` user. The planned Cloudflare Tunnel will route `preview.kaimafind.com` to that loopback port without opening a new inbound port or modifying Xray. The apex domain remains on the original Cloudflare Pages project.

Run `npm run build:vps` and `scripts/deploy-vps.sh` from this repository to send the built `.output` to a new release directory and atomically update the service symlink. The pinned Node runtime lives in `/opt/node/current`. Content and media are stored under `/var/lib/kaimafind/data`, outside releases, so deployments do not replace uploaded work. The service reads its production-only settings from `/etc/kaimafind/preview.env`. Never put that file or the administrator password in Git.

The site uses HTTP Basic authentication for the studio on the VPS, with a salted PBKDF2 password hash in the environment file. Access to `/admin`, `/api/admin/*` and unpublished media is checked by the application. Use HTTPS through the Cloudflare Tunnel; do not expose the loopback Node port publicly.

Before using this as production, add the owner's real projects and photographs, verify backups and off-server copies, and review the existing route migration. The VPS preview is independent of the Cloudflare D1 preview database, which can be left unused.

Until the tunnel is configured, access the deployed preview from the owner's computer with `ssh -N -L 127.0.0.1:3101:127.0.0.1:3101 ocr-vps` and open `http://127.0.0.1:3101/zh`. The studio is at `/admin`; its password is stored locally at `~/.config/kaimafind/preview-admin-password`.
