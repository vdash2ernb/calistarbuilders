// Company facts used across the site. Anything marked TODO(client) is waiting on
// the client (see SITE-AUDIT-AND-REVAMP-PLAN.md, section 3). Values left as null
// are hidden from the site until they are filled in.

export const company = {
  name: "CALISTAR Management Company",
  shortName: "CALISTAR",
  tagline: "Precision construction management for modern builders.",
  url: "https://calistar.builders",
  phone: "(714) 613-2500",
  phoneHref: "tel:+17146132500",
  email: "info@calistar.builders",
  serviceArea: "Serving California and beyond",
  // TODO(client): primary cities/counties served. The Facebook page lists
  // Los Angeles, CA; the phone's 714 area code is Orange County.
  serviceAreaDetail: null as string | null,
  // TODO(client): CSLB license number and classifications. California generally
  // requires the license number on advertising, websites included.
  license: null as { number: string; classifications: string } | null,
  // TODO(client): street address, or keep null for a service-area business.
  address: null as {
    street: string;
    city: string;
    region: string;
    postalCode: string;
  } | null,
  // TODO(client): add Google Business Profile, LinkedIn, Instagram, etc.
  social: [
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61591210306396" },
  ] as { label: string; href: string }[],
} as const;

export const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/join-our-network", label: "Join Our Network" },
  { href: "/contact", label: "Contact" },
] as const;

// Carried over from the original site. TODO(client): confirm "20+ years" (company
// or founder?) and that 24/7 support is a real offer before launch.
export const stats = [
  { value: "5+", label: "Vetted vendors per trade" },
  { value: "100%", label: "Licensed, bonded & insured network" },
  { value: "24/7", label: "Project support" },
  { value: "20+", label: "Years of experience" },
] as const;

export const valueProps = [
  {
    title: "Competitive pricing",
    body: "Our vendor relationships get you better rates. With multiple qualified bids per trade, you get quality work at a fair price.",
  },
  {
    title: "Quality assurance",
    body: "Quality control at every stage, with regular inspections and clear accountability from start to closeout.",
  },
  {
    title: "Rigorous vetting",
    body: "We verify licenses, insurance, bonding and past performance before any contractor joins our network.",
  },
  {
    title: "Transparent fees",
    body: "Nominal, upfront project management fees. You always know what you're paying for.",
  },
] as const;

// Draft copy for the "How it works" section, derived from the original site's
// service descriptions. TODO(client): confirm the real workflow.
export const processSteps = [
  {
    title: "Tell us about the project",
    body: "Share plans, scope and timeline. Attach drawings or specs and we'll review them with you.",
  },
  {
    title: "We match vetted trades",
    body: "We source competitive bids from licensed, bonded and insured subcontractors, typically five or more per trade.",
  },
  {
    title: "We manage the work",
    body: "We coordinate schedules, handle communication between trades and keep the job on track and on budget.",
  },
  {
    title: "Quality checks to closeout",
    body: "Regular inspections and punch-list follow-through until the work meets spec and you sign off.",
  },
] as const;
