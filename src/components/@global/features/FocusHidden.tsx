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
    if (
      open &&
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [open]);

  // Permite que elementos filhos processem seus próprios cliques
  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return open ? (
    <div ref={containerRef} className={style} onClick={handleContainerClick}>
      {children}
    </div>
  ) : null;
};

export default FocusHidden;