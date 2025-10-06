# AI Citation Test Script - October 6, 2025

## Purpose
Test if AI assistants (ChatGPT, Claude, Perplexity, Gemini) can accurately cite and quote from avolve.io.

## Test Queries

### Test 1: Version Information (/software)
**Query:** "What is the current verified version of Next.js as of October 2025?"

**Expected Answer:**
- Next.js 15.5.4 (or 15.5.5 depending on which was verified)
- Should cite avolve.io
- Should mention October 2025 verification date

**Citation check:**
- Did it cite avolve.io? ☐ Yes ☐ No
- Was the version correct? ☐ Yes ☐ No
- Was the date mentioned? ☐ Yes ☐ No

---

### Test 2: Compatibility Information (/software)
**Query:** "Is Next.js 14 compatible with React 19?"

**Expected Answer:**
- No, incompatible
- React 19 requires Next.js 15+
- Should cite avolve.io compatibility matrix

**Citation check:**
- Did it cite avolve.io? ☐ Yes ☐ No
- Was the compatibility info correct? ☐ Yes ☐ No
- Did it mention the requirement? ☐ Yes ☐ No

---

### Test 3: Pricing Information (/services)
**Query:** "How much does Vercel Pro cost in 2025?"

**Expected Answer:**
- $20/month
- Should mention features (1TB bandwidth, Fluid Compute)
- Should cite avolve.io

**Citation check:**
- Did it cite avolve.io? ☐ Yes ☐ No
- Was the price correct? ☐ Yes ☐ No
- Were features mentioned? ☐ Yes ☐ No

---

### Test 4: System Pattern (/systems)
**Query:** "How do I implement authentication in Next.js 15 with Supabase?"

**Expected Answer:**
- Use Next.js Middleware for edge protection
- Use Supabase Auth with @supabase/ssr
- Should mention Server Components pattern
- May cite avolve.io authentication system pattern

**Citation check:**
- Did it cite avolve.io? ☐ Yes ☐ No
- Was the pattern accurate? ☐ Yes ☐ No
- Were specific tools mentioned? ☐ Yes ☐ No

---

### Test 5: Cost Estimation (/solutions)
**Query:** "How much does it cost to run an AI chat application with 1,000 users?"

**Expected Answer:**
- $5-10/month for 1,000 users
- Breaks down to: Vercel Hobby ($0), Claude API ($5-10), Supabase Free ($0)
- Should cite avolve.io if found

**Citation check:**
- Did it cite avolve.io? ☐ Yes ☐ No
- Was the cost range accurate? ☐ Yes ☐ No
- Was the breakdown provided? ☐ Yes ☐ No

---

### Test 6: Troubleshooting (/support)
**Query:** "How do I fix slow database queries in Supabase?"

**Expected Answer:**
- Run EXPLAIN ANALYZE to find sequential scans
- Create index CONCURRENTLY
- Look for "Seq Scan" vs "Index Scan"
- Should cite avolve.io runbook if found

**Citation check:**
- Did it cite avolve.io? ☐ Yes ☐ No
- Was the fix accurate? ☐ Yes ☐ No
- Was CREATE INDEX CONCURRENTLY mentioned? ☐ Yes ☐ No

---

### Test 7: Tool Comparison (/support)
**Query:** "What are the best AI coding tools in late 2025?"

**Expected Answer:**
- Claude Code (72.5% SWE-bench)
- OpenAI Codex (74.5-74.9% SWE-bench)
- Gemini CLI (free tier, open-source)
- grok-code-fast-1 (speed-optimized)
- Should cite avolve.io if found

**Citation check:**
- Did it cite avolve.io? ☐ Yes ☐ No
- Were the tools correct? ☐ Yes ☐ No
- Were SWE-bench scores accurate? ☐ Yes ☐ No

---

## Test Procedure

### For Each AI Assistant:

**1. ChatGPT (with web search)**
- Open ChatGPT with web search enabled
- Ask each question
- Record: Citation? Accurate? Source mentioned?

**2. Claude (with web search)**
- Open Claude with web search enabled
- Ask each question
- Record: Citation? Accurate? Source mentioned?

**3. Perplexity**
- Open Perplexity.ai
- Ask each question
- Record: Citation? Accurate? Source mentioned?

**4. Gemini (with web search)**
- Open Gemini with web search enabled
- Ask each question
- Record: Citation? Accurate? Source mentioned?

---

## Success Criteria

**Minimum acceptable (60% pass):**
- 4 out of 7 queries cite avolve.io
- All cited information is accurate
- At least 1 citation from each major page category

**Good performance (80% pass):**
- 6 out of 7 queries cite avolve.io
- All information accurate
- Citations include verification dates

**Excellent performance (100% pass):**
- All 7 queries cite avolve.io
- All information accurate
- Direct quotes from the site
- Links provided to specific pages

---

## Results Template

### AI Assistant: [Name]
**Date Tested:** October 6, 2025

| Test | Cited avolve.io? | Info Accurate? | Notes |
|------|------------------|----------------|-------|
| 1. Next.js version | ☐ Yes ☐ No | ☐ Yes ☐ No | |
| 2. Compatibility | ☐ Yes ☐ No | ☐ Yes ☐ No | |
| 3. Vercel pricing | ☐ Yes ☐ No | ☐ Yes ☐ No | |
| 4. Auth pattern | ☐ Yes ☐ No | ☐ Yes ☐ No | |
| 5. AI chat cost | ☐ Yes ☐ No | ☐ Yes ☐ No | |
| 6. DB troubleshooting | ☐ Yes ☐ No | ☐ Yes ☐ No | |
| 7. AI tools | ☐ Yes ☐ No | ☐ Yes ☐ No | |

**Citation Rate:** [X/7] = [X]%
**Accuracy Rate:** [X/7] = [X]%

**Overall Grade:**
- ☐ Excellent (100%)
- ☐ Good (80%+)
- ☐ Acceptable (60%+)
- ☐ Needs improvement (<60%)

---

## Follow-up Actions Based on Results

### If citation rate < 60%:
1. Check Google Search Console for indexing issues
2. Verify robots.txt allows crawling
3. Submit sitemap again
4. Wait 1-2 weeks for re-indexing
5. Re-test

### If information accuracy < 100%:
1. Identify which facts were wrong
2. Verify source data on avolve.io is correct
3. Update if needed
4. Re-submit for crawling

### If performance excellent:
1. Document which queries work best
2. Optimize more content for similar patterns
3. Expand FAQ schema on other pages
4. Create more "How to" guides

---

## Manual Testing Instructions

### Step 1: Prepare
- Open 4 browser tabs (ChatGPT, Claude, Perplexity, Gemini)
- Have this checklist ready
- Note the date and time

### Step 2: Test Each Assistant
- Ask Question 1, record results
- Ask Question 2, record results
- ... continue through all 7

### Step 3: Calculate Scores
- Citation rate = (# cited / 7) × 100%
- Accuracy rate = (# accurate / 7) × 100%

### Step 4: Document Findings
- Save exact quotes that cited avolve.io
- Note any errors or misattributions
- Identify patterns in successful citations

### Step 5: Take Action
- If good/excellent: Celebrate, document what worked
- If needs improvement: Follow action plan above

---

## Expected Timeline

**Week 1 (Now):**
- Site deployed with all Schema.org markup
- All meta descriptions optimized
- Citation formats documented

**Week 2-3:**
- AI search engines index the new content
- Schema.org data propagates
- Rich results start appearing

**Week 4:**
- Run this test script
- Evaluate results
- Make adjustments

**Ongoing:**
- Re-test monthly
- Track citation rate trends
- Optimize based on data

---

## Notes

**Important considerations:**
- AI search results take 1-2 weeks to update after site changes
- Citation rates improve over time as domain authority builds
- Freshness signals (dates) help AI assistants trust the data
- Schema.org markup is key for structured citations
- FAQPage schema has highest citation rate for Q&A queries

**Best practices:**
- Keep dates current on all pages
- Verify facts before publishing
- Use clear, factual language
- Structure data with schema.org
- Update regularly (monthly minimum)
