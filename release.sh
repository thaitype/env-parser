#!/bin/sh

pnpm publish --access public
git tag -a v$1 -m v$1
git push origin v$1