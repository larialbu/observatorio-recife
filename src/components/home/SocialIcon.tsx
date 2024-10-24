import { ReactNode } from "react";

export const SocialIcon = ({
  link,
  icon,
  color,
}: {
  link: string;
  icon: ReactNode;
  color: string;
}) => {
  return (
    <a
      href={link}
      target="_blank"
      className={`hover:-translate-y-2 transition duration-200 w-12 h-12 rounded-full flex items-center justify-center bg-[${color}]`}
    >
      {icon}
    </a>
  );
};
