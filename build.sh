#!/bin/bash

echo "⚙️  Checking that the required programs are installed:"
command -v sh
command -v ng
command -v git
echo ""
echo "✅ Check complete!"
echo ""

rm -rf ./dist

build() {
    ng build --configuration $1
}

buildPortalComponent() {
    ng run national-portal-frontend-service:portal-component --configuration $1
    sh ./build-portal-component.sh $1
}

buildSettingsComponent() {
    ng run national-portal-frontend-service:settings-component --configuration $1
    sh ./build-settings-component.sh $1
}

createVersionFile() {
    echo "java-hut-\c" >./src/root-assets/version.txt
    git describe --tags --abbrev=0 >>./src/root-assets/version.txt
}

createVersionFile

if [ "$1" = "nova" ]; then
    buildSettingsComponent $1
    buildPortalComponent $1
fi

if [ "$1" = "local" ]; then
    buildPortalComponent $1
    build $1
fi

if [ "$1" = "development" ]; then
    buildPortalComponent $1
    build $1
fi

if [ "$1" = "test" ]; then
    buildPortalComponent $1
    build $1
fi

if [ "$1" = "pre-production" ]; then
    buildPortalComponent $1
    build $1
fi

if [ "$1" = "production" ]; then
    buildPortalComponent $1
    build $1
fi
