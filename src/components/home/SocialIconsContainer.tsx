import { useState } from "react";
import { SocialIcon } from "./SocialIcon";

export const SocialIconsContainer = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={`flex items-center flex-col gap-3 fixed right-0 top-1/2 w-20 transition duration-500 transform scale-[80%] sm:scale-[80%] md:scale-100 lg:scale-100 ${
      isVisible ? "pointer-events-auto" : "pointer-events-none"
    }`}>
      {/* Contêiner dos ícones sociais */}
      <div
        className={`transition-all duration-500 flex flex-col gap-3 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6 pointer-events-none"
        }`}
      >
        <SocialIcon
          link="#"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 48 48">
              {/* Ícone de LinkedIn */}
              <path d="M41,4.1H7A2.9,2.9,0,0,0,4,7V41.1A2.9,2.9,0,0,0,7,44H41a2.9,2.9,0,0,0,2.9-2.9V7A2.9,2.9,0,0,0,41,4.1Zm-25.1,34h-6v-19h6Zm-3-21.6A3.5,3.5,0,0,1,9.5,13a3.4,3.4,0,0,1,6.8,0A3.5,3.5,0,0,1,12.9,16.5ZM38,38.1H32.1V28.8c0-2.2,0-5-3.1-5s-3.5,2.4-3.5,4.9v9.4H19.6v-19h5.6v2.6h.1a6.2,6.2,0,0,1,5.6-3.1c6,0,7.1,3.9,7.1,9.1Z" fill="#ffffff" />
            </svg>
          }
          color="#0155AE"
        />

        <SocialIcon
          link="#"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 20 20">
              {/* Ícone do Facebook */}
              <path d="M2.89 2h14.23c.49 0 .88.39.88.88v14.24c0 .48-.39.88-.88.88h-4.08v-6.2h2.08l.31-2.41h-2.39V7.85c0-.7.2-1.18 1.2-1.18h1.28V4.51c-.22-.03-.98-.09-1.86-.09-1.85 0-3.11 1.12-3.11 3.19v1.78H8.46v2.41h2.09V18H2.89c-.49 0-.89-.4-.89-.88V2.88c0-.49.4-.88.89-.88z" fill="#ffffff" />
            </svg>
          }
          color="#EC6625"
        />

        <SocialIcon
          link="#"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 50 50">
              {/* Ícone do YouTube */}
              <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z" fill="#ffffff" />
            </svg>
          }
          color="#52B348"
        />
      </div>

      {/* Botão de alternância */}
      <SocialIcon
        link="#"
        icon={
          isVisible ? (
            <svg viewBox="-4 -4 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="#ffffff" strokeWidth="1.5"/>
              <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke="#ffffff" strokeWidth="1.5"/>
            </svg>
          ) : (
            <svg viewBox="-4 -4 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5" stroke="#ffffff" strokeWidth="1.5" />
            </svg>
          )
        }
        color="#0155AE"
        onClick={toggleVisibility}
        className="pointer-events-auto" // Adicionando pointer-events-auto aqui
      />
    </div>
  );
};
