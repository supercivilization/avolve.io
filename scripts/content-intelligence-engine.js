#!/usr/bin/env node

/**
 * Content Intelligence Engine for Avolve.io
 *
 * Transforms strategic intelligence into incredible SEO content assets
 * Identifies high-value content opportunities from ecosystem intelligence
 *
 * @version 1.0.0
 * @author Avolve AI-Native Platform
 * @date September 26, 2025
 */

const fs = require('fs');
const path = require('path');

class ContentIntelligenceEngine {
  constructor() {
    this.seoContentTypes = {
      'problem_solution': {
        template: 'How to Fix {problem} in {framework}',
        search_intent: 'transactional',
        target_stage: 'problem_aware',
        avolve_angle: 'position_as_solution'
      },
      'comparison': {
        template: '{framework_a} vs {framework_b}: Complete Developer Guide',
        search_intent: 'informational',
        target_stage: 'solution_aware',
        avolve_angle: 'competitive_positioning'
      },
      'tutorial_guide': {
        template: '{framework} {feature} Tutorial: Complete Guide for 2025',
        search_intent: 'informational',
        target_stage: 'learning',
        avolve_angle: 'educational_authority'
      },
      'trend_analysis': {
        template: '{technology} in 2025: What Developers Need to Know',
        search_intent: 'informational',
        target_stage: 'trend_aware',
        avolve_angle: 'thought_leadership'
      },
      'tool_review': {
        template: 'Best {category} Tools for {framework} Development',
        search_intent: 'commercial',
        target_stage: 'solution_shopping',
        avolve_angle: 'tool_recommendation'
      }
    };

    this.keywordPatterns = {
      'problem_keywords': [
        '{framework} not working',
        '{framework} error',
        'fix {framework}',
        '{framework} issue',
        '{framework} broken',
        'solve {framework} problem'
      ],
      'comparison_keywords': [
        '{framework_a} vs {framework_b}',
        '{framework_a} or {framework_b}',
        'best {category} framework',
        '{framework_a} alternative',
        'migrate from {framework_a} to {framework_b}'
      ],
      'tutorial_keywords': [
        '{framework} tutorial',
        'how to use {framework}',
        '{framework} guide',
        'learn {framework}',
        '{framework} examples',
        '{framework} getting started'
      ],
      'trend_keywords': [
        '{technology} 2025',
        'future of {technology}',
        '{technology} trends',
        'new {technology} features',
        '{technology} roadmap'
      ]
    };

    this.avolvePositioning = {
      'ai_native_advantages': [
        'Claude Code eliminates configuration complexity',
        'Automatic accessibility compliance',
        'AI-enhanced development speed',
        'Zero-config optimal performance',
        'Intelligent error prevention'
      ],
      'competitive_differentiators': [
        'Revolutionary AI-native workflow',
        'MCP tool generation',
        'Automatic code quality optimization',
        'Built-in performance monitoring',
        'Edge AI deployment optimization'
      ],
      'developer_benefits': [
        'Reduce development time by 60%',
        'Eliminate common configuration errors',
        'Automatic WCAG compliance',
        'AI-powered debugging assistance',
        'Seamless production deployment'
      ]
    };

    this.searchVolumeEstimates = {
      'nextjs': { monthly: 450000, difficulty: 'high', opportunity: 'medium' },
      'react': { monthly: 1200000, difficulty: 'very_high', opportunity: 'low' },
      'tailwind': { monthly: 300000, difficulty: 'medium', opportunity: 'high' },
      'typescript': { monthly: 800000, difficulty: 'high', opportunity: 'medium' },
      'sveltekit': { monthly: 45000, difficulty: 'medium', opportunity: 'high' },
      'vercel': { monthly: 120000, difficulty: 'medium', opportunity: 'high' },
      'supabase': { monthly: 80000, difficulty: 'low', opportunity: 'very_high' }
    };
  }

  /**
   * Transform strategic intelligence into content opportunities
   */
  async generateContentIntelligence(intelligenceFile, outputFile = null) {
    console.log('📝 Content Intelligence Engine');
    console.log('=' .repeat(50));

    try {
      // Read strategic intelligence data
      const intelligenceData = JSON.parse(fs.readFileSync(intelligenceFile, 'utf8'));
      console.log(`📁 Input: ${intelligenceFile}`);

      // Extract content opportunities
      const contentIntelligence = await this.extractContentOpportunities(intelligenceData);

      // Save content intelligence
      const outputPath = outputFile || intelligenceFile.replace('.json', '-content-intelligence.json');
      fs.writeFileSync(outputPath, JSON.stringify(contentIntelligence, null, 2));

      // Generate markdown content briefs
      const markdownPath = outputPath.replace('.json', '.md');
      const markdownBriefs = this.generateContentBriefs(contentIntelligence);
      fs.writeFileSync(markdownPath, markdownBriefs);

      console.log(`✅ Content intelligence complete`);
      console.log(`🎯 Content opportunities: ${contentIntelligence.content_opportunities.length}`);
      console.log(`📊 SEO keywords: ${contentIntelligence.seo_analysis.total_keywords}`);
      console.log(`📁 JSON output: ${outputPath}`);
      console.log(`📝 Briefs output: ${markdownPath}`);

      return contentIntelligence;

    } catch (error) {
      console.error('❌ Content intelligence generation failed:', error.message);
      throw error;
    }
  }

  /**
   * Extract content opportunities from strategic intelligence
   */
  async extractContentOpportunities(intelligenceData) {
    console.log('🔍 Extracting content opportunities...');

    const opportunities = [];

    // Process insights for content opportunities
    const insights = intelligenceData.contextual_insights || [];
    insights.forEach(insight => {
      const contentOps = this.identifyContentOpportunities(insight);
      opportunities.push(...contentOps);
    });

    // Process strategic synthesis for competitive content
    const synthesis = intelligenceData.strategic_synthesis || [];
    synthesis.forEach(pattern => {
      const competitiveContent = this.generateCompetitiveContent(pattern);
      if (competitiveContent) {
        opportunities.push(competitiveContent);
      }
    });

    // Process recommendations for educational content
    const recommendations = intelligenceData.prioritized_recommendations || [];
    recommendations.forEach(rec => {
      const educationalContent = this.generateEducationalContent(rec);
      if (educationalContent) {
        opportunities.push(educationalContent);
      }
    });

    // Analyze SEO potential
    const seoAnalysis = this.analyzeSEOPotential(opportunities);

    // Generate keyword strategies
    const keywordStrategies = this.generateKeywordStrategies(opportunities);

    // Create content calendar
    const contentCalendar = this.createContentCalendar(opportunities);

    return {
      generated_at: new Date().toISOString(),
      source_intelligence: intelligenceData.timestamp,
      content_opportunities: opportunities.sort((a, b) => b.seo_potential - a.seo_potential),
      seo_analysis: seoAnalysis,
      keyword_strategies: keywordStrategies,
      content_calendar: contentCalendar,
      competitive_analysis: this.analyzeCompetitiveContent(opportunities),
      avolve_positioning: this.generateAvolvePositioning(opportunities)
    };
  }

  /**
   * Identify content opportunities from individual insights
   */
  identifyContentOpportunities(insight) {
    const opportunities = [];

    // Problem-solution content from issues/bugs
    if (insight.insight_type === 'competitive_opportunity' ||
        insight.title.toLowerCase().includes('issue') ||
        insight.title.toLowerCase().includes('problem') ||
        insight.title.toLowerCase().includes('error')) {

      opportunities.push({
        type: 'problem_solution',
        title: this.generateContentTitle('problem_solution', insight),
        problem: this.extractProblem(insight),
        frameworks: insight.frameworks_mentioned,
        search_intent: 'transactional',
        seo_potential: this.calculateSEOPotential(insight, 'problem_solution'),
        content_outline: this.generateProblemSolutionOutline(insight),
        target_keywords: this.generateTargetKeywords(insight, 'problem_keywords'),
        avolve_angle: this.generateAvolveAngle(insight, 'problem_solution'),
        priority: this.calculateContentPriority(insight),
        estimated_traffic: this.estimateTrafficPotential(insight.frameworks_mentioned),
        source_insight: insight.id
      });
    }

    // Tutorial content from feature discussions
    if (insight.title.toLowerCase().includes('tutorial') ||
        insight.title.toLowerCase().includes('how to') ||
        insight.title.toLowerCase().includes('guide')) {

      opportunities.push({
        type: 'tutorial_guide',
        title: this.generateContentTitle('tutorial_guide', insight),
        topic: this.extractTutorialTopic(insight),
        frameworks: insight.frameworks_mentioned,
        search_intent: 'informational',
        seo_potential: this.calculateSEOPotential(insight, 'tutorial_guide'),
        content_outline: this.generateTutorialOutline(insight),
        target_keywords: this.generateTargetKeywords(insight, 'tutorial_keywords'),
        avolve_angle: this.generateAvolveAngle(insight, 'tutorial_guide'),
        priority: this.calculateContentPriority(insight),
        estimated_traffic: this.estimateTrafficPotential(insight.frameworks_mentioned),
        source_insight: insight.id
      });
    }

    // Trend analysis from critical trends
    if (insight.trend_indicator === 'critical_trend' || insight.trend_indicator === 'significant_trend') {
      opportunities.push({
        type: 'trend_analysis',
        title: this.generateContentTitle('trend_analysis', insight),
        trend: insight.frameworks_mentioned.join(', '),
        frameworks: insight.frameworks_mentioned,
        search_intent: 'informational',
        seo_potential: this.calculateSEOPotential(insight, 'trend_analysis'),
        content_outline: this.generateTrendAnalysisOutline(insight),
        target_keywords: this.generateTargetKeywords(insight, 'trend_keywords'),
        avolve_angle: this.generateAvolveAngle(insight, 'trend_analysis'),
        priority: 'high', // Trends are always high priority
        estimated_traffic: this.estimateTrafficPotential(insight.frameworks_mentioned),
        source_insight: insight.id
      });
    }

    return opportunities.filter(op => op.seo_potential > 30); // Filter low-potential content
  }

  /**
   * Generate competitive content opportunities
   */
  generateCompetitiveContent(synthesis) {
    if (synthesis.type !== 'competitive_threat') return null;

    return {
      type: 'comparison',
      title: `Avolve.io vs ${synthesis.competitor}: AI-Native Development Comparison`,
      competitor: synthesis.competitor,
      frameworks: [synthesis.competitor, 'avolve'],
      search_intent: 'commercial',
      seo_potential: 85, // High potential for competitive content
      content_outline: this.generateCompetitiveOutline(synthesis),
      target_keywords: [
        `avolve vs ${synthesis.competitor}`,
        `${synthesis.competitor} alternative`,
        'ai native development platform',
        `best ${synthesis.competitor} alternative`
      ],
      avolve_angle: 'competitive_superiority',
      priority: synthesis.threat_level === 'critical' ? 'high' : 'medium',
      estimated_traffic: this.estimateTrafficPotential([synthesis.competitor]),
      source_synthesis: synthesis.type
    };
  }

  /**
   * Generate educational content from recommendations
   */
  generateEducationalContent(recommendation) {
    if (recommendation.type !== 'technology_adaptation') return null;

    const framework = recommendation.frameworks_affected[0];

    return {
      type: 'tool_review',
      title: `Best ${framework} Development Tools and Practices for 2025`,
      category: 'development_tools',
      frameworks: recommendation.frameworks_affected,
      search_intent: 'commercial',
      seo_potential: this.calculateSEOPotential({ frameworks_mentioned: [framework] }, 'tool_review'),
      content_outline: this.generateToolReviewOutline(recommendation),
      target_keywords: [
        `best ${framework} tools`,
        `${framework} development setup`,
        `${framework} productivity tools`,
        `${framework} developer experience`
      ],
      avolve_angle: 'tool_ecosystem_leader',
      priority: recommendation.priority,
      estimated_traffic: this.estimateTrafficPotential([framework]),
      source_recommendation: recommendation.title
    };
  }

  /**
   * Generate content titles based on type and data
   */
  generateContentTitle(type, insight) {
    const templates = {
      'problem_solution': `How to Fix ${this.extractProblem(insight)} in ${insight.frameworks_mentioned[0]}`,
      'tutorial_guide': `Complete ${insight.frameworks_mentioned[0]} ${this.extractTutorialTopic(insight)} Guide for 2025`,
      'trend_analysis': `${insight.frameworks_mentioned[0]} in 2025: What Developers Need to Know`,
      'comparison': `${insight.frameworks_mentioned[0]} vs Alternatives: Complete Developer Comparison`
    };

    return templates[type] || `${insight.frameworks_mentioned[0]} Development Guide`;
  }

  /**
   * Extract problem from insight for problem-solution content
   */
  extractProblem(insight) {
    const title = insight.title.toLowerCase();

    if (title.includes('error')) return 'Common Errors';
    if (title.includes('performance')) return 'Performance Issues';
    if (title.includes('logging')) return 'Logging Problems';
    if (title.includes('broken')) return 'Configuration Issues';
    if (title.includes('deployment')) return 'Deployment Problems';

    return 'Development Issues';
  }

  /**
   * Extract tutorial topic from insight
   */
  extractTutorialTopic(insight) {
    const title = insight.title.toLowerCase();

    if (title.includes('server components')) return 'Server Components';
    if (title.includes('routing')) return 'Routing';
    if (title.includes('authentication')) return 'Authentication';
    if (title.includes('database')) return 'Database Integration';
    if (title.includes('deployment')) return 'Deployment';

    return 'Development';
  }

  /**
   * Calculate SEO potential score
   */
  calculateSEOPotential(insight, contentType) {
    let score = 0;

    // Framework search volume contribution
    const frameworks = insight.frameworks_mentioned || [];
    frameworks.forEach(framework => {
      const searchData = this.searchVolumeEstimates[framework.toLowerCase()];
      if (searchData) {
        score += searchData.opportunity === 'very_high' ? 30 :
                 searchData.opportunity === 'high' ? 25 :
                 searchData.opportunity === 'medium' ? 15 : 10;
      }
    });

    // Content type multiplier
    const typeMultipliers = {
      'problem_solution': 1.3, // High conversion potential
      'comparison': 1.2,
      'tutorial_guide': 1.1,
      'trend_analysis': 1.0,
      'tool_review': 1.25
    };

    score *= (typeMultipliers[contentType] || 1.0);

    // Engagement boost
    if (insight.engagement_metrics?.engagement_score > 30) {
      score += 15;
    }

    // Relevance boost
    if (insight.avolve_relevance > 70) {
      score += 20;
    }

    return Math.min(Math.round(score), 100);
  }

  /**
   * Generate target keywords for content
   */
  generateTargetKeywords(insight, keywordType) {
    const patterns = this.keywordPatterns[keywordType] || [];
    const keywords = [];

    insight.frameworks_mentioned.forEach(framework => {
      patterns.forEach(pattern => {
        const keyword = pattern
          .replace('{framework}', framework)
          .replace('{technology}', framework)
          .replace('{category}', this.getFrameworkCategory(framework));
        keywords.push(keyword);
      });
    });

    return keywords.slice(0, 10); // Top 10 keywords
  }

  /**
   * Generate Avolve positioning angle
   */
  generateAvolveAngle(insight, contentType) {
    const angles = {
      'problem_solution': `Show how Claude Code prevents ${this.extractProblem(insight)} through AI-native development`,
      'tutorial_guide': `Demonstrate superior developer experience with Avolve.io AI-enhanced workflow`,
      'trend_analysis': `Position Avolve.io as leader in ${insight.frameworks_mentioned[0]} AI-native adoption`,
      'comparison': `Highlight Avolve.io competitive advantages in AI-native development`
    };

    return {
      positioning: angles[contentType],
      key_differentiators: this.avolvePositioning.competitive_differentiators.slice(0, 3),
      developer_benefits: this.avolvePositioning.developer_benefits.slice(0, 3),
      call_to_action: 'Try Avolve.io AI-Native Development Platform'
    };
  }

  /**
   * Generate content outlines
   */
  generateProblemSolutionOutline(insight) {
    const problem = this.extractProblem(insight);
    const framework = insight.frameworks_mentioned[0];

    return {
      sections: [
        {
          title: `Understanding ${problem} in ${framework}`,
          content: 'Root causes and common scenarios'
        },
        {
          title: 'Traditional Solutions vs AI-Native Approach',
          content: 'Compare manual fixes with Avolve.io automated solutions'
        },
        {
          title: 'Step-by-Step Solution with Avolve.io',
          content: 'Detailed implementation using Claude Code'
        },
        {
          title: 'Prevention and Best Practices',
          content: 'How Avolve.io prevents these issues automatically'
        },
        {
          title: 'Performance Impact and Benefits',
          content: 'Measurable improvements with AI-native development'
        }
      ],
      estimated_length: '2500-3500 words',
      code_examples: true,
      screenshots: true,
      interactive_demos: true
    };
  }

  generateTutorialOutline(insight) {
    const topic = this.extractTutorialTopic(insight);
    const framework = insight.frameworks_mentioned[0];

    return {
      sections: [
        {
          title: `${topic} Fundamentals in ${framework}`,
          content: 'Core concepts and principles'
        },
        {
          title: 'Traditional Implementation Approach',
          content: 'Standard manual development process'
        },
        {
          title: 'AI-Native Implementation with Avolve.io',
          content: 'Accelerated development using Claude Code'
        },
        {
          title: 'Advanced Patterns and Optimization',
          content: 'Expert-level techniques and performance optimization'
        },
        {
          title: 'Production Deployment and Monitoring',
          content: 'Going live with confidence and monitoring'
        }
      ],
      estimated_length: '3500-5000 words',
      code_examples: true,
      interactive_tutorial: true,
      video_companion: true
    };
  }

  generateTrendAnalysisOutline(synthesis) {
    const trend = synthesis.frameworks_mentioned?.[0] || 'technology';

    return {
      sections: [
        {
          title: `${trend} Evolution and Current State`,
          content: 'Historical context and present landscape'
        },
        {
          title: 'Key Trends and Developments in 2025',
          content: 'What\'s changing and why it matters'
        },
        {
          title: 'Impact on Developer Experience',
          content: 'How changes affect daily development work'
        },
        {
          title: 'AI-Native Development Advantages',
          content: 'How Avolve.io leverages trends for superior outcomes'
        },
        {
          title: 'Future Predictions and Recommendations',
          content: 'What to expect and how to prepare'
        }
      ],
      estimated_length: '2000-3000 words',
      trend_charts: true,
      expert_interviews: false,
      data_analysis: true
    };
  }

  generateCompetitiveOutline(synthesis) {
    return {
      sections: [
        {
          title: `${synthesis.competitor} vs Avolve.io: Core Differences`,
          content: 'Fundamental architectural and philosophical differences'
        },
        {
          title: 'Development Experience Comparison',
          content: 'Side-by-side developer workflow analysis'
        },
        {
          title: 'Performance and Scalability Analysis',
          content: 'Benchmarks and real-world performance data'
        },
        {
          title: 'AI-Native Advantages',
          content: 'Unique capabilities only possible with Avolve.io'
        },
        {
          title: 'Migration Path and Getting Started',
          content: 'How to transition from competitor to Avolve.io'
        }
      ],
      estimated_length: '4000-5500 words',
      comparison_charts: true,
      performance_benchmarks: true,
      migration_guide: true
    };
  }

  generateToolReviewOutline(recommendation) {
    const framework = recommendation.frameworks_affected[0];

    return {
      sections: [
        {
          title: `Essential ${framework} Development Tools Overview`,
          content: 'Comprehensive landscape of available tools'
        },
        {
          title: 'Traditional Tool Setup vs AI-Native Approach',
          content: 'Compare manual configuration with Avolve.io automation'
        },
        {
          title: 'Top ${framework} Tools and Integration',
          content: 'Best tools and how Avolve.io enhances them'
        },
        {
          title: 'Performance and Productivity Analysis',
          content: 'Measurable impact on development speed and quality'
        },
        {
          title: 'Recommended Avolve.io Tool Stack',
          content: 'Optimal ${framework} development setup with Avolve.io'
        }
      ],
      estimated_length: '3000-4000 words',
      tool_comparisons: true,
      setup_guides: true,
      performance_metrics: true
    };
  }

  /**
   * Analyze SEO potential across all opportunities
   */
  analyzeSEOPotential(opportunities) {
    const keywordAnalysis = {};
    let totalKeywords = 0;

    opportunities.forEach(opp => {
      opp.target_keywords.forEach(keyword => {
        if (!keywordAnalysis[keyword]) {
          keywordAnalysis[keyword] = {
            keyword: keyword,
            opportunities: 0,
            avg_seo_potential: 0,
            content_types: []
          };
        }
        keywordAnalysis[keyword].opportunities++;
        keywordAnalysis[keyword].avg_seo_potential += opp.seo_potential;
        keywordAnalysis[keyword].content_types.push(opp.type);
        totalKeywords++;
      });
    });

    // Calculate averages
    Object.values(keywordAnalysis).forEach(analysis => {
      analysis.avg_seo_potential = Math.round(analysis.avg_seo_potential / analysis.opportunities);
      analysis.content_types = [...new Set(analysis.content_types)];
    });

    return {
      total_keywords: totalKeywords,
      unique_keywords: Object.keys(keywordAnalysis).length,
      high_potential_keywords: Object.values(keywordAnalysis)
        .filter(k => k.avg_seo_potential > 70)
        .sort((a, b) => b.avg_seo_potential - a.avg_seo_potential)
        .slice(0, 20),
      keyword_distribution: this.analyzeKeywordDistribution(opportunities),
      competitive_gaps: this.identifyCompetitiveGaps(opportunities)
    };
  }

  /**
   * Generate keyword strategies
   */
  generateKeywordStrategies(opportunities) {
    const strategies = [];

    // High-volume, low-competition strategy
    const highVolumeOpps = opportunities.filter(opp =>
      opp.estimated_traffic > 1000 && opp.seo_potential > 60
    );

    if (highVolumeOpps.length > 0) {
      strategies.push({
        strategy: 'high_volume_capture',
        description: 'Target high-traffic keywords with strong SEO potential',
        opportunities: highVolumeOpps.slice(0, 10),
        expected_impact: 'High organic traffic growth',
        timeline: '3-6 months'
      });
    }

    // Problem-solution strategy
    const problemSolutionOpps = opportunities.filter(opp => opp.type === 'problem_solution');

    if (problemSolutionOpps.length > 0) {
      strategies.push({
        strategy: 'problem_solution_capture',
        description: 'Capture developers searching for specific solutions',
        opportunities: problemSolutionOpps.slice(0, 8),
        expected_impact: 'High conversion rate from search',
        timeline: '1-3 months'
      });
    }

    // Competitive displacement strategy
    const competitiveOpps = opportunities.filter(opp => opp.type === 'comparison');

    if (competitiveOpps.length > 0) {
      strategies.push({
        strategy: 'competitive_displacement',
        description: 'Target users considering alternatives to competitors',
        opportunities: competitiveOpps,
        expected_impact: 'Direct competitive advantage',
        timeline: '2-4 months'
      });
    }

    return strategies;
  }

  /**
   * Create content calendar
   */
  createContentCalendar(opportunities) {
    const sortedOpps = opportunities
      .sort((a, b) => this.calculateContentPriority(b) - this.calculateContentPriority(a))
      .slice(0, 12); // Next 12 pieces of content

    const calendar = [];
    let currentDate = new Date();

    sortedOpps.forEach((opp, index) => {
      const publishDate = new Date(currentDate);
      publishDate.setDate(publishDate.getDate() + (index * 7)); // Weekly publishing

      calendar.push({
        week: index + 1,
        publish_date: publishDate.toISOString().split('T')[0],
        content: {
          title: opp.title,
          type: opp.type,
          priority: opp.priority,
          estimated_traffic: opp.estimated_traffic,
          seo_potential: opp.seo_potential
        },
        production_timeline: {
          research: 2, // days
          writing: 3,
          review: 1,
          publication: 1
        }
      });
    });

    return {
      next_12_weeks: calendar,
      content_themes: this.extractContentThemes(opportunities),
      seasonal_opportunities: this.identifySeasonalOpportunities(opportunities)
    };
  }

  /**
   * Generate content briefs in markdown format
   */
  generateContentBriefs(contentIntelligence) {
    let markdown = `# Content Intelligence Briefs for Avolve.io\n\n`;
    markdown += `Generated: ${contentIntelligence.generated_at}\n`;
    markdown += `Total Opportunities: ${contentIntelligence.content_opportunities.length}\n\n`;

    markdown += `## Executive Summary\n\n`;
    markdown += `- **${contentIntelligence.seo_analysis.total_keywords}** target keywords identified\n`;
    markdown += `- **${contentIntelligence.seo_analysis.high_potential_keywords.length}** high-potential keywords\n`;
    markdown += `- **${contentIntelligence.keyword_strategies.length}** keyword strategies recommended\n\n`;

    markdown += `## Top Content Opportunities\n\n`;

    contentIntelligence.content_opportunities.slice(0, 10).forEach((opp, index) => {
      markdown += `### ${index + 1}. ${opp.title}\n\n`;
      markdown += `**Type**: ${opp.type}\n`;
      markdown += `**SEO Potential**: ${opp.seo_potential}/100\n`;
      markdown += `**Priority**: ${opp.priority}\n`;
      markdown += `**Estimated Traffic**: ${opp.estimated_traffic || 'TBD'}\n`;
      markdown += `**Target Keywords**: ${opp.target_keywords.slice(0, 5).join(', ')}\n\n`;

      if (opp.avolve_angle) {
        markdown += `**Avolve Positioning**: ${opp.avolve_angle.positioning}\n\n`;
      }

      if (opp.content_outline) {
        markdown += `**Content Outline**:\n`;
        opp.content_outline.sections.forEach(section => {
          markdown += `- ${section.title}: ${section.content}\n`;
        });
        markdown += `\n`;
      }

      markdown += `---\n\n`;
    });

    return markdown;
  }

  // Helper methods
  getFrameworkCategory(framework) {
    const categories = {
      'next.js': 'react framework',
      'react': 'library',
      'tailwind': 'css framework',
      'typescript': 'programming language',
      'sveltekit': 'svelte framework',
      'supabase': 'database platform'
    };
    return categories[framework] || 'development tool';
  }

  calculateContentPriority(insight) {
    const priorityScores = { high: 3, medium: 2, low: 1 };
    const baseScore = priorityScores[insight.priority] || 1;

    const engagementBoost = (insight.engagement_score || 0) / 100;
    const relevanceBoost = (insight.avolve_relevance || 0) / 100;

    return baseScore + engagementBoost + relevanceBoost;
  }

  estimateTrafficPotential(frameworks) {
    if (!frameworks || frameworks.length === 0) return 500;

    const totalVolume = frameworks.reduce((sum, framework) => {
      const searchData = this.searchVolumeEstimates[framework.toLowerCase()];
      return sum + (searchData ? searchData.monthly * 0.02 : 500); // 2% capture rate
    }, 0);

    return Math.round(totalVolume / frameworks.length);
  }

  analyzeKeywordDistribution(opportunities) {
    const distribution = {};

    opportunities.forEach(opp => {
      if (!distribution[opp.type]) {
        distribution[opp.type] = { count: 0, avg_seo_potential: 0 };
      }
      distribution[opp.type].count++;
      distribution[opp.type].avg_seo_potential += opp.seo_potential;
    });

    Object.values(distribution).forEach(dist => {
      dist.avg_seo_potential = Math.round(dist.avg_seo_potential / dist.count);
    });

    return distribution;
  }

  identifyCompetitiveGaps(opportunities) {
    const gaps = [];

    // Find frameworks with high search volume but low content coverage
    Object.entries(this.searchVolumeEstimates).forEach(([framework, data]) => {
      const hasContent = opportunities.some(opp =>
        opp.frameworks.includes(framework)
      );

      if (!hasContent && data.opportunity === 'high') {
        gaps.push({
          framework: framework,
          opportunity_level: data.opportunity,
          monthly_searches: data.monthly,
          content_gap: 'No content targeting this framework'
        });
      }
    });

    return gaps.slice(0, 5);
  }

  extractContentThemes(opportunities) {
    const themes = {};

    opportunities.forEach(opp => {
      opp.frameworks.forEach(framework => {
        if (!themes[framework]) {
          themes[framework] = { count: 0, content_types: new Set() };
        }
        themes[framework].count++;
        themes[framework].content_types.add(opp.type);
      });
    });

    return Object.entries(themes)
      .map(([framework, data]) => ({
        framework,
        content_count: data.count,
        content_variety: Array.from(data.content_types)
      }))
      .sort((a, b) => b.content_count - a.content_count)
      .slice(0, 8);
  }

  identifySeasonalOpportunities(opportunities) {
    // This would integrate with Google Trends API in production
    return [
      {
        season: 'Q1 2025',
        themes: ['New Year tech resolutions', 'Framework updates'],
        recommended_content: opportunities.filter(opp => opp.type === 'trend_analysis').slice(0, 3)
      }
    ];
  }

  analyzeCompetitiveContent(opportunities) {
    const competitive = opportunities.filter(opp => opp.type === 'comparison');

    return {
      total_competitive_opportunities: competitive.length,
      primary_competitors: [...new Set(competitive.map(opp => opp.competitor))],
      competitive_content_calendar: competitive.slice(0, 6)
    };
  }

  generateAvolvePositioning(opportunities) {
    return {
      primary_differentiators: this.avolvePositioning.competitive_differentiators,
      content_angles: opportunities.map(opp => opp.avolve_angle?.positioning).filter(Boolean).slice(0, 10),
      key_messages: this.avolvePositioning.ai_native_advantages
    };
  }

  /**
   * Test content intelligence generation
   */
  async testContentIntelligence() {
    console.log('🧪 Testing Content Intelligence Engine');
    console.log('=' .repeat(50));

    // Sample intelligence data
    const sampleIntelligence = {
      timestamp: new Date().toISOString(),
      contextual_insights: [
        {
          id: 'test1',
          title: 'Next.js 15 App Router logging issues',
          frameworks_mentioned: ['next.js'],
          insight_type: 'competitive_opportunity',
          avolve_relevance: 85,
          engagement_metrics: { engagement_score: 45 },
          trend_indicator: 'critical_trend'
        },
        {
          id: 'test2',
          title: 'React 19 Server Components tutorial needed',
          frameworks_mentioned: ['react'],
          insight_type: 'educational_need',
          avolve_relevance: 75,
          engagement_metrics: { engagement_score: 35 },
          trend_indicator: 'significant_trend'
        }
      ],
      strategic_synthesis: [
        {
          type: 'competitive_threat',
          competitor: 'sveltekit',
          threat_level: 'high'
        }
      ],
      prioritized_recommendations: [
        {
          type: 'technology_adaptation',
          title: 'Respond to Next.js technology shift',
          frameworks_affected: ['next.js'],
          priority: 'high'
        }
      ]
    };

    const testFile = '/tmp/test-intelligence-data.json';
    fs.writeFileSync(testFile, JSON.stringify(sampleIntelligence, null, 2));

    const result = await this.generateContentIntelligence(testFile);

    console.log(`\n✅ Content intelligence test complete`);
    console.log(`🎯 Content opportunities: ${result.content_opportunities.length}`);
    console.log(`📊 SEO keywords: ${result.seo_analysis.total_keywords}`);
    console.log(`📈 Keyword strategies: ${result.keyword_strategies.length}`);

    // Show sample opportunity
    if (result.content_opportunities.length > 0) {
      const sample = result.content_opportunities[0];
      console.log(`\n📝 Sample Content Opportunity:`);
      console.log(`   Title: ${sample.title}`);
      console.log(`   Type: ${sample.type}`);
      console.log(`   SEO Potential: ${sample.seo_potential}/100`);
      console.log(`   Priority: ${sample.priority}`);
      console.log(`   Keywords: [${sample.target_keywords.slice(0, 3).join(', ')}]`);
    }

    return result;
  }
}

// CLI interface
async function main() {
  const engine = new ContentIntelligenceEngine();

  const command = process.argv[2] || 'test';

  switch (command) {
    case 'test':
      await engine.testContentIntelligence();
      break;

    case 'generate':
      const inputFile = process.argv[3];
      const outputFile = process.argv[4];

      if (inputFile && fs.existsSync(inputFile)) {
        await engine.generateContentIntelligence(inputFile, outputFile);
      } else {
        console.log('Usage: node content-intelligence-engine.js generate <intelligence-file.json> [output-file.json]');
      }
      break;

    default:
      console.log(`
Content Intelligence Engine Commands:

  test     - Test content intelligence with sample data
  generate - Generate content intelligence from strategic intelligence

Examples:
  node content-intelligence-engine.js test
  node content-intelligence-engine.js generate strategic-intelligence.json content-intelligence.json
      `);
  }
}

if (require.main === module) {
  main();
}

module.exports = { ContentIntelligenceEngine };