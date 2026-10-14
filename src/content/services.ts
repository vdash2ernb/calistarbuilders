// Service pages. Short descriptions are the original site's copy; the longer
// "included" lists expand on it and should be reviewed with the client.

export type Service = {
  slug: string;
  title: string;
  icon: "network" | "clipboard" | "blueprint" | "wrench";
  summary: string;
  intro: string;
  included: string[];
  idealFor: string[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "subcontractor-network",
    title: "Vetted Subcontractor Network",
    icon: "network",
    summary:
      "Access to 5+ licensed, bonded and insured vendors per trade. Every contractor is thoroughly vetted for quality and reliability.",
    intro:
      "Finding reliable trades is the hardest part of building. We maintain a network of licensed, bonded and insured subcontractors, with five or more vetted vendors per trade, so you can get competitive bids and dependable crews without the search.",
    included: [
      "Multiple qualified bids per trade",
      "License, insurance and bonding verification",
      "Past-performance and reference checks",
      "Bid leveling so quotes compare like for like",
      "Ongoing performance tracking across projects",
    ],
    idealFor: ["Custom home builders", "Commercial general contractors", "Developers"],
    faqs: [
      {
        q: "How are subcontractors vetted?",
        a: "We verify each contractor's license, insurance and bonding, and review past performance before they join our network.",
      },
      {
        q: "Which trades do you cover?",
        a: "TODO(client): list the trades covered by the network.",
      },
    ],
  },
  {
    slug: "project-management",
    title: "Project Management",
    icon: "clipboard",
    summary:
      "Expert oversight with nominal fees. We coordinate schedules, manage communications and keep projects on track and on budget.",
    intro:
      "We act as your project's command center: one point of contact who keeps trades scheduled, owners informed and the budget under control, for a nominal management fee.",
    included: [
      "Scheduling and trade sequencing",
      "Communication between owner, builder and trades",
      "Budget tracking and change-order management",
      "Site visits and progress reporting",
      "Punch list and closeout coordination",
    ],
    idealFor: ["Builders running multiple jobs", "Owners who want a single point of contact"],
    faqs: [
      {
        q: "How are management fees structured?",
        a: "TODO(client): describe the fee model (percentage, fixed fee, per phase).",
      },
    ],
  },
  {
    slug: "design-build",
    title: "Design-Build & General Contracting",
    icon: "blueprint",
    summary:
      "Comprehensive general contracting for custom home builders. From concept to completion, we handle every phase of construction.",
    intro:
      "For projects that need one team accountable from concept to completion, we provide design-build and general contracting services, coordinating design, permitting and construction under one contract.",
    included: [
      "Pre-construction planning and budgeting",
      "Design coordination",
      "Permitting support",
      "Full construction management",
      "Final inspections and handover",
    ],
    idealFor: ["Custom homes", "Additions and major remodels", "Light commercial projects"],
    faqs: [
      {
        q: "Are you a licensed general contractor?",
        a: "TODO(client): confirm CSLB license number and classifications before publishing this page.",
      },
    ],
  },
  {
    slug: "manufacturer-installations",
    title: "Manufacturer-Certified Installations",
    icon: "wrench",
    summary:
      "Specialized skilled labor for Belgard, Techo-Bloc, Angelus and many more. Certified installers ensure proper execution.",
    intro:
      "Hardscape and specialty products only perform when they're installed to the manufacturer's spec. Our certified installers know the systems and protect your warranty.",
    included: [
      "Pavers, walls and hardscape systems",
      "Installation to manufacturer specifications",
      "Warranty-compliant workmanship",
      "Coordination with your site schedule",
    ],
    idealFor: ["Builders adding outdoor living packages", "Landscape architects", "Commercial hardscape"],
    faqs: [
      {
        q: "Which manufacturers are you certified with?",
        a: "TODO(client): confirm the certification list. The original site listed Belgard, Techo Block (likely Techo-Bloc), Angelus, 4K and Structure.",
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
