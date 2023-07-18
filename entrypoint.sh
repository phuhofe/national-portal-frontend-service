#!/usr/bin/env sh
set -e

if [ "$ENV_PROFILE" = "test" ]; then
    curl -X POST \
        --fail \
        -F token=8d743405ecf4d7e6c1346e510aafc4 \
        -F "ref=develop" \
        -F "variables[RUN_E2E_TESTS]=true" \
        https://gitlab.com/api/v4/projects/29628644/trigger/pipeline
fi

nginx -g 'daemon off;'
