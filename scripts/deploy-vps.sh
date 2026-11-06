#!/usr/bin/env bash
set -euo pipefail

target="${KAIMAFIND_SSH_ALIAS:-ocr-vps}"
commit="$(git rev-parse --short=12 HEAD)"
release="/opt/kaimafind/releases/$commit"

test -f .output/server/index.mjs || { echo 'Run npm run build:vps first.' >&2; exit 1; }
ssh "$target" "install -d -m 0755 '$release'"
rsync -az --delete .output/ "$target:$release/"
ssh "$target" "ln -sfn '$release' /opt/kaimafind/current.new && mv -Tf /opt/kaimafind/current.new /opt/kaimafind/current && systemctl restart kaimafind-preview"
ssh "$target" "curl -fsS -o /dev/null http://127.0.0.1:3101/zh"
echo "Deployed $commit to $target"
