"use client";

import React from "react";
import { RiskDistribution } from "@/lib/types";

interface RiskDistributionBarProps {
  distribution: RiskDistribution;
}

export function RiskDistributionBar({ distribution }: RiskDistributionBarProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-lg p-4 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-100 tracking-tight">Risk Distribution</span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">18 Assets Monitored</span>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">Enterprise assets stratified by composite risk rating</p>

        {/* Segmented Bar */}
        <div className="h-3 w-full rounded-full overflow-hidden flex bg-slate-100 dark:bg-slate-800 mb-3 border border-slate-200 dark:border-slate-700">
          <div
            style={{ width: `${distribution.critical_percent}%` }}
            className="bg-rose-500 hover:opacity-90 transition-all cursor-pointer"
            title={`Critical: ${distribution.critical_percent}%`}
          />
          <div
            style={{ width: `${distribution.high_percent}%` }}
            className="bg-orange-500 hover:opacity-90 transition-all cursor-pointer"
            title={`High: ${distribution.high_percent}%`}
          />
          <div
            style={{ width: `${distribution.medium_percent}%` }}
            className="bg-amber-400 hover:opacity-90 transition-all cursor-pointer"
            title={`Medium: ${distribution.medium_percent}%`}
          />
          <div
            style={{ width: `${distribution.low_percent}%` }}
            className="bg-emerald-500 hover:opacity-90 transition-all cursor-pointer"
            title={`Low: ${distribution.low_percent}%`}
          />
        </div>
      </div>

      {/* Numerical Breakdown Grid */}
      <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
        <div className="p-1.5 rounded bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/60">
          <div className="text-[10px] text-rose-700 dark:text-rose-400 font-medium">Critical</div>
          <div className="text-xs font-bold text-rose-800 dark:text-rose-300 font-mono">{distribution.critical_percent}%</div>
        </div>
        <div className="p-1.5 rounded bg-orange-50 dark:bg-orange-950/40 border border-orange-100 dark:border-orange-900/60">
          <div className="text-[10px] text-orange-700 dark:text-orange-400 font-medium">High</div>
          <div className="text-xs font-bold text-orange-800 dark:text-orange-300 font-mono">{distribution.high_percent}%</div>
        </div>
        <div className="p-1.5 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/60">
          <div className="text-[10px] text-amber-700 dark:text-amber-400 font-medium">Medium</div>
          <div className="text-xs font-bold text-amber-800 dark:text-amber-300 font-mono">{distribution.medium_percent}%</div>
        </div>
        <div className="p-1.5 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/60">
          <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium">Low</div>
          <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 font-mono">{distribution.low_percent}%</div>
        </div>
      </div>
    </div>
  );
}
