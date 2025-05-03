@echo off
echo Global Film Festival 2025 - GitHub Upload Script
echo ===============================================
echo.

REM Check if Git is installed
where git >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Error: Git is not installed. Please install Git from https://git-scm.com/downloads
    exit /b 1
)

REM Initialize Git repository if not already initialized
if not exist .git (
    echo Initializing Git repository...
    git init
    if %ERRORLEVEL% neq 0 (
        echo Error: Failed to initialize Git repository.
        exit /b 1
    )
    echo Git repository initialized successfully.
) else (
    echo Git repository already exists.
)

REM Ask for GitHub repository URL
set /p REPO_URL=Enter your GitHub repository URL (e.g., https://github.com/username/repo.git): 

if "%REPO_URL%"=="" (
    echo Error: GitHub repository URL cannot be empty.
    exit /b 1
)

REM Add all files to Git
echo Adding files to Git...
git add .

REM Commit changes
echo Creating initial commit...
set /p COMMIT_MSG=Enter commit message (or press Enter for default message): 

if "%COMMIT_MSG%"=="" (
    set COMMIT_MSG=Initial commit of Global Film Festival 2025 website
)

git commit -m "%COMMIT_MSG%"
if %ERRORLEVEL% neq 0 (
    echo Error: Failed to commit changes.
    exit /b 1
)

REM Add remote origin if not already added
git remote -v | findstr origin >nul
if %ERRORLEVEL% neq 0 (
    echo Adding remote origin...
    git remote add origin %REPO_URL%
) else (
    echo Remote origin already exists. Updating URL...
    git remote set-url origin %REPO_URL%
)

REM Push to GitHub
echo Pushing to GitHub...
echo Note: You may be prompted to enter your GitHub credentials.

set /p BRANCH=Enter branch name (or press Enter for 'main'): 

if "%BRANCH%"=="" (
    set BRANCH=main
)

git push -u origin %BRANCH%
if %ERRORLEVEL% neq 0 (
    echo.
    echo Push failed. This could be due to:
    echo 1. Invalid GitHub credentials
    echo 2. Repository does not exist
    echo 3. You don't have permission to push to this repository
    echo.
    echo Please create a repository on GitHub first at: https://github.com/new
    exit /b 1
)

echo.
echo ===============================================
echo Success! Your project has been uploaded to GitHub.
echo Repository URL: %REPO_URL%
echo.
echo Next steps:
echo 1. Visit your repository on GitHub to verify the upload
echo 2. Set up GitHub Pages to host your website (if desired)
echo 3. Share your repository with collaborators
echo ===============================================