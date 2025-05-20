#!/bin/bash
# This script deploys the Lyra AI app to Vercel

echo "Deploying Lyra AI to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Deploy the application
echo "Running Vercel deployment..."
vercel --prod

echo "Deployment completed. Check the URL above for your live application."
