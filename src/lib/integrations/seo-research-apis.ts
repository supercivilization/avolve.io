/**
 * SEO Research API Integrations
 *
 * Modern keyword research beyond traditional approaches:
 * - Answer The Public for question-based queries
 * - DataForSEO for competitive analysis
 * - Reddit API for authentic user language
 * - Custom semantic analysis for intent mapping
 *
 * "Keywords reimagined as diagnostic tools for user psychology"
 */

export interface AnswerThePublicResult {
  keyword: string;
  questions: {
    what: string[];
    why: string[];
    how: string[];
    when: string[];
    where: string[];
    who: string[];
    which: string[];
    will: string[];
  };
  prepositions: string[];
  comparisons: string[];
  alphabetical: string[];
  search_volume_data?: number[];
}

export interface DataForSEOResult {
  keyword: string;
  search_volume: number;
  competition: number;
  cpc: number;
  difficulty: number;
  serp_features: string[];
  related_keywords: string[];
  competitor_analysis: {
    domain: string;
    rank: number;
    url: string;
    title: string;
  }[];
}

export interface RedditInsight {
  subreddit: string;
  post_title: string;
  content: string;
  upvotes: number;
  comments: number;
  user_intent: 'question' | 'problem' | 'recommendation' | 'comparison' | 'frustration';
  extracted_keywords: string[];
  pain_points: string[];
}

export interface SemanticKeywordAnalysis {
  primary_keyword: string;
  semantic_variants: string[];
  related_entities: string[];
  user_intent: 'informational' | 'navigational' | 'commercial' | 'transactional';
  content_type_suggestion: 'blog_post' | 'pillar_page' | 'comparison' | 'tutorial' | 'case_study';
  topic_cluster: string;
  authority_potential: number; // 1-10 scale
}

export class SEOResearchAPI {
  private answerThePublicKey?: string;
  private dataForSeoUser?: string;
  private dataForSeoPassword?: string;

  constructor() {
    this.answerThePublicKey = process.env.ANSWER_THE_PUBLIC_API_KEY;
    this.dataForSeoUser = process.env.DATAFORSEO_USER;
    this.dataForSeoPassword = process.env.DATAFORSEO_PASSWORD;
  }

  /**
   * Answer The Public Integration
   * Focus: Question-based queries for informational content
   */
  async getAnswerThePublicData(keyword: string, language = 'en'): Promise<AnswerThePublicResult | null> {
    if (!this.answerThePublicKey) {
      console.warn('Answer The Public API key not configured');
      return this.getMockAnswerThePublicData(keyword);
    }

    try {
      const response = await fetch('https://api.answerthepublic.com/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.answerThePublicKey}`
        },
        body: JSON.stringify({
          keyword,
          language,
          country: 'us'
        })
      });

      if (!response.ok) {
        throw new Error(`Answer The Public API error: ${response.status}`);
      }

      const data = await response.json();

      return {
        keyword,
        questions: {
          what: data.questions.what || [],
          why: data.questions.why || [],
          how: data.questions.how || [],
          when: data.questions.when || [],
          where: data.questions.where || [],
          who: data.questions.who || [],
          which: data.questions.which || [],
          will: data.questions.will || []
        },
        prepositions: data.prepositions || [],
        comparisons: data.comparisons || [],
        alphabetical: data.alphabetical || []
      };

    } catch (error) {
      console.error('Answer The Public API error:', error);
      return this.getMockAnswerThePublicData(keyword);
    }
  }

  /**
   * DataForSEO Integration
   * Focus: Competitive analysis and search volume data
   */
  async getDataForSEOAnalysis(keyword: string, location = 2840): Promise<DataForSEOResult | null> {
    if (!this.dataForSeoUser || !this.dataForSeoPassword) {
      console.warn('DataForSEO credentials not configured');
      return this.getMockDataForSEOData(keyword);
    }

    try {
      const auth = btoa(`${this.dataForSeoUser}:${this.dataForSeoPassword}`);

      // Get keyword data
      const keywordResponse = await fetch('https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([{
          keywords: [keyword],
          location_code: location,
          language_code: 'en'
        }])
      });

      // Get SERP data for competitive analysis
      const serpResponse = await fetch('https://api.dataforseo.com/v3/serp/google/organic/live/advanced', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([{
          keyword,
          location_code: location,
          language_code: 'en',
          depth: 10
        }])
      });

      const keywordData = await keywordResponse.json();
      const serpData = await serpResponse.json();

      const keywordInfo = keywordData.tasks?.[0]?.result?.[0] || {};
      const serpResults = serpData.tasks?.[0]?.result?.[0]?.items || [];

      return {
        keyword,
        search_volume: keywordInfo.search_volume || 0,
        competition: keywordInfo.competition || 0,
        cpc: keywordInfo.cpc || 0,
        difficulty: this.calculateDifficulty(serpResults),
        serp_features: this.extractSERPFeatures(serpData.tasks?.[0]?.result?.[0]),
        related_keywords: [], // Would come from separate API call
        competitor_analysis: serpResults.slice(0, 5).map((item: any, index: number) => ({
          domain: item.domain || '',
          rank: index + 1,
          url: item.url || '',
          title: item.title || ''
        }))
      };

    } catch (error) {
      console.error('DataForSEO API error:', error);
      return this.getMockDataForSEOData(keyword);
    }
  }

  /**
   * Reddit Intelligence Extraction
   * Focus: Authentic user language and pain points
   */
  async getRedditInsights(keyword: string, subreddits: string[] = ['webdev', 'reactjs', 'nextjs', 'programming']): Promise<RedditInsight[]> {
    const insights: RedditInsight[] = [];

    for (const subreddit of subreddits) {
      try {
        // Reddit API call (would require proper authentication)
        const response = await fetch(`https://www.reddit.com/r/${subreddit}/search.json?q=${encodeURIComponent(keyword)}&limit=25&sort=relevance&t=month`, {
          headers: {
            'User-Agent': 'Avolve-SEO-Research/1.0'
          }
        });

        if (!response.ok) continue;

        const data = await response.json();
        const posts = data.data?.children || [];

        for (const post of posts) {
          const postData = post.data;

          insights.push({
            subreddit,
            post_title: postData.title || '',
            content: postData.selftext || '',
            upvotes: postData.ups || 0,
            comments: postData.num_comments || 0,
            user_intent: this.classifyUserIntent(postData.title || ''),
            extracted_keywords: this.extractKeywords(postData.title + ' ' + postData.selftext),
            pain_points: this.extractPainPoints(postData.title + ' ' + postData.selftext)
          });
        }

      } catch (error) {
        console.error(`Reddit API error for r/${subreddit}:`, error);
      }

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return insights;
  }

  /**
   * Semantic Keyword Analysis using AI
   * Transform keywords into strategic insights
   */
  async analyzeKeywordSemantics(keyword: string, context?: string): Promise<SemanticKeywordAnalysis> {
    const { generateText } = await import('ai');
    const { anthropic } = await import('@ai-sdk/anthropic');

    const analysis = await generateText({
      model: anthropic('claude-3-5-sonnet-20241022'),
      prompt: `Analyze this keyword for modern SEO strategy: "${keyword}"

Context: ${context || 'AI-native development, modern tech stack, developer tools'}

Provide semantic analysis following "The Keyword Reimagined" framework:

1. Semantic Variants: Related terms users might search for
2. Related Entities: Concepts, tools, people connected to this topic
3. User Intent: What is the user really trying to accomplish?
4. Content Type: What format best serves this intent?
5. Topic Cluster: What broader topic authority should this support?
6. Authority Potential: How well can we demonstrate E-E-A-T for this topic?

Focus on:
- User psychology behind the search
- Competitive landscape assessment
- Content opportunity scoring
- Technical expertise angles

Return as structured JSON with strategic insights.`
    });

    const result = JSON.parse(analysis.text);

    return {
      primary_keyword: keyword,
      semantic_variants: result.semantic_variants || [],
      related_entities: result.related_entities || [],
      user_intent: result.user_intent || 'informational',
      content_type_suggestion: result.content_type || 'blog_post',
      topic_cluster: result.topic_cluster || keyword,
      authority_potential: result.authority_potential || 5
    };
  }

  /**
   * Comprehensive Research Synthesis
   * Combine all sources for strategic insights
   */
  async conductComprehensiveResearch(primary_keyword: string, related_keywords: string[] = []): Promise<{
    primary_analysis: SemanticKeywordAnalysis;
    question_opportunities: AnswerThePublicResult | null;
    competitive_landscape: DataForSEOResult | null;
    user_conversations: RedditInsight[];
    strategic_recommendations: string[];
  }> {

    const [
      primary_analysis,
      question_data,
      competitive_data,
      reddit_insights
    ] = await Promise.all([
      this.analyzeKeywordSemantics(primary_keyword),
      this.getAnswerThePublicData(primary_keyword),
      this.getDataForSEOAnalysis(primary_keyword),
      this.getRedditInsights(primary_keyword)
    ]);

    // Generate strategic recommendations
    const { generateText } = await import('ai');
    const { anthropic } = await import('@ai-sdk/anthropic');

    const recommendations = await generateText({
      model: anthropic('claude-3-5-sonnet-20241022'),
      prompt: `Based on this comprehensive keyword research data:

Primary Analysis: ${JSON.stringify(primary_analysis, null, 2)}
Questions: ${JSON.stringify(question_data, null, 2)}
Competition: ${JSON.stringify(competitive_data, null, 2)}
User Discussions: ${JSON.stringify(reddit_insights.slice(0, 5), null, 2)}

Generate strategic content recommendations for Avolve.io:

1. Content opportunity prioritization
2. Topic cluster strategy
3. E-E-A-T demonstration approach
4. Competitive differentiation angles
5. User intent optimization tactics

Return as array of actionable strategy points.`
    });

    return {
      primary_analysis,
      question_opportunities: question_data,
      competitive_landscape: competitive_data,
      user_conversations: reddit_insights,
      strategic_recommendations: JSON.parse(recommendations.text)
    };
  }

  /**
   * Private helper methods
   */
  private calculateDifficulty(serpResults: any[]): number {
    // Simple difficulty calculation based on domain authority
    // Would be more sophisticated in production
    const strongDomains = serpResults.filter(result =>
      result.domain?.includes('stackoverflow') ||
      result.domain?.includes('github') ||
      result.domain?.includes('medium') ||
      result.domain?.includes('dev.to')
    );

    return Math.min(10, strongDomains.length * 2);
  }

  private extractSERPFeatures(serpResult: any): string[] {
    const features = [];
    if (serpResult?.featured_snippet) features.push('featured_snippet');
    if (serpResult?.people_also_ask) features.push('people_also_ask');
    if (serpResult?.related_searches) features.push('related_searches');
    if (serpResult?.video_carousel) features.push('video_carousel');
    return features;
  }

  private classifyUserIntent(text: string): RedditInsight['user_intent'] {
    const lowerText = text.toLowerCase();

    if (lowerText.includes('how') || lowerText.includes('?')) return 'question';
    if (lowerText.includes('problem') || lowerText.includes('issue') || lowerText.includes('error')) return 'problem';
    if (lowerText.includes('recommend') || lowerText.includes('suggest') || lowerText.includes('best')) return 'recommendation';
    if (lowerText.includes('vs') || lowerText.includes('compare') || lowerText.includes('between')) return 'comparison';
    if (lowerText.includes('frustrat') || lowerText.includes('annoying') || lowerText.includes('hate')) return 'frustration';

    return 'question';
  }

  private extractKeywords(text: string): string[] {
    // Simple keyword extraction - would use NLP in production
    const words = text.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
    const techKeywords = words.filter(word =>
      ['react', 'nextjs', 'typescript', 'node', 'api', 'database', 'javascript', 'css', 'html'].includes(word)
    );
    return [...new Set(techKeywords)];
  }

  private extractPainPoints(text: string): string[] {
    const painIndicators = ['problem', 'issue', 'error', 'difficult', 'confusing', 'slow', 'broken', 'doesnt work'];
    const sentences = text.split(/[.!?]/);

    return sentences.filter(sentence =>
      painIndicators.some(indicator => sentence.toLowerCase().includes(indicator))
    ).map(s => s.trim()).slice(0, 3);
  }

  /**
   * Mock data methods for when APIs aren't configured
   */
  private getMockAnswerThePublicData(keyword: string): AnswerThePublicResult {
    return {
      keyword,
      questions: {
        what: [`what is ${keyword}`, `what does ${keyword} do`],
        why: [`why use ${keyword}`, `why is ${keyword} important`],
        how: [`how to use ${keyword}`, `how does ${keyword} work`],
        when: [`when to use ${keyword}`],
        where: [`where to find ${keyword}`],
        who: [`who uses ${keyword}`],
        which: [`which ${keyword} is best`],
        will: [`will ${keyword} replace`]
      },
      prepositions: [`${keyword} for beginners`, `${keyword} with examples`],
      comparisons: [`${keyword} vs alternatives`],
      alphabetical: [`${keyword} advantages`, `${keyword} benefits`]
    };
  }

  private getMockDataForSEOData(keyword: string): DataForSEOResult {
    return {
      keyword,
      search_volume: Math.floor(Math.random() * 10000) + 1000,
      competition: Math.random(),
      cpc: Math.random() * 5,
      difficulty: Math.floor(Math.random() * 10) + 1,
      serp_features: ['people_also_ask', 'related_searches'],
      related_keywords: [`${keyword} tutorial`, `${keyword} guide`, `best ${keyword}`],
      competitor_analysis: [
        { domain: 'stackoverflow.com', rank: 1, url: '', title: '' },
        { domain: 'github.com', rank: 2, url: '', title: '' },
        { domain: 'dev.to', rank: 3, url: '', title: '' }
      ]
    };
  }
}

export const seoResearchAPI = new SEOResearchAPI();