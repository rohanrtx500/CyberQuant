"use client";

import React from "react";
import { RiskDistribution } from "@/lib/types";

interface RiskDistributionBarProps {
  distribution: RiskDistribution;
}

export function RiskDistributionBar({ distribution }: RiskDistributionBarProps) {
  return (
    <div className="bg-white border border-slate-200/90 rounded-lg p-4 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-bold text-slate-800 tracking-tight">Risk Distribution</span>
          <span className="text-[11px] text-slate-500 font-mono">18 Assets Monitored</span>
        </div>
        <p className="text-[11px] text-slate-500 mb-3">Enterprise assets stratified by composite risk rating</p>

        {/* Segmented Bar */}
        <div className="h-3 w-full rounded-full overflow-hidden flex bg-slate-100 mb-3 border border-slate-200">
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
      <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-center">
        <div className="p-1.5 rounded bg-rose-50 border border-rose-100">
          <div className="text-[10px] text-rose-700 font-medium">Critical</div>
          <div className="text-xs font-bold text-rose-800 font-mono">{distribution.critical_percent}%</div>
        </div>
        <div className="p-1.5 rounded bg-orange-50 border border-orange-100">
          <div className="text-[10px] text-orange-700 font-medium">High</div>
          <div className="text-xs font-bold text-orange-800 font-mono">{distribution.high_percent}%</div>
        </div>
        <div className="p-1.5 rounded bg-amber-50 border border-amber-100">
          <div className="text-[10px] text-amber-700 font-medium">Medium</div>
          <div className="text-xs font-bold text-amber-800 font-mono">{distribution.medium_percent}%</div>
        </div>
        <div className="p-1.5 rounded bg-emerald-50 border border-emerald-100">
          <div className="text-[10px] text-emerald-700 font-medium">Low</div>
          <div className="text-xs font-bold text-emerald-800 font-mono">{distribution.low_percent}%</div>
        </div>
      </div>
    </div>
  );
}
