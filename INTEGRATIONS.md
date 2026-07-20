# Form integrations — local PostgreSQL + Google Sheets + Resend

On form submit:

| Form | API | Sheets tab | Admin email |
|------|-----|------------|-------------|
| Registration / waitlist | `/api/register` | `Registrations` | Yes |
| Contact | `/api/contact` | `Contacts` | Yes |
| Consultation booking | `/api/bookings` | `Bookings` | Yes |

Each submission:

1. **Save locally** (PostgreSQL via `DATABASE_URL`, or `data/store/db.json` fallback)  
2. **Append to Google Sheets** (Sheets API + service account)  
3. **Email via Resend** — visitor confirmation + `ADMIN_NOTIFY_EMAIL`

Supabase is **not** used.

---

## 1) Local PostgreSQL

### Create database

```bash
# Windows / macOS / Linux (example)
createdb avx_fitness
```

Or in `psql`:

```sql
CREATE DATABASE avx_fitness;
```

### Env

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/avx_fitness
# Optional for cloud Postgres with SSL:
# DATABASE_SSL=true
```

The app auto-creates the `registrations` table on first submit.

You can also run `data/schema.sql` manually if you prefer.

---

## 2) Google Sheets (all forms)

Tabs **Registrations**, **Contacts**, and **Bookings** are created automatically.

> **Note:** A Google API key alone cannot write to Sheets. Use **Apps Script** (easiest) or a **service account JSON**.

### Option A — Apps Script (recommended, ~2 minutes)

1. Open your Google Sheet (**AVX Fitness Leads**)
2. **Extensions → Apps Script** → delete default code → paste all of `scripts/google-apps-script/Code.gs`
3. **Project Settings** (gear) → **Script properties** → Add:
   - Name: `WEBAPP_SECRET` → Value: same as `GOOGLE_SHEETS_WEBAPP_SECRET` in `.env.local`
4. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy the Web App URL into `.env.local`:
   ```env
   GOOGLE_SHEETS_WEBAPP_URL=https://script.google.com/macros/s/XXXX/exec
   GOOGLE_SHEETS_WEBAPP_SECRET=AVX-Fitness-Sheets-7kM9pQ2xR5
   ```
6. Test: `npm run test:sheets`
7. Restart `npm run dev` and submit a form

### Option B — Service account (alternative)

See Google Cloud Console: enable Sheets API, download JSON key, share Sheet with service account email.

```env
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id
GOOGLE_SERVICE_ACCOUNT_KEY_FILE=google-service-account.json
```

---

## 3) Resend email (~3,000 / month free)

1. Sign up at [resend.com](https://resend.com) with **mrrokesh.admin@gmail.com** (required on free tier so admin mail can reach that inbox)  
2. Create an API key  

```env
RESEND_API_KEY=re_xxxx
EMAIL_FROM="AVX Fitness <onboarding@resend.dev>"
ADMIN_NOTIFY_EMAIL=mrrokesh.admin@gmail.com
```

- Until a domain is verified, use `onboarding@resend.dev`  
- Unverified free accounts can usually only send to your Resend signup email  
- After domain verify, emails go to any lead + you  

---

## 4) Example `.env.local`

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000

DATABASE_URL=postgresql://postgres:password@localhost:5432/avx_fitness

GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id
GOOGLE_SERVICE_ACCOUNT_EMAIL=xxx@yyy.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

RESEND_API_KEY=re_xxxx
EMAIL_FROM="AVX Fitness <onboarding@resend.dev>"
ADMIN_NOTIFY_EMAIL=mrrokesh.admin@gmail.com
```

Restart `npm run dev` after saving.

---

## 5) Verify

1. Submit the home registration form (`/`), `/contact`, and `/consultation` once each  
2. Confirm three Sheet tabs each have a new row  
3. Check Resend dashboard + `mrrokesh.admin@gmail.com` inbox  

Registration API response:

```json
{
  "ok": true,
  "id": "REG-...",
  "sync": { "postgres": true, "sheets": true, "email": true, "errors": [] }
}
```
