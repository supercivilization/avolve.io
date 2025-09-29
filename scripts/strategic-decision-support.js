#!/usr/bin/env node

/**
 * Strategic Decision Support System for Avolve.io
 *
 * Generates strategic briefings, decision frameworks, and automated recommendations
 * Based on intelligence processing outputs
 *
 * @version 1.0.0
 * @author Avolve AI-Native Platform
 * @date September 25, 2025
 */

const fs = require('fs');
const path = require('path');

class StrategicDecisionSupport {
  constructor() {
    this.decisionFrameworks = {
      'competitive_response': {
        criteria: ['threat_level', 'market_impact', 'resource_requirements', 'time_sensitivity'],
        thresholds: { immediate: 0.8, short_term: 0.6, medium_term: 0.4 },
        decision_matrix: 'competitive_priority'
      },
      'market_capture': {
        criteria: ['opportunity_size', 'competitive_advantage', 'market_readiness', 'resource_fit'],
        thresholds: { high: 0.7, medium: 0.5, low: 0.3 },
        decision_matrix: 'opportunity_ranking'
      },
      'technology_adaptation': {
        criteria: ['strategic_alignment', 'adoption_momentum', 'integration_complexity', 'roi_potential'],
        thresholds: { invest: 0.75, monitor: 0.5, ignore: 0.25 },
        decision_matrix: 'technology_investment'
      },
      'resource_allocation': {
        criteria: ['strategic_impact', 'urgency', 'success_probability', 'opportunity_cost'],
        thresholds: { critical: 0.85, important: 0.65, routine: 0.4 },
        decision_matrix: 'resource_priority'
      }
    };

    this.briefingTemplates = {
      'executive_summary': {
        sections: ['key_insights', 'strategic_recommendations', 'competitive_landscape', 'market_opportunities', 'risk_assessment'],
        max_length: 500,
        focus: 'strategic_overview'
      },
      'tactical_briefing': {
        sections: ['immediate_actions', 'resource_requirements', 'success_metrics', 'implementation_timeline'],
        max_length: 800,
        focus: 'execution_planning'
      },
      'competitive_intelligence': {
        sections: ['competitive_threats', 'market_movements', 'positioning_analysis', 'response_strategies'],
        max_length: 600,
        focus: 'competitive_dynamics'
      },
      'market_intelligence': {
        sections: ['market_opportunities', 'developer_sentiment', 'technology_trends', 'growth_potential'],
        max_length: 700,
        focus: 'market_dynamics'
      }
    };
  }

  /**
   * Generate comprehensive strategic briefing
   */
  async generateStrategicBriefing(intelligenceData, briefingType = 'executive_summary') {
    console.log(`📋 Generating ${briefingType} strategic briefing`);
    console.log('=' .repeat(50));

    try {
      const template = this.briefingTemplates[briefingType];
      if (!template) {
        throw new Error(`Unknown briefing type: ${briefingType}`);
      }

      const briefing = {
        title: `${this.formatBriefingTitle(briefingType)} - ${this.formatDate()}`,
        briefing_type: briefingType,
        generated_at: new Date().toISOString(),
        intelligence_source: intelligenceData.timestamp,
        executive_summary: await this.generateExecutiveSummary(intelligenceData),
        sections: {},
        decision_recommendations: await this.generateDecisionRecommendations(intelligenceData),
        action_items: this.extractActionItems(intelligenceData),
        success_metrics: this.defineSuccessMetrics(intelligenceData),
        next_review_date: this.calculateNextReview(briefingType)
      };

      // Generate each section based on template
      for (const section of template.sections) {
        briefing.sections[section] = await this.generateBriefingSection(section, intelligenceData);
      }

      // Apply length constraints and focus
      briefing.focused_content = this.applyBriefingFocus(briefing, template);

      // Save briefing
      const filename = `strategic-briefing-${briefingType}-${Date.now()}.json`;
      const filepath = path.join(__dirname, '..', 'reports', 'briefings', filename);

      // Ensure briefings directory exists
      const briefingDir = path.dirname(filepath);
      if (!fs.existsSync(briefingDir)) {
        fs.mkdirSync(briefingDir, { recursive: true });
      }

      fs.writeFileSync(filepath, JSON.stringify(briefing, null, 2));

      // Generate readable markdown version
      const markdownPath = filepath.replace('.json', '.md');
      const markdown = this.generateMarkdownBriefing(briefing);
      fs.writeFileSync(markdownPath, markdown);

      console.log(`📄 Briefing saved: ${filepath}`);
      console.log(`📝 Markdown version: ${markdownPath}`);
      console.log(`🎯 Action items: ${briefing.action_items.length}`);
      console.log(`📊 Decision points: ${briefing.decision_recommendations.length}`);

      return briefing;

    } catch (error) {
      console.error('❌ Strategic briefing generation failed:', error.message);
      throw error;
    }
  }

  /**
   * Generate executive summary from intelligence data
   */
  async generateExecutiveSummary(intelligenceData) {
    const insights = intelligenceData.contextual_insights || [];
    const synthesis = intelligenceData.strategic_synthesis || [];
    const actions = intelligenceData.prioritized_recommendations || [];

    const criticalInsights = insights.filter(i => i.trend_indicator === 'critical_trend').length;
    const highPriorityActions = actions.filter(a => a.priority === 'high').length;
    const competitiveThreats = synthesis.filter(s => s.type === 'competitive_threat').length;
    const marketOpportunities = synthesis.filter(s => s.type === 'market_opportunity').length;

    return {
      key_findings: [
        `Processed ${insights.length} intelligence signals across multiple platforms`,
        `Identified ${criticalInsights} critical trends requiring immediate attention`,
        `Detected ${competitiveThreats} competitive threats and ${marketOpportunities} market opportunities`,
        `Generated ${highPriorityActions} high-priority strategic recommendations`
      ],
      strategic_status: this.assessStrategicStatus(synthesis),
      immediate_priorities: actions.slice(0, 3).map(a => ({
        title: a.title,
        priority: a.priority,
        timeframe: a.timeframe
      })),
      risk_level: this.calculateOverallRiskLevel(synthesis),
      confidence_score: this.calculateConfidenceScore(intelligenceData)
    };
  }

  /**
   * Generate decision recommendations with supporting frameworks
   */
  async generateDecisionRecommendations(intelligenceData) {
    const recommendations = [];
    const actions = intelligenceData.prioritized_recommendations || [];

    // Group actions by type for decision framework application
    const actionsByType = {};
    actions.forEach(action => {
      if (!actionsByType[action.type]) {
        actionsByType[action.type] = [];
      }
      actionsByType[action.type].push(action);
    });

    // Apply decision frameworks
    for (const [actionType, actionList] of Object.entries(actionsByType)) {
      const framework = this.decisionFrameworks[actionType];
      if (framework && actionList.length > 0) {
        const decision = await this.applyDecisionFramework(actionType, actionList, framework);
        recommendations.push(decision);
      }
    }

    // Add strategic decision for resource allocation
    if (actions.length > 0) {
      const resourceDecision = await this.generateResourceAllocationDecision(actions);
      recommendations.push(resourceDecision);
    }

    return recommendations;
  }

  /**
   * Apply decision framework to action group
   */
  async applyDecisionFramework(actionType, actions, framework) {
    const analysis = {
      decision_type: actionType,
      framework_applied: framework.decision_matrix,
      options_analyzed: actions.length,
      evaluation_criteria: framework.criteria,
      recommendations: []
    };

    // Score each action against criteria
    const scoredActions = actions.map(action => ({
      ...action,
      framework_score: this.scoreActionAgainstCriteria(action, framework.criteria),
      decision_confidence: this.calculateDecisionConfidence(action)
    }));

    // Sort by framework score
    scoredActions.sort((a, b) => b.framework_score - a.framework_score);

    // Apply thresholds to generate recommendations
    Object.entries(framework.thresholds).forEach(([level, threshold]) => {
      const qualifyingActions = scoredActions.filter(a => a.framework_score >= threshold);

      if (qualifyingActions.length > 0) {
        analysis.recommendations.push({
          recommendation_level: level,
          threshold_score: threshold,
          qualifying_actions: qualifyingActions.length,
          top_action: qualifyingActions[0] ? {
            title: qualifyingActions[0].title,
            score: qualifyingActions[0].framework_score,
            confidence: qualifyingActions[0].decision_confidence
          } : null,
          decision: this.generateDecisionRecommendation(level, qualifyingActions[0])
        });
      }
    });

    return analysis;
  }

  /**
   * Score action against decision criteria
   */
  scoreActionAgainstCriteria(action, criteria) {
    let totalScore = 0;

    criteria.forEach(criterion => {
      let criterionScore = 0;

      switch (criterion) {
        case 'threat_level':
          const threatMapping = { critical: 1.0, high: 0.8, medium: 0.5, low: 0.2 };
          criterionScore = threatMapping[action.priority] || 0.3;
          break;

        case 'market_impact':
          criterionScore = action.expected_impact ? 0.7 : 0.3;
          break;

        case 'resource_requirements':
          const resourceComplexity = (action.resources_required || []).length;
          criterionScore = Math.max(0.1, 1.0 - (resourceComplexity * 0.2));
          break;

        case 'time_sensitivity':
          const timeframeMapping = { immediate: 1.0, short_term: 0.8, medium_term: 0.5, ongoing: 0.3 };
          criterionScore = timeframeMapping[action.timeframe] || 0.4;
          break;

        case 'opportunity_size':
          criterionScore = action.frameworks_affected ? action.frameworks_affected.length * 0.2 : 0.3;
          break;

        case 'competitive_advantage':
          criterionScore = action.type === 'competitive_response' ? 0.8 : 0.5;
          break;

        case 'market_readiness':
          criterionScore = action.success_metrics ? action.success_metrics.length * 0.25 : 0.4;
          break;

        case 'strategic_alignment':
          criterionScore = action.frameworks_affected &&
                          action.frameworks_affected.some(f => ['next.js', 'react', 'ai-development'].includes(f.toLowerCase()))
                          ? 0.9 : 0.5;
          break;

        default:
          criterionScore = 0.5; // Default neutral score
      }

      totalScore += Math.min(1.0, Math.max(0.0, criterionScore));
    });

    return totalScore / criteria.length;
  }

  /**
   * Generate resource allocation decision
   */
  async generateResourceAllocationDecision(actions) {
    const highPriority = actions.filter(a => a.priority === 'high');
    const mediumPriority = actions.filter(a => a.priority === 'medium');
    const lowPriority = actions.filter(a => a.priority === 'low');

    const totalActions = actions.length;
    const resourceDistribution = {
      high_priority: {
        actions: highPriority.length,
        percentage: Math.round((highPriority.length / totalActions) * 100),
        recommended_allocation: '60-70%'
      },
      medium_priority: {
        actions: mediumPriority.length,
        percentage: Math.round((mediumPriority.length / totalActions) * 100),
        recommended_allocation: '20-30%'
      },
      low_priority: {
        actions: lowPriority.length,
        percentage: Math.round((lowPriority.length / totalActions) * 100),
        recommended_allocation: '10-15%'
      }
    };

    return {
      decision_type: 'resource_allocation',
      framework_applied: 'priority_based_allocation',
      total_actions_analyzed: totalActions,
      resource_distribution: resourceDistribution,
      recommendations: [
        {
          recommendation_level: 'immediate',
          decision: `Allocate 60-70% of strategic resources to ${highPriority.length} high-priority actions`,
          rationale: 'Maximum impact focus on critical strategic needs',
          resource_split: {
            strategic_planning: '40%',
            execution: '30%',
            monitoring: '30%'
          }
        }
      ],
      implementation_sequence: [
        ...highPriority.slice(0, 2).map((a, i) => ({ phase: i + 1, action: a.title, timeline: a.timeframe })),
        { phase: 3, action: 'Review and adjust based on initial results', timeline: 'ongoing' }
      ]
    };
  }

  /**
   * Generate specific briefing section content
   */
  async generateBriefingSection(section, intelligenceData) {
    switch (section) {
      case 'key_insights':
        return this.generateKeyInsights(intelligenceData);

      case 'strategic_recommendations':
        return this.generateStrategicRecommendations(intelligenceData);

      case 'competitive_landscape':
        return this.generateCompetitiveLandscape(intelligenceData);

      case 'market_opportunities':
        return this.generateMarketOpportunities(intelligenceData);

      case 'risk_assessment':
        return this.generateRiskAssessment(intelligenceData);

      case 'immediate_actions':
        return this.generateImmediateActions(intelligenceData);

      case 'resource_requirements':
        return this.generateResourceRequirements(intelligenceData);

      case 'success_metrics':
        return this.generateSuccessMetrics(intelligenceData);

      case 'implementation_timeline':
        return this.generateImplementationTimeline(intelligenceData);

      default:
        return { error: `Unknown section: ${section}` };
    }
  }

  /**
   * Generate key insights section
   */
  generateKeyInsights(intelligenceData) {
    const insights = intelligenceData.contextual_insights || [];
    const synthesis = intelligenceData.strategic_synthesis || [];

    return {
      critical_trends: insights
        .filter(i => i.trend_indicator === 'critical_trend')
        .map(i => ({
          trend: i.frameworks_mentioned.join(', '),
          significance: i.trend_indicator,
          cross_platform: i.cross_platform_correlation.length > 0
        })),

      strategic_patterns: synthesis.map(s => ({
        pattern_type: s.type,
        key_elements: s.type === 'competitive_threat' ? s.competitor :
                      s.type === 'market_opportunity' ? s.opportunity_theme :
                      s.type === 'technology_shift' ? s.technology : 'various',
        impact_level: s.threat_level || s.shift_momentum || s.strategic_significance || 'medium'
      })),

      intelligence_quality: {
        total_signals: insights.length,
        high_confidence: insights.filter(i => i.avolve_relevance > 70).length,
        cross_validated: insights.filter(i => i.cross_platform_correlation.length > 0).length,
        processing_timestamp: intelligenceData.timestamp
      }
    };
  }

  /**
   * Generate strategic recommendations section
   */
  generateStrategicRecommendations(intelligenceData) {
    const actions = intelligenceData.prioritized_recommendations || [];

    return {
      immediate_priorities: actions
        .filter(a => a.priority === 'high' && a.timeframe === 'immediate')
        .map(a => ({
          recommendation: a.title,
          action_required: a.action,
          expected_outcome: a.expected_impact,
          success_indicators: a.success_metrics
        })),

      strategic_initiatives: actions
        .filter(a => a.type === 'strategic_initiative')
        .map(a => ({
          initiative: a.title,
          scope: a.frameworks_affected,
          timeline: a.timeframe,
          resource_estimate: a.resources_required
        })),

      competitive_moves: actions
        .filter(a => a.type === 'competitive_response')
        .map(a => ({
          response_to: a.frameworks_affected[0],
          strategic_action: a.action,
          competitive_advantage: a.expected_impact
        }))
    };
  }

  /**
   * Generate competitive landscape section
   */
  generateCompetitiveLandscape(intelligenceData) {
    const landscape = intelligenceData.competitive_landscape || {};
    const synthesis = intelligenceData.strategic_synthesis || [];

    const threats = synthesis.filter(s => s.type === 'competitive_threat');

    return {
      market_dynamics: {
        active_competitors: landscape.active_competitors || 0,
        competitive_intensity: threats.length > 3 ? 'high' : threats.length > 1 ? 'medium' : 'low',
        market_stability: landscape.landscape_assessment || 'unknown'
      },

      threat_analysis: threats.map(threat => ({
        competitor: threat.competitor,
        threat_level: threat.threat_level,
        key_activities: threat.key_topics || [],
        recommended_response: threat.strategic_response
      })),

      positioning_status: {
        current_position: landscape.strategic_positioning || 'unknown',
        differentiation_strength: this.assessDifferentiation(intelligenceData),
        market_perception: this.assessMarketPerception(synthesis)
      }
    };
  }

  /**
   * Generate market opportunities section
   */
  generateMarketOpportunities(intelligenceData) {
    const opportunities = intelligenceData.market_opportunities || {};
    const synthesis = intelligenceData.strategic_synthesis || [];

    const marketGaps = synthesis.filter(s => s.type === 'market_opportunity');

    return {
      opportunity_landscape: {
        total_opportunities: opportunities.total_opportunities || 0,
        high_priority_opportunities: opportunities.high_priority_count || 0,
        market_readiness: opportunities.market_readiness || 'unknown'
      },

      specific_opportunities: marketGaps.map(gap => ({
        opportunity: gap.opportunity_theme,
        market_size_indicator: gap.market_size_indicator,
        avolve_advantage: gap.avolve_advantage,
        recommended_approach: gap.recommended_action,
        competition_level: this.assessOpportunityCompetition(gap)
      })),

      growth_potential: {
        short_term_capture: marketGaps.filter(g => g.timeframe === 'short_term').length,
        strategic_alignment: this.calculateStrategicAlignment(marketGaps),
        resource_efficiency: this.assessResourceEfficiency(marketGaps)
      }
    };
  }

  /**
   * Generate risk assessment section
   */
  generateRiskAssessment(intelligenceData) {
    const synthesis = intelligenceData.strategic_synthesis || [];
    const actions = intelligenceData.prioritized_recommendations || [];

    const risks = this.identifyStrategicRisks(synthesis, actions);

    return {
      risk_overview: {
        overall_risk_level: this.calculateOverallRiskLevel(synthesis),
        primary_risk_sources: this.identifyPrimaryRiskSources(risks),
        risk_trend: this.assessRiskTrend(synthesis)
      },

      specific_risks: risks.map(risk => ({
        risk_type: risk.type,
        description: risk.description,
        probability: risk.probability,
        impact: risk.impact,
        mitigation_strategy: risk.mitigation,
        monitoring_indicators: risk.indicators
      })),

      mitigation_priorities: risks
        .filter(r => r.priority === 'high')
        .map(r => ({
          risk: r.description,
          immediate_action: r.mitigation,
          timeline: 'immediate'
        }))
    };
  }

  /**
   * Generate immediate actions section
   */
  generateImmediateActions(intelligenceData) {
    const actions = intelligenceData.prioritized_recommendations || [];
    const immediateActions = actions.filter(a =>
      a.timeframe === 'immediate' ||
      (a.priority === 'high' && a.timeframe === 'short_term')
    );

    return {
      action_summary: {
        total_immediate_actions: immediateActions.length,
        high_priority: immediateActions.filter(a => a.priority === 'high').length,
        resource_intensive: immediateActions.filter(a => (a.resources_required || []).length > 2).length
      },

      prioritized_actions: immediateActions.slice(0, 5).map((action, index) => ({
        priority_rank: index + 1,
        action: action.title,
        description: action.description,
        owner: this.assignActionOwner(action),
        deadline: this.calculateActionDeadline(action),
        success_criteria: action.success_metrics,
        dependencies: this.identifyActionDependencies(action, actions)
      })),

      execution_readiness: {
        ready_to_execute: immediateActions.filter(a => this.isActionReady(a)).length,
        requires_preparation: immediateActions.filter(a => !this.isActionReady(a)).length,
        resource_conflicts: this.identifyResourceConflicts(immediateActions)
      }
    };
  }

  // Helper methods for briefing generation
  formatBriefingTitle(type) {
    return type.split('_').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }

  formatDate() {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  assessStrategicStatus(synthesis) {
    const threats = synthesis.filter(s => s.type === 'competitive_threat').length;
    const opportunities = synthesis.filter(s => s.type === 'market_opportunity').length;

    if (threats > opportunities && threats > 2) return 'defensive';
    if (opportunities > threats && opportunities > 2) return 'offensive';
    return 'balanced';
  }

  calculateOverallRiskLevel(synthesis) {
    const criticalThreats = synthesis.filter(s =>
      s.type === 'competitive_threat' && s.threat_level === 'critical'
    ).length;

    const highThreats = synthesis.filter(s =>
      s.type === 'competitive_threat' && s.threat_level === 'high'
    ).length;

    if (criticalThreats > 0) return 'high';
    if (highThreats > 2) return 'medium';
    return 'low';
  }

  calculateConfidenceScore(intelligenceData) {
    const insights = intelligenceData.contextual_insights || [];
    if (insights.length === 0) return 0;

    const avgRelevance = insights.reduce((sum, i) => sum + i.avolve_relevance, 0) / insights.length;
    const crossValidated = insights.filter(i => i.cross_platform_correlation.length > 0).length;

    const relevanceScore = Math.min(avgRelevance / 100, 1);
    const validationScore = crossValidated / insights.length;

    return Math.round((relevanceScore * 0.6 + validationScore * 0.4) * 100);
  }

  extractActionItems(intelligenceData) {
    const actions = intelligenceData.prioritized_recommendations || [];

    return actions.slice(0, 10).map((action, index) => ({
      id: `action_${index + 1}`,
      title: action.title,
      description: action.action,
      priority: action.priority,
      due_date: this.calculateActionDeadline(action),
      owner: this.assignActionOwner(action),
      status: 'pending',
      estimated_effort: this.estimateActionEffort(action)
    }));
  }

  defineSuccessMetrics(intelligenceData) {
    const actions = intelligenceData.prioritized_recommendations || [];
    const allMetrics = actions.flatMap(a => a.success_metrics || []);
    const uniqueMetrics = [...new Set(allMetrics)];

    return {
      strategic_metrics: uniqueMetrics.slice(0, 5),
      measurement_frequency: 'weekly',
      review_cycle: 'monthly',
      success_thresholds: this.defineSuccessThresholds(uniqueMetrics)
    };
  }

  defineSuccessThresholds(metrics) {
    const thresholds = {};

    metrics.forEach(metric => {
      switch (metric.toLowerCase()) {
        case 'sentiment improvement':
          thresholds[metric] = '20% increase in positive sentiment';
          break;
        case 'market share protection':
          thresholds[metric] = 'Maintain current market position';
          break;
        case 'developer mindshare':
          thresholds[metric] = '15% increase in developer awareness';
          break;
        case 'developer adoption':
          thresholds[metric] = '25% increase in new users';
          break;
        case 'content engagement':
          thresholds[metric] = '30% increase in content views/interactions';
          break;
        case 'feature usage':
          thresholds[metric] = '40% adoption rate for new features';
          break;
        default:
          thresholds[metric] = 'Measurable improvement over baseline';
      }
    });

    return thresholds;
  }

  calculateNextReview(briefingType) {
    const reviewCycles = {
      'executive_summary': 7, // days
      'tactical_briefing': 3,
      'competitive_intelligence': 5,
      'market_intelligence': 10
    };

    const days = reviewCycles[briefingType] || 7;
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + days);

    return nextReview.toISOString().split('T')[0];
  }

  generateMarkdownBriefing(briefing) {
    return `# ${briefing.title}

Generated: ${briefing.generated_at}
Type: ${briefing.briefing_type}
Next Review: ${briefing.next_review_date}

## Executive Summary

### Key Findings
${briefing.executive_summary.key_findings.map(f => `- ${f}`).join('\n')}

**Strategic Status**: ${briefing.executive_summary.strategic_status}
**Risk Level**: ${briefing.executive_summary.risk_level}
**Confidence Score**: ${briefing.executive_summary.confidence_score}%

### Immediate Priorities
${briefing.executive_summary.immediate_priorities.map((p, i) =>
  `${i + 1}. **${p.title}** (${p.priority} priority, ${p.timeframe})`
).join('\n')}

## Decision Recommendations

${briefing.decision_recommendations.map(rec => `
### ${rec.decision_type.replace(/_/g, ' ').toUpperCase()}
- **Framework**: ${rec.framework_applied}
- **Options Analyzed**: ${rec.options_analyzed}
- **Top Recommendation**: ${rec.recommendations[0]?.top_action?.title || 'None'}
`).join('\n')}

## Action Items

${briefing.action_items.map((action, i) => `
${i + 1}. **${action.title}**
   - Priority: ${action.priority}
   - Owner: ${action.owner}
   - Due: ${action.due_date}
   - Effort: ${action.estimated_effort}
`).join('\n')}

---
*Strategic Intelligence System - Avolve.io*
`;
  }

  // Additional helper methods
  assignActionOwner(action) {
    const ownerMap = {
      'competitive_response': 'Strategic Team',
      'market_capture': 'Product Team',
      'technology_adaptation': 'Engineering Team',
      'sentiment_management': 'Developer Relations',
      'strategic_initiative': 'Leadership Team'
    };

    return ownerMap[action.type] || 'Strategy Team';
  }

  calculateActionDeadline(action) {
    const timeframeMap = {
      'immediate': 3,
      'short_term': 14,
      'medium_term': 30,
      'ongoing': 90
    };

    const days = timeframeMap[action.timeframe] || 14;
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + days);

    return deadline.toISOString().split('T')[0];
  }

  estimateActionEffort(action) {
    const resourceCount = (action.resources_required || []).length;

    if (resourceCount >= 4) return 'high';
    if (resourceCount >= 2) return 'medium';
    return 'low';
  }

  isActionReady(action) {
    return (action.resources_required || []).length <= 2 && action.priority !== 'low';
  }

  identifyActionDependencies(action, allActions) {
    // Simple dependency identification based on framework overlap
    return allActions
      .filter(a => a !== action &&
               (a.frameworks_affected || []).some(f =>
                 (action.frameworks_affected || []).includes(f)))
      .map(a => a.title)
      .slice(0, 2);
  }

  identifyResourceConflicts(actions) {
    const resourceUsage = {};

    actions.forEach(action => {
      (action.resources_required || []).forEach(resource => {
        resourceUsage[resource] = (resourceUsage[resource] || 0) + 1;
      });
    });

    return Object.entries(resourceUsage)
      .filter(([resource, count]) => count > 1)
      .map(([resource, count]) => ({ resource, conflict_count: count }));
  }

  identifyStrategicRisks(synthesis, actions) {
    const risks = [];

    // Competitive risks
    const competitiveThreats = synthesis.filter(s => s.type === 'competitive_threat');
    if (competitiveThreats.length > 2) {
      risks.push({
        type: 'competitive',
        description: 'Multiple competitive threats detected',
        probability: 'high',
        impact: 'medium',
        priority: 'high',
        mitigation: 'Accelerate differentiation and competitive response',
        indicators: ['market share', 'developer sentiment', 'feature parity']
      });
    }

    // Resource risks
    const highPriorityActions = actions.filter(a => a.priority === 'high').length;
    if (highPriorityActions > 3) {
      risks.push({
        type: 'resource',
        description: 'Resource over-commitment risk',
        probability: 'medium',
        impact: 'high',
        priority: 'medium',
        mitigation: 'Prioritize and sequence high-priority actions',
        indicators: ['delivery delays', 'quality issues', 'team burnout']
      });
    }

    return risks;
  }

  identifyPrimaryRiskSources(risks) {
    const riskTypes = risks.map(r => r.type);
    const typeCounts = {};

    riskTypes.forEach(type => {
      typeCounts[type] = (typeCounts[type] || 0) + 1;
    });

    return Object.entries(typeCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([type, count]) => type);
  }

  assessRiskTrend(synthesis) {
    const threatCount = synthesis.filter(s => s.type === 'competitive_threat').length;

    if (threatCount > 3) return 'increasing';
    if (threatCount > 1) return 'stable';
    return 'decreasing';
  }

  assessDifferentiation(intelligenceData) {
    const actions = intelligenceData.prioritized_recommendations || [];
    const competitiveActions = actions.filter(a => a.type === 'competitive_response').length;

    if (competitiveActions > 2) return 'defensive';
    if (competitiveActions > 0) return 'reactive';
    return 'proactive';
  }

  assessMarketPerception(synthesis) {
    const sentimentShifts = synthesis.filter(s => s.type === 'sentiment_shift');
    const avgSentiment = sentimentShifts.reduce((sum, s) => sum + (s.sentiment_score || 0), 0) / Math.max(sentimentShifts.length, 1);

    if (avgSentiment > 40) return 'positive';
    if (avgSentiment < -40) return 'negative';
    return 'neutral';
  }

  assessOpportunityCompetition(gap) {
    const affectedFrameworks = gap.affected_frameworks || [];
    if (affectedFrameworks.length > 3) return 'high';
    if (affectedFrameworks.length > 1) return 'medium';
    return 'low';
  }

  calculateStrategicAlignment(marketGaps) {
    const alignedOpportunities = marketGaps.filter(gap =>
      gap.avolve_advantage && gap.avolve_advantage.includes('AI')
    ).length;

    return (alignedOpportunities / Math.max(marketGaps.length, 1)) * 100;
  }

  assessResourceEfficiency(marketGaps) {
    const lowResourceGaps = marketGaps.filter(gap =>
      gap.recommended_action && gap.recommended_action.includes('content')
    ).length;

    if (lowResourceGaps > marketGaps.length * 0.6) return 'high';
    if (lowResourceGaps > marketGaps.length * 0.3) return 'medium';
    return 'low';
  }

  applyBriefingFocus(briefing, template) {
    // Apply length constraints and focus based on template
    const focusedContent = {
      ...briefing,
      focused_summary: this.applyLengthConstraints(briefing.executive_summary, template.max_length * 0.3),
      key_sections: this.prioritizeSections(briefing.sections, template.focus),
      priority_actions: briefing.action_items.slice(0, Math.min(5, briefing.action_items.length))
    };

    return focusedContent;
  }

  applyLengthConstraints(content, maxLength) {
    const contentStr = JSON.stringify(content);
    if (contentStr.length <= maxLength) return content;

    // Truncate while preserving structure
    if (content.key_findings) {
      content.key_findings = content.key_findings.slice(0, 3);
    }
    if (content.immediate_priorities) {
      content.immediate_priorities = content.immediate_priorities.slice(0, 3);
    }

    return content;
  }

  prioritizeSections(sections, focus) {
    const priorityOrder = {
      'strategic_overview': ['key_insights', 'strategic_recommendations', 'competitive_landscape'],
      'execution_planning': ['immediate_actions', 'resource_requirements', 'implementation_timeline'],
      'competitive_dynamics': ['competitive_landscape', 'competitive_threats', 'positioning_analysis'],
      'market_dynamics': ['market_opportunities', 'developer_sentiment', 'technology_trends']
    };

    const priority = priorityOrder[focus] || Object.keys(sections);
    const prioritizedSections = {};

    priority.forEach(sectionName => {
      if (sections[sectionName]) {
        prioritizedSections[sectionName] = sections[sectionName];
      }
    });

    return prioritizedSections;
  }

  generateDecisionRecommendation(level, action) {
    if (!action) return 'No qualifying actions for this level';

    const actionMap = {
      'immediate': `Execute ${action.title} immediately - high strategic value`,
      'short_term': `Plan ${action.title} for implementation within 2 weeks`,
      'medium_term': `Include ${action.title} in quarterly strategic planning`,
      'critical': `${action.title} requires immediate executive attention`,
      'high': `${action.title} should be prioritized in current sprint`,
      'medium': `${action.title} can be scheduled for next development cycle`,
      'low': `${action.title} should be considered for future roadmap`
    };

    return actionMap[level] || `Consider ${action.title} based on available resources`;
  }

  calculateDecisionConfidence(action) {
    let confidence = 0.5; // Base confidence

    // Higher confidence for high priority actions
    if (action.priority === 'high') confidence += 0.3;
    if (action.priority === 'medium') confidence += 0.1;

    // Higher confidence for immediate timeframe
    if (action.timeframe === 'immediate') confidence += 0.2;

    // Higher confidence for specific action types
    if (action.type === 'competitive_response') confidence += 0.1;

    // Higher confidence if expected impact is defined
    if (action.expected_impact && action.expected_impact.length > 0) confidence += 0.1;

    // Higher confidence if success metrics are defined
    if (action.success_metrics && action.success_metrics.length > 0) confidence += 0.1;

    return Math.min(confidence, 1.0);
  }

  // Test method
  async testBriefingGeneration() {
    console.log('🧪 Testing Strategic Decision Support System');
    console.log('=' .repeat(50));

    // Sample intelligence data
    const sampleIntelligence = {
      timestamp: new Date().toISOString(),
      contextual_insights: [
        {
          frameworks_mentioned: ['next.js'],
          trend_indicator: 'critical_trend',
          avolve_relevance: 85,
          cross_platform_correlation: [{ framework: 'next.js', trend_strength: 75 }]
        }
      ],
      strategic_synthesis: [
        {
          type: 'competitive_threat',
          competitor: 'sveltekit',
          threat_level: 'high',
          strategic_response: 'Highlight AI-native advantages'
        },
        {
          type: 'market_opportunity',
          opportunity_theme: 'ai_development_tools',
          avolve_advantage: 'Claude Code integration',
          recommended_action: 'Create developer education content'
        }
      ],
      prioritized_recommendations: [
        {
          type: 'competitive_response',
          title: 'Counter SvelteKit performance claims',
          action: 'Publish Next.js 15 + Turbopack benchmarks',
          priority: 'high',
          timeframe: 'immediate',
          resources_required: ['technical writing', 'performance testing'],
          success_metrics: ['benchmark adoption', 'developer sentiment'],
          frameworks_affected: ['sveltekit']
        }
      ],
      competitive_landscape: { active_competitors: 3, landscape_assessment: 'dynamic' },
      market_opportunities: { total_opportunities: 2, high_priority_count: 1 }
    };

    const briefing = await this.generateStrategicBriefing(sampleIntelligence, 'executive_summary');

    console.log('\n✅ Strategic briefing generation complete');
    console.log(`📋 Briefing sections: ${Object.keys(briefing.sections).length}`);
    console.log(`🎯 Action items: ${briefing.action_items.length}`);
    console.log(`📊 Decision recommendations: ${briefing.decision_recommendations.length}`);

    return briefing;
  }
}

// CLI interface
async function main() {
  const support = new StrategicDecisionSupport();

  const command = process.argv[2] || 'test';

  switch (command) {
    case 'test':
      await support.testBriefingGeneration();
      break;

    case 'briefing':
      const intelligenceFile = process.argv[3];
      const briefingType = process.argv[4] || 'executive_summary';

      if (intelligenceFile && fs.existsSync(intelligenceFile)) {
        const intelligenceData = JSON.parse(fs.readFileSync(intelligenceFile, 'utf8'));
        await support.generateStrategicBriefing(intelligenceData, briefingType);
      } else {
        console.log('Usage: node strategic-decision-support.js briefing <intelligence-file.json> [briefing-type]');
        console.log('Briefing types: executive_summary, tactical_briefing, competitive_intelligence, market_intelligence');
      }
      break;

    default:
      console.log(`
Strategic Decision Support Commands:

  test     - Test briefing generation with sample data
  briefing - Generate strategic briefing from intelligence data

Examples:
  node strategic-decision-support.js test
  node strategic-decision-support.js briefing reports/intelligence.json executive_summary
      `);
  }
}

if (require.main === module) {
  main();
}

module.exports = { StrategicDecisionSupport };