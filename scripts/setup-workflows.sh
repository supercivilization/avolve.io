#!/bin/bash

# AI Workflow Setup Script
# Initializes the complete workflow automation system

set -e

echo "🚀 Setting up AI Workflow Automation System"
echo "============================================"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check prerequisites
echo -e "${YELLOW}Checking prerequisites...${NC}"

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo -e "${RED}❌ Supabase CLI not found. Please install it first:${NC}"
    echo "curl -L https://supabase.com/install.sh | sh"
    exit 1
fi

# Check if pnpm is available
if ! command -v pnpm &> /dev/null; then
    echo -e "${RED}❌ pnpm not found. Please install it first:${NC}"
    echo "npm install -g pnpm"
    exit 1
fi

echo -e "${GREEN}✅ Prerequisites check passed${NC}"

# Check if Supabase is running
echo -e "${YELLOW}Checking Supabase status...${NC}"

if ! supabase status > /dev/null 2>&1; then
    echo -e "${YELLOW}Starting Supabase local development...${NC}"
    supabase start
else
    echo -e "${GREEN}✅ Supabase is already running${NC}"
fi

# Apply database migrations
echo -e "${YELLOW}Applying database migrations...${NC}"

if [ -f "supabase/migrations/001_workflow_intelligence.sql" ]; then
    supabase db reset --no-seed
    echo -e "${GREEN}✅ Database migrations applied${NC}"
else
    echo -e "${RED}❌ Migration file not found at supabase/migrations/001_workflow_intelligence.sql${NC}"
    exit 1
fi

# Create directories if they don't exist
echo -e "${YELLOW}Setting up directory structure...${NC}"

mkdir -p src/lib/workflows
mkdir -p src/app/actions
mkdir -p src/app/dashboard/workflows
mkdir -p src/app/test/workflows
mkdir -p reports
mkdir -p data

echo -e "${GREEN}✅ Directory structure created${NC}"

# Check environment variables
echo -e "${YELLOW}Checking environment variables...${NC}"

ENV_FILE=".env.local"
if [ ! -f "$ENV_FILE" ]; then
    echo -e "${YELLOW}Creating .env.local from .env.example...${NC}"
    cp .env.example .env.local
fi

# List of required environment variables
REQUIRED_VARS=("SUPABASE_URL" "SUPABASE_ANON_KEY" "SUPABASE_SERVICE_ROLE_KEY")
OPTIONAL_VARS=("OPENAI_API_KEY" "ANTHROPIC_API_KEY" "YOUTUBE_API_KEY" "GITHUB_TOKEN")

echo -e "${YELLOW}Required environment variables:${NC}"
for var in "${REQUIRED_VARS[@]}"; do
    if grep -q "^${var}=" "$ENV_FILE" && ! grep -q "^${var}=$" "$ENV_FILE"; then
        echo -e "${GREEN}✅ $var${NC}"
    else
        echo -e "${RED}❌ $var (not set)${NC}"
    fi
done

echo -e "${YELLOW}Optional environment variables (for full functionality):${NC}"
for var in "${OPTIONAL_VARS[@]}"; do
    if grep -q "^${var}=" "$ENV_FILE" && ! grep -q "^${var}=$" "$ENV_FILE"; then
        echo -e "${GREEN}✅ $var${NC}"
    else
        echo -e "${YELLOW}⚠️  $var (not set)${NC}"
    fi
done

# Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"
pnpm install
echo -e "${GREEN}✅ Dependencies installed${NC}"

# Build the project
echo -e "${YELLOW}Building project...${NC}"
pnpm build
echo -e "${GREEN}✅ Project built successfully${NC}"

# Test basic functionality
echo -e "${YELLOW}Testing basic functionality...${NC}"

# Test Supabase connection
if supabase status | grep -q "API URL"; then
    echo -e "${GREEN}✅ Supabase connection working${NC}"
else
    echo -e "${RED}❌ Supabase connection failed${NC}"
    exit 1
fi

# Create a simple test script to validate the setup
cat > test-workflow-setup.js << 'EOF'
const { createClient } = require('@supabase/supabase-js');

async function testSetup() {
    try {
        // Test Supabase connection
        const supabase = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_SERVICE_ROLE_KEY
        );

        // Test database connection
        const { data, error } = await supabase
            .from('social_intelligence')
            .select('count')
            .limit(1);

        if (error) {
            console.error('❌ Database connection failed:', error.message);
            process.exit(1);
        }

        console.log('✅ Database connection successful');

        // Test AI SDK if API key is available
        if (process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY) {
            console.log('✅ AI API keys configured');
        } else {
            console.log('⚠️  No AI API keys found - some features will be limited');
        }

        console.log('🎉 Setup validation completed successfully!');

    } catch (error) {
        console.error('❌ Setup validation failed:', error.message);
        process.exit(1);
    }
}

testSetup();
EOF

# Run the test
node test-workflow-setup.js
rm test-workflow-setup.js

echo ""
echo -e "${GREEN}🎉 AI Workflow Automation System Setup Complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Configure API keys in .env.local for full functionality"
echo "2. Visit http://localhost:3000/test/workflows to test components"
echo "3. Visit http://localhost:3000/dashboard/workflows for the full dashboard"
echo ""
echo "Available test commands:"
echo "  pnpm dev                           # Start development server"
echo "  node scripts/comprehensive-github-intelligence.js analyze  # Test GitHub collection"
echo "  pnpm social:test:all               # Test social listening (requires API keys)"
echo ""
echo -e "${YELLOW}Note: Some features require API keys to be configured in .env.local${NC}"

# Display Supabase info
echo ""
echo -e "${GREEN}Supabase Local Development:${NC}"
supabase status