import Link from "next/link";
import { useState } from "react";

import { menuItems } from "./menuIcons";

const Menu = ({ open }: { open: boolean }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className={`${open ? "max-w-[200px] z-20" : ""} mt-4 text-sm`}>
      {menuItems.map((section) => (
        <div className="flex flex-col gap-2" key={section.title}>
          {/* Seção Título */}
          <span
            className={`${
              open ? "block" : "hidden"
            } text-gray-400 dark:text-gray-100 font-light my-4`}
          >
            {section.title}
          </span>

          {/* Linha Separadora para OUTROS */}
          {section.title === "OUTROS" && (
            <hr className="border-gray-400 mt-6 border-b-[1.5px] rounded" />
          )}

          {/* Ícones e Links */}
          {section.items.map((item) => (
            <div key={item.label} className="relative group">
              <Link
                href={item.href}
                className={`flex max-w-[200px] items-center ${
                  open ? "justify-start" : "justify-center"
                } gap-4 text-gray-500 dark:text-gray-200 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight dark:hover:bg-[#15273b] menu-item-wrapper`}
                onMouseEnter={() => setHoveredItem(item.label)} // Detecta hover no link
                onMouseLeave={() => setHoveredItem(null)} // Remove hover ao sair do link
              >
                {item.icon}
                {open && <span>{item.label}</span>}
              </Link>

              {/* Tooltip para Sidebar Fechada */}
              {!open && (
                <div
                  className={`absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-white dark:bg-[#15273b] dark:text-gray-200 shadow-lg px-3 py-1 z-50 rounded-md transition-all duration-500 transform ${
                    hoveredItem === item.label
                      ? "opacity-100 translate-x-2"
                      : "opacity-0 translate-x-[-10px] pointer-events-none"
                  }`}
                >
                  {item.label}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
