import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLiveStatus } from "./useLiveStatus";
import { ReactNode } from "react";

const createTestQueryClient = () => new QueryClient({
    defaultOptions: {
        queries: {
            retry: false, // Desabilita retentativas para os testes
        },
    },
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={createTestQueryClient()}>{children}</QueryClientProvider>
);

describe("useLiveStatus", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return live status when isLive is true", async () => {
    const mockLiveData = {
      isLive: true,
      liveVideo: {
        id: { videoId: "test-video-id" },
        snippet: {
          title: "Test Live Stream",
          thumbnails: { high: { url: "http://example.com/thumb.jpg" } },
        },
      },
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockLiveData),
    });

    const { result } = renderHook(() => useLiveStatus(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual({
      isLive: true,
      liveUrl: "https://www.youtube.com/watch?v=test-video-id",
      liveTitle: "Test Live Stream",
      thumbnail: "http://example.com/thumb.jpg",
    });
  });

  it("should return not live status when isLive is false", async () => {
    const mockOfflineData = { isLive: false };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockOfflineData),
    });

    const { result } = renderHook(() => useLiveStatus(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual({
      isLive: false,
      liveUrl: null,
      liveTitle: null,
      thumbnail: null,
    });
  });

  it("should handle fetch error", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network response was not ok"));

    const { result } = renderHook(() => useLiveStatus(), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error.message).toBe("Network response was not ok");
  });
});
