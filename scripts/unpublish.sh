#!/bin/bash

version=$1

echo "Unpublishing $version"

npm unpublish $version

echo "ensure to rollback git commit with git reset HEAD~1"