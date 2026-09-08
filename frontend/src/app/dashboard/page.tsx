"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { KPISummary, RiskDistribution, TopRiskContributor, RiskReductionOpportunity, FinancialTrendPoint } from "@/lib/types";
import { formatINR } from "@/lib/formatters";
import { MetricCard } from "@/components/ui/MetricCard";
import { FinancialTrendChart } from "@/components/charts/FinancialTrendChart";
import { RiskDistributionBar } from "@/components/charts/RiskDistributionBar";
import { TopRiskTable } from "@/components/dashboard/TopRiskTable";
import { RiskReductionList } from "@/components/dashboard/RiskReductionList";
import { SpendVsRiskCurve } from "@/components/charts/SpendVsRiskCurve";
import { DollarSign, ShieldAlert, BarChart3, AlertTriangle, ShieldCheck, Briefcase } from "@/components/icons";
import { useRole, UserRole } from "@/context/RoleContext";

import {
  FALLBACK_KPI,
  FALLBACK_DISTRIBUTION,
  FALLBACK_CONTRIBUTORS,
  FALLBACK_OPPORTUNITIES,
  FALLBACK_TREND
} from "@/lib/fallbackData";

export default function DashboardPage() {
  const { role, setRole, config } = useRole();
  const [kpi, setKpi] = useState<KPISummary>(FALLBACK_KPI);
  const [distribution, setDistribution] = useState<RiskDistribution>(FALLBACK_DISTRIBUTION);
  const [contributors, setContributors] = useState<TopRiskContributor[]>(FALLBACK_CONTRIBUTORS);
  const [opportunities, setOpportunities] = useState<RiskReductionOpportunity[]>(FALLBACK_OPPORTUNITIES);
  const [trendData, setTrendData] = useState<FinancialTrendPoint[]>(FALLBACK_TREND);
  const [trendDays, setTrendDays] = useState<number>(30);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function loadData() {
      try {
        const summary = await api.getDashboardSummary();
        if (summary?.kpi) setKpi(summary.kpi);
        if (summary?.risk_distribution) setDistribution(summary.risk_distribution);
        if (summary?.top_contributors) setContributors(summary.top_contributors);
        if (summary?.opportunities) setOpportunities(summary.opportunities);

        const trend = await api.getRiskTrend(trendDays);
        if (trend && trend.length > 0) setTrendData(trend);
      } catch (err) {
        console.error("Dashboard live sync note:", err);
      }
    }
    loadData();
  }, [trendDays]);

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-8">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Enterprise Cyber Risk Posture</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Continuous quantification translating technical threat signals into INR financial exposure.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-xs">
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Active Asset Scope: <strong className="text-slate-900 dark:text-slate-100 font-mono">18 Production Systems</strong></span>
        </div>
      </div>

      {/* DYNAMIC ROLE PERSPECTIVE SWITCHER BAR */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-xs space-y-3 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className={`w-2.5 h-2.5 rounded-full ${config.dotColor}`} />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
              Active Persona: <span className="text-blue-600 dark:text-blue-400">{config.label}</span>
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${config.badgeColor}`}>
              {config.badgeLabel}
            </span>
          </div>

          {/* Quick Role Switch Buttons */}
          <div className="flex items-center space-x-1.5 overflow-x-auto">
            <span className="text-[11px] text-slate-400 font-medium mr-1 hidden md:inline">Switch Lens:</span>
            {(["CISO", "Executive", "Risk Officer", "Security Analyst"] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`text-xs px-2.5 py-1 rounded-md font-medium transition cursor-pointer ${
                  role === r
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {r === "Executive" ? "Executive Board" : r}
              </button>
            ))}
          </div>
        </div>

        {/* Persona Perspective Explainer */}
        <div className="text-xs bg-slate-50 dark:bg-slate-800/60 rounded-lg p-2.5 border border-slate-200/80 dark:border-slate-700/60 flex items-start space-x-2">
          <span className="text-blue-600 dark:text-blue-400 font-bold shrink-0 text-[11px] uppercase tracking-wider">Lens Focus:</span>
          <div className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
            {role === "Executive" && (
              <span>
                <strong>Board & CFO Financial Lens:</strong> Presenting gross financial exposure (<span className="text-red-600 dark:text-red-400 font-bold">₹8.42 Cr</span>) and capital optimization. Proposed investment of <span className="text-emerald-600 dark:text-emerald-400 font-bold">₹96 Lakhs</span> delivers <span className="text-blue-600 dark:text-blue-400 font-bold">379% ROSI</span>, mitigating <span className="text-emerald-600 dark:text-emerald-400 font-bold">₹4.60 Cr</span> in potential balance-sheet loss. Operational CVE logs are abstracted into business unit risk.
              </span>
            )}
            {role === "Security Analyst" && (
              <span>
                <strong>SecOps Operational Lens:</strong> Highlighting immediate remediation priorities across 18 production assets. <span className="text-red-600 dark:text-red-400 font-bold">7 Critical CVEs</span> detected, with <span className="text-amber-600 dark:text-amber-400 font-bold">4 actively weaponized in CISA KEV</span> (Citrix Bleed, MOVEit SQLi). Highest priority target: <em>Payment Gateway API (Public Ingress)</em>.
              </span>
            )}
            {role === "Risk Officer" && (
              <span>
                <strong>Risk Governance Lens:</strong> Quantitative loss models calibrated via 10,000 Monte Carlo iterations. <span className="text-red-600 dark:text-red-400 font-bold">95% Value-at-Risk</span> stands at <span className="font-bold">₹5.80 Cr</span>. Active statutory audit alignment: <span className="text-blue-600 dark:text-blue-400 font-bold">RBI CSF (81%)</span>, <span className="text-indigo-600 dark:text-indigo-400 font-bold">SEBI CSCRF (74%)</span>, and <span className="text-emerald-600 dark:text-emerald-400 font-bold">ISO 27001 (84%)</span>.
              </span>
            )}
            {role === "CISO" && (
              <span>
                <strong>CISO Unified Lens:</strong> Comprehensive end-to-end command visibility spanning continuous asset telemetry, Bayesian likelihood scoring, 0/1 knapsack budget optimizer, and board-ready reports.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* TOP KPI STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <MetricCard
          label="Total Financial Exposure"
          value={formatINR(kpi.total_financial_exposure)}
          delta={`${kpi.risk_change_percentage}% in 30d`}
          deltaType="positive"
          subtext="Gross aggregate incident liability"
          icon={DollarSign}
        />
        <MetricCard
          label="Expected Annual Loss (EAL)"
          value={formatINR(kpi.expected_annual_loss)}
          delta="Likelihood × Impact"
          deltaType="neutral"
          subtext="Annualized loss expectancy"
          icon={BarChart3}
        />
        <MetricCard
          label="Value at Risk (95% VaR)"
          value={formatINR(kpi.value_at_risk_95)}
          delta="95% Confidence"
          deltaType="neutral"
          subtext="Maximum expected annual tail loss"
          icon={ShieldAlert}
        />
        <MetricCard
          label="Enterprise Risk Score"
          value={`${kpi.enterprise_risk_score} / 100`}
          delta="Amber Tier"
          deltaType="negative"
          subtext="Composite risk rating"
          icon={AlertTriangle}
        />
        <MetricCard
          label="Active Critical CVEs"
          value={`${kpi.active_critical_cves}`}
          delta={`${kpi.kev_listed_cves} KEV weaponized`}
          deltaType="negative"
          subtext="Overdue remediation backlog"
          icon={ShieldAlert}
        />
      </div>

      {/* TREND & DISTRIBUTION ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5">
        <div className="lg:col-span-2">
          <FinancialTrendChart
            data={trendData}
            selectedRange={trendDays}
            onRangeChange={(days) => setTrendDays(days)}
          />
        </div>
        <div>
          <RiskDistributionBar distribution={distribution} />
        </div>
      </div>

      {/* TOP RISK CONTRIBUTORS */}
      <div>
        <TopRiskTable contributors={contributors} />
      </div>

      {/* PRIORITIZED OPPORTUNITIES & SPEND CURVE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
        <RiskReductionList opportunities={opportunities} />
        <SpendVsRiskCurve />
      </div>
    </div>
  );
}
