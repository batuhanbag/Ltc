#!/bin/bash

# Check if a commit message was provided
if [ $# -eq 0 ]; then
    echo "Error: Please provide a commit message."
    echo "Usage: ./commit_and_release.sh \"Your commit message\""
    exit 1
fi

# Store the commit message
commit_message="$1"

# Run the commands
git commit -m "$commit_message" && \
git push origin main && \
yarn clean && \
yarn prepare && \
yarn release

# Check if all commands were successful
if [ $? -eq 0 ]; then
    echo "All operations completed successfully!"
else
    echo "An error occurred during the process."
fi