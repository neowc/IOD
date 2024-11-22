#!/bin/bash

# Function to display usage information
usage() {
    echo "Usage: $0 <source_directory> <number_of_files>"
    echo "  <source_directory>: The directory containing .xlsx files to process"
    echo "  <number_of_files>: Number of files to process (1-1000)"
    exit 1
}

# Check if correct number of arguments are provided
if [ "$#" -ne 2 ]; then
    usage
fi

# Assign command-line arguments to variables
source_dir="$1"
num_files="$2"

# Validate the number of files
if ! [[ "$num_files" =~ ^[1-9][0-9]{0,2}$ ]] || [ "$num_files" -gt 1000 ]; then
    echo "Error: Number of files must be between 1 and 1000."
    usage
fi

# Set other directories
processed_dir="../archive"
api_responses_dir="../archive"

# Create the processed and API responses folders if they don't exist
mkdir -p "$processed_dir" "$api_responses_dir"

# Sample API endpoint (replace with your actual API endpoint)
api_endpoint="https://jsonplaceholder.typicode.com/posts"

# Counter for processed files
count=0

# Create a temporary file to store the sorted file list
temp_file=$(mktemp -p .)

# Find .xlsx files, sort by timestamp, and store in temp file -- YYYY-MM-DD HH:MM:ss.sss
find -L "$source_dir" -maxdepth 1 -type f -name "*.xlsx" -printf '%T+ %p\n' | \
    sort | \
    cut -d' ' -f2- > "$temp_file"

# Process files from the temp file
while IFS= read -r file; do
    # Skip if file no longer exists (might have been moved/deleted)
    [ ! -f "$file" ] && continue

    # Increment the counter
    ((count++))

    echo "Processing file: $file"
    echo "Timestamp: $(stat -c %y "$file")"

    # Make a POST request to the API endpoint
    # Use proper escaping for curl's JSON data
    filename=$(basename "$file")
    response=$(curl -s -X POST \
        -H "Content-Type: application/json" \
        -d "{\"title\":\"${filename//\"/\\\"}\"}" \
        "$api_endpoint")

    # Save the API response to a file
    printf "%s" "$response" > "$api_responses_dir/response_${filename}.json"

    # Extract the id field from the JSON response using grep and sed
    id=$(echo "$response" | grep -o '"id":[0-9]*' | sed 's/"id"://')

    echo "API Response saved to: $api_responses_dir/response_${filename}.json"
    echo "Received ID from API: $id"

    # Generate timestamp string with milliseconds (format: YYYY-MM-DD_HH-MM-SS-SSS) using date and nanosec to create millisec
    current_date=$(date '+%Y-%m-%d_%H-%M-%S')
    milliseconds=$(date '+%N' | cut -b1-3)
    timestamp="${current_date}-${milliseconds}"

    # Split filename and extension
    filename_base="${filename%.*}"
    filename_ext="${filename##*.}"

    # Create new filename with timestamp
    new_filename="${filename_base}_${timestamp}.${filename_ext}"

    # Move the file to processed folder with timestamp in filename
    mv "$file" "$processed_dir/$new_filename"

    echo "Moved to: $processed_dir/$new_filename"
    echo "-----------------------------------"

    # Break the loop if we've processed the specified number of files
    if [ $count -eq $num_files ]; then
        break
    fi
done < "$temp_file"

# Clean up the temporary file
#rm -f "$temp_file"

echo "Processed $count files."
