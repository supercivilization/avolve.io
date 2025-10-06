# Avolve.io: Three-Focus Strategy
**Date:** October 6, 2025
**Final Strategic Framework**

---

## Strategic Overview

All considerations distilled into three clear, actionable focuses that build on each other.

---

## PRIMARY FOCUS: Working Reference Hub

**"The knowledge base you + Claude Code actually use to ship faster"**

### What This Means

**Core function:**
- Fast version lookup with links to official docs
- Integration patterns filling gaps between official docs
- Quick reference during active development
- Optimized for both human browsing and AI citation

**Content priorities:**
1. **Current Stack Versions** - Quick lookup table
   - Next.js 15.5.4 → [Official Docs] [GitHub] [Changelog]
   - React 19.2.0 → [Official Docs] [GitHub] [Changelog]
   - Supabase 2.58.0 → [Official Docs] [API Ref]
   - TypeScript 5.9.3 → [Official Docs] [Handbook]
   - Tailwind 4.1.14 → [Official Docs] [GitHub]
   - All with "Last verified: Oct 6, 2025"

2. **Integration Patterns** - How tools work TOGETHER
   - Next.js + Supabase Auth (complete working pattern)
   - Next.js + Stripe Payments (complete working pattern)
   - Next.js + Vercel AI SDK (complete working pattern)
   - Supabase + Vercel AI (RAG pattern)
   - Each with: working code, live demo, last tested date

3. **Fast Lookup Tables**
   - Service pricing comparison (Vercel, Supabase, Stripe, etc.)
   - Compatibility matrix (what versions work together)
   - Decision helpers (when to use X vs Y)
   - Cost calculators (estimate stack cost)

### 5S Framework Application

**How 5S serves the reference hub:**

**Solutions →** "What can I build?"
- Quick patterns: SaaS, E-commerce, Dashboard, AI Agent
- Links to complete examples
- Template repositories

**Systems →** "How do I connect these?"
- Integration guides (auth, payments, real-time, etc.)
- Architecture patterns
- Working code examples

**Software →** "What versions work together?"
- Current verified stack
- Compatibility matrix
- Official doc links

**Services →** "What should I buy?"
- Pricing comparison
- When to use each
- Cost estimation

**Support →** "How do I fix this?"
- Production runbooks
- Debugging guides
- Common errors + solutions

### Success Metrics

**Primary indicator:** Do you + Claude Code reference this daily?

**Measurable:**
- ✅ Used during every development session
- ✅ Faster than searching official docs
- ✅ Accurate (links work, versions current)
- ✅ Complete (covers your common tasks)

**Secondary indicators:**
- Return visitor rate >40% (people come back)
- Session duration >2 minutes (found useful info)
- Low bounce rate <60% (got what they needed)

### Content Requirements

**Must have (Week 1):**
- Current stack versions with official links
- 3 core integration patterns (auth, payments, AI)
- Service pricing comparison
- Basic troubleshooting runbooks

**Should have (Month 1):**
- 5 integration patterns
- Compatibility matrix
- Decision helpers
- 10 production runbooks

**Nice to have (Month 3):**
- 10 integration patterns
- Cost calculators
- Migration guides
- Comprehensive runbooks

### Why This Is Primary

**Immediate utility:**
- Solves problem you have TODAY (fast reference during dev)
- Self-serving (you benefit directly)
- Measurable value (time saved)

**Foundation for everything else:**
- Reference must be accurate before insights are valuable
- Working patterns must exist before case studies make sense
- Can't showcase projects without documenting the stack they use

**Sustainable:**
- You maintain because you use it
- Updates driven by your own needs
- Natural content refresh

---

## SECONDARY FOCUS: Novel Insights + Case Studies

**"Share what you learn building with Claude Code that others don't know yet"**

### What This Means

**Two interconnected content types:**

#### 1. Project Case Studies
**Real applications analyzed through 5S framework**

**Each case study includes:**
- What it is (user-facing description)
- Why you built it (problem solved)
- How it's built (5S analysis):
  - Solutions: What users get
  - Systems: Architecture decisions
  - Software: Tech stack with versions
  - Services: External dependencies + costs
  - Support: Production issues + monitoring
- Live demo (if shareable)
- GitHub repo (if shareable)
- Evolution log (what changed and why)
- Lessons learned (honest retrospective)

**Value:**
- Proves patterns work (deployed in production)
- Shows complete integration (all 5 layers)
- Demonstrates real decisions (not theoretical)
- Provides working starting point (template)

#### 2. Novel Insights
**Discoveries from AI-human collaboration**

**Categories of insights:**

**A. AI-Human Development Patterns**
- How you + Claude Code actually work together
- Prompting patterns that yield better code
- When to trust AI vs verify manually
- Workflow optimizations discovered
- Code generation patterns that work

**B. Integration Discoveries**
- Non-obvious interactions between tools
- "Works in docs but breaks in reality"
- Edge cases from specific version combinations
- Gotchas not documented officially

**C. Production Learnings**
- "Works in dev, breaks in prod because..."
- Cost surprises (expected X, paid Y)
- Performance cliffs (slow at exactly N users)
- Security gotchas discovered in production

**D. Stack Evolution**
- Migration reality (Next.js 14→15, React 18→19)
- What actually broke vs what docs said
- Upgrade path discoveries
- Version compatibility lessons

**E. Decision Rationale**
- Why you chose X over Y (and were you right?)
- "Docs recommend X, but Y worked better because..."
- Architecture decisions with retrospective

**Each insight includes:**
- Context: What were you trying to do?
- Discovery: What did you learn?
- Why it matters: What does this enable/prevent?
- How to apply: Practical usage
- Evidence: Link to code/project where this applies
- 5S analysis: Which layers does this touch?

### How Projects + Insights Connect

**The flywheel:**
```
Build project with Claude Code
    ↓
Discover non-obvious insights while building
    ↓
Document both: case study + insights
    ↓
Extract reusable patterns for reference hub
    ↓
Next project benefits from previous learnings
    ↓
More projects → More insights → Better reference
```

**Example flow:**
1. You build SaaS app with Supabase auth
2. Discover: "RLS policies fail silently in dev but throw in prod"
3. Document: Case study (SaaS app) + Insight (RLS debugging)
4. Extract: Pattern for reference hub (how to debug RLS)
5. Next project: Use the pattern, avoid the gotcha

### Success Metrics

**Primary indicator:** Are you capturing insights within 1 week of discovery?

**Measurable:**
- ✅ 1+ new insight per week (while actively building)
- ✅ 1+ project case study per month
- ✅ Insights linked to specific projects/code
- ✅ Retrospectives honest (include failures)

**External validation:**
- AI assistants cite your insights
- Other developers reference them
- GitHub stars on project templates
- "This saved me hours" feedback

### Content Structure

**Projects section:**
- `/projects` - Active project showcase
- Each project gets full case study page
- Template: Full 5S analysis + insights + lessons

**Insights section:**
- `/insights` - Novel discoveries collection
- Organized by category (AI-dev, integration, production, etc.)
- Tagged by 5S layer
- Searchable by problem/tool

**Integration with Primary:**
- Insights populate runbooks (Support)
- Projects validate patterns (Systems)
- Case studies prove stack (Software)
- Real costs inform decisions (Services)

### Why This Is Secondary

**Builds on Primary:**
- Can't share insights without working reference
- Projects reference the stack defined in Primary
- Insights assume understanding of base patterns

**Requires active development:**
- Only generates when building projects
- Can't force insights (emerge naturally)
- Quality over frequency

**Serves Primary:**
- Insights become runbooks (feed back to reference)
- Projects validate compatibility (update reference)
- Discoveries improve patterns (enhance reference)

---

## TERTIARY FOCUS: AI-Native Discoverability

**"Make this citeable by AI assistants and discoverable through AI-mediated search"**

### What This Means

**Technical foundation for AI distribution:**

#### 1. Schema.org Structured Data
**Machine-readable markup for all content**

**Current (already implemented):**
- ✅ WebSite schema (site-level)
- ✅ TechArticle schema (content pages)
- ✅ Organization/Person schema (authority)
- ✅ BreadcrumbList (navigation)

**Enhance for AI:**
- SoftwareSourceCode schema (project repositories)
- HowTo schema (integration patterns with steps)
- FAQPage schema (troubleshooting)
- SoftwareApplication schema (individual tools)
- CreativeWork schema (insights/blog-style content)

**Quality markers:**
- datePublished (when created)
- dateModified (last verified)
- author (attribution)
- dependencies (software versions)
- codeRepository (link to working code)

#### 2. Technical SEO Excellence
**Fast, accessible, crawlable**

**Performance:**
- Core Web Vitals optimized
- Fast page loads (static generation)
- Minimal JavaScript
- Efficient CSS

**Accessibility:**
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation
- Screen reader tested

**Crawlability:**
- Clean URL structure
- Sitemap.xml (with priorities)
- robots.txt optimized
- Internal linking strategy
- Canonical URLs

#### 3. AI Citation Optimization
**Make it easy for AI to cite accurately**

**Content structure:**
- Clear headings (H1, H2, H3 hierarchy)
- Permanent IDs on sections (#auth-system)
- "Last verified" dates prominent
- Version numbers explicit
- Source attribution clear

**Citation format examples:**
```
"Based on Avolve.io's Next.js + Supabase auth pattern
(verified October 2025)"

"According to production case study at avolve.io/projects/saas-app,
this pattern handles 10K users at $25/month"

"Avolve.io documents this common failure mode in their
support runbook: [link]"
```

**Citation helpers:**
- Suggested citation format on each page
- Permanent URLs (never break links)
- Version-specific content (Next.js 15.5.4, not "latest")
- Clear attribution (who, when, what)

#### 4. Authoritative Linking
**Route to official sources, build authority**

**Outbound links:**
- All official docs linked
- All GitHub repos linked
- All pricing pages linked
- All changelogs linked

**This builds authority:**
- Search engines see expert curation
- AI assistants trust verified routing
- Users appreciate comprehensive linking
- Positions as "integration layer"

**Inbound links (over time):**
- GitHub repos link back (via templates)
- Blog posts reference patterns
- Social shares from users
- AI assistant citations

### Implementation Checklist

**Week 1: Foundation**
- [ ] Validate existing schema.org markup
- [ ] Add missing schema types (HowTo, SoftwareSourceCode)
- [ ] Add "Last verified" dates to all content
- [ ] Enhance sitemap.xml with priorities
- [ ] Add structured citation format to pages

**Month 1: Enhancement**
- [ ] Core Web Vitals optimization
- [ ] Accessibility audit (Lighthouse, axe)
- [ ] Internal linking strategy
- [ ] Canonical URLs verified
- [ ] robots.txt optimization

**Month 3: Distribution**
- [ ] Submit to AI tool indexes (if available)
- [ ] Monitor AI citations (track mentions)
- [ ] Backlink building (share templates, insights)
- [ ] Community engagement (respond to usage)

### Success Metrics

**Primary indicator:** Are AI assistants citing avolve.io?

**Measurable:**
- ✅ Schema.org validation passes (Google Rich Results)
- ✅ Core Web Vitals green across all pages
- ✅ Indexed pages >90% (Search Console)
- ✅ AI citations tracked (manually monitor)

**Leading indicators:**
- Search ranking for "[tech] integration pattern" queries
- Return visitor rate (people bookmark it)
- Social shares of insights
- Template repository stars

**Lagging indicators:**
- Domain authority score increases
- Regular AI assistant citations
- Organic search traffic growth
- Featured in "best resources" lists

### Why This Is Tertiary

**Depends on Primary + Secondary:**
- Can't optimize empty content (need reference hub)
- Can't cite without insights (need unique value)
- Structure without substance fails

**Long-term play:**
- Authority builds slowly
- AI citation patterns emerge over months
- SEO compounds over time

**Not user-facing:**
- Users don't care about schema.org
- Value is invisible infrastructure
- Enables distribution, not content

**Serves Primary + Secondary:**
- Makes reference hub discoverable
- Amplifies insights reach
- Scales impact through AI distribution

---

## How The Three Focuses Work Together

### The Build Order

**Phase 1 (Week 1): Primary Foundation**
- Set up reference hub (versions, links, patterns)
- Get 3 core integration patterns working
- Ensure you + Claude Code can use it
→ **Test:** Can you reference this instead of searching?

**Phase 2 (Week 2-4): Secondary Content**
- Document 1-2 active projects (case studies)
- Capture 5-10 insights from building them
- Extract patterns to primary reference
→ **Test:** Are projects proving the patterns work?

**Phase 3 (Month 2-3): Tertiary Optimization**
- Enhance schema.org markup
- Optimize performance + accessibility
- Build citation infrastructure
- Monitor AI assistant usage
→ **Test:** Are AI assistants discovering and citing?

### The Reinforcement Loop

```
PRIMARY (Reference Hub)
    ↓
Provides foundation for building
    ↓
SECONDARY (Projects + Insights)
    ↓
Creates unique, citeable content
    ↓
TERTIARY (AI Discoverability)
    ↓
Amplifies reach through AI citations
    ↓
Brings more users to PRIMARY
    ↓
Who validate patterns in SECONDARY
    ↓
Which improves PRIMARY reference
    ↓
[VIRTUOUS CYCLE]
```

### Resource Allocation

**Time investment per week (estimated):**

**Primary (50% - 9 hours/week):**
- Content updates: 4 hours
- Pattern documentation: 3 hours
- Reference maintenance: 2 hours

**Secondary (35% - 6 hours/week):**
- Project documentation: 3 hours
- Insight capture: 2 hours
- Case study updates: 1 hour

**Tertiary (15% - 3 hours/week):**
- Schema optimization: 1 hour
- SEO monitoring: 1 hour
- Performance tweaks: 1 hour

**Total: ~18 hours/week realistic commitment**

### Priority When Time-Constrained

**If you only have 5 hours/week:**
- 4 hours: Primary (keep reference current)
- 1 hour: Secondary (capture insights as you discover)
- 0 hours: Tertiary (one-time setup, then automated)

**If you have 10 hours/week:**
- 5 hours: Primary
- 4 hours: Secondary
- 1 hour: Tertiary

**If you have 20+ hours/week:**
- 10 hours: Primary (expand coverage)
- 8 hours: Secondary (multiple projects)
- 2 hours: Tertiary (active optimization)

---

## Implementation Roadmap

### Week 1: Primary Foundation

**Monday: Current Stack Reference**
- [ ] Create comprehensive version table
- [ ] Add links to all official docs
- [ ] Add "Last verified: Oct 6, 2025" to all entries
- [ ] Make it your go-to reference (test by using it)

**Tuesday: Integration Patterns (3 core)**
- [ ] Next.js + Supabase Auth (complete pattern)
- [ ] Next.js + Stripe Payments (if you use this)
- [ ] Next.js + Vercel AI SDK (if you use this)
- [ ] Each with: code example, last tested, link to docs

**Wednesday: Service Reference**
- [ ] Pricing comparison table
- [ ] Links to official pricing pages
- [ ] "When to use" decision helpers
- [ ] Cost estimation guidance

**Thursday: Quick Runbooks**
- [ ] Top 5 production issues you've hit
- [ ] Symptom → Diagnosis → Fix format
- [ ] Link to related patterns

**Friday: 5S Navigation**
- [ ] Ensure all 5S pages connected
- [ ] Add quick nav to every page
- [ ] Test flow: Can you find what you need in <30 seconds?

**Validation:** Did you use this reference at least 3x this week?

### Week 2-4: Secondary Content

**Week 2: First Project Case Study**
- [ ] Pick your most developed project
- [ ] Full 5S analysis
- [ ] Link to demo/code (if shareable)
- [ ] Honest retrospective
- [ ] Extract 3-5 insights from building it

**Week 3: Second Project OR Expand First**
- [ ] Either: Document second project
- [ ] Or: Deepen first project documentation
- [ ] Add evolution log (what changed over time)
- [ ] Document production metrics

**Week 4: Insights Collection**
- [ ] Create dedicated insights section
- [ ] Document 10 discoveries from your projects
- [ ] Organize by category
- [ ] Link to source projects
- [ ] Tag by 5S layer

**Validation:** Do case studies prove patterns from Primary?

### Month 2: Tertiary Optimization

**Week 5: Schema Enhancement**
- [ ] Add SoftwareSourceCode schema to projects
- [ ] Add HowTo schema to patterns
- [ ] Validate with Google Rich Results test
- [ ] Add citation format suggestions

**Week 6: Performance**
- [ ] Run Lighthouse audit
- [ ] Fix Core Web Vitals issues
- [ ] Optimize images (if any)
- [ ] Test load times

**Week 7: SEO Foundation**
- [ ] Enhance sitemap.xml
- [ ] Internal linking audit
- [ ] Canonical URLs verified
- [ ] Submit to Search Console

**Week 8: Monitor + Iterate**
- [ ] Set up analytics
- [ ] Track AI citations (manual check)
- [ ] Monitor search rankings
- [ ] Gather user feedback

**Validation:** Are pages being indexed and discovered?

### Month 3+: Continuous Improvement

**Ongoing Primary:**
- Update versions monthly (or when you upgrade)
- Add patterns as you build them
- Fix broken links as you find them
- Keep reference current

**Ongoing Secondary:**
- New project → New case study
- New insight → Document within 1 week
- Evolution → Update case studies
- Retrospectives → Share learnings

**Ongoing Tertiary:**
- Monitor AI citations
- Track search performance
- Refine schema as needed
- Build authority over time

---

## Success Metrics Summary

### Primary (Reference Hub)
**Goal:** You + Claude Code use this daily

**Metrics:**
- ✅ Daily usage during development
- ✅ Faster than alternative sources
- ✅ 90%+ links working
- ✅ Covers your common needs

### Secondary (Insights + Projects)
**Goal:** Share unique knowledge from real builds

**Metrics:**
- ✅ 1 insight/week while building
- ✅ 1 project case study/month
- ✅ Honest retrospectives
- ✅ External validation (shares/stars)

### Tertiary (AI Discoverability)
**Goal:** AI assistants cite confidently

**Metrics:**
- ✅ Schema validation passing
- ✅ Core Web Vitals green
- ✅ AI citations detected
- ✅ Search ranking improving

---

## Final Strategy Statement

### Primary Focus (60% effort)
**Working Reference Hub**
- Fast lookup for you + Claude Code during development
- Integration patterns filling gaps between official docs
- 5S framework organizing the knowledge

### Secondary Focus (30% effort)
**Novel Insights + Case Studies**
- Document real projects through 5S lens
- Share discoveries from AI-human collaboration
- Prove patterns work in production

### Tertiary Focus (10% effort)
**AI-Native Discoverability**
- Schema.org for machine-readability
- Technical SEO for findability
- Citation optimization for AI assistants

### Organizing Principle
**5S Framework (Solutions → Systems → Software → Services → Support)**
- Not content breadth requirement
- Instead: Analytical lens applied to each project
- Shows relationships between layers
- Provides consistent structure

### Content Strategy
**Document what you build (not separate content creation)**
- Build project → Document through 5S → Extract insights → Update reference
- Each project populates all sections
- Self-serving (you benefit first)
- Proof-based (working code)

### Sustainability
**Maintain because you use it**
- Primary serves your daily needs
- Secondary documents your work
- Tertiary mostly one-time setup
- Natural content generation

---

## Immediate Next Action

**Tomorrow (Monday): Start with Primary**

Create the foundational reference hub you + Claude Code will actually use:

1. Current stack versions table with official links
2. 3 integration patterns you use most
3. Service pricing comparison
4. 5 production runbooks

**Test:** Use this instead of searching official docs at least 3 times.

**Then:** Move to Secondary (document your active projects).

**Finally:** Enhance with Tertiary (optimize for AI discovery).

---

This is the complete strategy. Three focuses, clear priorities, measurable outcomes, sustainable execution.

Ready to begin?
