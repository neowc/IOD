#!/bin/bash

# Function to display usage information
usage() {
    echo "Usage: $0 <country> <max_num_of_files> <contractVersion>"
    echo "  <country>: Specify country code for script use e.g. SG, MY."
    echo "  <max_num_of_files>: Max. limit of files to process (max 999 files)"
    echo "  <contractVersion>: Specify Contract Version number to use."
    exit 1
}

# Check if correct number of arguments are provided
if [ "$#" -ne 3 ]; then
    usage
fi

# Assign command-line arguments to variables
country="${1,,}"
max_file_limit="$2"
contractVersion="$3"

# Validate the number of files
if ! [[ "$max_file_limit" =~ ^[1-9][0-9]{0,2}$ ]] || [ "$max_file_limit" -gt 1000 ]; then
    echo "Error: Max. number of files must be between 1 and 999."
    usage
fi

# Set the parameters and directories
API_baseUrl=https://google.com
#API_endpoint=/health/alive
API_endpoint=/v2/endpoint

script_dir=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
current_folder=$(echo "${script_dir##*/}")
source_dir="$script_dir/../process"
processed_dir="$script_dir/../archive"
API_res_dir="$script_dir/../archive"
timestamp=$(date +"%Y-%m-%d_%H_%M_%S")
log_file="$API_res_dir/$timestamp.log"

# Check if this script is residing inside respective country folder
# if [[ ! "$script_dir" =~ "-$country/" ]]; then
#     echo "Error: Please run the script inside batch-ms-pbm-processor-$country folder."
#     exit 1
# fi

# Check if this script is residing inside trigger folder
if [ "$current_folder" != "trigger" ]; then
    echo "Error: Please run the script from trigger folder."
    exit 1
fi

# Print env variables
echo "script_dir: $script_dir"
echo "current_folder: $current_folder"
echo "source folder: $source_dir"
echo "target folder: $processed_dir"
echo "API response folder: $API_res_dir"
echo "target log_file: $log_file"

# Create folders if doesn't exist
mkdir -p "$processed_dir" "$API_res_dir"

# Counter for processed files
count=0

# Create a temporary file to store the sorted file list
temp_file=$(mktemp)

# Find list of files, sort by timestamp, and store in temp file
find -L "$source_dir" -maxdepth 1 -type f -name "*.xlsx" -printf '%T+ %p\n' | \
    sort | \
    cut -d' ' -f2- > "$temp_file"

# Process files from the temp file
while IFS= read -r file; do
    # Skip if file no longer exists (might have been moved/deleted)
    [ ! -f "$file" ] && continue

        # Increment the counter
        ((count++))
        # Process the file (actual processing logic)
        echo "Calling API|Processing file: $file"
        echo "Timestamp: $(stat -c %y "$file")"
        echo "Response from API:"
        filename=$(basename "$file")

        # Make POST request to API endpoint
        #response=$(curl "$API_baseUrl$API_endpoint")
        #response=$(curl --location --request POST "$API_baseUrl$API_endpoint" --form "file=@$file" --form "contractVersion=$contractVersion")
        #response=$(curl -s -X POST -H "Content-Type: application/json" --form "file=@$file" --form "contractVersion=$contractVersion" "$API_baseUrl$API_endpoint")
        response=$(curl -s -X POST --form "contractVersion=$contractVersion" --form "file=@$file" "$API_baseUrl$API_endpoint")
        #echo "curl:$(curl -s -X POST --form "contractVersion=$contractVersion" -d "{\"file\":\"${filename//\"/\\\"}\"}" "$API_baseUrl$API_endpoint")"

        # Save the API response to a file
        #echo "API Response saved to: $API_res_dir/res_$(basename "$file").json"
        #echo "$response" > "$API_res_dir/res_$(basename "$file").json"
        echo "API Response from: $file" "$response" >> "$log_file"

        # Extract a field from the API response (e.g., the error status field)
        #errCode=$(echo "$response" | grep -o '"statusCode":[0-9]*')
        errCode=$(echo "$response" | grep -E 'error|ERROR|statusCode' )

        echo "$errCode"

        #Move the file to the processed folder
        mv "$file" "$processed_dir/"
        echo "Moved to: $processed_dir/$(basename "$file")"
        echo "-----------------------------------"

        # Break the loop if reached Max. number of files
        if [ $count -eq $max_file_limit ]; then
            break
        fi

done < "$temp_file"

# Clean up the temporary file
rm -f "$temp_file"

echo "Processed $count files."
exit 0