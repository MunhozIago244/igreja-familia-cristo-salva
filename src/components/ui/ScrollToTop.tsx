import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Padrão Sênior: Utilitário de Gerenciamento de Ciclo de Vida de Navegação.
 * Este componente garante que o usuário sempre inicie a leitura do topo
 * ao trocar de rota, melhorando a UX e a acessibilidade.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Usamos o window.scrollTo com comportamento 'instant' para evitar
    // o flash de conteúdo ou scroll visual durante a transição de rota.
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]); // Dispara sempre que o caminho da URL mudar

  return null;
};

export default ScrollToTop;