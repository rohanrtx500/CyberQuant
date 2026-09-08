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
  FALLBACK_REPORTS
} from "./fallbackData";

const API_BASE = "/api";

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
    const fallbackSim: SimulationResponse = {
      scenario_id: "sim-fallback",
      baseline_exposure: 84200000.0,
      simulated_exposure: 51200000.0,
      risk_reduction_amount: 33000000.0,
      risk_reduction_percentage: 39.2,
      applied_controls: ["MFA Enforced", "Critical Patching applied", "EDR expanded"],
      simulation_breakdown: {
        downtime_loss: 24000000.0,
        breach_response_cost: 14000000.0,
        regulatory_fines: 9000000.0,
        reputational_data_recovery: 4200000.0
      }
    };
    return fetchJSON<SimulationResponse>(`${API_BASE}/simulate`, {
      method: "POST",
      body: JSON.stringify(req)
    }, fallbackSim);
  },

  optimizeInvestments: async (budget: number) => {
    return fetchJSON<OptimizationResponse>(`${API_BASE}/optimize`, {
      method: "POST",
      body: JSON.stringify({ budget })
    }, FALLBACK_OPTIMIZATION);
  },

  getInitiatives: async () => {
    return fetchJSON<SecurityInitiative[]>(`${API_BASE}/optimizer/initiatives`, undefined, FALLBACK_OPTIMIZATION.recommended_portfolio);
  },

  queryCopilot: async (query: string) => {
    const fallbackCopilot: CopilotQueryResponse = {
      query,
      answer: `Based on current Aegis FinServe telemetry, total financial risk exposure stands at ₹8.42 Crores across 18 production systems. The highest financial exposure resides on the Payment Gateway Server (₹2.40 Cr) due to active CISA KEV weaponized vulnerabilities (CVE-2024-38077). Recommended immediate action: Execute ₹96 Lakhs knapsack-optimized portfolio to mitigate ₹4.60 Cr in risk (379% ROSI).`,
      sources: ["telemetry_engine", "monte_carlo_loss_model", "knapsack_optimizer"],
      suggested_next_questions: [
        "What is our 95% Value at Risk (VaR)?",
        "How much risk can we eliminate under ₹50 Lakhs budget?",
        "What are our active RBI compliance gaps?"
      ]
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
