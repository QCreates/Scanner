#!/bin/bash

# Allow this and descenant directories to be traversed by everyone, ignoring hidden directories
find -L "$PWD" -not -path "*/.*" -type d -exec chmod a+X {} \;

# Allow everyone read access to all files in this hierarchy with an extension of
# .html, .png, or .jpg
find -L "$PWD" -not -path "*/.*" -type f \( -name "*.html" -o -name "*.png" -o -name "*.jpg" -o -name "*.css" \) -exec chmod a+r {} \;
