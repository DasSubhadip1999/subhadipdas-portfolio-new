import { ImageResponse } from "next/og";

export const alt = "Subhadip Das, Senior Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#EEF3F4" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "#FFC72C",
            border: "6px solid #15130F",
            borderRadius: 14,
            padding: "70px 90px",
            boxShadow: "0 30px 50px -20px rgba(30,45,55,.45)",
          }}
        >
          <div style={{ fontSize: 112, fontWeight: 800, color: "#15130F", textShadow: "6px 6px 0 #C8321F", letterSpacing: -2 }}>Subhadip Das</div>
          <div style={{ marginTop: 28, background: "#C8321F", color: "#FFFAF0", fontSize: 40, fontWeight: 700, padding: "14px 30px", borderRadius: 8 }}>
            Senior Software Engineer · Team Lead
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#15130F", fontWeight: 600 }}>React · Next.js · Node.js · TypeScript · Serverless AWS</div>
        </div>
      </div>
    ),
    size,
  );
}
