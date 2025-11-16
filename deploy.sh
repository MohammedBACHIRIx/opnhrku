#!/bin/bash

# OpenKnowledge Hub Deployment Script
# This script helps deploy the application to production

echo "🚀 OpenKnowledge Hub Deployment Script"
echo "======================================"

# Check if required tools are installed
command -v node >/dev/null 2>&1 || { echo "❌ Node.js is required but not installed. Aborting." >&2; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "❌ npm is required but not installed. Aborting." >&2; exit 1; }

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if environment variables are set
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local file not found!"
    echo "Please copy .env.example to .env.local and configure your environment variables."
    exit 1
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Build the application
echo "🏗️  Building application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo ""
    echo "🎉 OpenKnowledge Hub is ready for deployment!"
    echo ""
    echo "To start the production server, run:"
    echo "  npm start"
    echo ""
    echo "To start the development server, run:"
    echo "  npm run dev"
    echo ""
    echo "🔍 Next steps:"
    echo "  1. Set up your Supabase project"
    echo "  2. Configure environment variables in .env.local"
    echo "  3. Run database migrations: npx prisma db push"
    echo "  4. Deploy to your preferred platform (Vercel, Netlify, etc.)"
else
    echo "❌ Build failed! Please check the error messages above."
    exit 1
fi