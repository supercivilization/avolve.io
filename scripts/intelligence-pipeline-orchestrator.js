#!/usr/bin/env node

/**
 * Intelligence Pipeline Orchestrator for Avolve.io
 *
 * Orchestrates the complete intelligence pipeline:
 * Environmental Sensing → Processing → Intelligence → Outcomes
 *
 * @version 1.0.0
 * @author Avolve AI-Native Platform
 * @date September 25, 2025
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

const { StrategicIntelligenceEngine } = require('./strategic-intelligence-engine');
const { StrategicDecisionSupport } = require('./strategic-decision-support');

class IntelligencePipelineOrchestrator {
  constructor() {
    this.intelligenceEngine = new StrategicIntelligenceEngine();
    this.decisionSupport = new StrategicDecisionSupport();

    this.pipelineConfig = {
      monitoring_scripts: {
        'comprehensive': 'comprehensive-tech-stack-monitor.js',
        'youtube': 'social-listening-system.js',
        'reddit': 'reddit-monitoring.js',
        'github': 'enhanced-github-monitoring.js'
      },
      processing_stages: [
        'environmental_sensing',
        'signal_processing',
        'strategic_intelligence',
        'decision_support',
        'actionable_outputs'
      ],
      output_formats: ['json', 'markdown', 'briefing'],
      scheduling: {
        'full_pipeline': '6h',
        'quick_update': '1h',
        'strategic_review': '24h'
      }
    };

    this.reportsDir = path.join(__dirname, '..', 'reports');
    this.briefingsDir = path.join(this.reportsDir, 'briefings');
    this.intelligenceDir = path.join(this.reportsDir, 'intelligence');

    this.ensureDirectories();
  }

  /**
   * Ensure all required directories exist
   */
  ensureDirectories() {
    [this.reportsDir, this.briefingsDir, this.intelligenceDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  /**
   * Run complete intelligence pipeline
   */
  async runFullPipeline(options = {}) {
    console.log('🚀 Starting Complete Intelligence Pipeline');
    console.log('=' .repeat(60));

    const pipelineId = `pipeline_${Date.now()}`;
    const startTime = Date.now();

    try {
      // Stage 1: Environmental Sensing
      console.log('\n📡 Stage 1: Environmental Sensing');
      const monitoringData = await this.runEnvironmentalSensing(options.sources);

      // Stage 2: Signal Processing & Validation
      console.log('\n🔄 Stage 2: Signal Processing & Validation');
      const processedData = await this.processMonitoringSignals(monitoringData);

      // Stage 3: Strategic Intelligence Generation
      console.log('\n🧠 Stage 3: Strategic Intelligence Generation');
      const intelligence = await this.generateStrategicIntelligence(processedData);

      // Stage 4: Decision Support & Briefings
      console.log('\n📋 Stage 4: Decision Support & Briefings');
      const briefings = await this.generateDecisionSupport(intelligence, options.briefingTypes);

      // Stage 5: Actionable Outputs & Distribution
      console.log('\n📤 Stage 5: Actionable Outputs & Distribution');
      const outputs = await this.generateActionableOutputs(intelligence, briefings);

      const executionTime = Date.now() - startTime;
      const pipeline = {
        pipeline_id: pipelineId,
        execution_time_ms: executionTime,
        completed_at: new Date().toISOString(),
        stages_completed: this.pipelineConfig.processing_stages,
        monitoring_data: monitoringData,
        processed_signals: processedData,
        strategic_intelligence: intelligence,
        decision_briefings: briefings,
        actionable_outputs: outputs,
        pipeline_metrics: this.calculatePipelineMetrics(monitoringData, intelligence, briefings),
        next_pipeline_recommended: this.calculateNextPipelineTime(intelligence)
      };

      // Save complete pipeline results
      const pipelineFile = path.join(this.intelligenceDir, `complete-pipeline-${pipelineId}.json`);
      fs.writeFileSync(pipelineFile, JSON.stringify(pipeline, null, 2));

      console.log('\n✅ Intelligence Pipeline Complete');
      console.log(`⚡ Execution time: ${(executionTime / 1000).toFixed(2)}s`);
      console.log(`📊 Total insights: ${intelligence.contextual_insights.length}`);
      console.log(`🎯 Strategic recommendations: ${intelligence.prioritized_recommendations.length}`);
      console.log(`📋 Briefings generated: ${briefings.length}`);
      console.log(`📁 Pipeline results: ${pipelineFile}`);

      return pipeline;

    } catch (error) {
      console.error('❌ Intelligence pipeline failed:', error.message);
      console.error('Stack trace:', error.stack);
      throw error;
    }
  }

  /**
   * Stage 1: Run environmental sensing (monitoring)
   */
  async runEnvironmentalSensing(sources = ['comprehensive']) {
    console.log('🔍 Running environmental sensing...');

    const monitoringResults = [];

    for (const source of sources) {
      const script = this.pipelineConfig.monitoring_scripts[source];
      if (!script) {
        console.log(`⚠️  Unknown monitoring source: ${source}`);
        continue;
      }

      try {
        console.log(`   📊 Running ${source} monitoring...`);

        let command;
        switch (source) {
          case 'comprehensive':
            command = `cd "${path.dirname(__filename)}" && node ${script} monitor`;
            break;
          case 'youtube':
            command = `cd "${path.dirname(__filename)}" && node ${script} youtube`;
            break;
          case 'reddit':
            command = `cd "${path.dirname(__filename)}" && node ${script} monitor`;
            break;
          case 'github':
            command = `cd "${path.dirname(__filename)}" && node ${script} monitor`;
            break;
          default:
            command = `cd "${path.dirname(__filename)}" && node ${script}`;
        }

        const { stdout, stderr } = await execAsync(command, { timeout: 300000 }); // 5 min timeout

        if (stderr && !stderr.includes('warning')) {
          console.log(`   ⚠️  ${source} monitoring warnings: ${stderr.slice(0, 200)}`);
        }

        // Try to find the most recent output file
        const recentFile = this.findMostRecentMonitoringFile(source);
        if (recentFile) {
          const data = JSON.parse(fs.readFileSync(recentFile, 'utf8'));
          monitoringResults.push({
            source: source,
            file: recentFile,
            data: data,
            timestamp: new Date().toISOString()
          });
          console.log(`   ✅ ${source}: ${(data.results || []).length} signals collected`);
        } else {
          console.log(`   ⚠️  ${source}: No output file found`);
        }

      } catch (error) {
        console.log(`   ❌ ${source} monitoring failed: ${error.message}`);
        // Continue with other sources
      }
    }

    return {
      sensing_completed_at: new Date().toISOString(),
      sources_processed: sources,
      successful_sources: monitoringResults.length,
      monitoring_results: monitoringResults,
      total_signals: monitoringResults.reduce((sum, r) => sum + (r.data.results || []).length, 0)
    };
  }

  /**
   * Find most recent monitoring file for source
   */
  findMostRecentMonitoringFile(source) {
    const patterns = {
      'comprehensive': 'comprehensive-tech-stack-monitoring-*.json',
      'youtube': 'social-listening-*.json',
      'reddit': 'reddit-monitoring-*.json',
      'github': 'github-monitoring-*.json'
    };

    const pattern = patterns[source];
    if (!pattern) return null;

    try {
      const files = fs.readdirSync(this.reportsDir)
        .filter(file => file.match(pattern.replace('*', '\\d+')))
        .map(file => ({
          name: file,
          path: path.join(this.reportsDir, file),
          mtime: fs.statSync(path.join(this.reportsDir, file)).mtime
        }))
        .sort((a, b) => b.mtime - a.mtime);

      return files.length > 0 ? files[0].path : null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Stage 2: Process and validate monitoring signals
   */
  async processMonitoringSignals(monitoringData) {
    console.log('🔄 Processing monitoring signals...');

    const allResults = [];

    // Combine results from all sources
    monitoringData.monitoring_results.forEach(result => {
      const sourceResults = (result.data.results || []).map(item => ({
        ...item,
        monitoring_source: result.source,
        collected_at: result.timestamp
      }));
      allResults.push(...sourceResults);
    });

    // Deduplicate signals
    const deduplicatedResults = this.deduplicateSignals(allResults);

    // Apply relevance filtering
    const relevantResults = deduplicatedResults.filter(result => {
      const relevanceScore = result.relevance_score || 0;
      const engagementScore = result.engagement_score || 0;

      // Higher threshold for strategic intelligence
      return relevanceScore > 25 || engagementScore > 20;
    });

    console.log(`   📊 Total signals: ${allResults.length}`);
    console.log(`   🔄 After deduplication: ${deduplicatedResults.length}`);
    console.log(`   ✅ Relevant signals: ${relevantResults.length}`);

    return {
      processed_at: new Date().toISOString(),
      total_raw_signals: allResults.length,
      deduplicated_signals: deduplicatedResults.length,
      relevant_signals: relevantResults.length,
      results: relevantResults,
      processing_summary: this.generateProcessingSummary(relevantResults),
      signal_quality: this.assessSignalQuality(relevantResults)
    };
  }

  /**
   * Deduplicate signals across platforms
   */
  deduplicateSignals(signals) {
    const seen = new Map();

    return signals.filter(signal => {
      // Create key based on content similarity
      const contentKey = this.generateContentKey(signal);

      if (seen.has(contentKey)) {
        // Keep the one with higher engagement
        const existing = seen.get(contentKey);
        if ((signal.engagement_score || 0) > (existing.engagement_score || 0)) {
          seen.set(contentKey, signal);
          return true;
        }
        return false;
      }

      seen.set(contentKey, signal);
      return true;
    });
  }

  /**
   * Generate content key for deduplication
   */
  generateContentKey(signal) {
    const title = (signal.title || '').toLowerCase();
    const frameworks = (signal.frameworks || []).sort().join('');

    // Create a simple similarity key
    const normalizedTitle = title
      .replace(/[^\w\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 50);

    return `${frameworks}_${normalizedTitle}`;
  }

  /**
   * Stage 3: Generate strategic intelligence
   */
  async generateStrategicIntelligence(processedData) {
    console.log('🧠 Generating strategic intelligence...');

    const intelligence = await this.intelligenceEngine.processIntelligence(processedData);

    console.log(`   ✅ Generated ${intelligence.contextual_insights.length} contextual insights`);
    console.log(`   ✅ Identified ${intelligence.strategic_synthesis.length} strategic patterns`);
    console.log(`   ✅ Created ${intelligence.prioritized_recommendations.length} recommendations`);

    return intelligence;
  }

  /**
   * Stage 4: Generate decision support and briefings
   */
  async generateDecisionSupport(intelligence, briefingTypes = ['executive_summary']) {
    console.log('📋 Generating decision support...');

    const briefings = [];

    for (const briefingType of briefingTypes) {
      try {
        console.log(`   📄 Creating ${briefingType} briefing...`);
        const briefing = await this.decisionSupport.generateStrategicBriefing(intelligence, briefingType);
        briefings.push({
          type: briefingType,
          briefing: briefing,
          generated_at: new Date().toISOString()
        });
        console.log(`   ✅ ${briefingType} briefing complete`);
      } catch (error) {
        console.log(`   ❌ ${briefingType} briefing failed: ${error.message}`);
      }
    }

    return briefings;
  }

  /**
   * Stage 5: Generate actionable outputs
   */
  async generateActionableOutputs(intelligence, briefings) {
    console.log('📤 Generating actionable outputs...');

    const outputs = {
      summary_dashboard: this.generateSummaryDashboard(intelligence, briefings),
      alert_notifications: this.generateAlertNotifications(intelligence),
      content_recommendations: this.generateContentRecommendations(intelligence),
      competitive_updates: this.generateCompetitiveUpdates(intelligence),
      technical_insights: this.generateTechnicalInsights(intelligence)
    };

    // Save individual outputs
    Object.entries(outputs).forEach(([type, content]) => {
      const outputFile = path.join(this.intelligenceDir, `${type}-${Date.now()}.json`);
      fs.writeFileSync(outputFile, JSON.stringify(content, null, 2));
      console.log(`   📁 ${type}: ${outputFile}`);
    });

    return outputs;
  }

  /**
   * Generate summary dashboard data
   */
  generateSummaryDashboard(intelligence, briefings) {
    return {
      generated_at: new Date().toISOString(),
      intelligence_summary: {
        total_insights: intelligence.contextual_insights.length,
        critical_trends: intelligence.contextual_insights.filter(i => i.trend_indicator === 'critical_trend').length,
        high_priority_actions: intelligence.prioritized_recommendations.filter(a => a.priority === 'high').length,
        competitive_threats: intelligence.strategic_synthesis.filter(s => s.type === 'competitive_threat').length,
        market_opportunities: intelligence.strategic_synthesis.filter(s => s.type === 'market_opportunity').length
      },
      top_recommendations: intelligence.prioritized_recommendations.slice(0, 5).map(rec => ({
        title: rec.title,
        priority: rec.priority,
        timeframe: rec.timeframe,
        impact: rec.expected_impact
      })),
      briefings_available: briefings.map(b => ({
        type: b.type,
        action_items: b.briefing.action_items.length,
        next_review: b.briefing.next_review_date
      })),
      system_status: {
        pipeline_health: 'operational',
        data_quality: intelligence.contextual_insights.length > 5 ? 'good' : 'limited',
        processing_speed: 'normal',
        alert_level: this.calculateSystemAlertLevel(intelligence)
      }
    };
  }

  /**
   * Generate alert notifications for critical items
   */
  generateAlertNotifications(intelligence) {
    const alerts = [];

    // Critical trend alerts
    const criticalTrends = intelligence.contextual_insights.filter(i => i.trend_indicator === 'critical_trend');
    criticalTrends.forEach(trend => {
      alerts.push({
        type: 'critical_trend',
        severity: 'high',
        title: `Critical trend detected: ${trend.frameworks_mentioned.join(', ')}`,
        description: trend.strategic_implication,
        action_required: 'immediate_review',
        frameworks: trend.frameworks_mentioned
      });
    });

    // High-priority competitive threats
    const competitiveThreats = intelligence.strategic_synthesis
      .filter(s => s.type === 'competitive_threat' && s.threat_level === 'critical');

    competitiveThreats.forEach(threat => {
      alerts.push({
        type: 'competitive_threat',
        severity: 'high',
        title: `Critical competitive threat: ${threat.competitor}`,
        description: threat.strategic_response,
        action_required: 'competitive_response',
        competitor: threat.competitor
      });
    });

    return {
      generated_at: new Date().toISOString(),
      total_alerts: alerts.length,
      high_severity: alerts.filter(a => a.severity === 'high').length,
      alerts: alerts
    };
  }

  /**
   * Generate content recommendations
   */
  generateContentRecommendations(intelligence) {
    const recommendations = [];

    // Extract market opportunities for content
    const marketOpportunities = intelligence.strategic_synthesis
      .filter(s => s.type === 'market_opportunity');

    marketOpportunities.forEach(opportunity => {
      recommendations.push({
        type: 'market_opportunity_content',
        topic: opportunity.opportunity_theme,
        suggested_content: `Create content addressing ${opportunity.opportunity_theme} pain points`,
        target_frameworks: opportunity.affected_frameworks,
        priority: opportunity.engagement_level > 25 ? 'high' : 'medium',
        content_formats: ['blog_post', 'tutorial', 'documentation']
      });
    });

    // Competitive positioning content
    const competitiveThreats = intelligence.strategic_synthesis
      .filter(s => s.type === 'competitive_threat');

    competitiveThreats.forEach(threat => {
      recommendations.push({
        type: 'competitive_positioning',
        topic: `Avolve.io vs ${threat.competitor}`,
        suggested_content: threat.strategic_response,
        competitor: threat.competitor,
        priority: threat.threat_level === 'critical' ? 'high' : 'medium',
        content_formats: ['comparison', 'benchmark', 'case_study']
      });
    });

    return {
      generated_at: new Date().toISOString(),
      total_recommendations: recommendations.length,
      high_priority: recommendations.filter(r => r.priority === 'high').length,
      recommendations: recommendations
    };
  }

  /**
   * Generate competitive intelligence updates
   */
  generateCompetitiveUpdates(intelligence) {
    return {
      generated_at: new Date().toISOString(),
      competitive_landscape: intelligence.competitive_landscape,
      active_threats: intelligence.strategic_synthesis.filter(s => s.type === 'competitive_threat'),
      positioning_recommendations: intelligence.avolve_positioning,
      market_position_changes: this.assessPositionChanges(intelligence)
    };
  }

  /**
   * Generate technical insights for development teams
   */
  generateTechnicalInsights(intelligence) {
    const technicalInsights = [];

    // Technology trend insights
    const techTrends = intelligence.strategic_synthesis
      .filter(s => s.type === 'technology_shift');

    techTrends.forEach(trend => {
      technicalInsights.push({
        type: 'technology_trend',
        technology: trend.technology,
        impact_level: trend.strategic_impact,
        recommendation: trend.recommended_response,
        timeline: trend.timeframe
      });
    });

    return {
      generated_at: new Date().toISOString(),
      total_insights: technicalInsights.length,
      insights: technicalInsights,
      framework_health: this.assessFrameworkHealth(intelligence)
    };
  }

  // Helper methods
  calculatePipelineMetrics(monitoringData, intelligence, briefings) {
    return {
      data_sources: monitoringData.monitoring_results.length,
      signals_processed: monitoringData.total_signals,
      insights_generated: intelligence.contextual_insights.length,
      recommendations_created: intelligence.prioritized_recommendations.length,
      briefings_generated: briefings.length,
      processing_efficiency: intelligence.contextual_insights.length / Math.max(monitoringData.total_signals, 1),
      strategic_value_score: this.calculateStrategicValue(intelligence)
    };
  }

  calculateStrategicValue(intelligence) {
    const highPriorityActions = intelligence.prioritized_recommendations.filter(a => a.priority === 'high').length;
    const criticalTrends = intelligence.contextual_insights.filter(i => i.trend_indicator === 'critical_trend').length;
    const competitiveThreats = intelligence.strategic_synthesis.filter(s => s.type === 'competitive_threat').length;

    return (highPriorityActions * 3) + (criticalTrends * 2) + competitiveThreats;
  }

  calculateNextPipelineTime(intelligence) {
    const criticalTrends = intelligence.contextual_insights.filter(i => i.trend_indicator === 'critical_trend').length;

    if (criticalTrends > 2) {
      // Run again in 2 hours if critical trends detected
      return new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();
    }

    // Standard 6-hour cycle
    return new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString();
  }

  generateProcessingSummary(signals) {
    const platforms = [...new Set(signals.map(s => s.platform))];
    const frameworks = [...new Set(signals.flatMap(s => s.frameworks || []))];
    const categories = [...new Set(signals.flatMap(s => s.categories || []))];

    return {
      platforms_covered: platforms.length,
      frameworks_mentioned: frameworks.length,
      content_categories: categories.length,
      top_platforms: platforms,
      top_frameworks: frameworks.slice(0, 10),
      avg_relevance: signals.reduce((sum, s) => sum + (s.relevance_score || 0), 0) / signals.length,
      avg_engagement: signals.reduce((sum, s) => sum + (s.engagement_score || 0), 0) / signals.length
    };
  }

  assessSignalQuality(signals) {
    const highRelevance = signals.filter(s => (s.relevance_score || 0) > 70).length;
    const highEngagement = signals.filter(s => (s.engagement_score || 0) > 30).length;
    const multiPlatform = signals.filter(s => s.cross_platform_correlation?.length > 0).length;

    return {
      quality_score: Math.round(((highRelevance + highEngagement + multiPlatform) / (signals.length * 3)) * 100),
      high_relevance_signals: highRelevance,
      high_engagement_signals: highEngagement,
      cross_validated_signals: multiPlatform
    };
  }

  calculateSystemAlertLevel(intelligence) {
    const criticalThreats = intelligence.strategic_synthesis
      .filter(s => s.type === 'competitive_threat' && s.threat_level === 'critical').length;

    const criticalTrends = intelligence.contextual_insights
      .filter(i => i.trend_indicator === 'critical_trend').length;

    if (criticalThreats > 0 || criticalTrends > 2) return 'high';
    if (criticalTrends > 0) return 'medium';
    return 'low';
  }

  assessPositionChanges(intelligence) {
    return {
      competitive_pressure: intelligence.strategic_synthesis.filter(s => s.type === 'competitive_threat').length,
      market_opportunities: intelligence.strategic_synthesis.filter(s => s.type === 'market_opportunity').length,
      position_trend: 'stable', // Would need historical data for real assessment
      strategic_clarity: intelligence.avolve_positioning.positioning_confidence
    };
  }

  assessFrameworkHealth(intelligence) {
    const frameworkMentions = {};

    intelligence.contextual_insights.forEach(insight => {
      insight.frameworks_mentioned.forEach(framework => {
        if (!frameworkMentions[framework]) {
          frameworkMentions[framework] = { count: 0, sentiment: 0 };
        }
        frameworkMentions[framework].count++;
        // Simple sentiment based on trend indicator
        if (insight.trend_indicator === 'critical_trend') frameworkMentions[framework].sentiment -= 1;
        if (insight.trend_indicator === 'emerging_trend') frameworkMentions[framework].sentiment += 1;
      });
    });

    return Object.entries(frameworkMentions).map(([framework, data]) => ({
      framework,
      activity_level: data.count > 5 ? 'high' : data.count > 2 ? 'medium' : 'low',
      sentiment_indicator: data.sentiment > 0 ? 'positive' : data.sentiment < 0 ? 'negative' : 'neutral',
      health_status: data.count > 3 && data.sentiment >= 0 ? 'healthy' : 'monitor'
    }));
  }

  /**
   * Run quick intelligence update (monitoring + processing only)
   */
  async runQuickUpdate(sources = ['comprehensive']) {
    console.log('⚡ Running Quick Intelligence Update');
    console.log('=' .repeat(50));

    try {
      const monitoringData = await this.runEnvironmentalSensing(sources);
      const processedData = await this.processMonitoringSignals(monitoringData);

      const quickUpdate = {
        update_id: `quick_${Date.now()}`,
        completed_at: new Date().toISOString(),
        monitoring_data: monitoringData,
        processed_signals: processedData,
        summary: {
          new_signals: processedData.relevant_signals,
          quality_score: processedData.signal_quality.quality_score,
          platforms_active: monitoringData.sources_processed.length
        }
      };

      const updateFile = path.join(this.intelligenceDir, `quick-update-${quickUpdate.update_id}.json`);
      fs.writeFileSync(updateFile, JSON.stringify(quickUpdate, null, 2));

      console.log(`✅ Quick update complete: ${updateFile}`);
      console.log(`📊 New signals: ${processedData.relevant_signals.length}`);

      return quickUpdate;

    } catch (error) {
      console.error('❌ Quick update failed:', error.message);
      throw error;
    }
  }

  /**
   * Test full pipeline with sample data
   */
  async testPipeline() {
    console.log('🧪 Testing Intelligence Pipeline');
    console.log('=' .repeat(50));

    // Mock monitoring data for testing
    const testMonitoringData = {
      sensing_completed_at: new Date().toISOString(),
      sources_processed: ['test'],
      successful_sources: 1,
      monitoring_results: [{
        source: 'test',
        data: {
          results: [
            {
              id: 'test1',
              platform: 'reddit',
              title: 'Next.js 15 Turbopack performance issues',
              frameworks: ['next.js'],
              categories: ['performance', 'issue'],
              relevance_score: 75,
              engagement_score: 45,
              priority: 'high'
            },
            {
              id: 'test2',
              platform: 'youtube',
              title: 'React 19 Compiler breakthrough',
              frameworks: ['react'],
              categories: ['release', 'performance'],
              relevance_score: 85,
              engagement_score: 60,
              priority: 'high'
            }
          ]
        },
        timestamp: new Date().toISOString()
      }],
      total_signals: 2
    };

    const processedData = await this.processMonitoringSignals(testMonitoringData);
    const intelligence = await this.generateStrategicIntelligence(processedData);
    const briefings = await this.generateDecisionSupport(intelligence, ['executive_summary']);
    const outputs = await this.generateActionableOutputs(intelligence, briefings);

    console.log('\n✅ Pipeline test complete');
    console.log(`📊 Insights generated: ${intelligence.contextual_insights.length}`);
    console.log(`🎯 Recommendations: ${intelligence.prioritized_recommendations.length}`);
    console.log(`📋 Briefings: ${briefings.length}`);

    return { intelligence, briefings, outputs };
  }
}

// CLI interface
async function main() {
  const orchestrator = new IntelligencePipelineOrchestrator();

  const command = process.argv[2] || 'test';

  switch (command) {
    case 'full':
      const sources = process.argv[3] ? process.argv[3].split(',') : ['comprehensive'];
      const briefingTypes = process.argv[4] ? process.argv[4].split(',') : ['executive_summary'];
      await orchestrator.runFullPipeline({ sources, briefingTypes });
      break;

    case 'quick':
      const quickSources = process.argv[3] ? process.argv[3].split(',') : ['comprehensive'];
      await orchestrator.runQuickUpdate(quickSources);
      break;

    case 'test':
      await orchestrator.testPipeline();
      break;

    default:
      console.log(`
Intelligence Pipeline Orchestrator Commands:

  full   - Run complete intelligence pipeline
  quick  - Run quick monitoring update only
  test   - Test pipeline with sample data

Examples:
  node intelligence-pipeline-orchestrator.js full comprehensive,reddit executive_summary,tactical_briefing
  node intelligence-pipeline-orchestrator.js quick youtube,github
  node intelligence-pipeline-orchestrator.js test
      `);
  }
}

if (require.main === module) {
  main();
}

module.exports = { IntelligencePipelineOrchestrator };