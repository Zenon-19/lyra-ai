# PowerShell script to deploy Lyra AI to Vercel

Write-Host "Deploying Lyra AI to Vercel..." -ForegroundColor Green

# Check if Vercel CLI is installed
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue

if (-not $vercelInstalled) {
    Write-Host "Vercel CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g vercel
}

# Deploy the application
Write-Host "Running Vercel deployment..." -ForegroundColor Cyan
vercel --prod

Write-Host "Deployment completed. Check the URL above for your live application." -ForegroundColor Green
