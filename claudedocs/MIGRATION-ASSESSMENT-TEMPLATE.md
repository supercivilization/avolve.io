# Route Migration Assessment Template

**Purpose:** Evaluate whether a Pages Router route should be migrated to App Router

**Usage:** Copy this template for each route you're considering migrating

---

## Route Information

**Route Path:** `/____________________`
**Current Location:** `pages/____________________`
**Target Location:** `app/____________________`
**Assessment Date:** `____________________`
**Assessed By:** `____________________`

---

## Scoring System

Rate each factor from 1-5:
- **1** = Very Low / Not at all
- **2** = Low / Minimal
- **3** = Medium / Moderate
- **4** = High / Significant
- **5** = Very High / Critical

---

## Migration Benefit Assessment

### Performance Improvement Potential
**Score:** [ ] 1 [ ] 2 [ ] 3 [ ] 4 [ ] 5

**Questions:**
- Would this route benefit from Server Components?
- Is there significant data fetching that could move server-side?
- Would streaming/suspense improve UX?
- Current performance issues?

**Notes:**
```
_________________________________________________________________________
_________________________________________________________________________
```

---

### Code Quality Improvement
**Score:** [ ] 1 [ ] 2 [ ] 3 [ ] 4 [ ] 5

**Questions:**
- Would App Router patterns improve code organization?
- Could layouts/templates reduce duplication?
- Would parallel routes or intercepting routes help?
- Current technical debt in this route?

**Notes:**
```
_________________________________________________________________________
_________________________________________________________________________
```

---

### User Experience Enhancement
**Score:** [ ] 1 [ ] 2 [ ] 3 [ ] 4 [ ] 5

**Questions:**
- Would instant loading improve UX?
- Could streaming reduce perceived load time?
- Would improved error boundaries help?
- Current UX issues?

**Notes:**
```
_________________________________________________________________________
_________________________________________________________________________
```

---

## Migration Effort Assessment

### Code Complexity
**Score:** [ ] 1 [ ] 2 [ ] 3 [ ] 4 [ ] 5

**Questions:**
- How many lines of code?
- How many dependencies/imports?
- Custom hooks or complex state management?
- Third-party integrations?

**Notes:**
```
_________________________________________________________________________
_________________________________________________________________________
```

---

### Provider/Context Dependencies
**Score:** [ ] 1 [ ] 2 [ ] 3 [ ] 4 [ ] 5

**Questions:**
- Does it use router-dependent providers?
- Complex context dependencies?
- Requires full provider stack?
- Custom providers needed?

**Notes:**
```
_________________________________________________________________________
_________________________________________________________________________
```

---

### Testing Effort
**Score:** [ ] 1 [ ] 2 [ ] 3 [ ] 4 [ ] 5

**Questions:**
- How many existing tests?
- Complex testing scenarios?
- Integration tests required?
- E2E tests needed?

**Notes:**
```
_________________________________________________________________________
_________________________________________________________________________
```

---

## Risk Assessment

### Business Impact
**Score:** [ ] 1 [ ] 2 [ ] 3 [ ] 4 [ ] 5

**Questions:**
- How critical is this route to business operations?
- Daily active users for this route?
- Revenue impact if issues occur?
- Regulatory/compliance concerns?

**Critical Route?** [ ] Yes [ ] No

**Notes:**
```
_________________________________________________________________________
_________________________________________________________________________
```

---

### Authentication/Authorization Complexity
**Score:** [ ] 1 [ ] 2 [ ] 3 [ ] 4 [ ] 5

**Questions:**
- Protected route requiring auth?
- Role-based access control?
- Complex permission logic?
- Session management?

**Auth Route?** [ ] Yes [ ] No

**Notes:**
```
_________________________________________________________________________
_________________________________________________________________________
```

---

### Third-Party Integration Risk
**Score:** [ ] 1 [ ] 2 [ ] 3 [ ] 4 [ ] 5

**Questions:**
- Payment processing (Stripe, etc.)?
- External APIs with specific requirements?
- OAuth/social login flows?
- Webhooks or callbacks?

**External Integrations?** [ ] Yes [ ] No

**Notes:**
```
_________________________________________________________________________
_________________________________________________________________________
```

---

## Calculated Scores

### Benefit Score (Higher = More Benefit)
```
Performance:     _____ / 5
Code Quality:    _____ / 5
UX Enhancement:  _____ / 5
─────────────────────────
TOTAL BENEFIT:   _____ / 15
```

**Benefit Level:**
- 1-5: Low benefit
- 6-10: Medium benefit
- 11-15: High benefit

---

### Effort Score (Higher = More Effort)
```
Code Complexity:    _____ / 5
Provider Deps:      _____ / 5
Testing Effort:     _____ / 5
─────────────────────────────
TOTAL EFFORT:       _____ / 15
```

**Effort Level:**
- 1-5: Low effort
- 6-10: Medium effort
- 11-15: High effort

---

### Risk Score (Higher = More Risk)
```
Business Impact:     _____ / 5
Auth Complexity:     _____ / 5
Integration Risk:    _____ / 5
──────────────────────────────
TOTAL RISK:          _____ / 15
```

**Risk Level:**
- 1-5: Low risk
- 6-10: Medium risk
- 11-15: High risk

---

## ROI Calculation

**Formula:** `ROI = (Benefit Score) / (Effort Score + Risk Score)`

```
ROI = _____ / (_____ + _____) = _____
```

**ROI Interpretation:**
- **>= 1.0:** Excellent candidate - high benefit, reasonable effort/risk
- **0.7 - 0.9:** Good candidate - migrate if time permits
- **0.4 - 0.6:** Marginal candidate - defer unless refactoring anyway
- **< 0.4:** Poor candidate - do not migrate

---

## Migration Priority

Based on scores above, this route is:

[ ] **HIGH PRIORITY** - Migrate in Phase 2 (Feb-Mar 2026)
- ROI >= 1.0
- OR: Low effort + Low risk + Medium+ benefit

[ ] **MEDIUM PRIORITY** - Migrate in Phase 3 (Apr-Sep 2026)
- ROI 0.4-0.9
- OR: Medium effort/risk but high benefit

[ ] **LOW PRIORITY** - Defer to Phase 4 (Oct 2026+)
- ROI < 0.4
- OR: High risk (especially auth routes)

[ ] **DO NOT MIGRATE** - Keep in Pages Router indefinitely
- Critical business route with no clear benefit
- OR: Extremely high risk with low benefit

---

## Decision

**Migrate?** [ ] Yes [ ] No [ ] Maybe (re-assess in ____ months)

**Target Date:** `____________________`

**Migration Assigned To:** `____________________`

**Prerequisites:**
1. _________________________________________________________________
2. _________________________________________________________________
3. _________________________________________________________________

**Rollback Plan:**
```
_________________________________________________________________________
_________________________________________________________________________
_________________________________________________________________________
```

---

## Example Assessment: `/privacy-policy`

**Route Path:** `/privacy-policy`
**Current Location:** `pages/privacy-policy.tsx`
**Target Location:** `app/privacy-policy/page.tsx`

### Scores:
- **Benefit:** Performance: 4, Code Quality: 2, UX: 2 = **8/15** (Medium)
- **Effort:** Complexity: 1, Provider Deps: 1, Testing: 1 = **3/15** (Low)
- **Risk:** Business: 1, Auth: 1, Integration: 1 = **3/15** (Low)

**ROI:** 8 / (3 + 3) = **1.33** (Excellent candidate)

**Priority:** HIGH PRIORITY (Phase 2)

**Why:** Static content page, perfect for RSC, extremely low risk

---

## Example Assessment: `/sign-in`

**Route Path:** `/sign-in`
**Current Location:** `pages/sign-in.tsx`
**Target Location:** `app/sign-in/page.tsx`

### Scores:
- **Benefit:** Performance: 3, Code Quality: 3, UX: 3 = **9/15** (Medium)
- **Effort:** Complexity: 4, Provider Deps: 4, Testing: 5 = **13/15** (High)
- **Risk:** Business: 5, Auth: 5, Integration: 4 = **14/15** (Very High)

**ROI:** 9 / (13 + 14) = **0.33** (Poor candidate)

**Priority:** LOW PRIORITY (Phase 4, Oct 2026+)

**Why:** Critical auth route, high risk, migrate last after all others proven stable

---

## Notes & Additional Considerations

```
_________________________________________________________________________
_________________________________________________________________________
_________________________________________________________________________
_________________________________________________________________________
_________________________________________________________________________
```

---

**Review Date:** `____________________`
**Approved By:** `____________________`

---

*Save completed assessments in: `claudedocs/migration-assessments/`*
