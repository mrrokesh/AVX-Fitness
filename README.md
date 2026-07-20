# AVX Fitness

Marketing website for **AVX Fitness** — online and offline coaching with Kathir in Salem, Tamil Nadu. Built for lead capture, program discovery, and client conversion.

**Live repo:** [github.com/mrrokesh/AVX-Fitness](https://github.com/mrrokesh/AVX-Fitness)

## Features

### Lead capture
- **Registration waitlist** on the home page (`/#waitlist-form`) with multi-step Zod validation
- **Contact** and **consultation booking** forms
- **Resend email** notifications to admin + formatted visitor confirmations
- **Google Sheets** sync via Apps Script web app (recommended) or service account
- Optional **PostgreSQL** storage (JSON fallback at `data/store/db.json` when `DATABASE_URL` is unset)

### Home page
- **Wine waitlist hero** — crimson accent headline, animated stats/trust badges, and CTAs on the left; form on the right (desktop)
- **Scrolling announcement bar** — blue marquee with coaching highlights and “Book now” link
- **Branded contact icons** — WhatsApp, phone, Instagram, and location icons site-wide (footer, contact, floats, mobile bar)
- **Auto-advancing testimonials** carousel with manual prev/next controls
- Section order: waitlist → transformations preview → reviews → **How it works** → FAQ → CTA

### Programs & content
- **Programs page** with 12-week fat loss posters (auto-swipe carousel on mobile), full program list, and membership plans
- **`/programs/weight-loss`** — full 12-week fat loss program content
- **Transformations page** — gallery, result moments, and Instagram-style reel cards (tap to play with audio)

### Admin
- Dashboard for lead management and editable top-bar announcement text

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
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (required for production) |
| `ADMIN_NOTIFY_EMAIL` | Inbox for new lead alerts |
| `RESEND_API_KEY` | Transactional email |
| `EMAIL_FROM` | Sender address (Resend verified domain) |
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
| `/` | Home — waitlist form, results, how it works, FAQ |
| `/programs` | 12-week program posters, all tracks, membership plans |
| `/programs/weight-loss` | Full 12-week fat loss program details |
| `/transformations` | Client results gallery and Instagram reels |
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
  components/
    forms/          # Registration, contact, booking forms
    icons/          # WhatsApp, phone, Instagram, location + ContactIconBadge
    layout/         # Navbar, footer, announcement marquee, float buttons
    sections/       # Home sections (waitlist, FAQ, reviews, etc.)
    transformations/# Results gallery and reels
  data/             # Site config, programs, memberships, content
  lib/
    integrations/   # Email, Google Sheets, Calendar
    validations/    # Zod schemas for all forms
public/
  images/           # Banners, brand, transformations, 12-week posters
  videos/           # Instagram reel MP4s (optional)
scripts/
  google-apps-script/Code.gs
  test-sheets.mjs
```

## UI notes

| Area | Behavior |
| --- | --- |
| Announcement bar | Blue scrolling marquee; phrases in `src/data/site.ts` (`announcementMarquee`) or admin API |
| Waitlist section | Dark wine gradient hero; desktop stats/CTAs animate on scroll (`WaitlistSupportContent`) |
| Contact icons | Themed badges via `ContactIconBadge` / `ContactLink` in `src/components/icons/` |
| Footer | Mobile-centered layout; address + call link with icons |
| Float buttons | Crimson WhatsApp + Instagram brand icons (bottom-right) |
| Testimonials | Auto-advance every ~4.5s; pauses on hover |
| Instagram reels | Portrait 9:16 cards; tap to play with sound; mute toggle while playing |

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
- Marquee phrases: `announcementMarquee`
- Programs, memberships, transformations: `src/data/programs.ts`, `src/data/memberships.ts`, `src/data/content.ts`

Add Instagram reel videos under `public/videos/instagram/` (`reel-01.mp4` … `reel-06.mp4`) and reference them in `src/data/content.ts`.

## Deploy

### GitHub

```bash
git push origin main
```

Repository: [github.com/mrrokesh/AVX-Fitness](https://github.com/mrrokesh/AVX-Fitness)

### Production (Vercel / etc.)

Set `NEXT_PUBLIC_SITE_URL` to your production domain before deploying. Never commit `.env.local` or service account JSON files.

## Author

**Santhosh Kumar** — [GitHub](https://github.com/mrrokesh)
