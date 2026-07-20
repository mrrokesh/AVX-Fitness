# AVX Fitness

Marketing website for **AVX Fitness** — online and offline coaching with Kathir in Salem, Tamil Nadu. Built for lead capture, program discovery, and client conversion.

## Features

- **Registration waitlist** on the home page (`/#waitlist-form`) with multi-step validation
- **Contact** and **consultation booking** forms
- **Resend email** notifications to admin + formatted visitor confirmations
- **Google Sheets** sync for all form submissions (Apps Script or service account)
- **Programs page** with 12-week fat loss posters (auto-swipe carousel on mobile), full program list, and membership plans
- **Admin dashboard** for lead management
- Optional **PostgreSQL** storage (JSON fallback when `DATABASE_URL` is unset)

## Stack

Next.js · TypeScript · Tailwind CSS · Framer Motion · React Hook Form · Zod · Resend · Google Sheets

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment

Copy `.env.example` to `.env.local` and configure:

| Variable | Purpose |
| --- | --- |
| `ADMIN_NOTIFY_EMAIL` | Inbox for new lead alerts |
| `RESEND_API_KEY` | Transactional email |
| `GOOGLE_SHEETS_WEBAPP_URL` | Apps Script web app (recommended) |
| `GOOGLE_SHEETS_WEBAPP_SECRET` | Shared secret for Sheets append |
| `DATABASE_URL` | Optional PostgreSQL (omit to use `data/store/db.json`) |

Full setup: **[INTEGRATIONS.md](./INTEGRATIONS.md)**

Test Sheets connection:

```bash
npm run test:sheets
```

## Forms

| Form | Location | API | Sheets tab |
| --- | --- | --- | --- |
| Registration / waitlist | `/#waitlist-form` | `/api/register` | `Registrations` |
| Contact | `/contact` | `/api/contact` | `Contacts` |
| Consultation booking | `/consultation` | `/api/bookings` | `Bookings` |

## Key routes

| Route | Purpose |
| --- | --- |
| `/` | Home — registration form, how it works, results, FAQ |
| `/programs` | 12-week program posters, all tracks, membership plans |
| `/programs/weight-loss` | Full 12-week fat loss program details |
| `/transformations` | Client results gallery |
| `/consultation` | Book a free consultation |
| `/contact` | Contact form + studio map |
| `/admin/login` | Admin access |
| `/admin/dashboard` | Leads and announcement management |

Legacy redirects:

- `/registration` → `/`
- `/membership` → `/programs#membership-plans`

## Project structure

```
src/
  app/              # Next.js App Router pages and API routes
  components/       # UI, forms, layout, sections
  data/             # Site config, programs, memberships, content
  lib/
    integrations/   # Email, Google Sheets, Calendar
    validations/    # Zod schemas for all forms
public/
  images/           # Banners, brand, transformations, 12-week posters
scripts/
  google-apps-script/Code.gs
  test-sheets.mjs
```

## Admin

Default credentials (change in `.env.local` immediately):

- URL: `/admin/login`
- Username: `admin`
- Password: `changeme`

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | ESLint |
| `npm run test:sheets` | Test Google Sheets web app connection |

## Content

Edit branding and business details in `src/data/site.ts`:

- Phone / WhatsApp: `9344740075`
- Instagram: `@avx_fit`
- Coach: Kathir
- Programs, memberships, transformations: `src/data/programs.ts`, `src/data/memberships.ts`, `src/data/content.ts`

## Deploy

Set `NEXT_PUBLIC_SITE_URL` to your production domain before deploying (Vercel, etc.). Never commit `.env.local` or service account JSON files.
