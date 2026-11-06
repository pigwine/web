#!/usr/bin/env bash
set -euo pipefail

target="${KAIMAFIND_SSH_ALIAS:-ocr-vps}"
backup_dir="${KAIMAFIND_BACKUP_DIR:-$HOME/.local/share/kaimafind/backups}"
umask 077
mkdir -p "$backup_dir"
stamp="$(date -u +%Y%m%dT%H%M%SZ)"
archive="$backup_dir/kaimafind-$stamp.tar.gz"
temporary="$(mktemp "$backup_dir/.kaimafind-XXXXXX")"
trap 'rm -f "$temporary"' EXIT

ssh "$target" 'tar -C /var/lib/kaimafind -czf - data' > "$temporary"
tar -tzf "$temporary" >/dev/null
mv "$temporary" "$archive"
trap - EXIT
echo "Backup saved to $archive"
