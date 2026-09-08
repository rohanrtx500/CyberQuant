export interface KPISummary {
  total_financial_exposure: number;
  expected_annual_loss: number;
  value_at_risk_95: number;
  enterprise_risk_score: number;
  risk_change_percentage: number;
  active_critical_cves: number;
  kev_listed_cves: number;
  organization_name: string;
  last_telemetry_sync: string;
}

export interface FinancialTrendPoint {
  date: string;
  exposure: number;
  eal: number;
  tolerance_threshold: number;
}

export interface RiskDistribution {
  critical_percent: number;
  high_percent: number;
  medium_percent: number;
  low_percent: number;
}

export interface TopRiskContributor {
  asset_id: string;
  asset_name: string;
  business_unit: string;
  primary_risk_driver: string;
  incident_likelihood: number;
  expected_loss: number;
  risk_trend: string;
  status: string;
}

export interface RiskReductionOpportunity {
  id: string;
  action_title: string;
  category: string;
  estimated_cost: number;
  estimated_risk_reduction: number;
  priority: string;
  rosi_percentage: number;
  applicable_asset: string;
}

export interface AssetDetail {
  id: string;
  name: string;
  type: string;
  business_unit: string;
  criticality: string;
  internet_exposed: boolean;
  downtime_cost_per_hour: number;
  control_effectiveness: number;
  risk_score: number;
  financial_exposure: number;
  expected_annual_loss: number;
  incident_likelihood: number;
  var_95: number;
  status: string;
  vulnerabilities_count: number;
  controls_active: string[];
  recent_incidents: string[];
}

export interface VulnerabilityItem {
  id: string;
  cve_id: string;
  cvss: number;
  kev_status: boolean;
  exploit_available: boolean;
  affected_asset_id: string;
  affected_asset_name: string;
  asset_criticality: string;
  patch_age_days: number;
  incident_likelihood: number;
  expected_loss: number;
  priority: string;
  financially_material: boolean;
  summary: string;
}

export interface FeatureAttribution {
  feature_name: string;
  contribution_percentage: number;
  impact_direction: "increases_risk" | "mitigates_risk";
  description: string;
}

export interface AssetRiskAnalysis {
  asset_id: string;
  asset_name: string;
  asset_criticality: string;
  incident_likelihood: number;
  control_effectiveness: number;
  financial_impact: number;
  expected_annual_loss: number;
  var_95: number;
  downtime_loss: number;
  breach_response_loss: number;
  regulatory_penalties: number;
  data_recovery_loss: number;
  risk_drivers: FeatureAttribution[];
  formula_explanation: string;
}

export interface SimulationRequest {
  mfa_privileged: boolean;
  patch_critical: boolean;
  edr_coverage_percent: number;
  network_segmentation: boolean;
  backup_resilience: boolean;
  delay_remediation_days: number;
}

export interface SimulationResponse {
  baseline_exposure: number;
  projected_exposure: number;
  baseline_eal: number;
  projected_eal: number;
  risk_reduction: number;
  reduction_percentage: number;
  most_influential_change: string;
  deltas_by_asset: {
    asset_id: string;
    asset_name: string;
    baseline_loss: number;
    projected_loss: number;
    reduction_percentage: number;
  }[];
}

export interface SecurityInitiative {
  id: string;
  name: string;
  cost: number;
  estimated_risk_reduction: number;
  implementation_days: number;
  dependency?: string | null;
  rosi_percentage: number;
  category: string;
}

export interface OptimizationResponse {
  selected_initiatives: SecurityInitiative[];
  unselected_initiatives: SecurityInitiative[];
  total_spend: number;
  budget: number;
  estimated_risk_reduction: number;
  post_mitigation_exposure: number;
  rosi_percentage: number;
  spend_curve: {
    spend: number;
    risk_reduction: number;
    remaining_exposure: number;
  }[];
  recommended_spend_zone_min: number;
  recommended_spend_zone_max: number;
}

export interface CopilotQueryResponse {
  query: string;
  short_answer: string;
  financial_impact: string;
  top_drivers: string[];
  recommended_action: string;
  source_tags: string[];
}

export interface ComplianceItem {
  id: string;
  framework: string;
  requirement_id: string;
  requirement_name: string;
  control_finding: string;
  status: "Compliant" | "Partial" | "Gap";
  evidence: string;
  gap_description?: string | null;
  recommended_action: string;
  residual_exposure: number;
}

export interface CompliancePostureSummary {
  framework: string;
  total_controls: number;
  compliant_count: number;
  partial_count: number;
  gap_count: number;
  compliance_score: number;
}

export interface ReportCard {
  id: string;
  title: string;
  category: string;
  generated_at: string;
  summary: string;
  key_metrics: Record<string, string>;
  file_size: string;
}
