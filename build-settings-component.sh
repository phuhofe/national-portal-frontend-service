#!/bin/bash

# Create the "embed" directory and ensures all the right files are in place so that the "settings-component.js" script works
setupEmbedDirectory() {
    mkdir -p ./dist/embed/

    rm ./dist/embed/settings-component.js

    for f in ./dist/settings-component/*.js; do
        cat $f
        echo
    done >./dist/embed/settings-component.js

    # TODO: USE MORE OPTIMIZED STYLES THAT DONT INCLUDE EVERYTHING
    if [ -f ./src/settings-component/styles.css ]; then
        cp ./src/settings-component/styles.css ./dist/embed/styles.css
    fi

    echo "-----------------------------------------------------------------"
    echo " ✅ built embed directory for $1 🚀"
    echo "-----------------------------------------------------------------"
}

# Sets up a settings-component.html file that can be used to test the settings-component
setupHtmlPageForSettingsComponent() {
    cp -R ./dist/embed/ ./dist/settings-component/embed/
    cp ./src/settings-component.html ./dist/settings-component/index.html
    cp ./src/settings-component-nova.html ./dist/settings-component/nova.html

    echo "-----------------------------------------------------------------"
    echo " ✅ built settings-component for $1 🚀"
    echo " ℹ️ to test, run: npx http-server ./dist/settings-component -p 8080"
    echo "-----------------------------------------------------------------"
}

if [ "$1" = "nova" ]; then
    setupEmbedDirectory $1
    setupHtmlPageForSettingsComponent $1
fi

if [ "$1" = "local" ]; then
    setupEmbedDirectory $1
    setupHtmlPageForSettingsComponent $1
fi

if [ "$1" = "development" ]; then
    setupEmbedDirectory $1
    setupHtmlPageForSettingsComponent $1
fi

if [ "$1" = "test" ]; then
    setupEmbedDirectory $1
    setupHtmlPageForSettingsComponent $1
fi

if [ "$1" = "pre-production" ]; then
    setupEmbedDirectory $1
    setupHtmlPageForSettingsComponent $1
fi

if [ "$1" = "production" ]; then
    setupEmbedDirectory $1
    setupHtmlPageForSettingsComponent $1
fi
