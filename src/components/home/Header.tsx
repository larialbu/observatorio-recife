import Image from "next/image";

export const Header = () => {
    return (
        <header className="bg-black bg-opacity-37 text-blue-900 w-full flex items-center justify-center py-3 px-3">
          <div className="inline-flex w-[80%] content_wrapper">
            <div className="flex-shrink-0 logo_container">
              <Image
                src="/images/logos/PREF-REC-LOGO.png"
                alt="Prefeitura do Recife"
                width={100}
                height={60}
                className="flex-shrink-0"
              />
            </div>
            <div className="flex items-center ml-auto text-sm title-container">
              <p className="text-white text-sm">Prefeitura da Cidade do Recife</p>
            </div>
          </div>
        </header>
      )
}