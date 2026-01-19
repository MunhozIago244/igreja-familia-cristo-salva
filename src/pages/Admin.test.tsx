import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Admin from "./Admin";
import { toast } from "sonner";

// Mock dos hooks
vi.mock("@/hooks/useGoogleReviews", () => ({
  useGoogleReviews: () => ({
    reviews: [{ author_name: "Test Reviewer" }],
    loading: false,
    error: null,
  }),
}));

vi.mock("@/hooks/useLiveStatus", () => ({
  useLiveStatus: () => ({
    data: { isLive: true, liveTitle: "Live Test" },
    isLoading: false,
  }),
}));

vi.mock("@/hooks/useSermonsList", () => ({
  useSermonsList: () => ({
    data: [{ id: "sermon1", title: "Sermon Test" }],
    isLoading: false,
  }),
}));

vi.mock("@/hooks/useLatestSermon", () => ({
  useLatestSermon: () => ({
    data: { id: "latest1", title: "Latest Sermon Test" },
    isLoading: false,
  }),
}));

vi.mock("@/hooks/use-mobile", () => ({
  useIsMobile: () => false,
}));

// Mock do Sonner (toast)
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock do Layout para simplificar o teste
vi.mock("@/components/layout/Layout", () => ({
    default: ({children}: {children: React.ReactNode}) => <div>{children}</div>
}));


describe("Admin Page", () => {
  const ADMIN_KEY = "test-secret-key";
  vi.stubEnv("VITE_ADMIN_PASSWORD", ADMIN_KEY);

  it("should render login form initially", () => {
    render(<Admin />);
    expect(screen.getByText("System Admin")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Chave de Acesso")).toBeInTheDocument();
  });

  it("should show error on wrong password", () => {
    render(<Admin />);
    fireEvent.change(screen.getByPlaceholderText("Chave de Acesso"), {
      target: { value: "wrong-password" },
    });
    fireEvent.click(screen.getByRole("button", { name: /iniciar diagnóstico/i }));

    expect(toast.error).toHaveBeenCalledWith("Credencial Inválida");
  });

  it("should grant access and show dashboard on correct password", () => {
    render(<Admin />);
    fireEvent.change(screen.getByPlaceholderText("Chave de Acesso"), {
      target: { value: ADMIN_KEY },
    });
    fireEvent.click(screen.getByRole("button", { name: /iniciar diagnóstico/i }));

    expect(toast.success).toHaveBeenCalledWith("Acesso de Desenvolvedor Concedido");
    expect(screen.getByText("Painel de Testes")).toBeInTheDocument();
  });

  it("should show diagnostics data after login", () => {
    render(<Admin />);
    // Login
    fireEvent.change(screen.getByPlaceholderText("Chave de Acesso"), {
      target: { value: ADMIN_KEY },
    });
    fireEvent.click(screen.getByRole("button", { name: /iniciar diagnóstico/i }));

    // Verifica se os dados mockados dos hooks estão sendo exibidos
    expect(screen.getByText("useGoogleReviews")).toBeInTheDocument();
    expect(screen.getByText("useLiveStatus")).toBeInTheDocument();
    expect(screen.getByText("AO VIVO")).toBeInTheDocument();
    expect(screen.getByText("useSermonsList")).toBeInTheDocument();
    expect(screen.getByText("1 Itens")).toBeInTheDocument();
    expect(screen.getByText("useLatestSermon")).toBeInTheDocument();
    expect(screen.getByText("Encontrado")).toBeInTheDocument();
  });

  it("should log out when 'Encerrar Sessão' is clicked", () => {
    render(<Admin />);
    // Login
    fireEvent.change(screen.getByPlaceholderText("Chave de Acesso"), {
      target: { value: ADMIN_KEY },
    });
    fireEvent.click(screen.getByRole("button", { name: /iniciar diagnóstico/i }));

    // Logout
    fireEvent.click(screen.getByRole("button", { name: /encerrar sessão/i }));

    // Verifica se voltou para a tela de login
    expect(screen.getByText("System Admin")).toBeInTheDocument();
  });
});

describe("Admin Page - VITE_ADMIN_PASSWORD Missing", () => {
  // Antes de cada teste neste bloco, garantimos que a variável de ambiente não está definida
  beforeEach(() => {
    vi.unstubAllEnvs(); // Remove todos os stubs de ambiente
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should display configuration error when VITE_ADMIN_PASSWORD is not set", () => {
    render(<Admin />);

    expect(screen.getByText("Configuração Incompleta")).toBeInTheDocument();
    expect(screen.getByText(/A variável de ambiente `VITE_ADMIN_PASSWORD` não foi definida./i)).toBeInTheDocument();
    expect(screen.getByText(/consulte o arquivo `ADMIN_GUIDE.md`/i)).toBeInTheDocument();
    // Garante que o formulário de login não está visível
    expect(screen.queryByPlaceholderText("Chave de Acesso")).not.toBeInTheDocument();
  });
});
