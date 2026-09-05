import Link from "next/link";

interface WatchPageProps {
  params: Promise<{
    videoId: string;
  }>;
}

export default async function WatchPage({ params }: WatchPageProps) {
  const { videoId } = await params;

  return (
    <main
      style={{
        width: "100%",
        maxWidth: "1400px",
        padding: "2rem",
        margin: "0 auto",
        boxSizing: "border-box",
      }}
    >
      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "1.5rem",
          color: "#0070f3",
          textDecoration: "none",
          fontWeight: 500,
        }}
      >
        &larr; Back to Search
      </Link>

      {/* Responsive 16:9 Aspect Ratio Container */}
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: "56.25%", // 16:9 ratio
          height: 0,
          // backgroundColor: "#000",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        }}
      >
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&controls=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{

            position: "absolute",
            top: 0,
            left: 0,
            width: "80%",
            height: "80%",
          }}
        />
      </div>
    </main>
  );
}
