#!/bin/bash
# Set build date as environment variable for Next.js build
# This creates .env.production with the current date

DATE=$(date +%Y-%m-%d)
echo "NEXT_PUBLIC_BUILD_DATE=$DATE" > .env.production
echo "✓ Build date set to: $DATE"
