import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLatestSermon } from "./useLatestSermon";
import { ReactNode } from "react";
import { SermonVideo } from "@/types/SermonVideo";

const createTestQueryClient = () => new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={createTestQueryClient()}>{children}</QueryClientProvider>
);

const mockLatestSermonData = {
  contentDetails: { videoId: "latest-vid" },
  snippet: {
    title: "Latest Sermon | Preacher",
    thumbnails: { high: { url: "http://example.com/latest-thumb.jpg" } },
    publishedAt: "2024-01-15T12:00:00Z",
  },
};

describe("useLatestSermon", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return the latest sermon on successful fetch", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockLatestSermonData),
    });

    const { result } = renderHook(() => useLatestSermon(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const expectedSermon: SermonVideo = {
      id: "latest-vid",
      title: "Latest Sermon",
      thumbnail: "http://example.com/latest-thumb.jpg",
      publishedAt: "15/01/2024",
      url: "https://www.youtube.com/watch?v=latest-vid",
    };

    expect(result.current.data).toEqual(expectedSermon);
  });

  it("should return null if fetch returns no data", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(null),
    });

    const { result } = renderHook(() => useLatestSermon(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBeNull();
  });

  it("should handle fetch error", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("API is down"));

    const { result } = renderHook(() => useLatestSermon(), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error.message).toBe("API is down");
  });
});
