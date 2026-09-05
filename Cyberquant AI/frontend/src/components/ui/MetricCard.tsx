import React from "react";
import { ArrowDownRight, ArrowUpRight, Minus } from "@/components/icons";

interface MetricCardProps {
  label: string;
  value: string;
  delta?: string;
  deltaType?: "positive" | "negative" | "neutral";
  subtext?: string;
  icon?: React.ElementType;
}

export function MetricCard({
  label,
  value,
  delta,
  deltaType = "neutral",
  subtext,
  icon: Icon
}: MetricCardProps) {
  return (
    <div className="bg-white border border-slate-200/90 rounded-lg p-3.5 shadow-xs hover:border-slate-300 transition">
      <div className="flex items-center justify-between text-slate-500 mb-1.5">
        <span className="text-xs font-medium text-slate-600 tracking-tight">{label}</span>
        {Icon && <Icon className="w-3.5 h-3.5 text-slate-400" />}
      </div>

      <div className="flex items-baseline space-x-2">
        <span className="text-xl font-bold tracking-tight text-slate-900 font-mono tabular-nums">
          {value}
        </span>
        {delta && (
          <span
            className={`inline-flex items-center text-[11px] font-semibold ${
              deltaType === "positive"
                ? "text-emerald-700"
                : deltaType === "negative"
                ? "text-rose-700"
                : "text-slate-600"
            }`}
          >
            {deltaType === "positive" && <ArrowDownRight className="w-3 h-3 mr-0.5 inline" />}
            {deltaType === "negative" && <ArrowUpRight className="w-3 h-3 mr-0.5 inline" />}
            {deltaType === "neutral" && <Minus className="w-2.5 h-2.5 mr-0.5 inline" />}
            {delta}
          </span>
        )}
      </div>

      {subtext && (
        <div className="mt-1 text-[11px] text-slate-500 truncate">{subtext}</div>
      )}
    </div>
  );
}
