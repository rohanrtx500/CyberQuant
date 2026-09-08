"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { OptimizationResponse, SecurityInitiative } from "@/lib/types";
import { formatINR, formatINRFull } from "@/lib/formatters";
import { MetricCard } from "@/components/ui/MetricCard";
import { SpendVsRiskCurve } from "@/components/charts/SpendVsRiskCurve";
import { Badge } from "@/components/ui/Badge";
import { Target, CheckCircle2, DollarSign, ArrowRight, ShieldCheck, Sparkles } from "@/components/icons";
import { RoleNotice } from "@/components/ui/RoleNotice";

export default function OptimizerPage() {
  const [budget, setBudget] = useState<number>(10000000); // ₹1 Crore default
  const [optResult, setOptResult] = useState<OptimizationResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const runOptimization = async (targetBudget: number) => {
    setLoading(true);
    try {
      const res = await api.optimizeInvestments(targetBudget);
      setOptResult(res);
    } catch (err) {
      console.error("Optimization error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runOptimization(budget);
  }, []);

  return (
    <RoleNotice
      moduleName="Investment Optimizer"
      recommendedRole="Executive"
      reason="Cybersecurity capital budget allocation (₹1.00 Cr) and 0/1 Knapsack portfolio selection are governed by executive leadership (CISO, CFO, and Executive Board). Operational SecOps teams view approved remediations in read-only mode."
    >
      <div className="space-y-4 max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-lg font-bold tracking-tight text-slate-900">Cybersecurity Investment Optimizer</h1>
            <Badge variant="info">Constrained Mathematical Optimization</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Solves multi-constraint knapsack allocation to maximize financial risk reduction under fixed budget limits.
          </p>
        </div>

        <div className="text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded border border-slate-200 font-mono">
          Objective: <strong>Maximize Risk Reduction s.t. Spend ≤ Budget</strong>
        </div>
      </div>

      {/* BUDGET SLIDER & NUMERIC INPUT PANEL */}
      <div className="bg-white border border-slate-200/90 rounded-lg p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Approved Cybersecurity Budget Allocation
              </label>
              <span className="text-base font-bold font-mono text-blue-700">
                {formatINR(budget)} <span className="text-xs font-normal text-slate-500">({formatINRFull(budget)})</span>
              </span>
            </div>

            <input
              type="range"
              min={2000000}
              max={20000000}
              step={500000}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>₹20 Lakhs</span>
              <span>₹1.00 Crore (Standard)</span>
              <span>₹2.00 Crores</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => runOptimization(budget)}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-xs transition flex items-center space-x-2 disabled:opacity-50"
            >
              <Target className="w-4 h-4" />
              <span>{loading ? "Optimizing Portfolio..." : "Optimize Investment"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* OPTIMIZATION RESULTS SUMMARY */}
      {optResult && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <MetricCard
              label="Selected Spend"
              value={formatINR(optResult.total_spend)}
              delta={`Within ${formatINR(optResult.budget)}`}
              deltaType="positive"
              subtext="Total capital outlay"
            />
            <MetricCard
              label="Estimated Risk Reduction"
              value={formatINR(optResult.estimated_risk_reduction)}
              delta="Gross Mitigated Liability"
              deltaType="positive"
              subtext="Expected risk avoided"
            />
            <MetricCard
              label="Post-Mitigation Exposure"
              value={formatINR(optResult.post_mitigation_exposure)}
              delta="Remaining Residual"
              deltaType="neutral"
              subtext="Residual enterprise liability"
            />
            <MetricCard
              label="Calculated ROSI"
              value={`${optResult.rosi_percentage}%`}
              delta="Return on Investment"
              deltaType="positive"
              subtext="(Reduction - Cost) / Cost"
            />
            <MetricCard
              label="Portfolio Status"
              value={`${optResult.selected_initiatives.length} Initiatives`}
              delta="Selected by Solver"
              deltaType="positive"
              subtext="Budget efficiency locked"
            />
          </div>

          {/* SPEND VS RISK CURVE */}
          <div>
            <SpendVsRiskCurve
              currentSpend={optResult.total_spend}
              recommendedMin={optResult.recommended_spend_zone_min}
              recommendedMax={optResult.recommended_spend_zone_max}
            />
          </div>

          {/* RECOMMENDED PORTFOLIO TABLE */}
          <div className="bg-white border border-slate-200/90 rounded-lg shadow-xs overflow-hidden">
            <div className="p-3.5 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-xs font-bold text-slate-800 tracking-tight flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Recommended Portfolio Initiatives</span>
                </h2>
                <p className="text-[11px] text-slate-500">
                  Mathematically selected initiatives delivering the highest risk reduction within budget
                </p>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                Optimal Budget Efficiency
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-semibold tracking-wider">
                  <tr>
                    <th className="py-2.5 px-3.5">Security Initiative</th>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3 text-right">Cost</th>
                    <th className="py-2.5 px-3 text-right">Est. Risk Reduction</th>
                    <th className="py-2.5 px-3 text-right">ROSI</th>
                    <th className="py-2.5 px-3 text-center">Implementation</th>
                    <th className="py-2.5 px-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {optResult.selected_initiatives.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/70">
                      <td className="py-2.5 px-3.5 font-semibold text-slate-900">
                        {item.name}
                        {item.dependency && (
                          <div className="text-[10px] font-normal text-slate-400 font-mono">
                            Requires: {item.dependency}
                          </div>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-slate-600">{item.category}</td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-900 font-bold">
                        {formatINR(item.cost)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums font-bold text-emerald-700">
                        {formatINR(item.estimated_risk_reduction)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums font-bold text-blue-700">
                        {item.rosi_percentage}%
                      </td>
                      <td className="py-2.5 px-3 text-center text-slate-600 font-mono">
                        {item.implementation_days} days
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <Badge variant="success">Recommended</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* UNSELECTED / DEFERRED INITIATIVES */}
          {optResult.unselected_initiatives.length > 0 && (
            <div className="bg-white border border-slate-200/90 rounded-lg shadow-xs overflow-hidden opacity-85">
              <div className="p-3.5 border-b border-slate-200">
                <h2 className="text-xs font-bold text-slate-700 tracking-tight">Deferred Initiatives (Exceeds Current Budget)</h2>
                <p className="text-[11px] text-slate-500">Candidate controls deferred due to lower marginal return per rupee</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-semibold tracking-wider">
                    <tr>
                      <th className="py-2 px-3.5">Initiative</th>
                      <th className="py-2 px-3">Category</th>
                      <th className="py-2 px-3 text-right">Cost</th>
                      <th className="py-2 px-3 text-right">Est. Reduction</th>
                      <th className="py-2 px-3 text-right">ROSI</th>
                      <th className="py-2 px-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {optResult.unselected_initiatives.map((item) => (
                      <tr key={item.id} className="text-slate-500">
                        <td className="py-2 px-3.5 font-medium">{item.name}</td>
                        <td className="py-2 px-3">{item.category}</td>
                        <td className="py-2 px-3 text-right font-mono">{formatINR(item.cost)}</td>
                        <td className="py-2 px-3 text-right font-mono">{formatINR(item.estimated_risk_reduction)}</td>
                        <td className="py-2 px-3 text-right font-mono">{item.rosi_percentage}%</td>
                        <td className="py-2 px-3 text-center">
                          <Badge variant="neutral">Deferred</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
      </div>
    </RoleNotice>
  );
}
