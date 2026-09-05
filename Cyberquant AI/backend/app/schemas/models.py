from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class KPISummary(BaseModel):
    total_financial_exposure: float = Field(..., description="Total monetary risk exposure in INR")
    expected_annual_loss: float = Field(..., description="Expected Annual Loss (EAL) in INR")
    value_at_risk_95: float = Field(..., description="Value at Risk (95% confidence) in INR")
    enterprise_risk_score: int = Field(..., description="Risk score out of 100")
    risk_change_percentage: float = Field(..., description="Percentage change in last 30 days")
    active_critical_cves: int
    kev_listed_cves: int
    organization_name: str = "Aegis FinServe Ltd."
    last_telemetry_sync: str = "4 mins ago"

class FinancialTrendPoint(BaseModel):
    date: str
    exposure: float
    eal: float
    tolerance_threshold: float

class RiskDistribution(BaseModel):
    critical_percent: float
    high_percent: float
    medium_percent: float
    low_percent: float

class TopRiskContributor(BaseModel):
    asset_id: str
    asset_name: str
    business_unit: str
    primary_risk_driver: str
    incident_likelihood: float
    expected_loss: float
    risk_trend: str
    status: str

class RiskReductionOpportunity(BaseModel):
    id: str
    action_title: str
    category: str
    estimated_cost: float
    estimated_risk_reduction: float
    priority: str
    rosi_percentage: float
    applicable_asset: str

class AssetDetail(BaseModel):
    id: str
    name: str
    type: str
    business_unit: str
    criticality: str
    internet_exposed: bool
    downtime_cost_per_hour: float
    control_effectiveness: float
    risk_score: int
    financial_exposure: float
    expected_annual_loss: float
    incident_likelihood: float
    var_95: float
    status: str
    vulnerabilities_count: int
    controls_active: List[str]
    recent_incidents: List[str]

class VulnerabilityItem(BaseModel):
    id: str
    cve_id: str
    cvss: float
    kev_status: bool
    exploit_available: bool
    affected_asset_id: str
    affected_asset_name: str
    asset_criticality: str
    patch_age_days: int
    incident_likelihood: float
    expected_loss: float
    priority: str
    financially_material: bool
    summary: str

class FeatureAttribution(BaseModel):
    feature_name: str
    contribution_percentage: float
    impact_direction: str  # "increases_risk" or "mitigates_risk"
    description: str

class AssetRiskAnalysis(BaseModel):
    asset_id: str
    asset_name: str
    asset_criticality: str
    incident_likelihood: float
    control_effectiveness: float
    financial_impact: float
    expected_annual_loss: float
    var_95: float
    downtime_loss: float
    breach_response_loss: float
    regulatory_penalties: float
    data_recovery_loss: float
    risk_drivers: List[FeatureAttribution]
    formula_explanation: str

class SimulationRequest(BaseModel):
    mfa_privileged: bool = False
    patch_critical: bool = False
    edr_coverage_percent: int = 74
    network_segmentation: bool = False
    backup_resilience: bool = False
    delay_remediation_days: int = 0

class SimulationResponse(BaseModel):
    baseline_exposure: float
    projected_exposure: float
    baseline_eal: float
    projected_eal: float
    risk_reduction: float
    reduction_percentage: float
    most_influential_change: str
    deltas_by_asset: List[Dict[str, Any]]

class SecurityInitiative(BaseModel):
    id: str
    name: str
    cost: float
    estimated_risk_reduction: float
    implementation_days: int
    dependency: Optional[str] = None
    rosi_percentage: float
    category: str

class OptimizationRequest(BaseModel):
    budget: float = 10000000.0  # Default ₹1 Cr

class OptimizationResponse(BaseModel):
    selected_initiatives: List[SecurityInitiative]
    unselected_initiatives: List[SecurityInitiative]
    total_spend: float
    budget: float
    estimated_risk_reduction: float
    post_mitigation_exposure: float
    rosi_percentage: float
    spend_curve: List[Dict[str, float]]
    recommended_spend_zone_min: float
    recommended_spend_zone_max: float

class CopilotQueryRequest(BaseModel):
    query: str

class CopilotQueryResponse(BaseModel):
    query: str
    short_answer: str
    financial_impact: str
    top_drivers: List[str]
    recommended_action: str
    source_tags: List[str]

class ComplianceItem(BaseModel):
    id: str
    framework: str
    requirement_id: str
    requirement_name: str
    control_finding: str
    status: str  # "Compliant", "Partial", "Gap"
    evidence: str
    gap_description: Optional[str] = None
    recommended_action: str
    residual_exposure: float

class CompliancePostureSummary(BaseModel):
    framework: str
    total_controls: int
    compliant_count: int
    partial_count: int
    gap_count: int
    compliance_score: float

class ReportCard(BaseModel):
    id: str
    title: str
    category: str
    generated_at: str
    summary: str
    key_metrics: Dict[str, str]
    file_size: str
