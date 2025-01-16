import { ReactNode, useEffect, useRef } from "react";

interface FocusHiddenProps {
  children: ReactNode;
  style?: string;
  open: boolean;
  setOpen: (value: boolean) => void;
}

const FocusHidden = ({ children, style = "", open, setOpen }: FocusHiddenProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (e: MouseEvent) => {
    // Se já não está aberto, não precisa fechar
    if (!open) return;
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setOpen(false); 
    }
  };

  useEffect(() => {
    // Usa mousedown para evitar conflito com clique no botão
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <span ref={containerRef} className={style}>
      {children}
    </span>
  );
};

export default FocusHidden;
