import Link from "next/link";
import { menuItems } from "./menuIcons";
import { useState } from "react";

const Menu = ({ open }: { open: boolean }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className={`${open ? "max-w-[200px] z-20" : ""} mt-4 text-sm`}>
      {menuItems.map((section) => (
        <div className="flex flex-col gap-2" key={section.title}>
          <span
            className={`${
              open ? "block" : "hidden"
            } text-gray-400 font-light my-4`}
          >
            {section.title}
          </span>
          {section.items.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setHoveredItem(item.label)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link
                href={item.href}
                className={`flex max-w-[200px] items-center ${
                  open ? "justify-start" : "justify-center"
                } gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight menu-item-wrapper`}
              >
                {item.icon}
                {open && <span>{item.label}</span>}
              </Link>
              {!open && (
                <div
                  className={`
                    absolute left-full top-1/2 -translate-y-1/2 ml-2 
                    bg-white shadow-md px-2 py-1 rounded-md z-40
                    tooltip
                    ${hoveredItem === item.label ? "tooltip-show" : "tooltip-hide"}
                  `}
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
