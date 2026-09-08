import {
  KPISummary,
  FinancialTrendPoint,
  RiskDistribution,
  TopRiskContributor,
  RiskReductionOpportunity,
  AssetDetail,
  VulnerabilityItem,
  AssetRiskAnalysis,
  SimulationRequest,
  SimulationResponse,
  OptimizationResponse,
  CopilotQueryResponse,
  ComplianceItem,
  CompliancePostureSummary,
  ReportCard,
  SecurityInitiative
} from "./types";

import {
  FALLBACK_KPI,
  FALLBACK_DISTRIBUTION,
  FALLBACK_CONTRIBUTORS,
  FALLBACK_OPPORTUNITIES,
  FALLBACK_TREND,
  FALLBACK_ASSETS,
  FALLBACK_VULNERABILITIES,
  FALLBACK_RISK_ANALYSIS,
  FALLBACK_OPTIMIZATION,
  FALLBACK_COMPLIANCE_ITEMS,
  FALLBACK_COMPLIANCE_POSTURE,
  FALLBACK_SIMULATION,
  FALLBACK_REPORTS
} from "./fallbackData";

const API_BASE = "/api";

export function computeDynamicSimulation(req: SimulationRequest): SimulationResponse {
  const baseline_exposure = 84200000.0;
  const baseline_eal = 31700000.0;

  let exposureReduction = 0;
  let ealReduction = 0;

  if (req.mfa_privileged) {
    exposureReduction += 14000000.0;
    ealReduction += 5200000.0;
  }
  if (req.patch_critical) {
    exposureReduction += 16500000.0;
    ealReduction += 6800000.0;
  }
  if (req.edr_coverage_percent > 74) {
    const edrDiff = req.edr_coverage_percent - 74;
    exposureReduction += edrDiff * 250000.0;
    ealReduction += edrDiff * 90000.0;
  }
  if (req.network_segmentation) {
    exposureReduction += 11000000.0;
    ealReduction += 4100000.0;
  }
  if (req.backup_resilience) {
    exposureReduction += 7500000.0;
    ealReduction += 2800000.0;
  }

  // Delay penalty
  const delayPenalty = (req.delay_remediation_days || 0) * 600000.0;
  const delayEalPenalty = (req.delay_remediation_days || 0) * 220000.0;

  const netReduction = Math.max(0, exposureReduction - delayPenalty);
  const netEalReduction = Math.max(0, ealReduction - delayEalPenalty);

  const projected_exposure = Math.max(12000000.0, baseline_exposure - netReduction);
  const projected_eal = Math.max(4500000.0, baseline_eal - netEalReduction);
  const risk_reduction = baseline_exposure - projected_exposure;
  const reduction_percentage = Number(((risk_reduction / baseline_exposure) * 100).toFixed(1));

  let most_influential_change = "Baseline Status Quo (No intervention active)";
  if (req.patch_critical) {
    most_influential_change = "Emergency Critical Patching (-₹1.65 Cr risk)";
  } else if (req.mfa_privileged) {
    most_influential_change = "Privileged MFA Enforcement (-₹1.40 Cr risk)";
  } else if (req.network_segmentation) {
    most_influential_change = "Payment Network Micro-segmentation (-₹1.10 Cr risk)";
  } else if (req.backup_resilience) {
    most_influential_change = "Air-Gapped Immutable Backup Vault (-₹75.0 Lakhs risk)";
  } else if (req.edr_coverage_percent > 74) {
    most_influential_change = `EDR Expansion to ${req.edr_coverage_percent}% (-₹${((req.edr_coverage_percent - 74) * 0.025).toFixed(2)} Cr risk)`;
  } else if (req.delay_remediation_days > 0) {
    most_influential_change = `SLA Delay Penalty (+₹${(req.delay_remediation_days * 0.06).toFixed(2)} Cr added liability)`;
  }

  const asset1Baseline = 9200000.0;
  const asset1Projected = Math.max(1800000.0, asset1Baseline - (req.patch_critical ? 4200000 : 0) - (req.mfa_privileged ? 2100000 : 0));

  const asset2Baseline = 6800000.0;
  const asset2Projected = Math.max(1400000.0, asset2Baseline - (req.mfa_privileged ? 2900000 : 0) - (req.backup_resilience ? 1500000 : 0));

  const asset3Baseline = 5400000.0;
  const asset3Projected = Math.max(1100000.0, asset3Baseline - (req.mfa_privileged ? 3100000 : 0) - (req.network_segmentation ? 1200000 : 0));

  return {
    baseline_exposure,
    projected_exposure,
    baseline_eal,
    projected_eal,
    risk_reduction,
    reduction_percentage,
    most_influential_change,
    deltas_by_asset: [
      {
        asset_id: "asset-01",
        asset_name: "Payment Gateway Server",
        baseline_loss: asset1Baseline,
        projected_loss: asset1Projected,
        reduction_percentage: Number((((asset1Baseline - asset1Projected) / asset1Baseline) * 100).toFixed(1))
      },
      {
        asset_id: "asset-02",
        asset_name: "Customer Core Database",
        baseline_loss: asset2Baseline,
        projected_loss: asset2Projected,
        reduction_percentage: Number((((asset2Baseline - asset2Projected) / asset2Baseline) * 100).toFixed(1))
      },
      {
        asset_id: "asset-03",
        asset_name: "IAM Privileged Directory",
        baseline_loss: asset3Baseline,
        projected_loss: asset3Projected,
        reduction_percentage: Number((((asset3Baseline - asset3Projected) / asset3Baseline) * 100).toFixed(1))
      }
    ]
  };
}

const ALL_INITIATIVES: SecurityInitiative[] = [
  {
    id: "init-02",
    name: "Emergency Critical CVE Patching Program",
    cost: 800000.0,
    estimated_risk_reduction: 16500000.0,
    rosi_percentage: 1962.0,
    implementation_days: 7,
    category: "Vulnerability Management"
  },
  {
    id: "init-01",
    name: "Enterprise MFA Enforcement for Privileged Accounts",
    cost: 1200000.0,
    estimated_risk_reduction: 14000000.0,
    rosi_percentage: 1066.0,
    implementation_days: 14,
    category: "Identity & Access"
  },
  {
    id: "init-04",
    name: "Micro-segmentation for Payment & Core Banking Network",
    cost: 3100000.0,
    estimated_risk_reduction: 11000000.0,
    rosi_percentage: 254.0,
    implementation_days: 45,
    category: "Network Architecture"
  },
  {
    id: "init-05",
    name: "Air-Gapped Immutable Backup Vault",
    cost: 2500000.0,
    estimated_risk_reduction: 7500000.0,
    rosi_percentage: 200.0,
    implementation_days: 30,
    category: "Data Protection"
  },
  {
    id: "init-03",
    name: "Cloud Native WAF & Bot Mitigation Suite",
    cost: 1800000.0,
    estimated_risk_reduction: 6500000.0,
    rosi_percentage: 261.0,
    implementation_days: 21,
    category: "Cloud Security"
  },
  {
    id: "init-06",
    name: "Automated EDR Patch Orchestration",
    cost: 1500000.0,
    estimated_risk_reduction: 5500000.0,
    rosi_percentage: 266.0,
    implementation_days: 14,
    category: "Endpoint Security"
  },
  {
    id: "init-07",
    name: "Zero Trust IAM Step-Up Enforcement",
    cost: 2200000.0,
    estimated_risk_reduction: 7000000.0,
    rosi_percentage: 218.0,
    implementation_days: 28,
    category: "Identity & Access"
  }
];

export function computeDynamicOptimization(targetBudget: number): OptimizationResponse {
  const sorted = [...ALL_INITIATIVES].sort((a, b) => b.rosi_percentage - a.rosi_percentage);

  let currentSpend = 0;
  let totalRiskReduction = 0;
  const selected: SecurityInitiative[] = [];
  const unselected: SecurityInitiative[] = [];

  for (const init of sorted) {
    if (currentSpend + init.cost <= targetBudget) {
      currentSpend += init.cost;
      totalRiskReduction += init.estimated_risk_reduction;
      selected.push(init);
    } else {
      unselected.push(init);
    }
  }

  const baseline_exposure = 84200000.0;
  const post_mitigation_exposure = Math.max(10000000.0, baseline_exposure - totalRiskReduction);
  const rosi_percentage = currentSpend > 0 ? Math.round(((totalRiskReduction - currentSpend) / currentSpend) * 100) : 0;

  return {
    budget: targetBudget,
    total_spend: currentSpend,
    estimated_risk_reduction: totalRiskReduction,
    post_mitigation_exposure,
    rosi_percentage,
    recommended_spend_zone_min: 8000000.0,
    recommended_spend_zone_max: 12000000.0,
    spend_curve: [
      { spend: 2000000.0, risk_reduction: 16500000.0, remaining_exposure: 67700000.0 },
      { spend: 5000000.0, risk_reduction: 30500000.0, remaining_exposure: 53700000.0 },
      { spend: currentSpend, risk_reduction: totalRiskReduction, remaining_exposure: post_mitigation_exposure },
      { spend: 20000000.0, risk_reduction: 57500000.0, remaining_exposure: 26700000.0 }
    ],
    selected_initiatives: selected,
    unselected_initiatives: unselected
  };
}

async function fetchJSON<T>(url: string, options?: RequestInit, fallback?: T): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 2000);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {})
      }
    });
    clearTimeout(timeoutId);
    if (!res.ok) {
      if (fallback !== undefined) return fallback;
      throw new Error(`API error ${res.status}: ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    clearTimeout(timeoutId);
    if (fallback !== undefined) {
      return fallback;
    }
    throw err;
  }
}

export const api = {
  getDashboardSummary: async () => {
    return fetchJSON<{
      kpi: KPISummary;
      risk_distribution: RiskDistribution;
      top_contributors: TopRiskContributor[];
      opportunities: RiskReductionOpportunity[];
    }>(
      `${API_BASE}/dashboard/summary`,
      undefined,
      {
        kpi: FALLBACK_KPI,
        risk_distribution: FALLBACK_DISTRIBUTION,
        top_contributors: FALLBACK_CONTRIBUTORS,
        opportunities: FALLBACK_OPPORTUNITIES
      }
    );
  },

  getRiskTrend: async (days: number = 30) => {
    return fetchJSON<FinancialTrendPoint[]>(`${API_BASE}/risk/trend?days=${days}`, undefined, FALLBACK_TREND);
  },

  getAssets: async (params?: { business_unit?: string; criticality?: string; internet_exposed?: boolean; search?: string }) => {
    const q = new URLSearchParams();
    if (params?.business_unit && params.business_unit !== "All") q.set("business_unit", params.business_unit);
    if (params?.criticality && params.criticality !== "All") q.set("criticality", params.criticality);
    if (params?.internet_exposed !== undefined) q.set("internet_exposed", String(params.internet_exposed));
    if (params?.search) q.set("search", params.search);
    const queryString = q.toString() ? `?${q.toString()}` : "";
    return fetchJSON<AssetDetail[]>(`${API_BASE}/assets${queryString}`, undefined, FALLBACK_ASSETS);
  },

  getAssetById: async (id: string) => {
    const found = FALLBACK_ASSETS.find((a) => a.id === id) || FALLBACK_ASSETS[0];
    return fetchJSON<AssetDetail>(`${API_BASE}/assets/${id}`, undefined, found);
  },

  getVulnerabilities: async (onlyFinanciallyMaterial: boolean = false) => {
    const fallback = onlyFinanciallyMaterial
      ? FALLBACK_VULNERABILITIES.filter((v) => v.financially_material)
      : FALLBACK_VULNERABILITIES;
    return fetchJSON<VulnerabilityItem[]>(
      `${API_BASE}/vulnerabilities?only_financially_material=${onlyFinanciallyMaterial}`,
      undefined,
      fallback
    );
  },

  getAssetRiskAnalysis: async (assetId: string) => {
    return fetchJSON<AssetRiskAnalysis>(`${API_BASE}/risk/${assetId}`, undefined, FALLBACK_RISK_ANALYSIS);
  },

  simulateScenario: async (req: SimulationRequest) => {
    return fetchJSON<SimulationResponse>(`${API_BASE}/simulate`, {
      method: "POST",
      body: JSON.stringify(req)
    }, computeDynamicSimulation(req));
  },

  optimizeInvestments: async (budget: number) => {
    return fetchJSON<OptimizationResponse>(`${API_BASE}/optimize`, {
      method: "POST",
      body: JSON.stringify({ budget })
    }, computeDynamicOptimization(budget));
  },

  getInitiatives: async () => {
    return fetchJSON<SecurityInitiative[]>(`${API_BASE}/optimizer/initiatives`, undefined, computeDynamicOptimization(10000000).selected_initiatives);
  },

  queryCopilot: async (query: string) => {
    const fallbackCopilot: CopilotQueryResponse = {
      query,
      short_answer: `Based on current Aegis FinServe telemetry, total financial risk exposure stands at ₹8.42 Crores across 18 production systems. The highest financial exposure resides on the Payment Gateway Server (₹2.40 Cr) due to active CISA KEV weaponized vulnerabilities (CVE-2024-38077).`,
      financial_impact: "Expected Annual Loss: ₹3.17 Cr | Value at Risk (95%): ₹5.80 Cr",
      top_drivers: [
        "Payment Gateway Server & Customer DB generate 51% of gross risk exposure",
        "4 weaponized CISA KEV vulnerabilities unpatched past SLA"
      ],
      recommended_action: "Execute ₹96 Lakhs knapsack-optimized portfolio to mitigate ₹4.60 Cr in risk (379% ROSI).",
      source_tags: ["Source: Telemetry Data Hub", "Source: CISA KEV Feed", "Source: Monte Carlo Engine"]
    };
    return fetchJSON<CopilotQueryResponse>(`${API_BASE}/copilot/query`, {
      method: "POST",
      body: JSON.stringify({ query })
    }, fallbackCopilot);
  },

  getComplianceItems: async (framework: string = "All") => {
    const fallback = framework === "All"
      ? FALLBACK_COMPLIANCE_ITEMS
      : FALLBACK_COMPLIANCE_ITEMS.filter((i) => i.framework === framework);
    return fetchJSON<ComplianceItem[]>(`${API_BASE}/compliance/items?framework=${encodeURIComponent(framework)}`, undefined, fallback);
  },

  getCompliancePosture: async () => {
    return fetchJSON<CompliancePostureSummary[]>(`${API_BASE}/compliance/posture`, undefined, FALLBACK_COMPLIANCE_POSTURE);
  },

  getReports: async () => {
    return fetchJSON<ReportCard[]>(`${API_BASE}/reports`, undefined, FALLBACK_REPORTS);
  },

  previewReport: async (id: string) => {
    const fallbackReport = {
      report: FALLBACK_REPORTS[0],
      raw_text: `================================================================================
EXECUTIVE BOARD CYBER RISK BRIEFING — AEGIS FINSERVE LTD.
Generated: 05-Sep-2026 | Classification: CONFIDENTIAL
================================================================================

1. EXECUTIVE SUMMARY
Aegis FinServe Ltd. aggregate financial cyber risk exposure is calculated at ₹8.42 Crores.
Expected Annual Loss (EAL) is estimated at ₹3.17 Crores across 18 production assets.
The 95% Value-at-Risk (VaR) tail liability limit stands at ₹5.80 Crores.

2. TOP FINANCIAL RISK DRIVERS
- Payment Gateway Server: ₹2.40 Cr exposure (CVE-2024-38077 - CISA KEV Listed)
- Customer Core Database: ₹1.85 Cr exposure (OpenSSH RCE & Lack of MFA)

3. CAPITAL OPTIMIZATION RECOMMENDATION
Approved budget allocation of ₹96 Lakhs eliminates ₹4.60 Crores in risk (379% ROSI).`
    };
    return fetchJSON<{ report: ReportCard; raw_text: string }>(`${API_BASE}/reports/${id}/preview`, undefined, fallbackReport);
  }
};
