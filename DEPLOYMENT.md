# Deployment Guide

## Vercel Deployment

This portfolio is ready for deployment to Vercel. Follow these steps:

### 1. Environment Variables

Set these environment variables in your Vercel dashboard:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 2. Deploy to Vercel

#### Option A: Deploy via Vercel CLI

```bash
npm i -g vercel
vercel
```

#### Option B: Deploy via GitHub Integration

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel will automatically deploy on every push

### 3. Custom Domain (Optional)

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings > Domains
4. Add your custom domain
5. Update the `NEXT_PUBLIC_SITE_URL` environment variable

### 4. Performance Optimizations

The following optimizations are already configured:

- ✅ Static generation for all pages
- ✅ Image optimization
- ✅ Font optimization
- ✅ Bundle analysis
- ✅ Security headers
- ✅ Caching headers for static assets
- ✅ SEO meta tags and sitemap

### 5. Contact Form

The contact form is currently set up as a mock. To enable real email sending:

1. Add a service like Resend, SendGrid, or AWS SES
2. Update `app/api/contact/route.ts`
3. Add the API key as an environment variable

### 6. Analytics (Optional)

To add analytics:

1. **Google Analytics**: Add `GOOGLE_ANALYTICS_ID` environment variable
2. **Vercel Analytics**: Enable in Vercel dashboard
3. Update the layout to include analytics scripts

### 7. Build Verification

The project builds successfully with:

```bash
npm run build
```

All pages are statically generated for optimal performance.
