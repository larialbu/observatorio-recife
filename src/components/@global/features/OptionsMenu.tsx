import React, { useState, useEffect, useRef } from "react";

interface OptionsMenuProps {
  onDownload: () => void;
  onFullScreen: () => void;
  isFullScreen: boolean;
  left?: boolean;
  onHide: () => void;
  // Nova prop para adicionar ao Excalidraw
  onAddToExcalidraw?: () => void;
}

const OptionsMenu: React.FC<OptionsMenuProps> = ({
  onDownload,
  onFullScreen,
  isFullScreen,
  left,
  onHide,
  onAddToExcalidraw,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      buttonRef.current && !buttonRef.current.contains(e.target as Node) &&
      menuRef.current && !menuRef.current.contains(e.target as Node)
    ) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={`absolute z-20 ${isFullScreen 
      ? (left ? "top-3 right-2 transform scale-[1.5]" : "top-5 right-4 transform scale-[2]")
      : (left ? "-top-6 left-2" : "top-[-.7em] right-[-.7em]")}`}>
      <button
        ref={buttonRef}
        className="text-gray-600 hover:text-gray-800 border-gray-600 options-button"
        onClick={() => {
          if (isFullScreen) {
            onFullScreen();
          } else {
            setMenuOpen(!menuOpen);
          }
        }}
      >
        {isFullScreen ? (
          <svg fill="#000000" className="w-[20px]" viewBox="0 0 24 24">
            <path d="M18.36 5.64l-1.41-1.41L12 9.17 7.05 4.22 5.64 5.64 10.59 10.6 5.64 15.54l1.41 1.41L12 12.83l4.95 4.95 1.41-1.41-4.95-4.96z" />
          </svg>
        ) : (
          <svg fill="#000000" className="w-[20px] pointer-events-none" viewBox="0 0 1024 1024">
            <path d="M899.4 638.2h-27.198c-2.2-.6-4.2-1.6-6.4-2-57.2-8.8-102.4-56.4-106.2-112.199-4.401-62.4 31.199-115.2 89.199-132.4 7.6-2.2 15.6-3.8 23.399-5.8h27.2c1.8.6 3.4 1.6 5.4 1.8 52.8 8.6 93 46.6 104.4 98.6.8 4 2 8 3 12v27.2c-.6 1.8 1.6 3.6-1.8 5.4-8.4 52-45.4 91.599-96.801 103.6-5 1.2-9.6 2.6-14.2 3.8zM130.603 385.8l27.202.001c2.2.6 4.2 1.6 6.4 1.8 57.6 9 102.6 56.8 106.2 113.2 4 62.2-32 114.8-90.2 131.8-7.401 2.2-15 3.8-22.401 5.6h-27.2c-1.8-.6-3.4-1.6-5.2-2-52-9.6-86-39.8-102.2-90.2-2.2-6.6-3.4-13.6-5.2-20.4v-27.2c.6-1.8 1.6-3.6 1.8-5.4 8.6-52.2 45.4-91.6 96.8-103.6 4.8-1.201 9.4-2.401 13.999-3.601zm370.801.001h27.2c2.2-.6 4.2-1.6 6.4 2 57.4 9 103.6 58.6 106 114.6 2.8 63-35.2 116.4-93.8 131.4-6.2 1.6-12.4 3-18.6 4.4h-27.2c-2.2-.6-4.2-1.6-6.4-2-57.4-8.8-103.601-58.6-106.2-114.6-3-63 35.2-116.4 93.8-131.4 6.4-1.6 12.6-3 18.8-4.4z" />
          </svg>
        )}
      </button>
      {menuOpen && !isFullScreen && (
        <div
          ref={menuRef}
          className={`absolute ${left ? "left-0" : "right-0"} w-48 bg-white rounded-md shadow-lg z-10 border-2`}
        >
          <button
            onClick={() => {
              onDownload();
              setMenuOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            Baixar como imagem
          </button>
          <button
            onClick={() => {
              onFullScreen();
              setMenuOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            Tela cheia
          </button>
          <button
            onClick={() => {
              onHide();
              setMenuOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            Esconder gráfico
          </button>
          {onAddToExcalidraw && (
            <button
              onClick={() => {
                onAddToExcalidraw();
                setMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Adicionar ao Quadro
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default OptionsMenu;
