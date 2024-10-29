import { ReactNode } from "react";

export const SocialIcon = ({
  link,
  icon,
  color,
  onClick, // Adiciona onClick como prop opcional
}: {
  link: string;
  icon: ReactNode;
  color: string;
  onClick?: () => void; // Define onClick como opcional
}) => {
  return (
    <a
      href={link}
      target="_blank"
      style={{ backgroundColor: color }}
      className="hover:-translate-y-2 transition duration-200 w-12 h-12 rounded-full flex items-center justify-center"
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
