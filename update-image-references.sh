#!/bin/bash

# Script to update image references from PNG/JPG to WebP in code files
# Usage: bash update-image-references.sh

echo "🔄 Updating Image References to WebP"
echo "======================================"
echo ""

SRC_DIR="/home/user/webapp/src"
PUBLIC_DIR="/home/user/webapp/public"

# Counter
updated_files=0
total_replacements=0

# Function to update file
update_file() {
    local file="$1"
    local temp_file="${file}.tmp"
    local changes=0
    
    # Create temporary file with replacements
    # Replace .png with .webp
    sed 's/\.png/.webp/g' "$file" > "$temp_file"
    # Replace .jpg with .webp
    sed -i 's/\.jpg/.webp/g' "$temp_file"
    # Replace .jpeg with .webp
    sed -i 's/\.jpeg/.webp/g' "$temp_file"
    
    # Check if file was modified
    if ! cmp -s "$file" "$temp_file"; then
        # Count changes
        changes=$(diff "$file" "$temp_file" | grep -c '^[<>]' || echo 0)
        
        # Replace original file
        mv "$temp_file" "$file"
        
        echo "✅ Updated: ${file#$SRC_DIR/}"
        echo "   📝 Changes: $((changes / 2)) image references"
        
        ((updated_files++))
        ((total_replacements += changes / 2))
    else
        rm "$temp_file"
    fi
}

# Find and update all TypeScript/TSX/JavaScript/JSX files
echo "🔍 Scanning source files..."
echo ""

file_count=0
while IFS= read -r -d '' file; do
    update_file "$file"
    ((file_count++))
done < <(find "$SRC_DIR" -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" \) -print0)

echo ""
echo "======================================"
echo "📊 Update Summary"
echo "======================================"
echo "📁 Files scanned: $file_count"
echo "✅ Files updated: $updated_files"
echo "🔄 Total image references updated: $total_replacements"
echo ""

if [ $updated_files -gt 0 ]; then
    echo "🎉 Image references updated successfully!"
    echo ""
    echo "📝 Next steps:"
    echo "   1. Review the changes with: git diff"
    echo "   2. Build and test your website: npm run build"
    echo "   3. Verify all images load correctly"
    echo "   4. Commit the changes: git add . && git commit -m 'chore: Update image references to WebP format'"
else
    echo "ℹ️  No image references needed updating."
fi

echo ""
echo "✨ Done!"
