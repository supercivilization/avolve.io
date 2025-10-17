import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Social Media System - Modern Platform Strategies for Late 2025",
  description: "Complete social media system: algorithm changes, authenticity-first content, short-form video dominance, micro-influencer strategies, AI-enhanced workflows. Production-tested with Next.js 16 + React 19.2. Updated October 2025.",
  keywords: ["social media 2025", "TikTok algorithm", "Instagram Reels", "YouTube Shorts", "authenticity marketing", "micro-influencers", "short-form video", "AI content"],
};

export default function SocialSystemPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Systems", url: "/systems" },
        { name: "Social", url: "/systems/social" }
      ]} />

      <main className="max-w-6xl mx-auto px-4 py-12">
        <time className="text-sm text-muted-foreground" dateTime="2025-10-05">Last updated: October 17, 2025</time>

        <article className="mt-4">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Social Media System</h1>
          <p className="text-xl text-foreground mb-12">
            Modern platform strategies for late 2025: authenticity-first content, algorithm optimization, and AI-enhanced workflows
          </p>

          <section id="landscape" className="mb-12 bg-muted/30 border-l-4 border-border p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">The 2025 Social Landscape</h2>
            <p className="text-foreground mb-4">
              <strong>Social platforms now function as search engines</strong>, with 40% of Gen Z preferring TikTok/Instagram over Google. AI-powered recommendation systems replaced chronological feeds. Authenticity and meaningful engagement trump vanity metrics.
            </p>
            <ul className="space-y-2 text-foreground">
              <li>• Influencer marketing: <strong>$32.55B in 2025</strong> (up from $24B in 2024, 35.63% growth)</li>
              <li>• Micro-influencers outperform: Nano-influencers achieve <strong>10.3% engagement</strong> on TikTok</li>
              <li>• Trend-chasing is over: 93% need cultural relevance, but 1/3 find trend-chasing "embarrassing"</li>
              <li>• Trends lose impact within <strong>48 hours</strong> (27% report)</li>
            </ul>
          </section>

          <section id="platform-algorithms" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">2025 Platform Algorithm Overhauls</h2>

            <div className="space-y-6">
              <div className="border-l-4 border-black pl-4">
                <h3 className="text-xl font-bold mb-3">TikTok: Search-First Platform</h3>
                <ul className="space-y-1 text-foreground">
                  <li>• First 3 seconds determine success: <strong>98% more engagement</strong> with immediate hooks</li>
                  <li>• Original creators: 67% more watch time, <strong>40x greater follower growth</strong></li>
                  <li>• Optimal length: 30-90s for completion (supports 60-min uploads)</li>
                  <li>• SEO matching: Captions, on-screen text, spoken words heavily weighted</li>
                  <li>• Post 4x weekly with 12-hour gaps</li>
                </ul>
              </div>

              <div className="border-l-4 border-border pl-4">
                <h3 className="text-xl font-bold mb-3">Instagram: DM Shares as Strongest Signal</h3>
                <ul className="space-y-1 text-foreground">
                  <li>• <strong>DM shares are #1 ranking signal</strong> (Adam Mosseri confirmation)</li>
                  <li>• Over 50% of Feed from non-followed accounts (AI recommendations)</li>
                  <li>• Reels dominate: Completion rates + audio clicks drive visibility</li>
                  <li>• Carousels advantage: Unseen slides = "new content"</li>
                  <li>• Hashtags reduced: 3-5 max (following removed Dec 2024)</li>
                  <li>• Add trending audio to ALL posts including static images</li>
                </ul>
              </div>

              <div className="border-l-4 border-border pl-4">
                <h3 className="text-xl font-bold mb-3">YouTube: Promoting Small Channels</h3>
                <ul className="space-y-1 text-foreground">
                  <li>• Explicitly helping creators under 500 subscribers</li>
                  <li>• Increased weight on unique viewers + returning audiences</li>
                  <li>• Long-form thrives: 25+ minutes for connected TV</li>
                  <li>• Shorts expanded to 3 minutes (separate algorithm)</li>
                  <li>• Optimal Shorts: 24-31 seconds for completion</li>
                </ul>
              </div>

              <div className="border-l-4 border-border pl-4">
                <h3 className="text-xl font-bold mb-3">LinkedIn: Organic Performance Dropped</h3>
                <ul className="space-y-1 text-foreground">
                  <li>• Views down <strong>50%</strong>, engagement down 25%, follower growth down 59%</li>
                  <li>• Video gets 5x engagement, <strong>live video gets 24x</strong></li>
                  <li>• Post 1-3x weekly with 12-hour minimum gaps</li>
                  <li>• Native content over links (URLs in comments)</li>
                </ul>
              </div>

              <div className="border-l-4 border-border pl-4">
                <h3 className="text-xl font-bold mb-3">Facebook: AI Recommendations</h3>
                <ul className="space-y-1 text-foreground">
                  <li>• <strong>Up to 50% of Feed</strong> is recommended non-followed content</li>
                  <li>• 100+ AI prediction models power recommendations</li>
                  <li>• Young adults spend 60%+ time watching videos</li>
                  <li>• Vertical video essential (all classifies as Reels)</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="content-formats" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Content Format Strategies</h2>

            <div className="space-y-6">
              <div className="bg-muted/30 border-l-4 border-border p-4 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Short-Form Video: Highest ROI</h3>
                <p className="text-foreground mb-3">
                  <strong>46% of marketers rate video most important,</strong> 30% say short-form brings highest returns.
                </p>
                <table className="w-full border-collapse text-sm mt-3">
                  <thead className="bg-muted/30">
                    <tr>
                      <th className="border border-border/40 px-3 py-2 text-left">Platform</th>
                      <th className="border border-border/40 px-3 py-2 text-left">Optimal Length</th>
                      <th className="border border-border/40 px-3 py-2 text-left">Nano Engagement</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border/40 px-3 py-2">TikTok</td>
                      <td className="border border-border/40 px-3 py-2">5-9s OR 60+ (avoid 10-59s)</td>
                      <td className="border border-border/40 px-3 py-2"><strong>10.3%</strong></td>
                    </tr>
                    <tr>
                      <td className="border border-border/40 px-3 py-2">Instagram</td>
                      <td className="border border-border/40 px-3 py-2">30-90s for completion</td>
                      <td className="border border-border/40 px-3 py-2"><strong>1.73%</strong> (3x macro)</td>
                    </tr>
                    <tr>
                      <td className="border border-border/40 px-3 py-2">YouTube</td>
                      <td className="border border-border/40 px-3 py-2">24-31s (max 3 min)</td>
                      <td className="border border-border/40 px-3 py-2">Focused &gt; rambling</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-muted/30 border-l-4 border-border p-4 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Long-Form Comeback</h3>
                <ul className="space-y-1 text-foreground">
                  <li>• 2/3 of marketers believe long-form will rival short-form in 2025</li>
                  <li>• Complex products need more than 60 seconds</li>
                  <li>• <strong>40.4% of content will be long-form in 2025</strong></li>
                  <li>• Hybrid: Short for hooks, long for deep dives, repurpose long into shorts</li>
                </ul>
              </div>

              <div className="bg-muted/30 border-l-4 border-border p-4 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Live Streaming: Rising Star</h3>
                <ul className="space-y-1 text-foreground">
                  <li>• <strong>52.4% of marketers favor</strong> live streaming (19.7% CAGR 2025-2030)</li>
                  <li>• LinkedIn live: <strong>24x engagement</strong> vs standard posts</li>
                  <li>• TikTok Shop live shopping drives direct conversions</li>
                  <li>• Uses: Product launches, Q&A, behind-the-scenes, events</li>
                </ul>
              </div>

              <div className="bg-muted border-l-4 border-border p-4 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Authenticity Beats Polish</h3>
                <ul className="space-y-1 text-foreground">
                  <li>• <strong>90% value authenticity</strong> when choosing brands</li>
                  <li>• UGC trusted <strong>9.8x more</strong> than brand-created content</li>
                  <li>• <strong>79% of Gen Z distrust brands with no visible flaws</strong></li>
                  <li>• Raw content outperforms corporate perfectionism</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="micro-influencers" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Micro-Influencer Revolution</h2>
            <div className="bg-muted border-l-4 border-border p-4 rounded-lg">
              <p className="text-foreground mb-4">
                <strong>Marketers see more success with influencers under 100K followers.</strong> Industry: $32.55B in 2025.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold mb-2">Why They Win:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• 1.73% engagement vs 0.61% macro (Instagram)</li>
                    <li>• Stronger trust with niche audiences</li>
                    <li>• More flexible, cost-effective</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Best Practices:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Work with 1-5 strategic influencers (49.6%)</li>
                    <li>• Build long-term relationships (47% emphasize)</li>
                    <li>• Instagram (57.1%) + TikTok (51.6%)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section id="ai-integration" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">AI Integration (70/30 Rule)</h2>
            <div className="bg-muted/30 border-l-4 border-border p-4 rounded-lg mb-4">
              <p className="text-foreground text-lg font-bold">
                <strong>70% human strategy/creativity, 30% AI execution/optimization</strong>
              </p>
              <p className="text-foreground mt-2">
                92% say AI impacted roles, 66.4% report improved outcomes. But 55% of consumers trust human-created content more.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-bold mb-2">✅ AI Excels At</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Content ideation (35%)</li>
                  <li>• Data analysis (30%)</li>
                  <li>• Workflow automation (20%)</li>
                  <li>• Research (15%)</li>
                  <li>• 56% create short-form videos</li>
                </ul>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-bold mb-2">❌ Humans Win</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Strategic direction</li>
                  <li>• Final content creation</li>
                  <li>• Brand voice consistency</li>
                  <li>• Emotional connection</li>
                  <li>• Cultural sensitivity</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="production-gotchas" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Production Gotchas</h2>

            <div className="space-y-6">
              <div className="bg-stone-50 dark:bg-stone-950/20 border-l-4 border-stone-600 dark:border-stone-700 p-4 rounded-lg">
                <h3 className="text-xl font-bold mb-3">❌ Following Trends Backfires</h3>
                <p className="text-foreground mb-2"><strong>The Problem:</strong> Trends lose impact within 48 hours, 1/3 find trend-chasing "embarrassing"</p>
                <p className="text-foreground mb-2"><strong>What Breaks:</strong> Brand authenticity, audience trust, engagement rates</p>
                <p className="text-foreground"><strong>The Fix:</strong> Focus on cultural relevance (93% need) over trend replication. Create original content aligned with brand voice.</p>
              </div>

              <div className="bg-stone-50 dark:bg-stone-950/20 border-l-4 border-stone-600 dark:border-stone-700 p-4 rounded-lg">
                <h3 className="text-xl font-bold mb-3">❌ Polished Content Underperforms</h3>
                <p className="text-foreground mb-2"><strong>The Problem:</strong> 79% of Gen Z distrust brands with no visible flaws, UGC trusted 9.8x more</p>
                <p className="text-foreground mb-2"><strong>What Breaks:</strong> Engagement, trust signals, algorithm performance (platforms favor authentic content)</p>
                <p className="text-foreground"><strong>The Fix:</strong> Raw, authentic content. Show process, mistakes, behind-the-scenes. Let micro-influencers create UGC.</p>
              </div>

              <div className="bg-stone-50 dark:bg-stone-950/20 border-l-4 border-stone-600 dark:border-stone-700 p-4 rounded-lg">
                <h3 className="text-xl font-bold mb-3">❌ Wrong Video Length Kills Reach</h3>
                <p className="text-foreground mb-2"><strong>The Problem:</strong> TikTok: avoid 10-59s (dead zone). Instagram: 30-90s optimal. YouTube Shorts: 24-31s.</p>
                <p className="text-foreground mb-2"><strong>What Breaks:</strong> Completion rates (primary algorithm signal), resulting in zero reach</p>
                <p className="text-foreground"><strong>The Fix:</strong> TikTok: 5-9s OR 60+ seconds. Instagram Reels: 30-90s. YouTube Shorts: 24-31s. Test and optimize per platform.</p>
              </div>
            </div>
          </section>

          <section id="what-we-learned" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">What We've Learned</h2>

            <div className="bg-gray-50 dark:bg-gray-950/20 border-l-4 border-gray-600 dark:border-gray-500 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">💡 Insight: Social Platforms ARE Search Engines</h3>
              <p className="text-foreground mb-4">
                <strong>40% of Gen Z prefer TikTok/Instagram over Google for search.</strong> This fundamentally changes content strategy.
              </p>
              <div className="space-y-2 text-foreground">
                <p><strong>Decision Impact:</strong> Every post needs SEO optimization (captions, on-screen text, spoken words heavily weighted)</p>
                <p><strong>Implementation:</strong> TikTok captions must match spoken words. Instagram: Add trending audio to ALL posts including static images.</p>
                <p><strong>Result:</strong> Content becomes discoverable through platform search, not just following/algorithm recommendations.</p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-950/20 border-l-4 border-gray-600 dark:border-gray-500 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">💡 Insight: Micro-Influencers Outperform at 1/10th Cost</h3>
              <p className="text-foreground mb-4">
                <strong>Nano-influencers achieve 10.3% engagement on TikTok vs macro-influencers.</strong> Instagram: 1.73% vs 0.61%.
              </p>
              <div className="space-y-2 text-foreground">
                <p><strong>Decision Impact:</strong> Work with 1-5 strategic influencers under 100K followers, build long-term relationships</p>
                <p><strong>Implementation:</strong> Focus on Instagram (57.1%) + TikTok (51.6%), prioritize niche audience alignment over follower count</p>
                <p><strong>Result:</strong> Higher engagement, stronger trust, more flexible, significantly more cost-effective ($32.55B industry 2025)</p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-950/20 border-l-4 border-gray-600 dark:border-gray-500 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">💡 Insight: AI Is a Tool, Not a Replacement (70/30 Rule)</h3>
              <p className="text-foreground mb-4">
                <strong>92% say AI impacted roles, but 55% of consumers trust human-created content more.</strong>
              </p>
              <div className="space-y-2 text-foreground">
                <p><strong>Decision Impact:</strong> 70% human strategy/creativity, 30% AI execution/optimization</p>
                <p><strong>Implementation:</strong> AI for ideation (35%), data analysis (30%), workflow automation (20%), research (15%). Humans for strategy, final creation, brand voice, emotional connection, cultural sensitivity.</p>
                <p><strong>Result:</strong> 66.4% report improved outcomes while maintaining authentic brand voice and audience trust</p>
              </div>
            </div>
          </section>

          <section id="used-in" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Used In</h2>
            <p className="text-foreground mb-4">
              Social media system patterns are actively being implemented across our portfolio. Check back after project launches in Q4 2025 for specific implementation examples.
            </p>
          </section>

          <section id="for-ai" className="mb-12 border-t pt-8 bg-muted/30 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">🤖 For AI Assistants</h2>
            <ul className="space-y-2 text-foreground">
              <li><strong>Platform optimization:</strong> TikTok (3s hook, captions), Instagram (DM shares, 3-5 hashtags), YouTube (niche focus), LinkedIn (1-3 posts/week), Facebook (vertical video)</li>
              <li><strong>Authenticity first:</strong> 90% value authenticity, UGC trusted 9.8x more, 79% of Gen Z distrust perfect brands</li>
              <li><strong>Content mix:</strong> Short-form (46% most important), long-form resurging (40.4%), live streaming (52.4% favor, 24x LinkedIn engagement)</li>
              <li><strong>Micro-influencers:</strong> Under 100K followers (10.3% TikTok engagement), long-term relationships, Instagram (57.1%) + TikTok (51.6%)</li>
              <li><strong>AI integration:</strong> 70% human strategy, 30% AI execution. Use AI for ideation/analysis, humans for final creation</li>
            </ul>
          </section>

          <section id="relationships" className="mb-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">Stack Relationships</h2>
            <ul className="space-y-2 text-foreground">
              <li>• <strong>Implements <Link href="/systems" className="text-primary hover:underline">Systems</Link>:</strong> Coordinates platforms, content, algorithms, analytics</li>
              <li>• <strong>Delivers <Link href="/solutions" className="text-primary hover:underline">Solutions</Link>:</strong> Social visibility drives solutions, authentic engagement builds authority</li>
              <li>• <strong>Complements <Link href="/systems/search" className="text-primary hover:underline">SEO</Link>:</strong> 40% of Gen Z search social first, platforms function as search engines</li>
              <li>• <strong>Uses <Link href="/software" className="text-primary hover:underline">Software</Link>:</strong> Next.js for social previews, React for embeds</li>
            </ul>
          </section>

          <nav className="mt-12 pt-8 border-t border-border">
            <Link href="/" className="text-muted-foreground hover:underline">← Back to Home</Link>
          </nav>
        </article>
      </main>
    </>
  );
}
