import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { company } from "@/content/company";
import logo from "../../../public/brand/calistar-logo-128.png";

export function Logo({
  className,
  inverted = false,
  priority = false,
}: {
  className?: string;
  inverted?: boolean;
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("flex shrink-0 items-center gap-3", className)}
      aria-label={`${company.name} home`}
    >
      <Image src={logo} alt="" className="size-12 sm:size-14" sizes="56px" priority={priority} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-heading text-xl font-bold tracking-wide",
            inverted ? "text-white" : "text-ink",
          )}
        >
          CALISTAR
        </span>
        <span
          className={cn(
            "text-[0.65rem] font-semibold uppercase tracking-[0.2em]",
            inverted ? "text-white/70" : "text-muted-foreground",
          )}
        >
          Management Co.
        </span>
      </span>
    </Link>
  );
}
