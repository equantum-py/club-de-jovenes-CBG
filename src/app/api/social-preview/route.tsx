import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  const baseImage =
    "https://graciacamp.vercel.app/og/gracia-camp-oficial-2026-v2.jpeg";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#f5efe3",
        }}
      >
        <img
          src={baseImage}
          alt=""
          width={1200}
          height={847}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "1200px",
            height: "847px",
            objectFit: "cover",
            objectPosition: "top center",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 40,
            right: 40,
            bottom: 25,
            height: 150,
            borderRadius: 28,
            display: "flex",
            alignItems: "center",
            gap: 48,
            padding: "24px 36px",
            background: "rgba(8, 55, 47, 0.95)",
            color: "white",
            boxShadow: "0 14px 40px rgba(0,0,0,.18)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", width: 250 }}>
            <div style={{ fontSize: 16, opacity: 0.65, letterSpacing: 2 }}>FECHA</div>
            <div style={{ fontSize: 32, fontWeight: 800, marginTop: 8 }}>04–06 DIC</div>
            <div style={{ fontSize: 18, opacity: 0.78, marginTop: 5 }}>Diciembre 2026</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", width: 330 }}>
            <div style={{ fontSize: 16, opacity: 0.65, letterSpacing: 2 }}>LUGAR</div>
            <div style={{ fontSize: 34, fontWeight: 900, marginTop: 8 }}>MONTE ARAMÍ</div>
            <div style={{ fontSize: 18, opacity: 0.78, marginTop: 5 }}>Paraguarí</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div style={{ fontSize: 16, opacity: 0.65, letterSpacing: 2 }}>PRECIO</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                alignSelf: "flex-start",
                marginTop: 8,
                padding: "10px 22px",
                borderRadius: 999,
                background: "#d8be70",
                color: "#0a332c",
                fontSize: 34,
                fontWeight: 900,
              }}
            >
              GS. 380.000
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    }
  );
}
