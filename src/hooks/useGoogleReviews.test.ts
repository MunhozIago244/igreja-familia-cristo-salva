import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useGoogleReviews, GoogleReview } from "./useGoogleReviews";

// Mock data
const mockReviews: GoogleReview[] = [
  {
    author_name: "Test User",
    author_url: "http://example.com",
    language: "en",
    profile_photo_url: "http://example.com/photo.jpg",
    rating: 5,
    relative_time_description: "a month ago",
    text: "Great place!",
    time: 1678886400,
  },
];

// Mock do Google Maps API
const mockGoogle = {
  maps: {
    places: {
      PlacesService: vi.fn(),
      PlacesServiceStatus: {
        OK: "OK",
        ERROR: "ERROR",
      },
    },
  },
};

describe("useGoogleReviews", () => {
  let appendChildSpy: any;

  beforeEach(() => {
    // Espiona document.head.appendChild para simular o carregamento do script
    appendChildSpy = vi.spyOn(document.head, "appendChild").mockImplementation((element: any) => {
        // Simula o sucesso do carregamento do script chamando o onload
        if (element.onload) {
          element.onload();
        }
        return element;
      });

    // Zomba o objeto global `google`
    vi.stubGlobal("google", mockGoogle);
  });

  afterEach(() => {
    // Restaura os mocks
    vi.restoreAllMocks();
  });

  it("should return reviews on successful fetch", async () => {
    const getDetailsMock = vi.fn((_request, callback) => {
      callback({ reviews: mockReviews }, mockGoogle.maps.places.PlacesServiceStatus.OK);
    });
    mockGoogle.maps.places.PlacesService.mockImplementation(() => ({
      getDetails: getDetailsMock,
    }));

    const { result } = renderHook(() => useGoogleReviews("test-api-key", "test-place-id"));

    expect(result.current.loading).toBe(true);
    
    await act(async () => {
      // a simulação de onload do script já foi chamada, agora esperamos o estado atualizar
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.reviews).toEqual(mockReviews);
    expect(result.current.error).toBeNull();
    expect(appendChildSpy).toHaveBeenCalledOnce();
    expect(getDetailsMock).toHaveBeenCalledOnce();
  });

  it("should handle error when script fails to load", async () => {
    appendChildSpy.mockImplementation((element: any) => {
      if (element.onerror) {
        element.onerror(new Error("Script load error"));
      }
      return element;
    });

    const { result } = renderHook(() => useGoogleReviews("test-api-key", "test-place-id"));

    expect(result.current.loading).toBe(true);

    await act(async () => {});

    expect(result.current.loading).toBe(false);
    expect(result.current.reviews).toEqual([]);
    expect(result.current.error).toBe("Erro ao carregar Google Maps SDK");
  });

  it("should handle error when PlacesService returns non-OK status", async () => {
    const getDetailsMock = vi.fn((_request, callback) => {
      callback(null, mockGoogle.maps.places.PlacesServiceStatus.ERROR);
    });
    mockGoogle.maps.places.PlacesService.mockImplementation(() => ({
      getDetails: getDetailsMock,
    }));

    const { result } = renderHook(() => useGoogleReviews("test-api-key", "test-place-id"));
    
    await act(async () => {});

    expect(result.current.loading).toBe(false);
    expect(result.current.reviews).toEqual([]);
    expect(result.current.error).toBe("Não foi possível encontrar avaliações para este local.");
  });

  it("should not fetch reviews if apiKey or placeId is missing", () => {
    const { result } = renderHook(() => useGoogleReviews("", ""));
    
    expect(result.current.loading).toBe(false);
    expect(result.current.reviews).toEqual([]);
    expect(result.current.error).toBeNull();
    expect(appendChildSpy).not.toHaveBeenCalled();
  });

  it("should use existing google.maps.places object if already loaded", async () => {
    const getDetailsMock = vi.fn((_request, callback) => {
      callback({ reviews: mockReviews }, mockGoogle.maps.places.PlacesServiceStatus.OK);
    });
    mockGoogle.maps.places.PlacesService.mockImplementation(() => ({
      getDetails: getDetailsMock,
    }));

    // Simula que o script já foi carregado
    (window as any).google = mockGoogle;

    const { result } = renderHook(() => useGoogleReviews("test-api-key", "test-place-id"));

    await act(async () => {});

    expect(appendChildSpy).not.toHaveBeenCalled();
    expect(getDetailsMock).toHaveBeenCalledOnce();
    expect(result.current.reviews).toEqual(mockReviews);
  });
});
