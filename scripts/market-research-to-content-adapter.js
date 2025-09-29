#!/usr/bin/env node

/**
 * Market Research to Content Intelligence Adapter
 *
 * Transforms market research data into the format expected by
 * the content intelligence engine for SEO content generation
 *
 * @version 1.0.0
 * @author Avolve AI-Native Platform
 * @date September 26, 2025
 */

const fs = require('fs');
const path = require('path');

class MarketResearchToContentAdapter {
  constructor() {
    this.modernTechStack = [
      'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Supabase',
      'Claude Code', 'AI-native development', 'Vercel AI SDK', 'shadcn/ui',
      'Turborepo', 'Edge Functions', 'Server Components', 'Streaming UI'
    ];
  }

  /**
   * Transform market research data into content intelligence format
   */
  async transformMarketResearchToContentIntelligence(marketResearchFile, outputFile) {
    console.log('🔄 Market Research to Content Intelligence Adapter');
    console.log('=' .repeat(60));
    console.log(`📁 Input: ${marketResearchFile}`);

    // Read market research data
    const marketResearch = JSON.parse(fs.readFileSync(marketResearchFile, 'utf8'));

    // Transform into content intelligence format
    const contentIntelligenceData = this.transformToContentFormat(marketResearch);

    // Save transformed data
    const outputPath = outputFile || marketResearchFile.replace('.json', '-content-ready.json');
    fs.writeFileSync(outputPath, JSON.stringify(contentIntelligenceData, null, 2));

    console.log(`📁 Output: ${outputPath}`);
    console.log(`🔍 Contextual insights generated: ${contentIntelligenceData.contextual_insights.length}`);
    console.log(`🎯 Content opportunities identified: ${this.countContentOpportunities(contentIntelligenceData)}`);

    return { contentIntelligenceData, outputPath };
  }

  /**
   * Transform market research structure to content intelligence structure
   */
  transformToContentFormat(marketResearch) {
    const contextualInsights = [];

    // Transform customer segment insights
    Object.entries(marketResearch.segment_validation.validated_segments).forEach(([segment, data]) => {
      // Create insights from customer problems
      data.hypothesis.problems.forEach((problem, index) => {
        contextualInsights.push({
          id: `${segment}_problem_${index}`,
          title: `${this.segmentDisplayName(segment)} Problem: ${problem}`,
          description: `Market research shows ${segment} struggle with: ${problem}`,
          frameworks_mentioned: this.inferFrameworksFromProblem(problem),
          insight_type: 'competitive_opportunity', // Use the expected insight type
          trend_indicator: data.validation_status === 'strong' ? 'critical_trend' : 'emerging_trend',
          audience_segment: segment,
          confidence_score: data.confidence_score,
          strategic_impact: 'high',
          content_angle: this.generateContentAngle(problem, segment),
          search_intent: this.inferSearchIntent(problem),
          buyer_journey_stage: 'problem_aware',
          potential_keywords: this.generateKeywords(problem, segment),
          competitive_opportunity: this.assessCompetitiveOpportunity(problem),
          avolve_positioning: this.generateAvolvePositioning(problem, segment)
        });
      });

      // Create insights from buying triggers
      data.hypothesis.buying_triggers.forEach((trigger, index) => {
        contextualInsights.push({
          id: `${segment}_trigger_${index}`,
          title: `${this.segmentDisplayName(segment)} Buying Trigger: ${trigger}`,
          description: `${segment} are most likely to buy when: ${trigger}`,
          frameworks_mentioned: this.inferFrameworksFromTrigger(trigger),
          insight_type: 'buying_trigger',
          trend_indicator: 'actionable_signal',
          audience_segment: segment,
          confidence_score: data.confidence_score,
          strategic_impact: 'high',
          content_angle: this.generateTriggerContentAngle(trigger, segment),
          search_intent: 'commercial_intent',
          buyer_journey_stage: 'solution_aware',
          potential_keywords: this.generateTriggerKeywords(trigger, segment),
          competitive_opportunity: 'high',
          timing_sensitivity: this.assessTimingSensitivity(trigger)
        });
      });
    });

    // Transform market signals into content opportunities
    Object.values(marketResearch.market_signals.signals_by_category).forEach(signals => {
      signals.forEach((signal, index) => {
        contextualInsights.push({
          id: `market_signal_${index}`,
          title: `Market Signal Problem: ${signal.content}`, // Add 'Problem' to trigger content generation
          description: `Signal detected from ${signal.source}: ${signal.content}`,
          frameworks_mentioned: this.extractFrameworksFromContent(signal.content),
          insight_type: 'competitive_opportunity', // Use the expected insight type
          trend_indicator: signal.strength > 0.8 ? 'critical_trend' : 'emerging_trend',
          audience_segment: signal.customer_segment,
          confidence_score: signal.strength,
          strategic_impact: signal.strength > 0.7 ? 'high' : 'medium',
          content_angle: this.generateSignalContentAngle(signal),
          search_intent: this.inferSearchIntentFromSignal(signal),
          buyer_journey_stage: this.mapSignalToBuyerStage(signal.signal_type),
          potential_keywords: this.generateSignalKeywords(signal),
          source_platform: this.extractPlatform(signal.source)
        });
      });
    });

    // Transform competitive intelligence into content opportunities
    Object.entries(marketResearch.competitive_intelligence.competitor_analysis).forEach(([competitor, analysis]) => {
      contextualInsights.push({
        id: `competitor_${competitor.toLowerCase().replace(/\s+/g, '_')}`,
        title: `Competitive Analysis: ${competitor}`,
        description: `${competitor} targets ${analysis.target_customers.join(', ')} with ${analysis.positioning}`,
        frameworks_mentioned: this.inferFrameworksFromCompetitor(competitor),
        insight_type: 'competitive_intelligence',
        trend_indicator: 'market_baseline',
        competitor: competitor,
        competitive_positioning: analysis.positioning,
        target_customers: analysis.target_customers,
        strategic_impact: 'medium',
        content_angle: this.generateCompetitiveContentAngle(competitor, analysis),
        search_intent: 'commercial_investigation',
        buyer_journey_stage: 'solution_shopping',
        potential_keywords: this.generateCompetitorKeywords(competitor, analysis),
        differentiation_opportunity: this.assessDifferentiation(competitor, analysis)
      });
    });

    // Create strategic synthesis from recommendations
    const strategicSynthesis = marketResearch.strategic_recommendations.map((rec, index) => ({
      id: `strategic_${index}`,
      type: rec.priority === 'high' ? 'critical_action' : 'strategic_opportunity',
      title: rec.recommendation,
      description: rec.rationale,
      priority: rec.priority,
      implementation: rec.implementation,
      confidence_score: 0.9,
      strategic_impact: rec.priority === 'high' ? 'high' : 'medium'
    }));

    return {
      timestamp: new Date().toISOString(),
      research_method: 'intelligence_based_market_research',
      contextual_insights: contextualInsights,
      strategic_synthesis: strategicSynthesis,
      prioritized_recommendations: marketResearch.strategic_recommendations,
      market_intelligence: {
        primary_target_segment: marketResearch.segment_validation.primary_target_segment[0],
        validated_segments: Object.keys(marketResearch.segment_validation.validated_segments),
        buying_triggers: marketResearch.buying_behavior.buying_triggers,
        decision_makers: marketResearch.buying_behavior.decision_makers,
        market_opportunity_score: marketResearch.market_opportunity.opportunity_score
      }
    };
  }

  // Helper methods for transformation
  segmentDisplayName(segment) {
    const names = {
      'technical_founders': 'Technical Founders',
      'non_technical_founders': 'Non-Technical Founders',
      'growing_companies': 'Growing Companies',
      'agencies_consultancies': 'Agencies & Consultancies'
    };
    return names[segment] || segment;
  }

  inferFrameworksFromProblem(problem) {
    const frameworks = [];
    if (problem.toLowerCase().includes('fast') || problem.toLowerCase().includes('speed')) {
      frameworks.push('Next.js', 'Vercel');
    }
    if (problem.toLowerCase().includes('resource') || problem.toLowerCase().includes('development')) {
      frameworks.push('Claude Code', 'AI-native development');
    }
    if (problem.toLowerCase().includes('business')) {
      frameworks.push('Vercel AI SDK', 'Supabase');
    }
    return frameworks.length > 0 ? frameworks : ['Next.js'];
  }

  generateContentAngle(problem, segment) {
    const angles = {
      'Need to move fast': `How ${this.segmentDisplayName(segment)} Can Ship Products 10x Faster`,
      'Limited development resources': `Maximizing Development Output with Minimal Resources`,
      'Want to focus on business': `Let AI Handle Development While You Build Your Business`,
      'Finding technical co-founder': `Build Your MVP Without a Technical Co-Founder`,
      'Expensive development': `Cut Development Costs by 80% with AI-Native Tools`,
      'Development bottlenecks': `Eliminate Development Bottlenecks That Kill Growth`,
      'Developer hiring challenges': `Scale Your Team Without Hiring More Developers`
    };
    return angles[problem] || `Solving ${problem} for ${this.segmentDisplayName(segment)}`;
  }

  generateKeywords(problem, segment) {
    const baseKeywords = [];

    if (problem.toLowerCase().includes('fast')) {
      baseKeywords.push('fast development', 'rapid prototyping', 'quick MVP', 'speed up development');
    }
    if (problem.toLowerCase().includes('resource')) {
      baseKeywords.push('small development team', 'limited resources', 'efficient development');
    }
    if (problem.toLowerCase().includes('expensive')) {
      baseKeywords.push('cheap development', 'affordable MVP', 'cost-effective development');
    }
    if (problem.toLowerCase().includes('hiring')) {
      baseKeywords.push('developer shortage', 'hiring developers', 'development team scaling');
    }

    // Add segment-specific keywords
    const segmentKeywords = {
      'technical_founders': ['founder development', 'startup MVP', 'technical founder'],
      'non_technical_founders': ['non technical founder', 'no code development', 'MVP without coding'],
      'growing_companies': ['scaling development', 'enterprise development', 'team productivity'],
      'agencies_consultancies': ['agency development', 'client projects', 'freelance development']
    };

    return [...baseKeywords, ...(segmentKeywords[segment] || [])];
  }

  inferSearchIntent(problem) {
    if (problem.toLowerCase().includes('expensive') || problem.toLowerCase().includes('cost')) {
      return 'commercial_intent';
    }
    if (problem.toLowerCase().includes('how') || problem.toLowerCase().includes('finding')) {
      return 'informational';
    }
    return 'problem_solving';
  }

  generateAvolvePositioning(problem, segment) {
    const positioning = {
      'Need to move fast': 'Avolve AI-native platform ships products 10x faster than traditional development',
      'Limited development resources': 'One developer with Avolve = 10 traditional developers',
      'Expensive development': 'Avolve reduces development costs by 80% through AI automation',
      'Developer hiring challenges': 'Why hire when AI can code? Avolve eliminates hiring bottlenecks'
    };
    return positioning[problem] || `Avolve solves ${problem} for ${this.segmentDisplayName(segment)}`;
  }

  // Additional helper methods
  inferFrameworksFromTrigger(trigger) {
    return ['Next.js', 'Claude Code', 'AI-native development'];
  }

  generateTriggerContentAngle(trigger, segment) {
    return `Perfect Timing: How to Launch After ${trigger}`;
  }

  generateTriggerKeywords(trigger, segment) {
    const keywords = [`post ${trigger.toLowerCase()}`, `after ${trigger.toLowerCase()}`];
    return keywords;
  }

  assessTimingSensitivity(trigger) {
    const sensitive = ['Product launch deadline', 'Funding round completed'];
    return sensitive.includes(trigger) ? 'high' : 'medium';
  }

  extractFrameworksFromContent(content) {
    const mentioned = [];
    this.modernTechStack.forEach(tech => {
      if (content.toLowerCase().includes(tech.toLowerCase())) {
        mentioned.push(tech);
      }
    });
    return mentioned.length > 0 ? mentioned : ['Next.js'];
  }

  generateSignalContentAngle(signal) {
    return `Market Signal: ${signal.content} - What This Means for Developers`;
  }

  inferSearchIntentFromSignal(signal) {
    if (signal.signal_type === 'buying_trigger') return 'commercial_intent';
    if (signal.signal_type === 'customer_problem') return 'problem_solving';
    return 'informational';
  }

  mapSignalToBuyerStage(signalType) {
    const mapping = {
      'customer_problem': 'problem_aware',
      'buying_trigger': 'solution_aware',
      'competitive_intelligence': 'solution_shopping'
    };
    return mapping[signalType] || 'awareness';
  }

  generateSignalKeywords(signal) {
    return [signal.content.toLowerCase(), `${signal.customer_segment} development`];
  }

  extractPlatform(source) {
    if (source.includes('reddit') || source.startsWith('r/')) return 'Reddit';
    if (source.includes('twitter')) return 'Twitter';
    if (source.includes('IndieHackers')) return 'IndieHackers';
    return 'Social Media';
  }

  inferFrameworksFromCompetitor(competitor) {
    const competitorFrameworks = {
      'Vercel': ['Next.js', 'React', 'Edge Functions'],
      'Netlify': ['Jamstack', 'Static Sites', 'Serverless'],
      'Supabase': ['PostgreSQL', 'Database', 'Backend'],
      'GitHub Copilot': ['AI Coding', 'VS Code', 'Development AI']
    };
    return competitorFrameworks[competitor] || ['Web Development'];
  }

  generateCompetitiveContentAngle(competitor, analysis) {
    return `${competitor} vs Avolve: Which is Better for ${analysis.target_customers[0]}?`;
  }

  generateCompetitorKeywords(competitor, analysis) {
    return [
      `${competitor.toLowerCase()} alternative`,
      `${competitor.toLowerCase()} vs`,
      `best ${analysis.positioning.toLowerCase()}`,
      `${competitor.toLowerCase()} competitor`
    ];
  }

  assessDifferentiation(competitor, analysis) {
    return 'AI-native approach vs traditional development tools';
  }

  assessCompetitiveOpportunity(problem) {
    // Assess how well positioned Avolve is to solve this problem
    const highOpportunity = [
      'Need to move fast',
      'Limited development resources',
      'Expensive development',
      'Developer hiring challenges'
    ];
    return highOpportunity.some(p => problem.includes(p)) ? 'high' : 'medium';
  }

  countContentOpportunities(data) {
    return data.contextual_insights.filter(insight =>
      ['customer_problem', 'buying_trigger', 'market_signal'].includes(insight.insight_type)
    ).length;
  }

  /**
   * Test the adapter
   */
  async testAdapter() {
    console.log('🧪 Testing Market Research to Content Adapter');
    console.log('=' .repeat(50));

    // Find the most recent market research file
    const researchDir = path.join(__dirname, '..', 'research');
    const files = fs.readdirSync(researchDir)
      .filter(f => f.startsWith('intelligence-market-research-') && f.endsWith('.json'))
      .sort()
      .reverse();

    if (files.length === 0) {
      throw new Error('No market research files found');
    }

    const latestFile = path.join(researchDir, files[0]);
    console.log(`📁 Using: ${latestFile}`);

    const result = await this.transformMarketResearchToContentIntelligence(latestFile);

    console.log(`✅ Adapter test complete`);
    console.log(`🔍 Generated ${result.contentIntelligenceData.contextual_insights.length} contextual insights`);

    return result;
  }
}

// CLI interface
async function main() {
  const adapter = new MarketResearchToContentAdapter();

  const command = process.argv[2] || 'test';
  const inputFile = process.argv[3];
  const outputFile = process.argv[4];

  switch (command) {
    case 'test':
      await adapter.testAdapter();
      break;

    case 'transform':
      if (!inputFile) {
        console.log('Usage: node market-research-to-content-adapter.js transform <input-file.json> [output-file.json]');
        process.exit(1);
      }
      await adapter.transformMarketResearchToContentIntelligence(inputFile, outputFile);
      break;

    default:
      console.log(`
Market Research to Content Adapter Commands:

  test                          - Test adapter with latest market research
  transform <input> [output]    - Transform market research to content format

Examples:
  node market-research-to-content-adapter.js test
  node market-research-to-content-adapter.js transform research.json
      `);
  }
}

if (require.main === module) {
  main();
}

module.exports = { MarketResearchToContentAdapter };