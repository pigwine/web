#!/usr/bin/env bash
set -euo pipefail

target="${KAIMAFIND_SSH_ALIAS:-ocr-vps}"
commit="$(git rev-parse --short=12 HEAD)"
release="/opt/kaimafind/releases/$commit"

test -f .output/server/index.mjs || { echo 'Run npm run build:vps first.' >&2; exit 1; }
previous="$(ssh "$target" "test -f /opt/kaimafind/current/server/index.mjs && readlink -f /opt/kaimafind/current" || true)"
ssh "$target" "install -d -m 0755 '$release'"
rsync -az --delete .output/ "$target:$release/"
ssh "$target" "ln -sfn '$release' /opt/kaimafind/current.new && mv -Tf /opt/kaimafind/current.new /opt/kaimafind/current && systemctl restart kaimafind-preview"
if ! ssh "$target" "curl -fsS --retry 8 --retry-connrefused --retry-delay 1 -o /dev/null http://127.0.0.1:3101/zh"; then
  echo 'Health check failed; restoring previous release.' >&2
  if [[ -n "$previous" ]]; then
    ssh "$target" "ln -sfn '$previous' /opt/kaimafind/current.new && mv -Tf /opt/kaimafind/current.new /opt/kaimafind/current && systemctl restart kaimafind-preview"
  fi
  exit 1
fi
echo "Deployed $commit to $target"
