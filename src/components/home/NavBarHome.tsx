const Separator = () => {
  return <div className="h-[25px] mx-2 w-[1px] bg-white"></div>;
};

export const NavBarHome = ({ simple }: { simple?: boolean }) => {
  return (
    <div
      className={`${
        simple
          ? "bg-[url('/images/backgrounds/home_carousel/carousel_1.png')] bg-cover bg-center"
          : "absolute"
      } flex justify-between z-10 p-4 px-6  w-full `}
    >
      <img
        src="/images/logos/observatorio_logo.png"
        alt="logo observatorio"
        className={`${simple ? " h-10" : " w-20 h-20"}  object-cover`}
      />
      <ul className="flex items-start justify-end pt-2 text-white">
        <li>
          <a href="#">Explorar</a>
        </li>
        <li>
          <Separator />
        </li>
        <li>
          <a href="#">Boletim Econômico</a>
        </li>
      </ul>
    </div>
  );
};
