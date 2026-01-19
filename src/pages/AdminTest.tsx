import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Shield,
  Lock,
  Activity,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Terminal,
  Smartphone,
  Globe,
  Server,
} from "lucide-react";

// Hooks do Sistema
import { useGoogleReviews } from "@/hooks/useGoogleReviews";
import { useLiveStatus } from "@/hooks/useLiveStatus";
import { useSermonsList } from "@/hooks/useSermonsList";
import { useLatestSermon } from "@/hooks/useLatestSermon";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

const AdminTest = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  // Credencial de Acesso
  const ADMIN_KEY = "fcs-admin-2024";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_KEY) {
      setIsAuthenticated(true);
      toast.success("Acesso de Desenvolvedor Concedido");
    } else {
      toast.error("Credencial Inválida");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center text-red-500">
              <Lock size={32} />
            </div>
          </div>
          <h1 className="text-2xl font-black text-white text-center mb-2">
            System Admin
          </h1>
          <p className="text-white/40 text-center mb-8 text-sm">
            Acesso Restrito a Desenvolvedores
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              placeholder="Chave de Acesso"
              className="bg-black/20 border-white/10 text-white text-center tracking-widest h-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-gray-200 font-bold h-12"
            >
              INICIAR DIAGNÓSTICO
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="pt-32 pb-20 bg-[#050505] min-h-screen text-white">
        <div className="container-church">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black mb-2 flex items-center gap-3">
                <Shield className="text-green-500" /> Painel de Testes
              </h1>
              <p className="text-white/40">
                Diagnóstico em Tempo Real do Sistema FCS
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsAuthenticated(false)}
              className="border-red-500/30 text-red-500 hover:bg-red-500/10"
            >
              Encerrar Sessão
            </Button>
          </div>

          <div className="grid gap-8">
            <EnvironmentSection />
            <HooksSection />
            <ApiSimulationSection />
          </div>
        </div>
      </div>
    </Layout>
  );
};

const StatusBadge = ({
  status,
  label,
}: {
  status: "success" | "error" | "warning" | "loading";
  label: string;
}) => {
  const colors = {
    success: "bg-green-500/10 text-green-500 border-green-500/20",
    error: "bg-red-500/10 text-red-500 border-red-500/20",
    warning: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    loading: "bg-blue-500/10 text-blue-500 border-blue-500/20 animate-pulse",
  };

  const icons = {
    success: <CheckCircle2 size={14} />,
    error: <XCircle size={14} />,
    warning: <AlertTriangle size={14} />,
    loading: <Activity size={14} />,
  };

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider ${colors[status]}`}
    >
      {icons[status]} {label}
    </div>
  );
};

const EnvironmentSection = () => {
  const isMobile = useIsMobile();
  const googleKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const placeId = import.meta.env.VITE_GOOGLE_PLACE_ID;

  return (
    <section className="bg-white/5 border border-white/10 rounded-3xl p-8">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Terminal size={20} className="text-primary" /> Variáveis de Ambiente &
        Device
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/5">
            <span className="text-sm text-white/60">VITE_GOOGLE_API_KEY</span>
            <StatusBadge
              status={googleKey ? "success" : "error"}
              label={googleKey ? "Carregado" : "Ausente"}
            />
          </div>
          <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/5">
            <span className="text-sm text-white/60">VITE_GOOGLE_PLACE_ID</span>
            <StatusBadge
              status={placeId ? "success" : "error"}
              label={placeId ? "Carregado" : "Ausente"}
            />
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/5">
            <span className="text-sm text-white/60 flex items-center gap-2">
              <Smartphone size={16} /> Mobile View
            </span>
            <StatusBadge
              status={isMobile ? "warning" : "success"}
              label={isMobile ? "Mobile" : "Desktop"}
            />
          </div>
          <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/5">
            <span className="text-sm text-white/60 flex items-center gap-2">
              <Globe size={16} /> User Agent
            </span>
            <span className="text-xs text-white/40 truncate max-w-[200px]">
              {navigator.userAgent}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

const HooksSection = () => {
  // Google Reviews
  const googleKey = import.meta.env.VITE_GOOGLE_API_KEY || "";
  const placeId = import.meta.env.VITE_GOOGLE_PLACE_ID || "";
  const {
    reviews,
    loading: reviewsLoading,
    error: reviewsError,
  } = useGoogleReviews(googleKey, placeId);

  // YouTube Hooks
  const { data: liveStatus, isLoading: liveLoading } = useLiveStatus();
  const { data: sermons, isLoading: sermonsLoading } = useSermonsList();
  const { data: latestSermon, isLoading: latestLoading } = useLatestSermon();

  return (
    <section className="bg-white/5 border border-white/10 rounded-3xl p-8">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Activity size={20} className="text-primary" /> Diagnóstico de Hooks
        (Integração)
      </h2>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Google Reviews Test */}
        <div className="p-6 bg-black/20 rounded-2xl border border-white/5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">useGoogleReviews</h3>
            <StatusBadge
              status={
                reviewsLoading ? "loading" : reviewsError ? "error" : "success"
              }
              label={reviewsLoading ? "Buscando" : reviewsError ? "Erro" : "OK"}
            />
          </div>
          <div className="h-32 overflow-y-auto bg-black/40 rounded-xl p-4 text-xs font-mono text-white/70">
            {reviewsError ? (
              <span className="text-red-400">{reviewsError}</span>
            ) : (
              JSON.stringify(reviews.slice(0, 2), null, 2) ||
              "Nenhuma review encontrada ou aguardando..."
            )}
          </div>
        </div>

        {/* Live Status Test */}
        <div className="p-6 bg-black/20 rounded-2xl border border-white/5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">useLiveStatus</h3>
            <StatusBadge
              status={liveLoading ? "loading" : "success"}
              label={
                liveLoading
                  ? "Verificando"
                  : liveStatus?.isLive
                    ? "AO VIVO"
                    : "OFFLINE"
              }
            />
          </div>
          <div className="h-32 overflow-y-auto bg-black/40 rounded-xl p-4 text-xs font-mono text-white/70">
            {JSON.stringify(liveStatus, null, 2)}
          </div>
        </div>

        {/* Sermons List Test */}
        <div className="p-6 bg-black/20 rounded-2xl border border-white/5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">useSermonsList</h3>
            <StatusBadge
              status={
                sermonsLoading
                  ? "loading"
                  : sermons?.length
                    ? "success"
                    : "warning"
              }
              label={
                sermonsLoading ? "Carregando" : `${sermons?.length || 0} Itens`
              }
            />
          </div>
          <div className="h-32 overflow-y-auto bg-black/40 rounded-xl p-4 text-xs font-mono text-white/70">
            {JSON.stringify(sermons?.slice(0, 1), null, 2)}
          </div>
        </div>

        {/* Latest Sermon Test */}
        <div className="p-6 bg-black/20 rounded-2xl border border-white/5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">useLatestSermon</h3>
            <StatusBadge
              status={
                latestLoading ? "loading" : latestSermon ? "success" : "warning"
              }
              label={
                latestLoading
                  ? "Carregando"
                  : latestSermon
                    ? "Encontrado"
                    : "Vazio"
              }
            />
          </div>
          <div className="h-32 overflow-y-auto bg-black/40 rounded-xl p-4 text-xs font-mono text-white/70">
            {JSON.stringify(latestSermon, null, 2)}
          </div>
        </div>
      </div>
    </section>
  );
};

const ApiSimulationSection = () => {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [response, setResponse] = useState("");

  const testPrayerApi = async () => {
    setStatus("loading");
    setResponse("Iniciando requisição POST para /api/prayer-request...");

    try {
      // Simulando delay de rede
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Como não temos backend real rodando neste contexto, isso provavelmente falhará ou retornará 404/500
      // Mas serve para testar a conectividade se o backend existisse
      const res = await fetch("/api/prayer-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Teste Admin",
          request: "Teste de integridade do sistema",
          isAnonymous: true,
          date: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        setStatus("success");
        setResponse("Sucesso: 200 OK");
      } else {
        throw new Error(`Erro HTTP: ${res.status}`);
      }
    } catch (err: any) {
      setStatus("error");
      setResponse(
        `Falha na requisição: ${err.message}\n(Nota: Isso é esperado se o backend não estiver rodando localmente)`,
      );
    }
  };

  return (
    <section className="bg-white/5 border border-white/10 rounded-3xl p-8">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Server size={20} className="text-primary" /> Simulação de API (Backend)
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <p className="text-sm text-white/60">
            Testa o endpoint de pedidos de oração enviando um payload de teste.
          </p>
          <Button
            onClick={testPrayerApi}
            disabled={status === "loading"}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold"
          >
            {status === "loading" ? "Testando..." : "Disparar Teste de API"}
          </Button>
        </div>

        <div className="flex-1 bg-black/40 rounded-xl p-4 font-mono text-xs text-white/70 min-h-[100px] border border-white/5">
          <div className="flex justify-between mb-2">
            <span className="uppercase font-bold text-white/30">
              Console de Saída
            </span>
            {status !== "idle" && (
              <StatusBadge
                status={
                  status === "loading"
                    ? "loading"
                    : status === "success"
                      ? "success"
                      : "error"
                }
                label={status.toUpperCase()}
              />
            )}
          </div>
          <pre className="whitespace-pre-wrap">
            {response || "Aguardando comando..."}
          </pre>
        </div>
      </div>
    </section>
  );
};

export default AdminTest;
