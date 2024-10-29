import React from "react";

type CardProps = {
    banner: string;
    title: string;
    logo: string;
    description: string;
    onButtonClick: () => void;
};

export const Card: React.FC<CardProps> = ({ banner, title, logo, description, onButtonClick }) => {
    return (
        <div className="w-[400px] h-[400px] card-content">
            <div className="banner-content">
                <div style={{ backgroundImage: `url(${banner})` }} className="w-full h-full __banner"></div>
            </div>
            <div className="flex flex-col w-full h-[50%] p-4 justify-between text-white presentation-content">
                <div className="flex justify-between w-full relative first-row">
                    <div className="title-content">
                        <p className="max-w-[300px] text-2xl">{title}</p>
                    </div>
                    <div className="partner-logo">
                        <div style={{ backgroundImage: `url(${logo})` }} className="h-full w-full __logo"></div>
                    </div>
                </div>
                <div className="flex items-end second-row">
                    <div className="w-[400px] h-full text-xs description-content">
                        <p>{description}</p>
                    </div>
                    <span className="block h-[50px]"></span>
                    <div className="w-full h-full button-content">
                        <button onClick={onButtonClick} className="w-full h-full ml-2 font-medium __button">
                            Conferir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
