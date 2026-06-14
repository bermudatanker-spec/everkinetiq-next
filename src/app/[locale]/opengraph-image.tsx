import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getDict, isLocale, type Locale } from "@/lib/i18n";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "nl";
  const t = getDict(locale);

  const bgData = await readFile(
    join(process.cwd(), "public/projects/everkinetiq-zonnepanelen-residentieel-02.jpg"),
  );
  const bgSrc = `data:image/jpeg;base64,${bgData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            display: "flex",
            opacity: 0.22,
          }}
        >
          <img
            src={bgSrc}
            alt=""
            width={1200}
            height={630}
            style={{ width: 1200, height: 630, objectFit: "cover" }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            display: "flex",
            backgroundImage:
              "linear-gradient(135deg, rgba(8,8,24,0.96) 0%, rgba(20,18,58,0.92) 45%, rgba(45,27,105,0.88) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            padding: "72px 80px",
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                display: "flex",
                width: 14,
                height: 36,
                borderRadius: 4,
                background: "#7C3AED",
              }}
            />
            <span style={{ fontSize: 38, fontWeight: 800, color: "#FFFFFF", letterSpacing: 1 }}>
              Ever<span style={{ color: "#7C3AED" }}>Kinetiq</span>
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 920 }}>
            <span style={{ fontSize: 56, fontWeight: 800, color: "#FFFFFF", lineHeight: 1.15 }}>
              {t.hero.subtitleLine1}
            </span>
            <span
              style={{
                fontSize: 26,
                fontWeight: 500,
                color: "rgba(255,255,255,0.7)",
              }}
            >
              {t.hero.subtitleLine2}
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
