import { ReactNode } from "react";

export const SocialIcon = ({
  link,
  icon,
  color,
  onClick,
  className = "", // Valor padrão para className
}: {
  link: string;
  icon: ReactNode;
  color: string;
  onClick?: () => void;
  className?: string; // Adicionando className
}) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer" // Segurança adicional
      style={{ backgroundColor: color }}
      className={`hover:-translate-y-2 transition duration-200 w-12 h-12 rounded-full flex items-center justify-center ${className}`} // Incluindo className aqui
      onClick={(e) => {
        // Se onClick for fornecido, evita o comportamento padrão de navegação
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {icon}
    </a>
  );
};
