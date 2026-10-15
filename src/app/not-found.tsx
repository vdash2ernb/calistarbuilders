import { Photo } from "@/components/site/photo";
import { BrandButton, GhostButton } from "@/components/site/sections";

export default function NotFound() {
  return (
    <section className="grain relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 -z-10">
        <Photo name="hard-hat" fill priority alt="" className="animate-ken-burns" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/80 to-ink/40" />
      </div>
      <div className="page-container pt-28 pb-20">
        <p className="animate-fade-in font-heading text-[clamp(6rem,18vw,12rem)] leading-none font-bold text-brand">404</p>
        <h1 className="mt-2 animate-fade-in text-5xl text-white [animation-delay:150ms] sm:text-6xl">Page not found.</h1>
        <p className="mt-5 max-w-lg animate-fade-in text-lg text-white/75 [animation-delay:300ms]">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="mt-10 flex animate-fade-in flex-wrap gap-4 [animation-delay:450ms]">
          <BrandButton href="/">Back to Home</BrandButton>
          <GhostButton href="/contact">Contact Us</GhostButton>
        </div>
      </div>
    </section>
  );
}
