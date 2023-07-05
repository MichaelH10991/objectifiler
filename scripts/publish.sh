#!/bin/bash
type=$1

if [ -z $type ]; then
  echo "Must provide one of major, minor, patch"
  exit 0
fi

npm version $type
npm publish
git push