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
