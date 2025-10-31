import React from "react"

export const ExploreIcon = ({ progresso = 100, isLinkDisabled = false, rewardId = 'random', icon, logo, iconClassName }: any) => {
    return        (
    <div className="relative">
        <div
            className={`${isLinkDisabled ? "" : "hidden"} absolute -inset-0 rounded-full bg-blue-600 opacity-50 transition-all duration-300`}
            style={{ clipPath: `inset(${100 - progresso}% 0 0 0)` }}
        />
        <div
            className={`relative ${isLinkDisabled ? "grayscale dark:grayscale-0 dark:opacity-70" : ""} hover:rotate-[-5deg] border-2 border-[#0155AE] rounded-full dark:border-white transition-all duration-300 ease-in-out group-hover:scale-110 cursor-pointer select-none icon-content`}
        >
            <span
            id={rewardId}
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "1px",
                height: "1px",
                zIndex: "15"
            }}
            />
            <div className="relative z-10 icon-wrapper">
            {React.cloneElement(icon, {
                className: `${icon.props.className} ${iconClassName} transition-transform duration-300 ease-in-out group-hover:scale-110`,
            })}
            </div>
            <div className="logo-wrapper absolute z-0 bg-white rounded-full p-1 dark:bg-[#0C1B2B] transition-transform duration-300 ease-in-out group-hover:scale-110">
            {React.cloneElement(logo, {
                className: `${logo.props.className} ${iconClassName} w-full h-full`,
            })}
            </div>
        </div>
    </div>
)
}