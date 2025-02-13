#!/bin/bash

# Build the frontend
echo "Building frontend..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Build completed successfully!"

    # Create a production build manifest
    echo "Creating build manifest..."
    echo "Build timestamp: $(date)" > dist/build.txt
    echo "Environment: production" >> dist/build.txt

    exit 0
else
    echo "Build failed!"
    exit 1
fi