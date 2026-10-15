import generated from "./photos.generated.json";

// Placeholder photography from Unsplash (https://unsplash.com/license): free for
// commercial use, no attribution required, credited here anyway. These are
// atmosphere only, never presented as CALISTAR projects.
// TODO(client): replace with real project photos. Run `npm run photos -- <folder>`
// with files named after the keys below (e.g. home-hero.jpg) to swap them in.

export type PhotoName = keyof typeof generated;

type PhotoInfo = {
  alt: string;
  credit: string;
  source: string;
  /** CSS object-position, for photos whose subject isn't centered. */
  position?: string;
};

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const photoInfo: Record<PhotoName, PhotoInfo> = {
  "home-hero": { alt: "Modern custom home at dusk with warm interior lighting", credit: "Unsplash", source: unsplash("1600585154340-be6161a56a0c") },
  framing: { alt: "Framer working on a timber frame against a blue sky", credit: "Josh Olalde / Unsplash", source: unsplash("1587582423116-ec07293f0395"), position: "60% 40%" },
  "team-site": { alt: "Construction team reviewing a large job site", credit: "Scott Blake / Unsplash", source: unsplash("1541888946425-d81bb19240f5") },
  blueprints: { alt: "Construction plans with drafting tools on a desk", credit: "Unsplash", source: unsplash("1503387762-592deb58ef4e"), position: "50% 85%" },
  "plans-hands": { alt: "Reviewing architectural plans with a scale ruler", credit: "Unsplash", source: unsplash("1503387837-b154d5074bd2") },
  "modern-home": { alt: "Modern two-story home with wood and white facade", credit: "Unsplash", source: unsplash("1600047509807-ba8f99d2cdde") },
  "villa-pool": { alt: "Contemporary villa with a long pool", credit: "Unsplash", source: unsplash("1613490493576-7fde63acd811") },
  "patio-sunset": { alt: "Paver patio with a spa and fire feature at sunset", credit: "Unsplash", source: unsplash("1599809275671-b5942cabc7a2") },
  "rebar-aerial": { alt: "Aerial view of crews placing a rebar grid", credit: "Saad Salim / Unsplash", source: unsplash("1533378890784-b2a5b0a59d40") },
  "cranes-dusk": { alt: "Tower cranes over a city skyline at dusk", credit: "EJ Yao / Unsplash", source: unsplash("1485083269755-a7b559a4fe5e") },
  "dusk-home": { alt: "Custom home lit up at twilight", credit: "Unsplash", source: unsplash("1568605114967-8130f3a36994") },
  sparks: { alt: "Tradesperson cutting steel with sparks flying", credit: "Unsplash", source: unsplash("1504917595217-d4dc5ebe6122") },
  "cranes-day": { alt: "Tower cranes beside a building under construction", credit: "Frames For Your Heart / Unsplash", source: unsplash("1599707254554-027aeb4deacd") },
  "hard-hat": { alt: "Red hard hat resting on a job site", credit: "Ümit Yıldırım / Unsplash", source: unsplash("1567954970774-58d6aa6c50dc") },
  interior: { alt: "Bright modern living room with wood accent wall", credit: "Unsplash", source: unsplash("1600607687939-ce8a6c25118c") },
  "site-workers": { alt: "Crew working on a concrete deck with rebar", credit: "Etienne Girardet / Unsplash", source: unsplash("1504307651254-35680f356dfd") },
};

export const photoData = generated;
