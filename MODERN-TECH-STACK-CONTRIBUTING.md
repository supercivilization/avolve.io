# Contributing to Modern Tech Stack Documentation

> **Key Principle**: Contributions are evaluated based on **logical requirements** and **dependency chains**, not arbitrary rules.

**Last Updated**: September 30, 2025

---

## 🎯 Contributing Philosophy

This documentation follows **dependency-based** and **evidence-based** principles:

- **Dependencies First**: Changes should clearly state what they depend on
- **Evidence-Based**: All claims must be verifiable
- **No Arbitrary Rules**: Guidelines based on logic, not opinion
- **Quality Over Quantity**: One excellent contribution > multiple mediocre ones

---

## 📋 Prerequisites for Contributing

### What You Need Before Contributing

**Technical Prerequisites**:
```
Can you use Git?
  ├─ No → Learn Git basics first
  └─ Yes → Continue

Do you have a GitHub account?
  ├─ No → Create account
  └─ Yes → Continue

Have you forked the repository?
  ├─ No → Fork it
  └─ Yes → Ready to contribute
```

**Knowledge Prerequisites** (depends on contribution type):

| Contribution Type | Prerequisites |
|-------------------|---------------|
| Fix typo | None - just spot the error |
| Update version numbers | Access to official release notes |
| Add new guide | Deep understanding of the technology |
| Propose architecture | Production experience with the stack |
| Add mental model | Real-world application of the framework |

---

## 🔄 Contribution Workflow (Dependency Chain)

```
1. Identify improvement area
    ↓
2. Check if issue exists
    ├─ Yes → Comment on existing issue
    └─ No → Create new issue
    ↓
3. Get feedback on proposed change
    ├─ Rejected → Understand why, revise or abandon
    └─ Approved → Continue
    ↓
4. Fork repository (if not already)
    ↓
5. Create feature branch
    ↓
6. Make changes with proper evidence
    ↓
7. Test/verify changes locally
    ↓
8. Commit with clear message
    ↓
9. Push to your fork
    ↓
10. Create Pull Request
    ↓
11. Address review feedback
    ↓
12. Merge (maintainer action)
```

---

## 📝 Contribution Types

### 1. Documentation Fixes

**Prerequisites**: None - anyone can fix typos or broken links

**Examples**:
- Fix spelling/grammar
- Update broken links
- Improve unclear wording
- Fix formatting issues

**Quality Gates**:
- [ ] Change improves clarity
- [ ] No new errors introduced
- [ ] Links verified working

**How to Contribute**:
```bash
# 1. Fork and clone
git clone https://github.com/YOUR-USERNAME/modern-tech-stack.git

# 2. Create branch
git checkout -b fix/typo-in-react-guide

# 3. Make changes
# Edit the file

# 4. Commit
git commit -m "docs: fix typo in React 19 guide"

# 5. Push and create PR
git push origin fix/typo-in-react-guide
```

---

### 2. Version Updates

**Prerequisites**:
- ✅ Access to official release notes
- ✅ Ability to verify version claims

**Examples**:
- Update technology versions
- Add new release information
- Update deprecation notices

**Quality Gates**:
- [ ] Version number verified from official source
- [ ] Release date accurate
- [ ] Breaking changes documented
- [ ] Links to official release notes included

**Evidence Required**:
```markdown
## Example Update

Current: "Next.js 15.5 (released August 2025)"
Updated: "Next.js 15.6 (released October 2025)"

Evidence:
- Official release: https://nextjs.org/blog/next-15-6
- Release date: October 15, 2025
- Breaking changes: None (patch release)
```

---

### 3. New Technology Guides

**Prerequisites**:
- ✅ Deep understanding of the technology
- ✅ Production experience preferred
- ✅ Ability to provide evidence for claims

**Quality Gates**:
- [ ] Technology is production-ready (not experimental)
- [ ] Fits within AI-native stack philosophy
- [ ] All performance claims have sources
- [ ] Code examples are tested and working
- [ ] Dependencies clearly stated
- [ ] Follows existing guide structure

**Template Structure**:
```markdown
# [Technology Name] Complete Guide

## Overview
- What is it?
- Why use it?
- Production readiness status

## Prerequisites
- What you need to know before this

## Core Concepts
- Key concepts with examples

## Installation & Setup
- Step-by-step setup

## Common Patterns
- Real-world usage patterns

## Performance Considerations
- Benchmarks with sources

## Troubleshooting
- Common issues and solutions

## Resources
- Official documentation
- Community resources
```

---

### 4. Learning Path Contributions

**Prerequisites**:
- ✅ Experience teaching or mentoring others
- ✅ Understanding of dependency-based learning
- ✅ Real-world application of the path

**Quality Gates**:
- [ ] NO arbitrary timelines ("Week 1, Week 2")
- [ ] Clear prerequisite dependencies stated
- [ ] Self-assessment checklists included
- [ ] Practical code examples provided
- [ ] Completion criteria defined

**Example Good Contribution**:
```markdown
## Stage X: [Capability Name]

**Prerequisites**:
- ✅ [Specific prerequisite 1]
- ✅ [Specific prerequisite 2]

**Why Now**: [Explain dependency relationship]

### What You Need to Learn
[Specific, actionable learning objectives]

### Self-Assessment Checklist
- [ ] Can do X
- [ ] Can do Y

### Completion State
✅ You're ready for [next stage] when [specific criteria]
```

**Example Bad Contribution**:
```markdown
## Week 3: Learn React

Spend this week learning React. It should take about 40 hours.

Next week we'll learn Next.js.
```

---

### 5. Mental Model Contributions

**Prerequisites**:
- ✅ Real-world application of the mental model
- ✅ Clear decision framework (not opinions)
- ✅ Can explain dependencies and trade-offs

**Quality Gates**:
- [ ] Focuses on decision-making, not advice
- [ ] Includes decision tree or framework
- [ ] Provides examples of application
- [ ] States when to use this model
- [ ] NO arbitrary rules ("always do X")

**Example Good Mental Model**:
```markdown
## [Model Name]

**Purpose**: [What decisions does this help with?]

**Framework**:
For situation X with constraints Y:
1. Evaluate A
2. If A then B, else C
3. Measure outcome

**Example Decision**: [Real-world example]

**When to Use**: [Specific scenarios]
```

---

## 🚦 Quality Standards

### Evidence Requirements

**For Performance Claims**:
```markdown
Bad: "Next.js is really fast"
Good: "Next.js 15.5 shows 2-5x faster compilation with Turbopack
       compared to Webpack (Source: https://turbo.build/pack/docs/benchmarks)"
```

**For Recommendations**:
```markdown
Bad: "Always use Server Components"
Good: "Use Server Components when:
       - No interactivity needed
       - Direct database access required
       - SEO important

       Use Client Components when:
       - Interactivity required
       - Browser APIs needed
       - Hooks necessary"
```

### Code Example Standards

**All code examples must**:
- [ ] Be syntactically correct
- [ ] Include necessary imports
- [ ] Show types (for TypeScript)
- [ ] Be production-ready (not pseudo-code)
- [ ] Include comments for complex logic

**Example**:
```typescript
// Good: Complete, working example
import { createClient } from '@supabase/supabase-js';

export async function getUser(id: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

// Bad: Incomplete pseudo-code
function getUser() {
  // Get user from database
  return user;
}
```

---

## ✅ Pull Request Process

### Creating a Pull Request

**PR Title Format**:
```
type: brief description

Examples:
docs: add Bun runtime guide
fix: correct Next.js version number
feat: add mobile development mental model
```

**PR Description Template**:
```markdown
## What Changed
[Brief description of changes]

## Why This Change
[Explain the motivation and dependencies]

## Evidence/Sources
[Links to official documentation, benchmarks, etc.]

## Prerequisites Met
- [ ] All claims have sources
- [ ] Code examples tested
- [ ] Links verified working
- [ ] Follows documentation standards

## Checklist
- [ ] No arbitrary timelines added
- [ ] Dependencies clearly stated
- [ ] Self-assessment criteria included (if applicable)
- [ ] Quality gates passed
```

### Review Process

**Dependency Chain**:
```
PR created
    ↓
Automated checks run
    ├─ Failed → Fix issues
    └─ Passed → Continue
    ↓
Maintainer review
    ├─ Changes requested → Address feedback
    └─ Approved → Continue
    ↓
Merge to main
```

**What Reviewers Look For**:
- [ ] Evidence for all claims
- [ ] Clear dependency relationships
- [ ] No arbitrary timelines or rules
- [ ] Code examples are complete and working
- [ ] Follows existing documentation structure
- [ ] Improves documentation quality

---

## 🎯 Priority Areas for Contribution

### High Priority
- Fixing outdated version numbers
- Adding missing dependencies to guides
- Improving code examples with better types
- Adding troubleshooting sections

### Medium Priority
- New mental models with clear frameworks
- Additional learning path stages
- Performance optimization guides
- Security best practices

### Lower Priority
- Stylistic improvements
- Additional examples for existing concepts
- Expanded explanations

---

## 🚫 What We Don't Accept

### Rejected Contributions

**Arbitrary Timelines**:
```markdown
❌ "Week 1: Learn TypeScript (40 hours)"
✅ "Prerequisites: None → Learn TypeScript fundamentals"
```

**Opinion-Based Advice**:
```markdown
❌ "Always use X because it's better"
✅ "Use X when [conditions]. Trade-offs: [list]"
```

**Unverified Claims**:
```markdown
❌ "This is 10x faster"
✅ "2-3x faster compilation (Source: official benchmarks)"
```

**Incomplete Code**:
```markdown
❌ "// TODO: implement this"
✅ [Complete, working implementation]
```

---

## 📞 Getting Help

### Before Contributing

**Questions?**
- Check existing issues first
- Review this CONTRIBUTING guide
- Look at merged PRs for examples

**Discussion**:
- Open an issue to discuss major changes
- Ask questions in issue comments
- Propose approach before implementing

### During Review

**Feedback Loop**:
```
Receive feedback
    ↓
Ask clarifying questions if needed
    ↓
Make requested changes
    ↓
Request re-review
    ↓
Repeat until approved
```

---

## 🎓 Learning from Contributions

### After Your PR is Merged

- [ ] Review any changes maintainers made
- [ ] Understand the reasoning behind modifications
- [ ] Apply learnings to future contributions

### If Your PR is Rejected

- [ ] Understand the reasons for rejection
- [ ] Ask questions to learn
- [ ] Consider how to improve future contributions
- [ ] Don't take it personally - it's about quality standards

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## 🙏 Recognition

Contributors are listed in the CHANGELOG with their contributions acknowledged.

Significant contributions may result in:
- Recognition in documentation credits
- Contributor badge
- Invitation to become a maintainer

---

**Thank you for contributing to making this documentation excellent!** 🚀

**Questions?** Open an issue with the "question" label.

---

**Last Updated**: September 30, 2025
**Next Review**: December 2025
