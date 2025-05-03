@echo off
echo Building Global Film Festival 2025 website for production...

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Error: Node.js is not installed. Please install Node.js and try again.
    exit /b 1
)

REM Install dependencies if needed
if not exist node_modules (
    echo Installing dependencies...
    call npm install
)

REM Create dist directory if it doesn't exist
if not exist dist mkdir dist

REM Build the project
echo Running build process...
call npm run build

REM Check if build was successful
if %ERRORLEVEL% neq 0 (
    echo Error: Build failed. Please check the error messages above.
    exit /b 1
)

echo.
echo Build completed successfully!
echo The production files are available in the dist folder.

REM Create ZIP archive of the build
echo Creating ZIP archive of the build...
powershell -Command "Compress-Archive -Path dist\* -DestinationPath global-film-festival-2025-build.zip -Force"

if %ERRORLEVEL% neq 0 (
    echo Warning: Could not create ZIP archive. Please make sure PowerShell is available.
) else (
    echo ZIP archive created successfully: global-film-festival-2025-build.zip
)

echo.
echo To preview the production build, run: npm run preview
echo To deploy to Firebase, run: npm run deploy