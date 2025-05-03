#!/bin/bash

echo "Building Global Film Festival 2025 website for production..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install Node.js and try again."
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Create dist directory if it doesn't exist
mkdir -p dist

# Build the project
echo "Running build process..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "Error: Build failed. Please check the error messages above."
    exit 1
fi

# Create ZIP archive of the build
echo "Creating ZIP archive of the build..."
if command -v zip &> /dev/null; then
    zip -r global-film-festival-2025-build.zip dist
    echo "ZIP archive created successfully: global-film-festival-2025-build.zip"
else
    echo "Warning: Could not create ZIP archive. Please install zip or use 'npm run zip' instead."
fi

echo ""
echo "Build completed successfully!"
echo "The production files are available in the dist folder."
echo ""
echo "To preview the production build, run: npm run preview"
echo "To deploy to Firebase, run: npm run deploy"