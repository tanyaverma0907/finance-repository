import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hover = false,
  gradient = false,
}) => {
  return (
    <div
      className={`
        rounded-2xl border border-purple-100/60 shadow-lg shadow-purple-100/30
        ${gradient
          ? "bg-linear-to-br from-purple-600 to-indigo-700 text-white border-transparent"
          : "bg-white/80 backdrop-blur-sm"
        }
        ${hover ? "hover:shadow-xl hover:shadow-purple-200/50 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;