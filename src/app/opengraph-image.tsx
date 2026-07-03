import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Afilize — Track. Automate. Optimize. Protect.";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#080B16",
          color: "#EAEEF8",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{
              width: 92,
              height: 92,
              borderRadius: 24,
              background: "linear-gradient(100deg, #7C82FF 0%, #27D3EE 100%)",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 24,
                height: 10,
                marginTop: 14,
                borderRadius: 5,
                background: "#080B16",
              }}
            />
          </div>
          <div style={{ fontSize: 104, fontWeight: 700 }}>Afilize</div>
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 36,
            color: "#9097B2",
          }}
        >
          Track. Automate. Optimize. Protect.
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 24,
            color: "#646C8A",
          }}
        >
          One system to track, automate, and get paid
        </div>
      </div>
    ),
    { ...size },
  );
}
