#!/bin/bash
# Build script that saves output to a log file

# Create logs directory if it doesn't exist
mkdir -p logs

# Run the build and save output to a log file
npm run build 2>&1 | tee logs/build-$(date +%Y%m%d-%H%M%S).log

# Check the exit status of the build
if [ ${PIPESTATUS[0]} -eq 0 ]; then
    echo "Build completed successfully!"
else
    echo "Build failed. Check the log file for details."
    exit 1
fi
