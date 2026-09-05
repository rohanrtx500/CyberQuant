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

const API_BASE = "/api";

async function fetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {})
    }
  });
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`);
  }
  return res.json();
}

export const api = {
  getDashboardSummary: async () => {
    return fetchJSON<{
      kpi: KPISummary;
      risk_distribution: RiskDistribution;
      top_contributors: TopRiskContributor[];
      opportunities: RiskReductionOpportunity[];
    }>(`${API_BASE}/dashboard/summary`);
  },

  getRiskTrend: async (days: number = 30) => {
    return fetchJSON<FinancialTrendPoint[]>(`${API_BASE}/risk/trend?days=${days}`);
  },

  getAssets: async (params?: { business_unit?: string; criticality?: string; internet_exposed?: boolean; search?: string }) => {
    const q = new URLSearchParams();
    if (params?.business_unit && params.business_unit !== "All") q.set("business_unit", params.business_unit);
    if (params?.criticality && params.criticality !== "All") q.set("criticality", params.criticality);
    if (params?.internet_exposed !== undefined) q.set("internet_exposed", String(params.internet_exposed));
    if (params?.search) q.set("search", params.search);
    const queryString = q.toString() ? `?${q.toString()}` : "";
    return fetchJSON<AssetDetail[]>(`${API_BASE}/assets${queryString}`);
  },

  getAssetById: async (id: string) => {
    return fetchJSON<AssetDetail>(`${API_BASE}/assets/${id}`);
  },

  getVulnerabilities: async (onlyFinanciallyMaterial: boolean = false) => {
    return fetchJSON<VulnerabilityItem[]>(`${API_BASE}/vulnerabilities?only_financially_material=${onlyFinanciallyMaterial}`);
  },

  getAssetRiskAnalysis: async (assetId: string) => {
    return fetchJSON<AssetRiskAnalysis>(`${API_BASE}/risk/${assetId}`);
  },

  simulateScenario: async (req: SimulationRequest) => {
    return fetchJSON<SimulationResponse>(`${API_BASE}/simulate`, {
      method: "POST",
      body: JSON.stringify(req)
    });
  },

  optimizeInvestments: async (budget: number) => {
    return fetchJSON<OptimizationResponse>(`${API_BASE}/optimize`, {
      method: "POST",
      body: JSON.stringify({ budget })
    });
  },

  getInitiatives: async () => {
    return fetchJSON<SecurityInitiative[]>(`${API_BASE}/optimizer/initiatives`);
  },

  queryCopilot: async (query: string) => {
    return fetchJSON<CopilotQueryResponse>(`${API_BASE}/copilot/query`, {
      method: "POST",
      body: JSON.stringify({ query })
    });
  },

  getComplianceItems: async (framework: string = "All") => {
    return fetchJSON<ComplianceItem[]>(`${API_BASE}/compliance/items?framework=${encodeURIComponent(framework)}`);
  },

  getCompliancePosture: async () => {
    return fetchJSON<CompliancePostureSummary[]>(`${API_BASE}/compliance/posture`);
  },

  getReports: async () => {
    return fetchJSON<ReportCard[]>(`${API_BASE}/reports`);
  },

  previewReport: async (id: string) => {
    return fetchJSON<{ report: ReportCard; raw_text: string }>(`${API_BASE}/reports/${id}/preview`);
  }
};
