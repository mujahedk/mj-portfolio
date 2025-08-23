# MJ Portfolio

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

A personal portfolio showcasing projects, notes, and research by MJ - a CS grad and full-stack developer who loves turning ideas into working products.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Environment Configuration

### Contact Form Email Service (Optional)

The contact form supports both `mailto:` fallback and serverless email sending via [Resend](https://resend.com).

To enable serverless email sending:

1. Sign up for a free account at [Resend](https://resend.com)
2. Get your API key from the dashboard
3. Create a `.env.local` file in the project root:

```bash
# .env.local
RESEND_API_KEY=re_1234567890abcdef...
```

4. Verify your domain in Resend (or use the default sandbox domain for testing)

**Note**: If `RESEND_API_KEY` is not set, the contact form will automatically fall back to opening the user's email client with a pre-filled message.

### Troubleshooting

**Hydration Warnings**: If you still see hydration warnings with `--vsc-domain`, try an Incognito window or disable extensions (VS Code Live Preview) that inject styles before hydration.

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm start            # Start production server
```

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## 📧 Contact Form Setup

The contact form uses [Resend](https://resend.com) to send emails directly to your inbox. To enable this functionality:

### 1. Get a Resend API Key
1. Sign up at [resend.com](https://resend.com)
2. Go to API Keys section
3. Create a new API key
4. Copy the API key

### 2. Set Environment Variable
Create a `.env.local` file in your project root:

```bash
# .env.local
RESEND_API_KEY=your_resend_api_key_here
```

### 3. Verify Email Sending
- The form will now send emails directly to `mujahedk@umich.edu`
- No more opening mail apps - emails are sent automatically
- Includes rate limiting and validation
- Fallback to direct email button if API fails

### 4. Custom Domain (Optional)
Once you verify your domain with Resend, you can update the `from` address in `src/app/api/contact/route.ts`:

```typescript
from: 'Portfolio Contact <noreply@yourdomain.com>'
```

## Theme Implementation QA Checklist

### ✅ Theme Provider Setup
- [x] `next-themes` installed and configured
- [x] `ThemeProvider` with `defaultTheme="dark"` and `enableSystem={false}`
- [x] `suppressHydrationWarning` on `<html>` element
- [x] No hydration warnings in console

### ✅ Theme Tokens (CSS Variables)
- [x] Light theme variables defined (`:root`)
- [x] Dark theme variables defined (`.dark`)
- [x] All components using `var(--bg)`, `var(--text)`, `var(--surface)`, etc.
- [x] No hardcoded colors remaining

### ✅ Default Dark Theme
- [x] Site loads in dark theme by default
- [x] Deep navy background (`#0b1220`)
- [x] Light text (`#e5e7eb`)
- [x] Translucent surfaces with backdrop blur
- [x] Header/footer use dark theme colors

### ✅ Light Theme Toggle
- [x] Theme toggle button visible and functional
- [x] Clicking toggle switches to light theme
- [x] White background (`#ffffff`)
- [x] Dark text (`#0f172a`)
- [x] Light blue surfaces (`#d1e7ff`)
- [x] Header/footer become darker blue

### ✅ Component Updates
- [x] Header component uses theme tokens
- [x] Footer component uses theme tokens
- [x] CTAButton component uses theme tokens
- [x] ProjectCard component uses theme tokens
- [x] InfoCard component uses theme tokens
- [x] SkillGroup component uses theme tokens
- [x] TagFilter component uses theme tokens
- [x] All page components updated

### ✅ Page Updates
- [x] Home page uses theme tokens
- [x] About page uses theme tokens
- [x] Projects page uses theme tokens
- [x] Writeups page uses theme tokens
- [x] Contact page uses theme tokens

### ✅ Visual Consistency
- [x] All cards use `bg-[var(--surface)]` and `border-[var(--border)]`
- [x] All text uses `text-[var(--text)]` or `text-[var(--muted)]`
- [x] All buttons use `bg-[var(--primary)]` and `hover:bg-[var(--primary-hover)]`
- [x] Smooth transitions between themes
- [x] No color flashing during theme switch

### 🧪 Manual Testing Steps

1. **Default Load Test**
   - Refresh page → should load in dark theme
   - Verify deep navy background and light text
   - Check header/footer are dark with blur effect

2. **Light Theme Test**
   - Click theme toggle → should switch to light theme
   - Verify white background and dark text
   - Check header/footer are darker blue
   - All cards should be darker blue surfaces

3. **Dark Theme Test**
   - Click theme toggle again → should return to dark
   - Verify deep navy background returns
   - Check all colors revert properly

4. **Hydration Test**
   - Open browser console
   - Refresh page multiple times
   - Verify no hydration warnings appear

5. **Component Consistency Test**
   - Navigate to all pages (Home, About, Projects, Writeups, Contact)
   - Verify theme consistency across all components
   - Check that all cards, buttons, and text use theme tokens

6. **Contact Form Test**
   - Fill out and submit the contact form
   - Verify email is sent to your inbox (with Resend API key configured)
   - Check error handling if API fails

### 🎨 Theme Colors

**Light Theme:**
- Background: `#ffffff` (white)
- Text: `#0f172a` (slate-900)
- Surface: `#d1e7ff` (darker light blue)
- Header/Footer: `#c7e1ff` (darker blue)

**Dark Theme:**
- Background: `#0b1220` (deep navy)
- Text: `#e5e7eb` (slate-200)
- Surface: `rgba(15,23,42,.6)` (translucent slate)
- Header/Footer: `rgba(11,18,32,.8)` (dark with blur)
