import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button
            className={`
                px-6 py-3 font-semibold rounded-lg
                ${bgColor} ${textColor} ${className}
                transition-all duration-300 ease-in-out
                transform hover:scale-105 hover:shadow-lg
            `}
            {...props}
        >
            {children}
        </button>
    );
}