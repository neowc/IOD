#!/bin/bash

# Set the source and destination directories
source_dir="./recon"
processed_dir="./recon/process"
# SVR_USER="your_svr_user"
# SVR_PASSWORD="your_svr_password"
# SVR_HOSTNAME="your_svr_name"

# Create the processed folder if it doesn't exist
mkdir -p "$processed_dir"

# Counter for processed files
count=0

# filelist=$(find "$source_dir/" -name "*.xlsx")
# echo "filelist: $filelist"

# Loop through files in the source directory
#for file in "$source_dir"/*; do
for file in $(find "$source_dir/" -name "*.xlsx"); do
    # Check if it's a file (not a directory)
    if [ -f "$file" ]; then
        # Increment the counter
        ((count++))
        # Process the file (replace this with your actual processing logic)
        echo "Processing file: $file"
        # Move the file to the processed folder
        mv "$file" "$processed_dir/"
        echo "Moved to: $processed_dir/$(basename "$file")"
        echo "-----------------------------------"
        # Break the loop if we've processed 10 files
        #if [ $count -eq 100 ]; then
        #    break
        #fi
    else
        echo "Error: file processing for $file failed."
    fi
done

echo "Processed $count files."