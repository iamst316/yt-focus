"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface SearchResultItem {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    thumbnails: { medium: { url: string } };
    channelTitle: string;
  };
}

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [videos, setVideos] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchVideos() {
      if (!query) {
        console.log("No query provided, skipping fetch.");
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`/api/youtube?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setVideos(data.items || []);
      } catch (err) {
        console.error("Error fetching videos:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setQuery(searchInput);
    }
  };

  return (
    <main style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <form
        onSubmit={handleSearch}
        style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem" }}
      >
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search YouTube..."
          style={{
            flex: 1,
            padding: "0.75rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{ padding: "0.75rem 1.5rem", cursor: "pointer" }}
        >
          Search
        </button>
      </form>

      {loading ? (
        <p>Loading videos...</p>
      ) : (
        <div style={{ display: "grid", gap: "1.5rem" }}>
          {videos.map((item) => {
            const videoId = item.id?.videoId;
            if (!videoId) return null;

            return (
              <Link
                key={videoId}
                href={`/watch/${videoId}`}
                style={{
                  display: "flex",
                  gap: "1rem",
                  textDecoration: "none",
                  color: "inherit",
                  border: "1px solid #eee",
                  padding: "1rem",
                  borderRadius: "8px",
                }}
              >
                <img
                  src={item.snippet.thumbnails.medium.url}
                  alt={item.snippet.title}
                  style={{
                    width: "200px",
                    borderRadius: "6px",
                    objectFit: "cover",
                  }}
                />
                <div>
                  <h2 style={{ fontSize: "1.1rem", margin: "0 0 0.5rem 0" }}>
                    {item.snippet.title}
                  </h2>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "#666",
                      margin: "0 0 0.5rem 0",
                    }}
                  >
                    {item.snippet.channelTitle}
                  </p>
                  <p style={{ fontSize: "0.85rem", color: "#444", margin: 0 }}>
                    {item.snippet.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
