import Link from "next/link";
import { BrandButton } from "@/components/site/sections";

export default function NotFound() {
  return (
    <section className="blueprint-grid bg-ink text-white">
      <div className="page-container flex min-h-[60vh] flex-col items-start justify-center py-20">
        <p className="font-heading text-7xl font-bold text-brand">404</p>
        <h1 className="mt-2 text-4xl text-white">Page not found</h1>
        <p className="mt-4 max-w-lg text-white/75">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <BrandButton href="/">Back to home</BrandButton>
          <Link href="/contact" className="font-semibold text-white underline-offset-4 hover:underline">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
