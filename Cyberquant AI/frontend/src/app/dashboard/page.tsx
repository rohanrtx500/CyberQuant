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
import { DollarSign, ShieldAlert, BarChart3, AlertTriangle, ShieldCheck } from "@/components/icons";

export default function DashboardPage() {
  const [kpi, setKpi] = useState<KPISummary | null>(null);
  const [distribution, setDistribution] = useState<RiskDistribution | null>(null);
  const [contributors, setContributors] = useState<TopRiskContributor[]>([]);
  const [opportunities, setOpportunities] = useState<RiskReductionOpportunity[]>([]);
  const [trendData, setTrendData] = useState<FinancialTrendPoint[]>([]);
  const [trendDays, setTrendDays] = useState<number>(30);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      try {
        const summary = await api.getDashboardSummary();
        setKpi(summary.kpi);
        setDistribution(summary.risk_distribution);
        setContributors(summary.top_contributors);
        setOpportunities(summary.opportunities);

        const trend = await api.getRiskTrend(trendDays);
        setTrendData(trend);
      } catch (err) {
        console.error("Dashboard data load error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [trendDays]);

  if (loading || !kpi || !distribution) {
    return (
      <div className="space-y-4">
        <div className="h-6 w-64 bg-slate-200 animate-pulse rounded" />
        <div className="grid grid-cols-5 gap-3.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-24 bg-slate-200 animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-8">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Enterprise Cyber Risk Posture</h1>
          <p className="text-xs text-slate-500">
            Continuous quantification translating technical threat signals into INR financial exposure.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>Active Asset Scope: <strong className="text-slate-900 font-mono">18 Production Systems</strong></span>
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
