# Avolve Architecture: What It Does

> **Avolve** is the SoftwareApplication that powers the Supercivilization ecosystem. All 7 app categories are built into a unified UX/UI.

---

## Entity Hierarchy

```
Joshua Seymour (Person/Founder)
    └── Supercivilization (Consortium + Cooperative) - The Ecosystem
            ├── Superachievers (Organization) - The Collective
            │       └── Superachiever (Person + ProgramMembership) - Individual Members
            └── Avolve (SoftwareApplication) - The Platform
```

**Key Definitions:**
- **Superachiever** = "Super-entrepreneur teamed up with super-technology"
- **Superachievers** = The collective of all members + sub-organizations
- **Supercivilization** = The ecosystem containing individuals, collectives, and their ventures

---

## The 7 App Categories in Avolve

All 7 categories exist within Avolve's unified UX/UI as modules/sections, not separate apps.

| Category | Domain Focus | Color System | Core Function |
|----------|--------------|--------------|---------------|
| **News** | Superpuzzle Developments | Fuchsia/Pink | Track ecosystem updates, announcements, collective progress |
| **Education** | Superhuman Enhancements | Rose/Red/Orange | Learn skills, courses, certifications, knowledge base |
| **Lifestyle** | Personal Success Puzzle | Amber/Yellow | Personal goals, habits, health, life design |
| **Social Networking** | Supersociety Advancements | Lime/Green/Emerald | Connect with Superachievers, groups, mentorship |
| **Business** | Business Success Puzzle | Teal/Cyan | Business tools, projects, clients, operations |
| **Finance** | Supergenius Breakthroughs | Sky/Blue/Indigo | Financial tracking, investments, revenue, expenses |
| **Productivity** | Supermind Superpowers | Violet/Purple | Tasks, AI assistants, automations, workflows |

---

## Two Core Journeys

### 1. Create Your Success Puzzle (Individual)
The personal journey of a Superachiever building their own success.

**Components:**
- Personal Success Puzzle (Lifestyle - Amber/Yellow)
- Business Success Puzzle (Business - Teal/Cyan)
- Superhuman Enhancements (Education - Rose/Red/Orange)
- Supermind Superpowers (Productivity - Violet/Purple)

### 2. Co-Create Our Superpuzzle (Collective)
The collaborative journey of Superachievers building together.

**Components:**
- Superpuzzle Developments (News - Fuchsia/Pink)
- Supersociety Advancements (Social - Lime/Green/Emerald)
- Supergenius Breakthroughs (Finance - Sky/Blue/Indigo)

---

## 5S Framework Integration

The 5S framework (Solutions, Systems, Software, Services, Support) applies across all 7 app categories:

| 5S Layer | What It Provides | Examples |
|----------|------------------|----------|
| **Solutions** | Answers to problems | Knowledge base articles, FAQs, guides |
| **Systems** | Repeatable processes | Templates, SOPs, workflows, checklists |
| **Software** | Digital tools | AI assistants, automations, integrations |
| **Services** | Human expertise | Coaching, consulting, implementation |
| **Support** | Ongoing assistance | Community, mentorship, customer success |

---

## Pricing Tiers & Feature Access

### Tier 1: Builder ($28/mo or $288/yr)
**Identity:** Individual Superachiever just starting
**Focus:** Personal Success Puzzle + Basic AI tools

| Category | Access Level |
|----------|--------------|
| News | Read-only ecosystem updates |
| Education | Core courses, knowledge base |
| Lifestyle | Personal goal tracking, basic habits |
| Social | Community forum access, public profiles |
| Business | 3 active projects, basic templates |
| Finance | Basic expense/revenue tracking |
| Productivity | 100 AI messages/day, basic workflows |

**5S Access:**
- Solutions: Full access
- Systems: Basic templates only
- Software: AI chat (100 msg/day), basic automations
- Services: None
- Support: Community forum, knowledge base

---

### Tier 2: Operator ($288/mo or $2,888/yr)
**Identity:** Established Superachiever scaling operations
**Focus:** Business Success Puzzle + Team features + Advanced AI

| Category | Access Level |
|----------|--------------|
| News | Full access + early announcements |
| Education | Advanced courses, certifications, workshops |
| Lifestyle | Full goal system, habit stacks, life design tools |
| Social | Group creation, mentorship matching, events |
| Business | 10 active projects, team workspace (10 seats), premium templates |
| Finance | Full financial suite, forecasting, reports |
| Productivity | 500 AI messages/day, advanced workflows, automations |

**5S Access:**
- Solutions: Full access + advanced guides
- Systems: Full template library, custom SOPs
- Software: Advanced AI (500 msg/day), all automations
- Services: 2 hours/month office hours, quarterly group reviews
- Support: Priority support, mentor access

---

### Tier 3: Partner ($2,888/mo or $22,888/yr)
**Identity:** Superachiever organization with team/clients
**Focus:** Full ecosystem access + Dedicated technician partnership

| Category | Access Level |
|----------|--------------|
| News | VIP access, shape announcements, advisory input |
| Education | All content + custom training, 1-on-1 sessions |
| Lifestyle | Executive coaching integration, full life design |
| Social | VIP networking, exclusive events, advisory board |
| Business | Unlimited projects, unlimited seats, enterprise templates |
| Finance | Full suite + CFO advisory, investment tracking |
| Productivity | Unlimited AI, custom automations, dedicated workflows |

**5S Access:**
- Solutions: Full + custom solutions development
- Systems: Custom systems, executive playbooks
- Software: Unlimited AI, custom integrations, enterprise features
- Services: Dedicated technician, weekly calls, Slack access
- Support: White-glove support, 4-hour SLA, executive concierge

---

## Superachiever Profile Structure

Every Superachiever has a profile that:
1. **Identifies** them within the ecosystem
2. **Tracks** their participation and contributions
3. **Connects** them to their organizations and groups
4. **Displays** their achievements and credentials

### Profile Schema (Schema.org compliant)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://superachiever.xyz/[username]",
  "name": "User Name",
  "url": "https://superachiever.xyz/[username]",
  "image": "[avatar_url]",
  "description": "Bio/tagline",
  "memberOf": {
    "@type": "ProgramMembership",
    "programName": "Superachiever",
    "membershipNumber": "[uuid]",
    "membershipPointsEarned": 0,
    "hostingOrganization": {
      "@id": "https://supercivilization.xyz"
    }
  },
  "affiliation": [
    {"@type": "Organization", "name": "Team/Group Name"}
  ],
  "knowsAbout": ["skill1", "skill2"],
  "hasCredential": [
    {"@type": "EducationalOccupationalCredential", "name": "Certification"}
  ]
}
```

### Participation vs Contribution Model

**Participation (Receive Value → Benefits):**
- Consume content (courses, articles, tools)
- Join discussions
- Attend events
- Use AI assistants
- Track personal/business metrics

**Contribution (Provide Value → Rewards):**
- Create content (posts, guides, templates)
- Answer questions
- Mentor others
- Lead groups
- Build integrations
- Refer new members

**Reward System:**
- Membership points earned through contributions
- Points unlock perks, recognition, discounts
- Top contributors featured in ecosystem
- Partner tier includes revenue sharing opportunities

---

## Navigation Structure

### Primary Navigation (7 Categories)
```
[News] [Education] [Lifestyle] [Social] [Business] [Finance] [Productivity]
```

### Secondary Navigation (within each category)
Each category has sub-sections based on the user's tier and journey:

**Example: Business Category**
- Dashboard (overview of business health)
- Projects (active projects list)
- Clients (client management)
- Templates (SOPs, documents)
- Analytics (business metrics)
- Team (if Operator/Partner tier)

### Contextual Navigation
- **Your Puzzle** - Personal dashboard showing individual progress
- **Our Superpuzzle** - Collective dashboard showing ecosystem progress
- **Brain** - AI assistant always accessible
- **Profile** - Your Superachiever profile
- **Settings** - Account, subscription, preferences

---

## Technical Implementation

### Database Schema Changes Needed

The current schema uses `subscription_tier` enum with:
- `individual_vip` → rename to `builder`
- `collective_pro` → rename to `operator`
- `ecosystem_ceo` → rename to `partner`

### Feature Access by Category

```sql
-- Example: Map features to the 7 categories
insert into feature_access (tier, feature_key, enabled, limits) values
  -- News category
  ('builder', 'news_read', true, null),
  ('operator', 'news_early_access', true, null),
  ('partner', 'news_advisory', true, null),

  -- Education category
  ('builder', 'education_core_courses', true, null),
  ('operator', 'education_advanced', true, null),
  ('partner', 'education_custom', true, null),

  -- ... etc for all 7 categories
```

### UI Component Mapping

| Category | Primary Component | Color Token |
|----------|-------------------|-------------|
| News | `<NewsFeed />` | `$pink` |
| Education | `<LearningHub />` | `$red` / `$orange` |
| Lifestyle | `<LifeDesign />` | `$amber` / `$yellow` |
| Social | `<Community />` | `$lime` / `$green` |
| Business | `<BusinessHub />` | `$teal` / `$cyan` |
| Finance | `<FinanceTracker />` | `$sky` / `$blue` |
| Productivity | `<Supermind />` | `$violet` / `$purple` |

---

## Migration from C-Suite Framework

The current implementation uses the Business Made Simple C-Suite framework (CEO/CMO/CVO/COO/CFO). This content remains valuable but should be reorganized:

| Old Section | New Location | Category |
|-------------|--------------|----------|
| CEO (Focus/Mission) | Business Strategy | Business |
| CMO (Users/Marketing) | Growth Tools | Business |
| CVO (Value/Products) | Product Management | Business |
| COO (Admin/Operations) | Operations | Business |
| CFO (Funds/Finance) | Financial Dashboard | Finance |

The C-Suite curriculum becomes part of the **Education** category as a course/module, not the primary navigation structure.

---

## Schema.org Implementation Checklist

1. **joshuaseymour.com** - Person schema with founder/creator roles
2. **supercivilization.xyz** - Consortium + Cooperative with MemberProgram
3. **superachievers.xyz** - Organization (collective) with member directory
4. **superachiever.xyz** - WebSite with ProfilePage hosting individual profiles
5. **avolve.io** - SoftwareApplication + WebApplication with Offers

---

## Next Steps

1. [ ] Update pricing tier names in database (VIP→Builder, PRO→Operator, CEO→Partner)
2. [ ] Restructure navigation from C-Suite to 7 categories
3. [ ] Implement color system tokens for each category
4. [ ] Build Superachiever profile schema
5. [ ] Create participation/contribution tracking
6. [ ] Implement Schema.org JSON-LD across all domains
