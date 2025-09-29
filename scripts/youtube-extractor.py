#!/usr/bin/env python3

"""
YouTube Data Extractor
Combines YouTube Data API v3 with youtube-transcript-api for comprehensive data extraction.

Features:
- Comments and metadata via official API
- Transcripts via youtube-transcript-api
- Rate limiting and error handling
- Multiple output formats (JSON, CSV)
- Batch processing support

Usage:
python youtube-extractor.py --video-id "VIDEO_ID" --output results.json
python youtube-extractor.py --channel-id "CHANNEL_ID" --max-videos 10
python youtube-extractor.py --url "https://youtube.com/watch?v=VIDEO_ID"
"""

import os
import sys
import json
import csv
import time
import argparse
import logging
from datetime import datetime
from typing import Dict, List, Optional, Any
from dataclasses import dataclass, asdict
from urllib.parse import urlparse, parse_qs
import re

# Required dependencies
try:
    from googleapiclient.discovery import build
    from googleapiclient.errors import HttpError
    from youtube_transcript_api import YouTubeTranscriptApi
    from youtube_transcript_api.formatters import TextFormatter
    import requests
except ImportError as e:
    print(f"Missing required dependency: {e}")
    print("Install with: pip install google-api-python-client youtube-transcript-api requests")
    sys.exit(1)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('youtube_extractor.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

@dataclass
class VideoData:
    """Structured video data container"""
    video_id: str
    title: str
    description: str
    published_at: str
    channel_id: str
    channel_title: str
    duration: str
    view_count: int
    like_count: int
    comment_count: int
    tags: List[str]
    category_id: str
    language: str
    thumbnail_url: str
    comments: List[Dict[str, Any]]
    transcript: List[Dict[str, Any]]
    transcript_text: str
    extraction_timestamp: str

class YouTubeExtractor:
    """Unified YouTube data extraction using API + transcript library"""
    
    def __init__(self, api_key: Optional[str] = None):
        """Initialize with YouTube API key (optional for transcript-only extraction)"""
        self.api_key = api_key or os.getenv('YOUTUBE_API_KEY')
        self.youtube = None
        
        if self.api_key:
            try:
                self.youtube = build('youtube', 'v3', developerKey=self.api_key)
                logger.info("YouTube API v3 initialized successfully")
            except Exception as e:
                logger.error(f"Failed to initialize YouTube API: {e}")
        else:
            logger.warning("No API key provided - transcript extraction only")
    
    def extract_video_id(self, url_or_id: str) -> str:
        """Extract video ID from various YouTube URL formats"""
        if len(url_or_id) == 11 and not '/' in url_or_id:
            return url_or_id
        
        patterns = [
            r'(?:youtube\.com/watch\?v=|youtu\.be/|youtube\.com/embed/)([^&\n?#]+)',
            r'youtube\.com/v/([^&\n?#]+)',
        ]
        
        for pattern in patterns:
            match = re.search(pattern, url_or_id)
            if match:
                return match.group(1)
        
        raise ValueError(f"Could not extract video ID from: {url_or_id}")
    
    def get_video_metadata(self, video_id: str) -> Dict[str, Any]:
        """Get video metadata using YouTube API v3"""
        if not self.youtube:
            logger.warning("No API access - returning minimal metadata")
            return {
                'id': video_id,
                'title': 'Unknown (API not available)',
                'description': '',
                'publishedAt': '',
                'channelId': '',
                'channelTitle': '',
                'duration': '',
                'statistics': {'viewCount': 0, 'likeCount': 0, 'commentCount': 0},
                'tags': [],
                'categoryId': '',
                'defaultLanguage': '',
                'thumbnails': {'high': {'url': ''}}
            }
        
        try:
            request = self.youtube.videos().list(
                part='snippet,statistics,contentDetails',
                id=video_id
            )
            response = request.execute()
            
            if not response['items']:
                raise ValueError(f"Video not found: {video_id}")
            
            return response['items'][0]
            
        except HttpError as e:
            logger.error(f"API error getting video metadata: {e}")
            raise
    
    def get_video_comments(self, video_id: str, max_results: int = 100) -> List[Dict[str, Any]]:
        """Get video comments using YouTube API v3 with pagination"""
        if not self.youtube:
            logger.warning("No API access - cannot retrieve comments")
            return []
        
        comments = []
        next_page_token = None
        
        try:
            while len(comments) < max_results:
                request = self.youtube.commentThreads().list(
                    part='snippet,replies',
                    videoId=video_id,
                    maxResults=min(100, max_results - len(comments)),
                    order='relevance',
                    pageToken=next_page_token
                )
                response = request.execute()
                
                for item in response['items']:
                    comment = {
                        'id': item['id'],
                        'text': item['snippet']['topLevelComment']['snippet']['textDisplay'],
                        'author': item['snippet']['topLevelComment']['snippet']['authorDisplayName'],
                        'published_at': item['snippet']['topLevelComment']['snippet']['publishedAt'],
                        'like_count': item['snippet']['topLevelComment']['snippet']['likeCount'],
                        'reply_count': item['snippet']['totalReplyCount'],
                        'replies': []
                    }
                    
                    # Get replies if they exist
                    if 'replies' in item and item['snippet']['totalReplyCount'] > 0:
                        for reply_item in item['replies']['comments']:
                            reply = {
                                'id': reply_item['id'],
                                'text': reply_item['snippet']['textDisplay'],
                                'author': reply_item['snippet']['authorDisplayName'],
                                'published_at': reply_item['snippet']['publishedAt'],
                                'like_count': reply_item['snippet']['likeCount']
                            }
                            comment['replies'].append(reply)
                    
                    comments.append(comment)
                
                next_page_token = response.get('nextPageToken')
                if not next_page_token:
                    break
                
                # Rate limiting
                time.sleep(0.1)
            
            logger.info(f"Retrieved {len(comments)} comments for video {video_id}")
            return comments
            
        except HttpError as e:
            if e.resp.status == 403:
                logger.warning(f"Comments disabled for video {video_id}")
                return []
            logger.error(f"API error getting comments: {e}")
            raise
    
    def get_video_transcript(self, video_id: str, languages: List[str] = ['en']) -> tuple:
        """Get video transcript using youtube-transcript-api"""
        try:
            # Try to get transcript in preferred languages
            transcript_list = YouTubeTranscriptApi.list_transcripts(video_id)
            
            # First try manually created transcripts
            for lang in languages:
                try:
                    transcript = transcript_list.find_manually_created_transcript([lang])
                    transcript_data = transcript.fetch()
                    
                    # Format as plain text
                    formatter = TextFormatter()
                    text = formatter.format_transcript(transcript_data)
                    
                    logger.info(f"Retrieved manual transcript for {video_id} in {lang}")
                    return transcript_data, text
                except:
                    continue
            
            # Fall back to auto-generated transcripts
            for lang in languages:
                try:
                    transcript = transcript_list.find_generated_transcript([lang])
                    transcript_data = transcript.fetch()
                    
                    formatter = TextFormatter()
                    text = formatter.format_transcript(transcript_data)
                    
                    logger.info(f"Retrieved auto-generated transcript for {video_id} in {lang}")
                    return transcript_data, text
                except:
                    continue
            
            logger.warning(f"No transcript found for video {video_id} in languages {languages}")
            return [], ""
            
        except Exception as e:
            logger.error(f"Error getting transcript for {video_id}: {e}")
            return [], ""
    
    def extract_video_data(self, video_id: str, include_comments: bool = True, 
                          include_transcript: bool = True, max_comments: int = 100) -> VideoData:
        """Extract comprehensive video data"""
        logger.info(f"Extracting data for video: {video_id}")
        
        # Get metadata
        metadata = self.get_video_metadata(video_id)
        snippet = metadata.get('snippet', {})
        statistics = metadata.get('statistics', {})
        
        # Get comments
        comments = []
        if include_comments:
            comments = self.get_video_comments(video_id, max_comments)
        
        # Get transcript
        transcript_data, transcript_text = [], ""
        if include_transcript:
            transcript_data, transcript_text = self.get_video_transcript(video_id)
        
        # Create structured data object
        video_data = VideoData(
            video_id=video_id,
            title=snippet.get('title', ''),
            description=snippet.get('description', ''),
            published_at=snippet.get('publishedAt', ''),
            channel_id=snippet.get('channelId', ''),
            channel_title=snippet.get('channelTitle', ''),
            duration=metadata.get('contentDetails', {}).get('duration', ''),
            view_count=int(statistics.get('viewCount', 0)),
            like_count=int(statistics.get('likeCount', 0)),
            comment_count=int(statistics.get('commentCount', 0)),
            tags=snippet.get('tags', []),
            category_id=snippet.get('categoryId', ''),
            language=snippet.get('defaultLanguage', ''),
            thumbnail_url=snippet.get('thumbnails', {}).get('high', {}).get('url', ''),
            comments=comments,
            transcript=transcript_data,
            transcript_text=transcript_text,
            extraction_timestamp=datetime.now().isoformat()
        )
        
        logger.info(f"Successfully extracted data for video: {video_data.title}")
        return video_data
    
    def get_channel_videos(self, channel_id: str, max_results: int = 50) -> List[str]:
        """Get video IDs from a channel"""
        if not self.youtube:
            raise ValueError("API key required for channel video listing")
        
        video_ids = []
        next_page_token = None
        
        try:
            while len(video_ids) < max_results:
                request = self.youtube.search().list(
                    part='id',
                    channelId=channel_id,
                    type='video',
                    maxResults=min(50, max_results - len(video_ids)),
                    order='date',
                    pageToken=next_page_token
                )
                response = request.execute()
                
                for item in response['items']:
                    video_ids.append(item['id']['videoId'])
                
                next_page_token = response.get('nextPageToken')
                if not next_page_token:
                    break
                
                time.sleep(0.1)
            
            logger.info(f"Found {len(video_ids)} videos for channel {channel_id}")
            return video_ids
            
        except HttpError as e:
            logger.error(f"Error getting channel videos: {e}")
            raise
    
    def save_data(self, data: VideoData, output_file: str, format: str = 'json'):
        """Save extracted data to file"""
        if format.lower() == 'json':
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump(asdict(data), f, ensure_ascii=False, indent=2)
        
        elif format.lower() == 'csv':
            # Flatten data for CSV export
            flat_data = {
                'video_id': data.video_id,
                'title': data.title,
                'description': data.description[:500] + '...' if len(data.description) > 500 else data.description,
                'published_at': data.published_at,
                'channel_title': data.channel_title,
                'view_count': data.view_count,
                'like_count': data.like_count,
                'comment_count': data.comment_count,
                'transcript_length': len(data.transcript_text),
                'extraction_timestamp': data.extraction_timestamp
            }
            
            with open(output_file, 'w', newline='', encoding='utf-8') as f:
                writer = csv.DictWriter(f, fieldnames=flat_data.keys())
                writer.writeheader()
                writer.writerow(flat_data)
        
        logger.info(f"Data saved to {output_file} in {format.upper()} format")

def main():
    """Main CLI interface"""
    parser = argparse.ArgumentParser(description='Extract YouTube video data')
    parser.add_argument('--video-id', '-v', help='YouTube video ID')
    parser.add_argument('--url', '-u', help='YouTube video URL')
    parser.add_argument('--channel-id', '-c', help='YouTube channel ID')
    parser.add_argument('--max-videos', type=int, default=10, help='Max videos from channel')
    parser.add_argument('--max-comments', type=int, default=100, help='Max comments per video')
    parser.add_argument('--output', '-o', default='youtube_data.json', help='Output file')
    parser.add_argument('--format', '-f', choices=['json', 'csv'], default='json', help='Output format')
    parser.add_argument('--no-comments', action='store_true', help='Skip comment extraction')
    parser.add_argument('--no-transcript', action='store_true', help='Skip transcript extraction')
    parser.add_argument('--api-key', help='YouTube API key (or set YOUTUBE_API_KEY env var)')
    
    args = parser.parse_args()
    
    # Initialize extractor
    extractor = YouTubeExtractor(args.api_key)
    
    try:
        if args.video_id or args.url:
            # Single video extraction
            video_id = args.video_id or extractor.extract_video_id(args.url)
            
            data = extractor.extract_video_data(
                video_id,
                include_comments=not args.no_comments,
                include_transcript=not args.no_transcript,
                max_comments=args.max_comments
            )
            
            extractor.save_data(data, args.output, args.format)
            
        elif args.channel_id:
            # Channel video extraction
            video_ids = extractor.get_channel_videos(args.channel_id, args.max_videos)
            
            all_data = []
            for i, video_id in enumerate(video_ids, 1):
                logger.info(f"Processing video {i}/{len(video_ids)}: {video_id}")
                try:
                    data = extractor.extract_video_data(
                        video_id,
                        include_comments=not args.no_comments,
                        include_transcript=not args.no_transcript,
                        max_comments=args.max_comments
                    )
                    all_data.append(asdict(data))
                except Exception as e:
                    logger.error(f"Failed to process video {video_id}: {e}")
                
                # Rate limiting between videos
                time.sleep(1)
            
            # Save all data
            with open(args.output, 'w', encoding='utf-8') as f:
                json.dump(all_data, f, ensure_ascii=False, indent=2)
            
            logger.info(f"Extracted data for {len(all_data)} videos")
        
        else:
            parser.print_help()
            
    except Exception as e:
        logger.error(f"Extraction failed: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()