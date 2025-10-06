# Google Analytics Setup Instructions

## Current Status
✅ Google Analytics code has been added to `/src/app/layout.tsx`
⚠️ Placeholder tracking ID needs to be replaced

## Next Steps

### 1. Create Google Analytics 4 Property

1. Go to [Google Analytics](https://analytics.google.com)
2. Click **Admin** (gear icon in bottom left)
3. In the **Property** column, click **Create Property**
4. Enter property details:
   - **Property name**: Avolve.io
   - **Reporting time zone**: Your timezone
   - **Currency**: USD
5. Click **Next** → Configure business details
6. Click **Create** → Accept terms

### 2. Get Measurement ID

1. In your new property, go to **Admin** → **Data Streams**
2. Click **Add stream** → **Web**
3. Enter:
   - **Website URL**: https://avolve.io
   - **Stream name**: Avolve.io Web
4. Click **Create stream**
5. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)

### 3. Update Code

Replace `G-XXXXXXXXXX` in `/src/app/layout.tsx` (lines 233 and 240) with your actual Measurement ID.

```bash
# Example with sed
sed -i '' 's/G-XXXXXXXXXX/G-YOUR-REAL-ID/g' src/app/layout.tsx
```

### 4. Verify Installation

1. Deploy to production
2. Visit https://avolve.io
3. In GA4, go to **Reports** → **Realtime**
4. You should see your visit within 30 seconds

## Optional Enhancements

### Enhanced Measurements (Already Enabled by Default)
- Page views
- Scrolls
- Outbound clicks
- Site search
- Video engagement
- File downloads

### Custom Events (Add if Needed)

```typescript
// Track button clicks
gtag('event', 'click', {
  event_category: 'engagement',
  event_label: 'software_page_visit'
});

// Track conversions
gtag('event', 'conversion', {
  send_to: 'G-XXXXXXXXXX/conversion_id',
  value: 1.0,
  currency: 'USD'
});
```

### Link to Search Console

1. In GA4, go to **Admin** → **Product Links**
2. Click **Search Console Links** → **Link**
3. Select your Search Console property
4. Click **Confirm** → **Submit**

This enables **Search Console** reports in GA4.

## Privacy & GDPR Compliance

Current implementation is basic. For GDPR compliance, consider:

1. **Cookie Consent Banner**
2. **Data Deletion Requests** handling
3. **Privacy Policy** updates
4. **IP Anonymization** (enabled by default in GA4)

## Sitemap Link
Once deployed: https://avolve.io/sitemap.xml
