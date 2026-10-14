import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { company } from "@/content/company";

export const alt = `${company.name}: construction project management`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logo = await readFile(join(process.cwd(), "public/brand/calistar-logo.png"));
const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 56,
          padding: "0 80px",
          background: "#1c2833",
          color: "white",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={300} height={300} alt="" />
        <div style={{ display: "flex", flexDirection: "column", gap: 20, width: 680 }}>
          <div style={{ width: 80, height: 6, background: "#f39c12" }} />
          <div style={{ fontSize: 60, lineHeight: 1.1 }}>
            Building Excellence Through Precision Management
          </div>
          <div style={{ fontSize: 28, color: "rgba(255,255,255,0.75)" }}>
            Construction project management · calistar.builders
          </div>
        </div>
      </div>
    ),
    size,
  );
}
