#!/bin/bash

# Setup Python environment for YouTube extraction
set -e

echo "🐍 Setting up Python environment for YouTube extraction..."

# Check if we're in the right directory
if [ ! -f "youtube-extractor.py" ]; then
    echo "❌ Please run this from the scripts directory"
    exit 1
fi

# Create virtual environment
echo "📦 Creating Python virtual environment..."
python3 -m venv youtube-env

# Activate virtual environment
echo "⚡ Activating virtual environment..."
source youtube-env/bin/activate

# Upgrade pip
echo "📥 Upgrading pip..."
pip install --upgrade pip

# Install requirements
echo "📦 Installing YouTube extraction dependencies..."
pip install -r requirements-youtube.txt

echo "✅ Python environment setup complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Activate the environment: source scripts/youtube-env/bin/activate"
echo "2. Get your YouTube API key from: https://console.cloud.google.com/"
echo "3. Set the environment variable: export YOUTUBE_API_KEY='your_key_here'"
echo "4. Test extraction: python youtube-extractor.py --url 'https://youtube.com/watch?v=dQw4w9WgXcQ' --no-comments"
echo ""
echo "🔑 To get YouTube API key:"
echo "   → Go to Google Cloud Console"
echo "   → Create/Select project"
echo "   → Enable YouTube Data API v3"
echo "   → Create API Key in Credentials"
echo ""
echo "💡 You can extract transcripts without an API key using --no-comments flag"