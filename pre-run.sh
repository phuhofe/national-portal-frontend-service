#!/bin/bash

echo "⚙️  Checking that the required programs are installed:"
command -v sh
command -v ng
command -v git
echo ""
echo "✅ Check complete!"
echo ""

echo "🔨  Updating version.txt file"
echo ""

createVersionFile() {
    echo "java-hut-\c" >./src/root-assets/version.txt
    git describe --tags --abbrev=0 >>./src/root-assets/version.txt
}

createVersionFile

echo "✅ Ready!"
