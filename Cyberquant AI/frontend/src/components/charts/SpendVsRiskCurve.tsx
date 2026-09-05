"use client";

import React from "react";
import { formatINR } from "@/lib/formatters";

interface SpendVsRiskCurveProps {
  currentSpend?: number;
  recommendedMin?: number;
  recommendedMax?: number;
}

export function SpendVsRiskCurve({
  currentSpend = 9600000,
  recommendedMin = 8000000,
  recommendedMax = 12000000
}: SpendVsRiskCurveProps) {
  const width = 560;
  const height = 180;
  const paddingLeft = 45;
  const paddingRight = 20;
  const paddingTop = 15;
  const paddingBottom = 25;

  const chartW = width - paddingLeft - paddingRight;
  const chartH = height - paddingTop - paddingBottom;

  // Max spend ₹2 Cr, max reduction ₹5.5 Cr
  const maxSpend = 20000000;
  const maxReduction = 55000000;

  const points = [
    { spend: 0, red: 0 },
    { spend: 800000, red: 16500000 },
    { spend: 2000000, red: 30500000 },
    { spend: 5000000, red: 39000000 },
    { spend: 9600000, red: 46000000 },
    { spend: 12000000, red: 48500000 },
    { spend: 16000000, red: 50500000 },
    { spend: 20000000, red: 51800000 }
  ];

  const getX = (val: number) => paddingLeft + (val / maxSpend) * chartW;
  const getY = (val: number) => paddingTop + chartH - (val / maxReduction) * chartH;

  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${getX(p.spend)} ${getY(p.red)}`).join(" ");

  const zoneX1 = getX(recommendedMin);
  const zoneX2 = getX(recommendedMax);
  const currX = getX(currentSpend);
  const currY = getY(46000000);

  return (
    <div className="bg-white border border-slate-200/90 rounded-lg p-4 shadow-xs">
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-xs font-bold text-slate-800 tracking-tight">Investment vs. Risk Reduction Curve</div>
          <div className="text-[11px] text-slate-500">Capital allocation efficiency demonstrating diminishing returns</div>
        </div>
        <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
          Optimal Zone: ₹80L – ₹1.2 Cr
        </span>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-44 select-none">
        {/* Recommended Spend Zone Background */}
        <rect
          x={zoneX1}
          y={paddingTop}
          width={zoneX2 - zoneX1}
          height={chartH}
          fill="#eff6ff"
          opacity="0.8"
          stroke="#bfdbfe"
          strokeDasharray="2 2"
        />
        <text x={(zoneX1 + zoneX2) / 2} y={paddingTop + 14} textAnchor="middle" className="text-[9px] fill-blue-600 font-semibold">
          Recommended Spend Zone
        </text>

        {/* Grid lines */}
        {[0, 0.5, 1].map((pct, idx) => {
          const y = paddingTop + chartH * (1 - pct);
          const val = maxReduction * pct;
          return (
            <g key={idx}>
              <line x1={paddingLeft} y1={y} x2={width - paddingRight} y2={y} stroke="#f1f5f9" strokeWidth="1" />
              <text x={paddingLeft - 6} y={y + 3} textAnchor="end" className="text-[9px] fill-slate-400 font-mono">
                {formatINR(val)}
              </text>
            </g>
          );
        })}

        {/* The Curve */}
        <path d={pathD} fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />

        {/* Current Recommended Spend Point */}
        <circle cx={currX} cy={currY} r="5" fill="#1d4ed8" stroke="#ffffff" strokeWidth="2" />
        <line x1={currX} y1={currY} x2={currX} y2={paddingTop + chartH} stroke="#1d4ed8" strokeDasharray="3 2" />

        <text x={currX} y={currY - 8} textAnchor="middle" className="text-[9px] fill-blue-900 font-bold">
          Selected Spend (₹96L)
        </text>

        {/* Diminishing returns marker */}
        <text x={width - paddingRight - 10} y={getY(51800000) - 8} textAnchor="end" className="text-[9px] fill-slate-400 font-medium italic">
          Diminishing Returns Plateau →
        </text>

        {/* X Axis */}
        <text x={getX(0)} y={height - 6} className="text-[9px] fill-slate-400 font-mono">₹0</text>
        <text x={getX(10000000)} y={height - 6} textAnchor="middle" className="text-[9px] fill-slate-400 font-mono">₹1.0 Cr</text>
        <text x={getX(20000000)} y={height - 6} textAnchor="end" className="text-[9px] fill-slate-400 font-mono">₹2.0 Cr</text>
      </svg>
    </div>
  );
}
