import { ImageResponse } from "next/og";

export const alt = "Marcus Gawronsky — research made operational";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

const paper = "#F7F4EC";
const ink = "#171717";
const muted = "#5B5A55";
const heritageRed = "#B52326";

const rook = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><g fill="${ink}"><path d="M45 176C58 135 72 96 107 78C127 68 154 66 177 80C195 91 207 113 204 135C202 151 194 164 183 176L202 214L169 192C151 204 125 210 99 205C72 201 54 191 45 176Z"/><path d="M170 83L225 66L186 103Z"/><circle cx="176" cy="91" r="4" fill="${paper}"/><path d="M92 204L78 232M112 207L112 234M74 233H91M105 234H122" fill="none" stroke="${ink}" stroke-width="5" stroke-linecap="round"/></g></svg>`;
const rookSrc = `data:image/svg+xml,${encodeURIComponent(rook)}`;

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        background: paper,
        color: ink,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <div style={{ background: heritageRed, display: "flex", height: "2px", width: "100%" }} />
      <div
        style={{
          alignItems: "flex-end",
          display: "flex",
          flex: 1,
          justifyContent: "space-between",
          padding: "76px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "870px" }}>
          <div style={{ color: ink, fontSize: "24px", letterSpacing: "0.14em" }}>
            QUANTITATIVE RESEARCH · APPLIED AI · RESEARCH ENGINEERING
          </div>
          <div style={{ fontSize: "78px", fontWeight: 400, lineHeight: 1.02, marginTop: "28px" }}>
            Research made operational.
          </div>
          <div style={{ color: muted, fontSize: "28px", marginTop: "34px" }}>
            Marcus Gawronsky · Cape Town
          </div>
        </div>
        {/* oxlint-disable-next-line nextjs/no-img-element -- ImageResponse renders plain img only */}
        <img alt="" height={140} src={rookSrc} width={140} />
      </div>
    </div>,
    size,
  );
}
