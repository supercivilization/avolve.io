#!/bin/bash

# Batch update schema references across all pages
# Run from project root: bash scripts/update-schemas.sh

echo "🔄 Updating schema references across all pages..."

# Files to update (excluding already completed: page.tsx, about/page.tsx, software/page.tsx)
files=(
  "src/app/solutions/page.tsx"
  "src/app/systems/page.tsx"
  "src/app/systems/email/page.tsx"
  "src/app/systems/mobile/page.tsx"
  "src/app/systems/search/page.tsx"
  "src/app/systems/social/page.tsx"
  "src/app/services/page.tsx"
  "src/app/services/dataforseo/page.tsx"
  "src/app/support/page.tsx"
  "src/app/software/nextjs/page.tsx"
  "src/app/software/react/page.tsx"
  "src/app/software/typescript/page.tsx"
  "src/app/software/nodejs/page.tsx"
  "src/app/software/tailwind/page.tsx"
  "src/app/software/shadcn-ui/page.tsx"
  "src/app/software/supabase/page.tsx"
  "src/app/software/vercel-ai-sdk/page.tsx"
  "src/app/software/react-to-production/page.tsx"
  "src/app/software/type-safe-stack/page.tsx"
  "src/app/software/ai-enabled-stack/page.tsx"
)

# Pattern replacements
for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "  📝 Updating $file"

    # Add import if not present
    if ! grep -q "from '@/lib/schema'" "$file"; then
      sed -i '' '/^import.*from "next"/a\
import { authorRef, publisherRef, websiteRef, LAST_VERIFIED_DATE } from "@/lib/schema";
' "$file"
    fi

    # Replace inline @id references with constants
    sed -i '' 's/"@id": "https:\/\/www.joshuaseymour.com\/#person"/authorRef/g' "$file"
    sed -i '' 's/"@id": "https:\/\/www.supercivilization.xyz\/#organization"/publisherRef/g' "$file"
    sed -i '' 's/"@id": "https:\/\/avolve.io\/#website"/websiteRef/g' "$file"

    # Update dateModified to use LAST_VERIFIED_DATE constant
    sed -i '' 's/"dateModified": "2025-10-0[0-9]"/"dateModified": LAST_VERIFIED_DATE/g' "$file"

    echo "  ✅ Updated $file"
  else
    echo "  ⚠️  File not found: $file"
  fi
done

echo ""
echo "✅ Schema updates complete!"
echo ""
echo "Next steps:"
echo "  1. Review changes: git diff src/app"
echo "  2. Test build: npm run build"
echo "  3. Commit: git add . && git commit -m 'Update schema references to use shared constants'"
