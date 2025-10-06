#!/bin/bash

# Script to add canonical URLs to all page.tsx files
# Usage: ./scripts/add-canonicals.sh

BASE_DIR="/Users/avolve/dev/active/avolve/src/app"

# Array of [file_path, canonical_url]
declare -a pages=(
  "systems/page.tsx:https://avolve.io/systems"
  "systems/mobile/page.tsx:https://avolve.io/systems/mobile"
  "systems/email/page.tsx:https://avolve.io/systems/email"
  "systems/social/page.tsx:https://avolve.io/systems/social"
  "systems/search/page.tsx:https://avolve.io/systems/search"
  "software/page.tsx:https://avolve.io/software"
  "software/nextjs/page.tsx:https://avolve.io/software/nextjs"
  "software/react/page.tsx:https://avolve.io/software/react"
  "software/vercel-ai-sdk/page.tsx:https://avolve.io/software/vercel-ai-sdk"
  "software/tailwind/page.tsx:https://avolve.io/software/tailwind"
  "software/nodejs/page.tsx:https://avolve.io/software/nodejs"
  "software/supabase/page.tsx:https://avolve.io/software/supabase"
  "software/shadcn-ui/page.tsx:https://avolve.io/software/shadcn-ui"
  "software/typescript/page.tsx:https://avolve.io/software/typescript"
  "services/page.tsx:https://avolve.io/services"
  "services/dataforseo/page.tsx:https://avolve.io/services/dataforseo"
  "support/page.tsx:https://avolve.io/support"
)

for entry in "${pages[@]}"; do
  IFS=":" read -r file_path canonical_url <<< "$entry"
  full_path="$BASE_DIR/$file_path"

  if [ -f "$full_path" ]; then
    # Check if alternates already exists
    if grep -q "alternates:" "$full_path"; then
      echo "✓ $file_path already has alternates"
    else
      # Check if file has metadata export
      if grep -q "export const metadata: Metadata = {" "$full_path"; then
        # Add alternates before closing metadata brace
        # Find the line with closing brace, add alternates before it
        sed -i '' '/export const metadata: Metadata = {/,/^};$/ {
          /^};$/ i\
  alternates: {\
    canonical: "'"$canonical_url"'",\
  },
        }' "$full_path"
        echo "✓ Added canonical to $file_path"
      else
        echo "⚠️  No metadata export found in $file_path"
      fi
    fi
  else
    echo "✗ File not found: $full_path"
  fi
done

echo ""
echo "Canonical URL addition complete!"
