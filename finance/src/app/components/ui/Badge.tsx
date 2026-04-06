import React from "react";

type BadgeVariant = "income" | "expense" | "category" | "default" | "success" | "warning";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  income: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  expense: "bg-rose-100 text-rose-700 border border-rose-200",
  category: "bg-purple-100 text-purple-700 border border-purple-200",
  default: "bg-slate-100 text-slate-600 border border-slate-200",
  success: "bg-green-100 text-green-700 border border-green-200",
  warning: "bg-amber-100 text-amber-700 border border-amber-200",
};

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  className = "",
}) => {
  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold
        tracking-wide
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;