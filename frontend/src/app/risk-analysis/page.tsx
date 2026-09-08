"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import { AssetRiskAnalysis, AssetDetail } from "@/lib/types";
import { formatINR, formatLikelihood } from "@/lib/formatters";
import { Badge } from "@/components/ui/Badge";
import { MetricCard } from "@/components/ui/MetricCard";
import { Shield, AlertOctagon, HelpCircle, Layers, ArrowUpRight, ArrowDownRight, Server } from "@/components/icons";

import { FALLBACK_RISK_ANALYSIS, FALLBACK_ASSETS } from "@/lib/fallbackData";

function RiskAnalysisContent() {
  const searchParams = useSearchParams();
  const initialAssetId = searchParams.get("asset") || "asset-01";

  const [assets, setAssets] = useState<AssetDetail[]>(FALLBACK_ASSETS);
  const [selectedAssetId, setSelectedAssetId] = useState<string>(initialAssetId);
  const [analysis, setAnalysis] = useState<AssetRiskAnalysis>(FALLBACK_RISK_ANALYSIS);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function loadAssets() {
      try {
        const assetList = await api.getAssets();
        if (assetList && assetList.length > 0) setAssets(assetList);
      } catch (err) {
        console.error("Assets sync note:", err);
      }
    }
    loadAssets();
  }, []);

  useEffect(() => {
    async function loadAnalysis() {
      try {
        const res = await api.getAssetRiskAnalysis(selectedAssetId);
        if (res) setAnalysis(res);
      } catch (err) {
        console.error("Risk analysis sync note:", err);
      }
    }
    loadAnalysis();
  }, [selectedAssetId]);

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-8">
      {/* Header & Asset Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-lg font-bold tracking-tight text-slate-900">Asset Risk Drilldown & Quantification</h1>
            <Badge variant="info">Asset-Level Decomposition</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Translates technical vulnerability telemetry into deterministic INR monetary exposure and attribution drivers.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-xs font-semibold text-slate-600">Select Asset:</label>
          <select
            value={selectedAssetId}
            onChange={(e) => setSelectedAssetId(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {assets.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name} ({a.business_unit})
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading || !analysis ? (
        <div className="h-64 bg-slate-200 animate-pulse rounded-lg" />
      ) : (
        <>
          {/* Top Asset KPI Row */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            <MetricCard
              label="Asset Criticality"
              value={analysis.asset_criticality}
              subtext="Business Impact Tier"
            />
            <MetricCard
              label="Incident Likelihood"
              value={formatLikelihood(analysis.incident_likelihood)}
              subtext="Bayesian Likelihood"
            />
            <MetricCard
              label="Control Effectiveness"
              value={`${(analysis.control_effectiveness * 100).toFixed(0)}%`}
              subtext="Defense in Depth"
            />
            <MetricCard
              label="Financial Impact"
              value={formatINR(analysis.financial_impact)}
              subtext="Gross Single-Event Loss"
            />
            <MetricCard
              label="Expected Annual Loss"
              value={formatINR(analysis.expected_annual_loss)}
              subtext="Annualized Loss Expectancy"
            />
            <MetricCard
              label="Value at Risk (95%)"
              value={formatINR(analysis.var_95)}
              subtext="95th Percentile Tail Loss"
            />
          </div>

          {/* FORMULA EXPLANATION PANEL */}
          <div className="bg-white border border-slate-200/90 rounded-lg p-4 shadow-xs">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-800 mb-1.5">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span>Financial Quantification Formula</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded p-3 text-xs font-mono text-slate-800 mb-3">
              Expected Annual Loss (EAL) = Incident Likelihood × Estimated Financial Impact
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              {analysis.formula_explanation}
            </p>

            {/* Monte Carlo Loss Component Distribution */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 pt-3 border-t border-slate-200">
              <div className="bg-slate-50 p-2.5 rounded border border-slate-200/80">
                <div className="text-[10px] uppercase font-semibold text-slate-500">Operational Downtime</div>
                <div className="text-sm font-bold font-mono text-slate-900 mt-0.5">{formatINR(analysis.downtime_loss)}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Based on hourly outage penalty</div>
              </div>
              <div className="bg-slate-50 p-2.5 rounded border border-slate-200/80">
                <div className="text-[10px] uppercase font-semibold text-slate-500">Breach Response & Forensics</div>
                <div className="text-sm font-bold font-mono text-slate-900 mt-0.5">{formatINR(analysis.breach_response_loss)}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">IR retainers, legal & crisis comms</div>
              </div>
              <div className="bg-slate-50 p-2.5 rounded border border-slate-200/80">
                <div className="text-[10px] uppercase font-semibold text-slate-500">Regulatory Penalties</div>
                <div className="text-sm font-bold font-mono text-slate-900 mt-0.5">{formatINR(analysis.regulatory_penalties)}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">DPDP Act & RBI statutory fines</div>
              </div>
              <div className="bg-slate-50 p-2.5 rounded border border-slate-200/80">
                <div className="text-[10px] uppercase font-semibold text-slate-500">Data Recovery & Validation</div>
                <div className="text-sm font-bold font-mono text-slate-900 mt-0.5">{formatINR(analysis.data_recovery_loss)}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Cryptographic reconciliation</div>
              </div>
            </div>
          </div>

          {/* RISK DRIVER BREAKDOWN (FEATURE ATTRIBUTION) */}
          <div className="bg-white border border-slate-200/90 rounded-lg p-4 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-xs font-bold text-slate-800 tracking-tight flex items-center space-x-1.5">
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span>Why the Risk Engine assigned this risk (Feature Attribution)</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Statistical feature contribution decomposing total incident likelihood into positive risks and mitigating controls
                </p>
              </div>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                Attribution Sum: 100%
              </span>
            </div>

            {/* Horizontal Contribution Bars */}
            <div className="space-y-2.5 mt-4">
              {analysis.risk_drivers.map((driver, index) => {
                const isPositive = driver.impact_direction === "increases_risk";
                const absVal = Math.abs(driver.contribution_percentage);

                return (
                  <div key={index} className="p-2.5 rounded bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-slate-800 flex items-center space-x-1.5">
                        {isPositive ? (
                          <ArrowUpRight className="w-3.5 h-3.5 text-rose-600" />
                        ) : (
                          <ArrowDownRight className="w-3.5 h-3.5 text-emerald-600" />
                        )}
                        <span>{driver.feature_name}</span>
                      </span>
                      <span
                        className={`font-mono font-bold ${
                          isPositive ? "text-rose-700" : "text-emerald-700"
                        }`}
                      >
                        {isPositive ? `+${absVal}%` : `-${absVal}%`}
                      </span>
                    </div>

                    {/* Bar visualization */}
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden mb-1">
                      <div
                        style={{ width: `${Math.min(100, absVal * 3)}%` }}
                        className={`h-full rounded-full ${
                          isPositive ? "bg-rose-500" : "bg-emerald-500"
                        }`}
                      />
                    </div>

                    <div className="text-[11px] text-slate-500">{driver.description}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function RiskAnalysisPage() {
  return (
    <Suspense fallback={<div className="h-64 bg-slate-200 animate-pulse rounded-lg" />}>
      <RiskAnalysisContent />
    </Suspense>
  );
}
