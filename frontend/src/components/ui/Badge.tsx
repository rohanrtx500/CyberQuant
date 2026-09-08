import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "critical" | "high" | "medium" | "low" | "neutral" | "success" | "warning" | "info";
  size?: "sm" | "md";
}

export function Badge({ children, variant = "neutral", size = "sm" }: BadgeProps) {
  const variantStyles = {
    critical: "bg-rose-50 text-rose-700 border-rose-200/80",
    high: "bg-orange-50 text-orange-700 border-orange-200/80",
    medium: "bg-amber-50 text-amber-700 border-amber-200/80",
    low: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    neutral: "bg-slate-100 text-slate-700 border-slate-200",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    warning: "bg-amber-50 text-amber-700 border-amber-200/80",
    info: "bg-blue-50 text-blue-700 border-blue-200/80",
  };

  const sizeStyles = {
    sm: "text-[10px] px-1.5 py-0.5",
    md: "text-xs px-2 py-0.5",
  };

  return (
    <span
      className={`inline-flex items-center font-medium border rounded ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      {children}
    </span>
  );
}
