#!/bin/bash

# Script to convert all PNG and JPG images to WebP format
# Usage: bash convert-to-webp.sh

echo "🖼️  Image to WebP Conversion Script"
echo "===================================="
echo ""

# Set directories
PUBLIC_DIR="/home/user/webapp/public"
BACKUP_DIR="/home/user/webapp/public/original-images-backup"

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Counter variables
converted_count=0
skipped_count=0
error_count=0

echo "📁 Working directory: $PUBLIC_DIR"
echo "💾 Backup directory: $BACKUP_DIR"
echo ""

# Function to convert image to WebP
convert_image() {
    local input_file="$1"
    local filename=$(basename "$input_file")
    local filename_no_ext="${filename%.*}"
    local extension="${filename##*.}"
    local output_file="${input_file%.*}.webp"
    
    # Skip if already WebP
    if [ "$extension" = "webp" ]; then
        echo "⏭️  Skipped: $filename (already WebP)"
        ((skipped_count++))
        return
    fi
    
    # Skip empty files
    if [ ! -s "$input_file" ]; then
        echo "⚠️  Skipped: $filename (empty file)"
        ((skipped_count++))
        return
    fi
    
    # Skip if WebP already exists
    if [ -f "$output_file" ]; then
        echo "⏭️  Skipped: $filename (WebP already exists)"
        ((skipped_count++))
        return
    fi
    
    echo "🔄 Converting: $filename"
    
    # Backup original
    cp "$input_file" "$BACKUP_DIR/"
    
    # Convert to WebP with quality 85 (good balance of quality and size)
    if convert "$input_file" -quality 85 -define webp:lossless=false "$output_file" 2>/dev/null; then
        # Get file sizes
        original_size=$(du -h "$input_file" | cut -f1)
        new_size=$(du -h "$output_file" | cut -f1)
        
        echo "   ✅ Success: $filename_no_ext.webp created"
        echo "   📊 Size: $original_size → $new_size"
        ((converted_count++))
    else
        echo "   ❌ Error: Failed to convert $filename"
        ((error_count++))
    fi
    echo ""
}

# Find and convert all PNG and JPG files
echo "🔍 Scanning for images..."
echo ""

# Convert PNG files
while IFS= read -r -d '' file; do
    convert_image "$file"
done < <(find "$PUBLIC_DIR" -maxdepth 1 -type f \( -iname "*.png" \) -print0)

# Convert JPG files
while IFS= read -r -d '' file; do
    convert_image "$file"
done < <(find "$PUBLIC_DIR" -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) -print0)

# Summary
echo "=================================="
echo "📊 Conversion Summary"
echo "=================================="
echo "✅ Converted: $converted_count images"
echo "⏭️  Skipped: $skipped_count images"
echo "❌ Errors: $error_count images"
echo ""
echo "💾 Original images backed up to: $BACKUP_DIR"
echo ""

if [ $converted_count -gt 0 ]; then
    echo "🎉 Conversion complete!"
    echo ""
    echo "📝 Next steps:"
    echo "   1. Update image references in your code from .png/.jpg to .webp"
    echo "   2. Test your website to ensure all images load correctly"
    echo "   3. If everything works, you can delete the backup folder"
    echo ""
    
    # Show WebP files created
    echo "📂 WebP files created:"
    ls -lh "$PUBLIC_DIR"/*.webp 2>/dev/null | awk '{print "   " $9 " (" $5 ")"}'
else
    echo "ℹ️  No images were converted. They may already be in WebP format."
fi

echo ""
echo "✨ Done!"
