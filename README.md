# AVX Fitness

Marketing website for **AVX Fitness** — online and offline coaching with Kathir in Salem, Tamil Nadu. Built for lead capture, program discovery, and client conversion.

**Live site:** [avx-fitness.vercel.app](https://avx-fitness.vercel.app) · **Repo:** [github.com/mrrokesh/AVX-Fitness](https://github.com/mrrokesh/AVX-Fitness)

## Features

### Lead capture
- **Registration waitlist** on the home page (`/#waitlist-form`) with multi-step Zod validation
- **Contact** and **consultation booking** forms
- **Resend email** notifications to admin + formatted visitor confirmations
- **Google Sheets** sync via Apps Script web app (recommended) or service account
- Optional **PostgreSQL** storage (JSON fallback at `data/store/db.json` when `DATABASE_URL` is unset)

### Home page
- **Wine waitlist hero** — crimson accent headline, animated stats/trust badges, and CTAs on the left; form on the right (desktop)
- **Scrolling announcement bar** — wine-themed marquee with coaching highlights and “Book now” link
- **Branded contact icons** — WhatsApp, phone, Instagram, and location icons site-wide (footer, contact, floats, mobile bar)
- **Auto-advancing testimonials** carousel with manual prev/next controls
- Section order: waitlist → **Meet your coach** → transformations preview → reviews → **How it works** → FAQ → CTA
- **Coach ProfileCard** (`#coach` and `/trainers/kathir`):
  - **Desktop (mouse):** 3D tilt + holographic hover
  - **Mobile / tablet (touch):** rainbow aura border; no tilt
  - Compact pill: **Kathir** · Certified Fitness Trainer · WhatsApp icon

### Programs & content
- **Programs page** with three tracks: **Fat Loss**, **Muscle Gain**, **Body Recomposition**, plus membership plans
- **`/programs/weight-loss`** (and other program slugs) — full program detail pages
- **Transformations page** — gallery, result moments, and Instagram-style reel cards (tap to play with audio)
- Stats strip: **600+** clients · **196k+** Instagram followers

### Admin
- Dashboard for lead management and editable top-bar announcement text

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · React Hook Form · Zod · Resend · Google Sheets

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Note:** Dev uses **webpack** (`next dev --webpack`) for reliability on Windows. Turbopack can hang with high memory use in this project.

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
| `/` | Home — waitlist, coach, results, how it works, FAQ |
| `/programs` | Program tracks + membership plans |
| `/programs/[slug]` | Program detail (`weight-loss`, `muscle-building`, `body-recomposition`) |
| `/transformations` | Client results gallery and Instagram reels |
| `/trainers/kathir` | Coach profile |
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
  app/                 # Next.js App Router pages and API routes
  components/
    bits/              # ProfileCard (tilt / holo)
    forms/             # Registration, contact, booking forms
    icons/             # WhatsApp, phone, Instagram, location + ContactIconBadge
    layout/            # Navbar, footer, announcement marquee, float buttons
    sections/          # Home sections (waitlist, coach, FAQ, reviews, etc.)
    trainers/          # AdaptiveCoachCard (desktop tilt vs mobile aura)
    transformations/   # Results gallery and reels
  data/                # Site config, programs, memberships, content
  lib/
    hooks/             # useHasMouseHover (device split for coach card)
    integrations/      # Email, Google Sheets, Calendar
    validations/       # Zod schemas for all forms
public/
  images/              # Banners, brand, trainers, gallery posters
  videos/instagram/    # reel-01.mp4 … reel-06.mp4
scripts/
  google-apps-script/Code.gs
  test-sheets.mjs
```

## UI notes

| Area | Behavior |
| --- | --- |
| Mobile navbar | Sticky header with dropdown drawer; page scrolls normally when menu is open; Book CTA hidden while menu open |
| Coach profile | Desktop: ProfileCard tilt; mobile/tablet: rainbow aura; photo at `public/images/trainers/kathir.jpg` |
| Announcement bar | Wine/crimson scrolling marquee; phrases in `src/data/site.ts` (`announcementMarquee`) or admin API |
| Waitlist section | Dark wine gradient hero; desktop stats/CTAs animate on scroll |
| Contact icons | Themed badges via `ContactIconBadge` / `ContactLink` |
| Footer | Centered layout: brand → nav → phone/location/Instagram → copyright |
| Float buttons | Icon-only Instagram + WhatsApp (bottom-right) |
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
| `npm run dev` | Start development server (webpack) |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | ESLint |
| `npm run test:sheets` | Test Google Sheets web app connection |

## Content

Edit branding and business details in `src/data/site.ts`:

- Phone / WhatsApp: `9344740075`
- Studio Instagram: `@avx_fit`
- Coach: Kathir · `@kathir_lifts`
- Marquee phrases: `announcementMarquee`
- Programs: `src/data/programs.ts` (Fat Loss, Muscle Gain, Body Recomposition)
- Memberships / transformations: `src/data/memberships.ts`, `src/data/content.ts`

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
