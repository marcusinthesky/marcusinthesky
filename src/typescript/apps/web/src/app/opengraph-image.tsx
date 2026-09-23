import { ImageResponse } from "next/og";

export const alt = "Marcus Gawronsky — applied AI, decision science, and quantitative research";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "flex-end",
        background: "#faf8f3",
        color: "#251f1a",
        display: "flex",
        height: "100%",
        justifyContent: "space-between",
        padding: "76px",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", maxWidth: "870px" }}>
        <div style={{ color: "#975229", fontSize: "24px", letterSpacing: "0.12em" }}>
          RESEARCH · DATA · SOFTWARE
        </div>
        <div style={{ fontSize: "78px", fontWeight: 700, lineHeight: 1.02, marginTop: "28px" }}>
          Ideas that survive contact with production.
        </div>
        <div style={{ color: "#6c625b", fontSize: "28px", marginTop: "34px" }}>
          Marcus Gawronsky · Cape Town
        </div>
      </div>
      <div
        style={{
          border: "2px solid #975229",
          borderRadius: "999px",
          height: "92px",
          width: "92px",
        }}
      />
    </div>,
    size,
  );
}
