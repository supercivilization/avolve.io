#!/usr/bin/env python3

"""
Quick transcript test - no API key needed
Tests youtube-transcript-api directly
"""

import sys

def test_transcript_extraction():
    """Test transcript extraction with a popular video"""
    
    try:
        from youtube_transcript_api import YouTubeTranscriptApi
        from youtube_transcript_api.formatters import TextFormatter
    except ImportError:
        print("❌ Missing youtube-transcript-api")
        print("Install with: pip install youtube-transcript-api")
        return False
    
    # Test with "Me at the zoo" - first YouTube video
    video_id = "jNQXAC9IVRw"
    
    print(f"🧪 Testing transcript extraction for video: {video_id}")
    print("📺 Video: 'Me at the zoo' (first YouTube video)")
    
    try:
        # Get transcript
        transcript_list = YouTubeTranscriptApi.list_transcripts(video_id)
        
        # Try to get English transcript
        try:
            transcript = transcript_list.find_transcript(['en'])
            transcript_data = transcript.fetch()
            
            # Format as text
            formatter = TextFormatter()
            transcript_text = formatter.format_transcript(transcript_data)
            
            print(f"✅ Success! Extracted {len(transcript_data)} transcript segments")
            print(f"✅ Total text length: {len(transcript_text)} characters")
            print("\n📝 First 200 characters:")
            print(f"'{transcript_text[:200]}...'")
            
            # Save to file
            with open('test_transcript.txt', 'w', encoding='utf-8') as f:
                f.write(transcript_text)
            print(f"✅ Saved to: test_transcript.txt")
            
            return True
            
        except Exception as e:
            print(f"❌ Could not get English transcript: {e}")
            
            # Try any available transcript
            transcripts = transcript_list._manually_created_transcripts
            if not transcripts:
                transcripts = transcript_list._generated_transcripts
            
            if transcripts:
                lang = list(transcripts.keys())[0]
                print(f"🔄 Trying {lang} transcript instead...")
                
                transcript = transcript_list.find_transcript([lang])
                transcript_data = transcript.fetch()
                
                formatter = TextFormatter()
                transcript_text = formatter.format_transcript(transcript_data)
                
                print(f"✅ Success! Extracted {len(transcript_data)} transcript segments in {lang}")
                print(f"✅ Total text length: {len(transcript_text)} characters")
                
                return True
            
            return False
            
    except Exception as e:
        print(f"❌ Transcript extraction failed: {e}")
        return False

if __name__ == '__main__':
    print("🎬 YouTube Transcript Extraction Test")
    print("=" * 40)
    
    success = test_transcript_extraction()
    
    if success:
        print("\n🎉 Test passed! Transcript extraction is working.")
        print("\n🔄 Next: Set up YouTube API for comment extraction")
    else:
        print("\n❌ Test failed. Check the error messages above.")