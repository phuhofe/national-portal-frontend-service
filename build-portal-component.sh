#!/bin/bash

# Create the "embed" directory and ensures all the right files are in place so that the "portal-component.js" script works
setupEmbedDirectory() {
    mkdir -p ./dist/embed/

    rm ./dist/embed/portal.js

    for f in ./dist/portal-component/*.js; do
        cat $f
        echo
    done >./dist/embed/portal.js

    # TODO: USE MORE OPTIMIZED STYLES THAT DONT INCLUDE EVERYTHING
    if [ -f ./src/portal-component/styles.css ]; then
        cp ./src/portal-component/styles.css ./dist/embed/styles.css
    fi

    echo "-----------------------------------------------------------------"
    echo " ✅ built embed directory for $1 🚀"
    echo "-----------------------------------------------------------------"
}

# Sets up a portal-component.html file that can be used to test the portal-component
setupHtmlPageForPortalComponent() {
    cp -R ./dist/embed/ ./dist/portal-component/embed/
    cp ./src/portal-component.html ./dist/portal-component/index.html

    echo "-----------------------------------------------------------------"
    echo " ✅ built portal-component for $1 🚀"
    echo " ℹ️ to test, run: npx http-server ./dist/portal-component -p 8080"
    echo "-----------------------------------------------------------------"
}

if [ "$1" = "nova" ]; then
    setupEmbedDirectory $1
    setupHtmlPageForPortalComponent $1
fi

if [ "$1" = "local" ]; then
    setupEmbedDirectory $1
    setupHtmlPageForPortalComponent $1
fi

if [ "$1" = "development" ]; then
    setupEmbedDirectory $1
    setupHtmlPageForPortalComponent $1
fi

if [ "$1" = "test" ]; then
    setupEmbedDirectory $1
    setupHtmlPageForPortalComponent $1
fi

if [ "$1" = "pre-production" ]; then
    setupEmbedDirectory $1
    setupHtmlPageForPortalComponent $1
fi

if [ "$1" = "production" ]; then
    setupEmbedDirectory $1
    setupHtmlPageForPortalComponent $1
fi
