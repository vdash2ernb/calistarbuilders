// Projects and testimonials stay empty until the client supplies real ones.
// Sections that use them are hidden (or show an empty state) while empty.

export type Project = {
  slug: string;
  title: string;
  location: string;
  type: "Custom home" | "Commercial" | "Hardscape" | "Remodel";
  services: string[];
  summary: string;
  // Paths under /public/projects/<slug>/
  images: { src: string; alt: string }[];
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

// TODO(client): real project photos with type, city and scope.
export const projects: Project[] = [];

// TODO(client): 3–6 testimonials with permission to publish names.
export const testimonials: Testimonial[] = [];
