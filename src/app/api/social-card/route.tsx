import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  const source = "https://graciacamp.vercel.app/og/gracia-camp-social-2026-v5.png";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          background: "#f7f3e9",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <img
          src={source}
          width="1200"
          height="630"
          style={{
            width: "1200px",
            height: "630px",
            objectFit: "cover",
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=0, s-maxage=31536000, immutable",
      },
    }
  );
}
