import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { company } from "@/content/company";
import logo from "../../../public/brand/calistar-logo-128.png";

const tones = {
  dark: { name: "text-ink", sub: "text-muted-foreground" },
  light: { name: "text-white", sub: "text-white/70" },
  // White over the hero; dark once the header turns solid (see HeaderFrame).
  auto: {
    name: "text-white group-data-[solid=true]:text-ink",
    sub: "text-white/70 group-data-[solid=true]:text-muted-foreground",
  },
};

export function Logo({
  className,
  tone = "dark",
  priority = false,
}: {
  className?: string;
  tone?: keyof typeof tones;
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("flex shrink-0 items-center gap-3", className)}
      aria-label={`${company.name} home`}
    >
      <Image src={logo} alt="" className="size-12 drop-shadow-sm sm:size-14" sizes="56px" priority={priority} />
      <span className="flex flex-col leading-none">
        <span className={cn("font-heading text-xl font-bold tracking-wide transition-colors duration-500", tones[tone].name)}>
          CALISTAR
        </span>
        <span
          className={cn(
            "text-[0.65rem] font-semibold uppercase tracking-[0.2em] transition-colors duration-500",
            tones[tone].sub,
          )}
        >
          Management Co.
        </span>
      </span>
    </Link>
  );
}
