import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSermonsList } from "./useSermonsList";
import { ReactNode } from "react";
import { Sermon } from "@/types/Sermon";

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

const mockSermonsData = [
  {
    contentDetails: { videoId: "vid1" },
    snippet: {
      title: "Sermon 1 | Preacher",
      description: "Description 1",
      thumbnails: { high: { url: "http://example.com/thumb1.jpg" } },
      publishedAt: "2024-01-01T12:00:00Z",
    },
  },
  {
    contentDetails: { videoId: "vid2" },
    snippet: {
      title: "Sermon 2 - Preacher",
      description: "Description 2",
      thumbnails: { high: { url: "http://example.com/thumb2.jpg" } },
      publishedAt: "2024-01-08T12:00:00Z",
    },
  },
];

describe("useSermonsList", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return a list of sermons on successful fetch", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockSermonsData),
    });

    const { result } = renderHook(() => useSermonsList(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const expectedSermons: Sermon[] = [
      {
        id: "vid1",
        title: "Sermon 1",
        description: "Description 1",
        thumbnail: "http://example.com/thumb1.jpg",
        date: "01 de janeiro de 2024",
        url: "https://www.youtube.com/watch?v=vid1",
      },
      {
        id: "vid2",
        title: "Sermon 2",
        description: "Description 2",
        thumbnail: "http://example.com/thumb2.jpg",
        date: "08 de janeiro de 2024",
        url: "https://www.youtube.com/watch?v=vid2",
      },
    ];

    expect(result.current.data).toEqual(expectedSermons);
  });

  it("should return an empty array if fetch returns no data", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(null),
    });

    const { result } = renderHook(() => useSermonsList(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual([]);
  });

  it("should handle fetch error", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useSermonsList(), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error.message).toBe("Network error");
  });
});
