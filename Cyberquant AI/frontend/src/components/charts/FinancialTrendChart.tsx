"use client";

import React, { useState } from "react";
import { FinancialTrendPoint } from "@/lib/types";
import { formatINR } from "@/lib/formatters";

interface FinancialTrendChartProps {
  data: FinancialTrendPoint[];
  selectedRange: number;
  onRangeChange: (days: number) => void;
}

export function FinancialTrendChart({
  data,
  selectedRange,
  onRangeChange
}: FinancialTrendChartProps) {
  const [hoveredPoint, setHoveredPoint] = useState<FinancialTrendPoint | null>(null);

  if (!data || data.length === 0) {
    return <div className="h-56 flex items-center justify-center text-xs text-slate-400">Loading trend...</div>;
  }

  // Calculate scales
  const exposures = data.map((d) => d.exposure);
  const maxVal = Math.max(...exposures, 100000000); // at least ₹10 Cr max
  const minVal = 0;

  const width = 640;
  const height = 190;
  const paddingLeft = 45;
  const paddingRight = 15;
  const paddingTop = 15;
  const paddingBottom = 25;

  const chartW = width - paddingLeft - paddingRight;
  const chartH = height - paddingTop - paddingBottom;

  const getX = (index: number) => paddingLeft + (index / (data.length - 1)) * chartW;
  const getY = (val: number) => paddingTop + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;

  // Path generator
  const exposurePoints = data.map((d, i) => `${getX(i)},${getY(d.exposure)}`).join(" ");
  const ealPoints = data.map((d, i) => `${getX(i)},${getY(d.eal)}`).join(" ");

  const toleranceY = getY(70000000); // ₹7.00 Cr Board Tolerance

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-lg p-4 shadow-xs">
      {/* Header with 30/60/90 day buttons */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-xs font-bold text-slate-800 dark:text-slate-100 tracking-tight">Financial Risk Trend</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">Gross monetary exposure vs. Expected Annual Loss (EAL)</div>
        </div>

        <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded border border-slate-200 dark:border-slate-700">
          {[30, 60, 90].map((days) => (
            <button
              key={days}
              onClick={() => onRangeChange(days)}
              className={`px-2 py-0.5 text-[11px] font-medium rounded transition ${
                selectedRange === days
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs font-semibold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              {days}d
            </button>
          ))}
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-48 select-none">
          {/* Horizontal grid lines */}
          {[0, 0.33, 0.66, 1].map((pct, idx) => {
            const y = paddingTop + chartH * (1 - pct);
            const val = minVal + (maxVal - minVal) * pct;
            return (
              <g key={idx}>
                <line x1={paddingLeft} y1={y} x2={width - paddingRight} y2={y} stroke="#334155" strokeWidth="0.5" strokeDasharray="2 2" className="opacity-30 dark:opacity-40" />
                <text x={paddingLeft - 6} y={y + 3} textAnchor="end" className="text-[9px] fill-slate-400 font-mono">
                  {formatINR(val)}
                </text>
              </g>
            );
          })}

          {/* Board Risk Tolerance Reference Line */}
          <line
            x1={paddingLeft}
            y1={toleranceY}
            x2={width - paddingRight}
            y2={toleranceY}
            stroke="#f87171"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <text x={width - paddingRight} y={toleranceY - 4} textAnchor="end" className="text-[9px] fill-rose-500 font-medium">
            Tolerance Cap (₹7.0 Cr)
          </text>

          {/* Lines */}
          <polyline fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={exposurePoints} />
          <polyline fill="none" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={ealPoints} />

          {/* Interactive hover points */}
          {data.map((d, i) => (
            <circle
              key={i}
              cx={getX(i)}
              cy={getY(d.exposure)}
              r={hoveredPoint?.date === d.date ? 4 : 2}
              className="fill-blue-600 cursor-pointer transition-all"
              onMouseEnter={() => setHoveredPoint(d)}
            />
          ))}

          {/* X Axis Labels */}
          {data.length > 0 && (
            <>
              <text x={getX(0)} y={height - 6} className="text-[9px] fill-slate-400">
                {data[0].date}
              </text>
              <text x={getX(Math.floor(data.length / 2))} y={height - 6} textAnchor="middle" className="text-[9px] fill-slate-400">
                {data[Math.floor(data.length / 2)].date}
              </text>
              <text x={getX(data.length - 1)} y={height - 6} textAnchor="end" className="text-[9px] fill-slate-400">
                Today
              </text>
            </>
          )}
        </svg>

        {/* Floating Tooltip */}
        {hoveredPoint && (
          <div className="absolute top-2 left-16 bg-slate-900 text-white text-[11px] p-2 rounded shadow-lg pointer-events-none z-10 border border-slate-700">
            <div className="font-semibold text-slate-300">{hoveredPoint.date}</div>
            <div className="text-blue-400 font-mono">Exposure: {formatINR(hoveredPoint.exposure)}</div>
            <div className="text-amber-400 font-mono">EAL: {formatINR(hoveredPoint.eal)}</div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
            <span>Total Exposure</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 inline-block" />
            <span>Expected Annual Loss</span>
          </div>
        </div>
        <span className="text-[10px] text-slate-400">Continuous Bayesian Prior Update</span>
      </div>
    </div>
  );
}
