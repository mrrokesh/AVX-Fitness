export const siteConfig = {
  name: "AVX Fitness",
  shortName: "AVX FIT",
  legalName: "AVX Fitness Studio",
  tagline: "Stronger Everyday",
  headline: "Real People. Real Results.",
  subheadline:
    "Transform your body. Transform your life — online coaching anywhere, offline training in Salem.",
  city: "Salem",
  state: "Tamil Nadu",
  address: "AVX Fitness Studio, Salem, Tamil Nadu",
  addressNote:
    "Exact studio pin is linked from Instagram. Confirm street-level address with the gym before publishing print materials.",
  mapsUrl: "https://maps.app.goo.gl/mZqYRN8G6dvFZotn9",
  mapsLat: 11.6666503,
  mapsLng: 78.0365897,
  phone: "9344740075",
  phoneDisplay: "+91 93447 40075",
  whatsapp: "919344740075",
  email: "",
  instagram: "@avx_fit",
  instagramUrl: "https://www.instagram.com/avx_fit/",
  instagramDmUrl: "https://ig.me/m/avx_fit",
  facebook: "",
  youtube: "",
  founder: "Kathir",
  founderTitle: "Certified Fitness Trainer",
  founderInstagram: "@great_kathir",
  founderInstagramUrl: "https://www.instagram.com/great_kathir/",
  logo: "/images/brand/logo.png",
  /** Legacy alias — prefer pageBanners / heroImage */
  promoImage: "/images/banners/studio.jpg",
  heroImage: "/images/banners/home.jpg",
  studioImage: "/images/banners/studio.jpg",
  businessHours: "DM or WhatsApp for current session timings",
  timezone: "Asia/Kolkata",
  timezoneLabel: "IST (Asia/Kolkata)",
  googleMapsEmbedUrl:
    "https://www.google.com/maps?q=11.6666503,78.0365897&hl=en&z=16&output=embed",
  parkingInfo: "Ask the team via WhatsApp or Instagram DM for parking guidance near the studio.",
  /** Public social proof from Instagram marketing */
  instagramFollowers: 4700,
  instagramPosts: 61,
  yearsExperience: null as number | null,
  membersTrained: 600,
  certifiedTrainers: 1,
  averageRating: null as number | null,
  bio: "Fat Loss • Muscle Gain • Body Recomposition. AVX Fitness has coached 600+ clients with personal training, custom diet plans, accountability and 90-day transformation focus — online anywhere, anytime, and offline in Salem.",
  announcement:
    "Book a free consultation or join online — limited coaching slots with Kathir this month.",
  whatsappPrefill:
    "Hi AVX Fitness, I'm interested in joining. I'd like to know more about your online/offline programs and membership plans.",
  instagramPrefill:
    "Hi AVX Fitness, I'm interested in joining. I'd like to know more about your programs and coaching plans.",
  primaryCtaLabel: "WhatsApp Now",
  /** Editable waitlist copy for the sticky bar / registration page */
  waitlistSpotsLeft: 3,
  seo: {
    title: "AVX Fitness | Online & Offline Coaching in Salem",
    description:
      "AVX Fitness Studio in Salem — fat loss, muscle gain & body recomposition with Kathir. 600+ clients coached. WhatsApp 9344740075 or DM @avx_fit to start your 90-day journey.",
  },
} as const;

/**
 * Primary top navigation — ordered for a friendly join journey:
 * discover → offerings → proof → plans → register → contact.
 */
export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/transformations", label: "Results" },
  { href: "/contact", label: "Contact" },
] as const;

/** Secondary links for footer only. */
export const footerExtraLinks = [
  { href: "/trainers", label: "Coach" },
  { href: "/consultation", label: "Book Consult" },
  { href: "/faq", label: "FAQ" },
  { href: "/portal", label: "Client Portal" },
] as const;

/** Full-bleed banners for each marketing page. */
export const pageBanners = {
  home: "/images/banners/home.jpg",
  about: "/images/banners/about.jpg",
  programs: "/images/banners/programs.jpg",
  coach: "/images/banners/coach.jpg",
  membership: "/images/banners/membership.jpg",
  results: "/images/banners/results.jpg",
  contact: "/images/banners/contact.jpg",
  consultation: "/images/banners/consultation.jpg",
  faq: "/images/banners/faq.jpg",
  studio: "/images/banners/studio.jpg",
} as const;

/** Homepage destination strip — mirrors the join journey. */
export const homeDestinations = [
  {
    href: "/about",
    label: "About",
    detail: "Studio story, mission, and the AVX way",
    image: pageBanners.about,
  },
  {
    href: "/programs",
    label: "Programs",
    detail: "Fat loss, muscle, recomp, and online coaching",
    image: pageBanners.programs,
  },
  {
    href: "/transformations",
    label: "Results",
    detail: "Real client journeys and Instagram stories",
    image: pageBanners.results,
  },
  {
    href: "/programs#membership-plans",
    label: "Membership",
    detail: "Plans for monthly, PT, couple, and online",
    image: pageBanners.membership,
  },
  {
    href: "/contact",
    label: "Contact",
    detail: "WhatsApp, Instagram, studio location",
    image: pageBanners.contact,
  },
] as const;

export const heroBenefits = [
  "600+ Clients Coached",
  "Online & Offline Coaching",
  "Personal Diet Plans",
  "90-Day Focus Plans",
  "24/7 Support & Guidance",
] as const;

/** Brand pillars from AVX Instagram creative */
export const brandPillars = [
  { title: "Discipline Builds You", detail: "No shortcuts — consistent hard work" },
  { title: "Consistency Changes You", detail: "Train smart, track progress, stay patient" },
  { title: "Dedication Transforms You", detail: "Home or gym — results come from showing up" },
  { title: "Results Before Excuses", detail: "Real people. Real measurable outcomes." },
] as const;

export const coachingFeatures = [
  "Personal Trainer",
  "Personal Diet Plan",
  "Accountability Team",
  "Regular Progress Tracking",
  "24/7 Support & Guidance",
  "Goal Oriented Plans",
  "Customized Nutrition",
  "Effective Workout Programs",
] as const;
