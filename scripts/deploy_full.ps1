# Deploy Script for CAPSLOCK Gallery
# This script handles Git sync and Vercel deployment

$ErrorActionPreference = "Stop"

Write-Host "[INFO] Verifying security..."
if (-not (Select-String -Path ".gitignore" -Pattern "^\.env" -Quiet)) {
    Write-Error "[ERROR] CRITICAL: .env files are not properly ignored in .gitignore!"
    exit 1
}
Write-Host "[SUCCESS] Credentials protected (.gitignore verified)"

Write-Host "`n[INFO] Syncing with GitHub..."
git add .
git commit -m "Update: Fixes for deployment and responsiveness" 2>$null
git push origin main
Write-Host "[SUCCESS] Code pushed to GitHub"

Write-Host "`n[INFO] Initializing Vercel Deployment..."
# Check if Vercel CLI works/is authenticated
$whoami = npx vercel whoami 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "[WARN] You are not logged in to Vercel CLI."
    Write-Host "Running login sequence..."
    npx vercel login
}

# Attempt link and deploy
Write-Host "`n[INFO] Linking Project..."
# We use --yes to default to current folder name/settings
npx vercel link --yes

Write-Host "`n[INFO] Deploying to Production..."
npx vercel deploy --prod

Write-Host "`n[SUCCESS] Deployment sequence complete!"
