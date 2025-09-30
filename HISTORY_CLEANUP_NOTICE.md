# 🚨 CRITICAL: Git History Rewrite - Action Required

**Date:** September 30, 2025
**Action:** IMMEDIATE - All team members must re-clone the repository
**Priority:** CRITICAL SECURITY ISSUE
**Contact:** josh@avolve.io

---

## ⚠️ What Happened

The git history for the **avolve** repository has been **permanently rewritten** to remove exposed production secrets and API keys that were accidentally committed.

**Secrets Removed:**
- YouTube API Key
- Supabase Production URL and Keys
- Other sensitive credentials

This was a **necessary security measure** to protect our production systems from potential compromise.

---

## 🔴 IMMEDIATE ACTION REQUIRED

### All Team Members MUST:

1. **Delete your local repository completely**
2. **Re-clone the repository from GitHub**
3. **Recreate any open pull requests**
4. **Update your environment variables**

**⚠️ WARNING:** Do NOT try to push from your old local copy. This will cause conflicts and potentially restore the removed secrets.

---

## 📋 Step-by-Step Instructions

### For Team Members Without Open PRs

```bash
# 1. Navigate to your projects directory (NOT inside the avolve repo)
cd ~/dev/active/  # or wherever you keep your projects

# 2. Delete the old repository completely
rm -rf avolve/

# 3. Re-clone the cleaned repository
git clone https://github.com/avolve-dao/avolve.git

# 4. Enter the new repository
cd avolve/

# 5. Install dependencies
pnpm install

# 6. Copy environment template and add your keys
cp .env.local.template .env.local
# Edit .env.local with your actual API keys

# 7. Verify everything works
pnpm dev
```

### For Team Members WITH Open PRs

```bash
# 1. Save your changes to a patch file FIRST
cd ~/dev/active/avolve/
git diff main > ~/my-changes.patch

# 2. Navigate to your projects directory
cd ~/dev/active/

# 3. Delete the old repository
rm -rf avolve/

# 4. Re-clone the cleaned repository
git clone https://github.com/avolve-dao/avolve.git
cd avolve/

# 5. Create a new branch
git checkout -b feature/your-feature-name-new

# 6. Apply your saved changes
git apply ~/my-changes.patch

# 7. Review, commit, and push
git add .
git commit -m "Your feature description"
git push origin feature/your-feature-name-new

# 8. Close your old PR and create a new one from the new branch
```

---

## 🔐 Security Credentials Update

### CRITICAL: Rotate Your API Keys

If you have any of these credentials, they have been **rotated**:

✅ **YouTube API Key** - New key required
✅ **Supabase Production URL** - May have changed
✅ **Supabase Service Role Key** - Rotated for security

### Get New Credentials

1. **Contact:** josh@avolve.io for new production credentials
2. **Update:** Your local `.env.local` file with new keys
3. **Never commit:** Real credentials to git (use placeholders only)

---

## ❓ Frequently Asked Questions

### Q: Why was this necessary?

**A:** Production API keys and database credentials were accidentally committed to git history. Even though they were removed from current files, they remained accessible in git history, posing a significant security risk.

### Q: What if I just pull the latest changes?

**A:** ❌ **DO NOT DO THIS.** Pulling will not work correctly because the history has been rewritten. You will get merge conflicts and potentially restore the removed secrets. You MUST delete and re-clone.

### Q: Can I just run `git pull --force`?

**A:** ❌ **NO.** This can cause unpredictable behavior. The safest and recommended approach is to delete and re-clone.

### Q: What about my local branches and work in progress?

**A:** Save your work to patch files (see instructions above) before deleting. You can then apply the patches to the new clean repository.

### Q: Will this happen again?

**A:** We've implemented additional safeguards:
- Pre-commit hooks to detect secrets
- Updated `.gitignore` to be more comprehensive
- Template files with safe placeholders only
- Team training on secrets management

### Q: What if I already pushed from my old local copy?

**A:** Contact josh@avolve.io immediately. This is a critical security issue that needs immediate attention.

### Q: How do I know the cleanup was successful?

**A:** Run these verification commands after re-cloning:

```bash
# These should all return "No commits found" or no output
git log --all -S "AIzaSy"
git log --all -S "sb_secret"
git log --all -S "zrdkuqagtbgexphjykpy"
```

---

## 🛡️ New Security Practices

Going forward, **NEVER commit**:

❌ API keys or tokens
❌ Database passwords
❌ Service credentials
❌ OAuth secrets
❌ Private keys or certificates

**ALWAYS use:**

✅ Environment variables (`.env.local`)
✅ Secure credential management (Vercel secrets, etc.)
✅ Placeholder values in committed files
✅ `.gitignore` for sensitive files

---

## 📞 Support & Questions

### If You Have Questions:
- **Email:** josh@avolve.io
- **Subject:** "Git History Cleanup - Question"

### If You Encounter Issues:
1. Document the exact error message
2. Note what step you were on
3. Contact josh@avolve.io immediately

### If You Accidentally Pushed Old History:
🚨 **CRITICAL:** Contact josh@avolve.io **IMMEDIATELY**

---

## ✅ Confirmation Checklist

Before continuing work, confirm you have:

- [ ] Deleted your old local repository
- [ ] Re-cloned from GitHub
- [ ] Installed dependencies (`pnpm install`)
- [ ] Updated `.env.local` with new credentials
- [ ] Verified the app runs (`pnpm dev`)
- [ ] Confirmed no secrets in git history (verification commands above)
- [ ] Closed any old pull requests
- [ ] Created new pull requests from the clean repository

---

## 📊 Timeline

- **September 29, 2025:** Initial commit with exposed secrets
- **September 30, 2025 - Morning:** Security audit identified secrets
- **September 30, 2025 - Afternoon:** Secrets removed from current files
- **September 30, 2025 - Evening:** Git history cleaned with git-filter-repo
- **September 30, 2025 - Now:** Team notification and re-clone required

---

## 📄 Related Documentation

- `SECURITY_AUDIT.md` - Complete security audit report
- `.env.local.template` - Template for environment variables
- `.env.example` - Example configuration with safe placeholders

---

## 🙏 Thank You

Thank you for your understanding and prompt action on this security matter. Protecting our production systems and user data is our highest priority.

If you have any questions or concerns, please don't hesitate to reach out.

**- Avolve Security Team**

---

**Document Version:** 1.0
**Last Updated:** September 30, 2025
**Status:** ACTIVE - Action Required
