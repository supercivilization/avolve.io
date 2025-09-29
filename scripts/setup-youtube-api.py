#!/usr/bin/env python3

"""
YouTube API Setup Helper
Guides through API key setup and validates configuration.

Usage:
python setup-youtube-api.py
"""

import os
import sys
import json
from pathlib import Path

def setup_youtube_api():
    """Interactive setup for YouTube Data API v3"""
    
    print("🎬 YouTube Data API v3 Setup")
    print("=" * 40)
    
    # Check if API key already exists
    existing_key = os.getenv('YOUTUBE_API_KEY')
    if existing_key:
        print(f"✅ Found existing API key: {existing_key[:10]}...")
        use_existing = input("Use existing key? (y/n): ").lower().strip()
        if use_existing == 'y':
            return existing_key
    
    print("\n📋 To get a YouTube Data API v3 key:")
    print("1. Go to: https://console.cloud.google.com/")
    print("2. Create a new project or select existing project")
    print("3. Enable YouTube Data API v3")
    print("4. Go to 'Credentials' → 'Create Credentials' → 'API Key'")
    print("5. Copy the API key")
    print("\n💡 Tip: Restrict the API key to YouTube Data API v3 for security")
    
    # Get API key from user
    api_key = input("\n🔑 Enter your YouTube Data API v3 key: ").strip()
    
    if not api_key:
        print("❌ No API key provided")
        return None
    
    # Validate API key format (basic check)
    if len(api_key) < 30:
        print("⚠️  Warning: API key seems too short")
    
    # Test API key
    print("\n🧪 Testing API key...")
    if test_api_key(api_key):
        print("✅ API key is valid!")
        
        # Save to environment file
        save_to_env_file(api_key)
        
        # Set environment variable for current session
        os.environ['YOUTUBE_API_KEY'] = api_key
        
        return api_key
    else:
        print("❌ API key test failed")
        return None

def test_api_key(api_key):
    """Test if API key works with a simple request"""
    try:
        from googleapiclient.discovery import build
        from googleapiclient.errors import HttpError
        
        youtube = build('youtube', 'v3', developerKey=api_key)
        
        # Simple test request - get a popular video's basic info
        request = youtube.videos().list(
            part='snippet',
            id='jNQXAC9IVRw',  # Popular "Me at the zoo" video
            maxResults=1
        )
        response = request.execute()
        
        return len(response.get('items', [])) > 0
        
    except HttpError as e:
        print(f"API Error: {e}")
        return False
    except ImportError:
        print("❌ Missing google-api-python-client dependency")
        print("Install with: pip install google-api-python-client")
        return False
    except Exception as e:
        print(f"Test Error: {e}")
        return False

def save_to_env_file(api_key):
    """Save API key to .env file"""
    env_file = Path('.env')
    
    # Read existing .env file if it exists
    env_content = ""
    if env_file.exists():
        env_content = env_file.read_text()
    
    # Check if YOUTUBE_API_KEY already exists
    lines = env_content.split('\n')
    updated = False
    
    for i, line in enumerate(lines):
        if line.startswith('YOUTUBE_API_KEY='):
            lines[i] = f'YOUTUBE_API_KEY={api_key}'
            updated = True
            break
    
    # Add new key if not found
    if not updated:
        if env_content and not env_content.endswith('\n'):
            env_content += '\n'
        env_content += f'YOUTUBE_API_KEY={api_key}\n'
    else:
        env_content = '\n'.join(lines)
    
    # Write back to file
    env_file.write_text(env_content)
    print(f"✅ API key saved to {env_file.absolute()}")
    
    # Create .env.example for reference
    example_file = Path('.env.example')
    if not example_file.exists():
        example_content = """# YouTube Data API v3 Configuration
YOUTUBE_API_KEY=your_youtube_api_key_here

# Add other environment variables below
"""
        example_file.write_text(example_content)
        print(f"✅ Example file created: {example_file.absolute()}")

def install_dependencies():
    """Install required Python packages"""
    print("\n📦 Installing required dependencies...")
    
    packages = [
        'google-api-python-client',
        'youtube-transcript-api',
        'requests'
    ]
    
    for package in packages:
        try:
            __import__(package.replace('-', '_'))
            print(f"✅ {package} already installed")
        except ImportError:
            print(f"📥 Installing {package}...")
            os.system(f"{sys.executable} -m pip install {package}")

def create_test_script():
    """Create a simple test script"""
    test_script = Path('test_youtube_extraction.py')
    
    test_content = '''#!/usr/bin/env python3

"""
Test YouTube extraction with a sample video
"""

import os
from youtube_extractor import YouTubeExtractor

def test_extraction():
    """Test the YouTube extraction system"""
    
    # Sample video: "Me at the zoo" (first YouTube video)
    video_id = "jNQXAC9IVRw"
    
    print(f"🧪 Testing YouTube extraction with video: {video_id}")
    
    # Initialize extractor
    extractor = YouTubeExtractor()
    
    try:
        # Extract data
        data = extractor.extract_video_data(
            video_id, 
            include_comments=True, 
            include_transcript=True,
            max_comments=10
        )
        
        print(f"✅ Title: {data.title}")
        print(f"✅ Channel: {data.channel_title}")
        print(f"✅ Views: {data.view_count:,}")
        print(f"✅ Comments: {len(data.comments)}")
        print(f"✅ Transcript: {len(data.transcript_text)} characters")
        
        # Save test results
        extractor.save_data(data, 'test_results.json')
        print("✅ Test data saved to test_results.json")
        
        return True
        
    except Exception as e:
        print(f"❌ Test failed: {e}")
        return False

if __name__ == '__main__':
    test_extraction()
'''
    
    test_script.write_text(test_content)
    print(f"✅ Test script created: {test_script.absolute()}")

def main():
    """Main setup function"""
    print("🚀 Setting up YouTube Data Extraction System")
    print("=" * 50)
    
    # Install dependencies
    install_dependencies()
    
    # Setup API key
    api_key = setup_youtube_api()
    
    if api_key:
        # Create test script
        create_test_script()
        
        print("\n🎉 Setup Complete!")
        print("\n📖 Next Steps:")
        print("1. Test the extraction:")
        print("   python test_youtube_extraction.py")
        print("\n2. Extract data from any video:")
        print("   python youtube-extractor.py --url 'https://youtube.com/watch?v=VIDEO_ID'")
        print("\n3. Extract from a channel:")
        print("   python youtube-extractor.py --channel-id 'CHANNEL_ID' --max-videos 5")
        print("\n4. Transcript only (no API key needed):")
        print("   python youtube-extractor.py --url 'https://youtube.com/watch?v=VIDEO_ID' --no-comments")
        
    else:
        print("\n❌ Setup incomplete - API key required for full functionality")
        print("You can still use transcript extraction without an API key:")
        print("python youtube-extractor.py --url 'https://youtube.com/watch?v=VIDEO_ID' --no-comments")

if __name__ == '__main__':
    main()