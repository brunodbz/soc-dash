#!/bin/bash

echo "🔍 SOC Security Dashboard - Verification Script"
echo "================================================"
echo ""

# Check Node.js
echo "✓ Checking Node.js..."
node -v

# Check npm
echo "✓ Checking npm..."
npm -v

# Check if node_modules exists
if [ -d "node_modules" ]; then
    echo "✓ Dependencies installed"
else
    echo "❌ Dependencies not installed. Run: npm install"
    exit 1
fi

# Check key files
echo ""
echo "✓ Checking key files..."
files=(
    "src/pages/Dashboard.tsx"
    "src/pages/AdminPanel.tsx"
    "src/components/security/SecurityEventCard.tsx"
    "src/components/security/IntegrationWidget.tsx"
    "src/services/securityService.ts"
    "src/services/exportService.ts"
    "Dockerfile"
    "docker-compose.yml"
    "nginx.conf"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✓ $file"
    else
        echo "  ❌ $file missing"
    fi
done

echo ""
echo "✓ Running lint check..."
npm run lint

echo ""
echo "================================================"
echo "✅ Verification Complete!"
echo ""
echo "To start the application:"
echo "  Development: npm run dev"
echo "  Docker:      docker-compose up -d"
echo ""
