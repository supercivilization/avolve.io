# Avolve.io: Dependency-Based Strategy
**Date:** October 6, 2025
**Approach:** Logic and dependencies, not arbitrary timelines

---

## The Three Focuses

### PRIMARY: Working Reference Hub
**"The knowledge base you + Claude Code actually use to ship faster"**

### SECONDARY: Novel Insights + Case Studies
**"Share what you learn building that others don't know yet"**

### TERTIARY: AI-Native Discoverability
**"Make this citeable by AI assistants"**

---

## Dependency Tree: What Depends on What

### Level 0: Foundation (Must Exist First)

**These enable everything else:**

```
[Current Stack Versions Table]
    - No dependencies
    - Blocks: Integration patterns (need to know what versions)
    - Blocks: Case studies (need to document stack used)

[Official Doc Links Collection]
    - No dependencies
    - Blocks: Reference hub utility (need somewhere to route to)
    - Blocks: AI citations (need authoritative sources)

[5S Navigation Structure]
    - No dependencies
    - Blocks: Content organization (need structure to add content)
    - Blocks: Cross-linking (need consistent framework)
```

**Action items:**
- [ ] Create/enhance stack versions table with official links
- [ ] Verify all official doc links work
- [ ] Ensure 5S navigation exists on all pages

---

### Level 1: Primary Reference Content (Depends on Level 0)

**These require foundation but not projects:**

```
[Integration Patterns]
    - Requires: Stack versions known (Level 0)
    - Requires: Official docs linked (Level 0)
    - Blocks: Case studies (projects reference these patterns)
    - Blocks: Insights (discoveries reference these patterns)

[Service Comparison]
    - Requires: Nothing (can document immediately)
    - Blocks: Case studies (need to reference service costs)
    - Blocks: Cost insights (need baseline to compare)

[Basic Runbooks]
    - Requires: Nothing (can document past issues)
    - Blocks: Advanced runbooks (build on basic patterns)
    - Enables: Case studies (can reference debugging approaches)
```

**Action items:**
- [ ] Document 3-5 core integration patterns
- [ ] Create service pricing comparison
- [ ] Write runbooks for issues you've already solved

---

### Level 2: Project Documentation (Depends on Level 1)

**These require reference foundation:**

```
[First Project Case Study]
    - Requires: Integration patterns documented (Level 1)
    - Requires: Stack versions table (Level 0)
    - Requires: Service comparison (Level 1)
    - Blocks: Pattern validation (can't prove patterns without projects)
    - Blocks: Insights (discoveries come from building projects)
    - Enables: Template extraction (working code to share)

[Project Template Repositories]
    - Requires: Case study documented (this level)
    - Blocks: Nothing (nice to have)
    - Enables: Others to start faster
```

**Action items:**
- [ ] Document one complete project through 5S lens
- [ ] Extract working code as template (if shareable)
- [ ] Deploy demo (if shareable)

---

### Level 3: Knowledge Extraction (Depends on Level 2)

**These require projects to exist:**

```
[Novel Insights]
    - Requires: Projects built (Level 2)
    - Requires: Patterns documented (Level 1)
    - Blocks: Nothing (pure addition)
    - Enables: Reference hub improvement (insights become runbooks)
    - Enables: Pattern refinement (discoveries improve patterns)

[Lessons Learned]
    - Requires: Projects completed (Level 2)
    - Blocks: Nothing (retrospective content)
    - Enables: Better future decisions

[Advanced Runbooks]
    - Requires: Production experience (Level 2)
    - Requires: Basic runbooks (Level 1)
    - Blocks: Nothing (depth addition)
```

**Action items:**
- [ ] Capture insights while building (continuous)
- [ ] Write retrospectives after major milestones
- [ ] Document complex debugging from production

---

### Level 4: Optimization (Depends on Level 1-3)

**These require content to exist:**

```
[Schema.org Enhancement]
    - Requires: Content exists to mark up (Level 1-3)
    - Blocks: Nothing (infrastructure improvement)
    - Enables: Better AI citations

[Performance Optimization]
    - Requires: Pages exist to optimize (Level 0-3)
    - Blocks: Nothing (infrastructure improvement)
    - Enables: Better user experience

[Citation Infrastructure]
    - Requires: Citeable content exists (Level 1-3)
    - Blocks: Nothing (discoverability enhancement)
    - Enables: AI assistant discovery
```

**Action items:**
- [ ] Add proper schema to all content types
- [ ] Optimize Core Web Vitals
- [ ] Add citation format suggestions

---

## The Natural Build Sequence

### Sequence 1: Minimum Viable Reference

**Goal:** Make the site useful to you + Claude Code TODAY

**Dependencies in order:**
1. Stack versions table → Can look up current versions
2. Official doc links → Can route to authoritative sources
3. Basic integration pattern → Have one complete working example
4. 5S navigation → Can find things

**Completion test:** Used this instead of Google at least once

**Unlocks:** Foundation for everything else

---

### Sequence 2: Pattern Library

**Goal:** Document the core patterns you actually use

**Dependencies in order:**
1. Minimum viable reference (Sequence 1) → Need foundation
2. Integration pattern #1 (e.g., Next.js + Supabase Auth)
3. Integration pattern #2 (e.g., Next.js + Stripe)
4. Integration pattern #3 (e.g., Next.js + Vercel AI)
5. Service comparison → Know what you're paying for

**Completion test:** Covers your 3 most common integration tasks

**Unlocks:** Can reference patterns while building new projects

---

### Sequence 3: First Project Documentation

**Goal:** Prove patterns work through real deployment

**Dependencies in order:**
1. Pattern library (Sequence 2) → Need patterns to reference
2. Pick one real project you've built
3. Analyze through 5S lens:
   - Solutions: What does it deliver?
   - Systems: What patterns does it use? (link to Sequence 2)
   - Software: What versions? (link to Sequence 1)
   - Services: What does it cost? (reference comparison)
   - Support: What broke? (create runbooks)
4. Link to demo/code (if shareable)
5. Write honest retrospective

**Completion test:** Someone could understand your complete stack from this case study

**Unlocks:**
- Proof that patterns work
- Source of insights
- Template for future projects

---

### Sequence 4: Insight Extraction

**Goal:** Share what you learned that isn't in official docs

**Dependencies in order:**
1. Project documentation (Sequence 3) → Need source of discoveries
2. Identify 3-5 non-obvious learnings from building it
3. Document each insight:
   - What were you trying to do?
   - What did you discover?
   - Why does it matter?
   - How to apply it?
   - Link to project where you found this
4. Tag by 5S layer
5. Link back to relevant patterns (improves Sequence 2)

**Completion test:** Someone reading this learns something not in official docs

**Unlocks:**
- Unique value (differentiation)
- Pattern improvements (feedback to reference)
- Community value (shareable knowledge)

---

### Sequence 5: AI Discoverability

**Goal:** Make content machine-readable and citeable

**Dependencies in order:**
1. Content exists (Sequences 1-4) → Need something to optimize
2. Add schema.org to each content type:
   - HowTo for integration patterns
   - SoftwareSourceCode for projects
   - TechArticle for insights
   - FAQPage for runbooks
3. Validate with Google Rich Results
4. Add citation suggestions
5. Performance optimization
6. Monitor AI citations

**Completion test:** Schema validates, Core Web Vitals green

**Unlocks:**
- AI assistant discovery
- Better search ranking
- Accurate citations

---

## Continuous Cycles (No Specific Timeline)

### Daily Cycle (While Actively Developing)
**If you + Claude Code are building something:**
- Capture insights as you discover them (2-5 min when it happens)
- Note gotchas immediately (before you forget)
- Update stack versions if you upgrade (verify still works)

**Trigger:** Discovery moment during development
**Effort:** 2-5 minutes per insight
**Output:** Raw notes (polish later)

---

### Project Cycle (When You Complete a Project)
**Triggered by:** Deploying/launching a project

**Sequence:**
1. Document through 5S lens (30-60 min)
2. Extract insights from building it (30 min)
3. Create template if shareable (1-2 hours)
4. Write retrospective (20 min)
5. Update reference patterns if needed (30 min)

**Total effort:** ~3-4 hours per completed project
**Output:** Case study + insights + template + pattern updates

---

### Maintenance Cycle (Triggered by Events)

**When stack versions change:**
- Update versions table (5 min)
- Test if patterns still work (30 min)
- Update "last verified" dates (5 min)
- Note breaking changes if any (15 min)

**When links break:**
- Fix as you notice them (2 min)
- Check related links (5 min)

**When you hit production issues:**
- Document as runbook immediately (15-30 min)
- Link to relevant patterns (5 min)
- Add to case study if project-specific (10 min)

**Trigger:** Event-driven (version release, broken link, production issue)
**Effort:** Variable (5-60 min depending on event)

---

### Review Cycle (Monthly Makes Sense)

**First of each month:**
- [ ] Verify stack versions still current
- [ ] Check all official doc links work
- [ ] Scan for stale "last verified" dates (>60 days)
- [ ] Review analytics (what's being used?)
- [ ] Check for AI citations (manual search)

**Effort:** ~1 hour
**Trigger:** Calendar (first of month)
**Output:** Maintenance task list

---

### Growth Cycle (Quarterly Makes Sense)

**Every 3 months:**
- [ ] Assess pattern coverage (what's missing?)
- [ ] Review case studies (any to update?)
- [ ] Analyze insights (any themes emerging?)
- [ ] SEO audit (search performance)
- [ ] Schema validation check
- [ ] Performance audit

**Effort:** ~2-3 hours
**Trigger:** Calendar (quarterly)
**Output:** Strategic adjustments

---

## Logical Next Steps (Right Now)

### Step 1: Assess Current State

**Before building anything new, understand what exists:**

- [ ] What content is already published?
- [ ] What projects have you already built?
- [ ] What insights have you already discovered?
- [ ] What's missing from making this useful TODAY?

**Output:** Current state inventory + gap analysis

---

### Step 2: Complete Sequence 1 (MVR)

**Make site immediately useful to you + Claude Code:**

**Check if these exist and work:**
- [ ] Stack versions table with current versions
- [ ] Links to official docs (Next.js, React, Supabase, etc.)
- [ ] At least 1 complete integration pattern
- [ ] 5S navigation works

**If missing:** Create them (in dependency order)

**Test:** Can you use this instead of searching Google?

**If test passes:** Move to Step 3
**If test fails:** Identify what's missing and build it

---

### Step 3: Complete Sequence 2 (Pattern Library)

**Document your core patterns:**

**Prerequisites checked:**
- ✅ Sequence 1 complete (foundation exists)

**Add patterns you actually use:**
- [ ] Pattern 1: [Your most common integration]
- [ ] Pattern 2: [Your second most common]
- [ ] Pattern 3: [Your third most common]
- [ ] Service comparison (what you pay for what)

**Each pattern includes:**
- Complete working code
- Link to official docs
- Last tested date
- Common gotchas

**Test:** Do these cover 80% of your integration needs?

**If test passes:** Move to Step 4
**If test fails:** Add missing patterns

---

### Step 4: Complete Sequence 3 (First Project)

**Document one complete project:**

**Prerequisites checked:**
- ✅ Sequence 2 complete (patterns documented)

**Choose project:**
- Pick your most complete/polished project
- OR pick project that best demonstrates the stack

**Document through 5S:**
- [ ] Solutions: What it delivers
- [ ] Systems: Architecture (reference patterns from Sequence 2)
- [ ] Software: Stack (reference versions from Sequence 1)
- [ ] Services: Costs (reference comparison)
- [ ] Support: Issues + monitoring

**Add proof:**
- [ ] Link to demo (if shareable)
- [ ] Link to code (if shareable)
- [ ] Screenshots/video (if not public)

**Write retrospective:**
- [ ] What worked well
- [ ] What you'd change
- [ ] What surprised you

**Test:** Could someone understand your complete stack from this?

**If test passes:** Move to Step 5
**If test fails:** Add missing details

---

### Step 5: Complete Sequence 4 (Insights)

**Extract discoveries from your project:**

**Prerequisites checked:**
- ✅ Sequence 3 complete (project documented)

**Identify insights:**
- [ ] 3-5 non-obvious things you learned
- [ ] Things not in official docs
- [ ] Gotchas you discovered
- [ ] Patterns you developed

**Document each:**
- [ ] Context (what you were doing)
- [ ] Discovery (what you learned)
- [ ] Application (how to use it)
- [ ] Evidence (link to project/code)

**Link back:**
- [ ] Reference project where discovered
- [ ] Update relevant patterns with insight
- [ ] Tag by 5S layer

**Test:** Does each insight teach something new?

**If test passes:** Move to Step 6
**If test fails:** Deepen insights or find more

---

### Step 6: Complete Sequence 5 (AI Optimization)

**Make content machine-readable:**

**Prerequisites checked:**
- ✅ Sequences 1-4 complete (content exists)

**Add schema.org:**
- [ ] HowTo for integration patterns
- [ ] SoftwareSourceCode for projects
- [ ] TechArticle for insights
- [ ] FAQPage for runbooks

**Validate:**
- [ ] Google Rich Results Test
- [ ] Schema.org validator
- [ ] Fix any errors

**Optimize:**
- [ ] Core Web Vitals (Lighthouse)
- [ ] Accessibility (axe/WAVE)
- [ ] Performance (PageSpeed)

**Add citation infrastructure:**
- [ ] Permanent section IDs
- [ ] Suggested citation format
- [ ] "Last verified" dates prominent

**Test:** Does schema validate and pass Core Web Vitals?

**If test passes:** Foundation complete
**If test fails:** Fix issues

---

### Step 7: Enter Continuous Cycles

**Once foundation exists (Steps 1-6 complete):**

**Active development:**
- Capture insights as you discover (daily cycle)
- Document projects as you complete (project cycle)
- Maintain when events trigger (maintenance cycle)

**Periodic reviews:**
- Monthly: Verify currency
- Quarterly: Assess growth

**No arbitrary deadlines:**
- Build next project when ready
- Extract insights when discovered
- Maintain when needed
- Grow when it makes sense

---

## Decision Tree: What to Do Next

### Start Here

**Q: Is the site useful to you + Claude Code RIGHT NOW?**

**YES →** Move to "Growth" section below
**NO →** Continue to diagnosis

---

**Q: Can you look up current stack versions quickly?**

**YES →** Continue
**NO →** **ACTION:** Create/enhance stack versions table (Sequence 1)

---

**Q: Do you have links to all official docs?**

**YES →** Continue
**NO →** **ACTION:** Add official doc links (Sequence 1)

---

**Q: Do you have at least 1 complete integration pattern documented?**

**YES →** Continue
**NO →** **ACTION:** Document your most-used integration pattern (Sequence 2)

---

**Q: Does 5S navigation work across all pages?**

**YES →** Sequence 1 COMPLETE → Continue
**NO →** **ACTION:** Fix navigation (Sequence 1)

---

**Q: Do you have 3-5 core patterns documented?**

**YES →** Sequence 2 COMPLETE → Continue
**NO →** **ACTION:** Add patterns you actually use (Sequence 2)

---

**Q: Is at least one real project documented through 5S?**

**YES →** Sequence 3 COMPLETE → Continue
**NO →** **ACTION:** Document your best project (Sequence 3)

---

**Q: Have you extracted insights from that project?**

**YES →** Sequence 4 COMPLETE → Continue
**NO →** **ACTION:** Capture 3-5 discoveries (Sequence 4)

---

**Q: Is schema.org markup implemented and validated?**

**YES →** Sequence 5 COMPLETE → Foundation DONE
**NO →** **ACTION:** Add and validate schema (Sequence 5)

---

### Growth Section (Foundation Complete)

**Q: Are you actively building a new project?**

**YES →**
- Capture insights daily as you discover
- Document project when complete
- Update patterns as you refine them

**NO →** Continue

---

**Q: Did a stack version change?**

**YES →** **ACTION:** Update versions, test patterns, update dates
**NO →** Continue

---

**Q: Did you hit a production issue?**

**YES →** **ACTION:** Document as runbook immediately
**NO →** Continue

---

**Q: Is it the first of the month?**

**YES →** **ACTION:** Monthly maintenance review
**NO →** Continue

---

**Q: Has it been 3 months since last audit?**

**YES →** **ACTION:** Quarterly growth review
**NO →** Continue

---

**Otherwise:** Foundation is healthy, wait for next trigger

---

## Completion Criteria (Not Timelines)

### Sequence 1: Minimum Viable Reference
**Complete when:**
- ✅ You use it instead of searching (at least 1x)
- ✅ Stack versions table exists and is current
- ✅ Official doc links work
- ✅ At least 1 integration pattern documented
- ✅ 5S navigation functional

### Sequence 2: Pattern Library
**Complete when:**
- ✅ Covers 80% of your integration needs
- ✅ 3-5 core patterns documented
- ✅ Each pattern has working code
- ✅ Each pattern has last tested date
- ✅ Service comparison exists

### Sequence 3: First Project
**Complete when:**
- ✅ One project analyzed through all 5S layers
- ✅ Someone could replicate your stack from this
- ✅ Links to demo/code (if shareable)
- ✅ Honest retrospective included
- ✅ References patterns from Sequence 2

### Sequence 4: Insights
**Complete when:**
- ✅ 3-5 novel discoveries documented
- ✅ Each teaches something not in official docs
- ✅ Linked to source project
- ✅ Patterns updated with discoveries
- ✅ Tagged by 5S layer

### Sequence 5: AI Optimization
**Complete when:**
- ✅ Schema.org validates (Google Rich Results pass)
- ✅ Core Web Vitals green
- ✅ Citation format suggested
- ✅ Permanent IDs on sections
- ✅ Accessibility passing

### Foundation Complete
**When all 5 sequences done:**
- ✅ Reference hub useful daily
- ✅ Patterns proven through projects
- ✅ Insights captured and shared
- ✅ AI-discoverable and citeable
- ✅ Sustainable maintenance cycles established

---

## Summary: Logic Over Time

**The Strategy:**
- Not: "Do X by Day 7, Y by Week 4"
- Instead: "X depends on Y, build in logical order"

**The Sequences:**
1. Foundation (stack versions, links, nav)
2. Patterns (document what you use)
3. Projects (prove patterns work)
4. Insights (share discoveries)
5. Optimization (make citeable)

**The Cycles:**
- Daily: Capture insights as discovered
- Per-project: Document when complete
- Event-driven: Maintain when triggered
- Monthly: Verify currency
- Quarterly: Assess growth

**The Test:**
- Not: "Is it week 4?"
- Instead: "Does this work? Can I use it? Does it help?"

**The Goal:**
- Build in logical dependency order
- Maintain based on events, not calendar
- Grow when it makes sense
- Let quality and utility drive pace

---

## Immediate Next Action

**Run the decision tree:**
1. Start at "Is the site useful to you + Claude Code RIGHT NOW?"
2. Answer each question honestly
3. Follow to first ACTION item
4. Complete that action
5. Re-run decision tree
6. Repeat until foundation complete

**No timelines. Just dependencies and logic.**

Ready to run the decision tree?
