import {
  KPISummary,
  RiskDistribution,
  TopRiskContributor,
  RiskReductionOpportunity,
  FinancialTrendPoint,
  AssetDetail,
  VulnerabilityItem,
  AssetRiskAnalysis,
  OptimizationResponse,
  SimulationResponse,
  ComplianceItem,
  CompliancePostureSummary,
  ReportCard,
  SecurityInitiative
} from "./types";

export const FALLBACK_KPI: KPISummary = {
  total_financial_exposure: 84200000.0,
  expected_annual_loss: 31700000.0,
  value_at_risk_95: 58000000.0,
  enterprise_risk_score: 72,
  risk_change_percentage: -12.4,
  active_critical_cves: 7,
  kev_listed_cves: 4,
  organization_name: "Aegis FinServe Ltd.",
  last_telemetry_sync: "4 mins ago"
};

export const FALLBACK_DISTRIBUTION: RiskDistribution = {
  critical_percent: 22,
  high_percent: 39,
  medium_percent: 28,
  low_percent: 11
};

export const FALLBACK_CONTRIBUTORS: TopRiskContributor[] = [
  {
    asset_id: "asset-01",
    asset_name: "Payment Gateway Server",
    business_unit: "Payments",
    primary_risk_driver: "Active KEV Weaponization (CVE-2024-38077)",
    incident_likelihood: 0.384,
    expected_loss: 9200000.0,
    risk_trend: "+4.2%",
    status: "Action Required"
  },
  {
    asset_id: "asset-02",
    asset_name: "Customer Core Database",
    business_unit: "Retail Banking",
    primary_risk_driver: "OpenSSH RCE & Lack of MFA",
    incident_likelihood: 0.367,
    expected_loss: 6800000.0,
    risk_trend: "+2.1%",
    status: "Elevated Risk"
  },
  {
    asset_id: "asset-03",
    asset_name: "IAM Privileged Directory",
    business_unit: "Corporate IT",
    primary_risk_driver: "Outlook Moniker Link RCE",
    incident_likelihood: 0.380,
    expected_loss: 5400000.0,
    risk_trend: "+1.8%",
    status: "Action Required"
  },
  {
    asset_id: "asset-04",
    asset_name: "Cloud Production Cluster",
    business_unit: "Cloud Infrastructure",
    primary_risk_driver: "PHP CGI Argument Injection",
    incident_likelihood: 0.295,
    expected_loss: 3800000.0,
    risk_trend: "-0.5%",
    status: "Monitored"
  },
  {
    asset_id: "asset-05",
    asset_name: "Core Banking API Gateway",
    business_unit: "Retail Banking",
    primary_risk_driver: "FortiOS Out-of-Bounds Write",
    incident_likelihood: 0.260,
    expected_loss: 2900000.0,
    risk_trend: "-1.2%",
    status: "Monitored"
  }
];

export const FALLBACK_OPPORTUNITIES: RiskReductionOpportunity[] = [
  {
    id: "init-02",
    action_title: "Emergency Critical CVE Patching Program",
    category: "Vulnerability Management",
    estimated_cost: 800000.0,
    estimated_risk_reduction: 16500000.0,
    priority: "Critical",
    rosi_percentage: 1962.0,
    applicable_asset: "Payment Gateway & DB"
  },
  {
    id: "init-01",
    action_title: "Enterprise MFA Enforcement for Privileged Accounts",
    category: "Identity & Access",
    estimated_cost: 1200000.0,
    estimated_risk_reduction: 14000000.0,
    priority: "Critical",
    rosi_percentage: 1066.0,
    applicable_asset: "IAM Directory"
  },
  {
    id: "init-04",
    action_title: "Micro-segmentation for Payment & Core Banking Network",
    category: "Network Architecture",
    estimated_cost: 3100000.0,
    estimated_risk_reduction: 11000000.0,
    priority: "High",
    rosi_percentage: 254.0,
    applicable_asset: "Payment Subnets"
  }
];

export const FALLBACK_TREND: FinancialTrendPoint[] = [
  { date: "08-Aug", exposure: 96000000.0, eal: 38000000.0, tolerance_threshold: 70000000.0 },
  { date: "15-Aug", exposure: 93500000.0, eal: 36200000.0, tolerance_threshold: 70000000.0 },
  { date: "22-Aug", exposure: 89000000.0, eal: 34100000.0, tolerance_threshold: 70000000.0 },
  { date: "29-Aug", exposure: 86200000.0, eal: 32800000.0, tolerance_threshold: 70000000.0 },
  { date: "05-Sep", exposure: 84200000.0, eal: 31700000.0, tolerance_threshold: 70000000.0 }
];

export const FALLBACK_ASSETS: AssetDetail[] = [
  {
    id: "asset-01",
    name: "Payment Gateway Server",
    type: "Application Server",
    business_unit: "Payments",
    criticality: "Critical",
    internet_exposed: true,
    downtime_cost_per_hour: 320000.0,
    control_effectiveness: 0.58,
    risk_score: 88,
    financial_exposure: 24000000.0,
    expected_annual_loss: 9200000.0,
    incident_likelihood: 0.384,
    var_95: 18500000.0,
    status: "Action Required",
    vulnerabilities_count: 5,
    controls_active: ["WAF", "TLS 1.3", "Rate Limiting", "Basic EDR"],
    recent_incidents: ["Brute-force credential stuffing spike on 28-Aug", "WAF SQLi bypass attempt blocked on 01-Sep"]
  },
  {
    id: "asset-02",
    name: "Customer Core Database",
    type: "Database Cluster",
    business_unit: "Retail Banking",
    criticality: "Critical",
    internet_exposed: false,
    downtime_cost_per_hour: 450000.0,
    control_effectiveness: 0.72,
    risk_score: 81,
    financial_exposure: 18500000.0,
    expected_annual_loss: 6800000.0,
    incident_likelihood: 0.367,
    var_95: 14200000.0,
    status: "Elevated Risk",
    vulnerabilities_count: 3,
    controls_active: ["Database Activity Monitoring", "TDE Encryption", "Privileged Bastion"],
    recent_incidents: ["Unusual query volume alert from service account on 24-Aug"]
  },
  {
    id: "asset-03",
    name: "IAM Privileged Directory",
    type: "Identity Provider",
    business_unit: "Corporate IT",
    criticality: "Critical",
    internet_exposed: false,
    downtime_cost_per_hour: 280000.0,
    control_effectiveness: 0.61,
    risk_score: 79,
    financial_exposure: 14200000.0,
    expected_annual_loss: 5400000.0,
    incident_likelihood: 0.380,
    var_95: 11000000.0,
    status: "Action Required",
    vulnerabilities_count: 4,
    controls_active: ["Kerberos Pre-auth", "Tiered Admin Model", "Audit Logging"],
    recent_incidents: ["3 non-MFA privileged logins flagged from internal subnet on 30-Aug"]
  }
];

export const FALLBACK_VULNERABILITIES: VulnerabilityItem[] = [
  {
    id: "vuln-01",
    cve_id: "CVE-2024-38077",
    cvss: 9.8,
    kev_status: true,
    exploit_available: true,
    affected_asset_id: "asset-01",
    affected_asset_name: "Payment Gateway Server",
    asset_criticality: "Critical",
    patch_age_days: 68,
    incident_likelihood: 0.384,
    expected_loss: 9200000.0,
    priority: "Critical",
    financially_material: true,
    summary: "Remote Code Execution vulnerability in Windows Remote Access Connection Manager allowing unauthenticated RCE over RPC."
  },
  {
    id: "vuln-02",
    cve_id: "CVE-2024-21413",
    cvss: 9.8,
    kev_status: true,
    exploit_available: true,
    affected_asset_id: "asset-03",
    affected_asset_name: "IAM Privileged Directory",
    asset_criticality: "Critical",
    patch_age_days: 82,
    incident_likelihood: 0.380,
    expected_loss: 5400000.0,
    priority: "Critical",
    financially_material: true,
    summary: "Microsoft Outlook / Exchange Moniker Link RCE flaw actively weaponized in credential harvesting campaigns."
  }
];

export const FALLBACK_RISK_ANALYSIS: AssetRiskAnalysis = {
  asset_id: "asset-01",
  asset_name: "Payment Gateway Server",
  asset_criticality: "Critical",
  incident_likelihood: 0.384,
  control_effectiveness: 0.58,
  financial_impact: 24000000.0,
  expected_annual_loss: 9200000.0,
  var_95: 18500000.0,
  downtime_loss: 4200000.0,
  breach_response_loss: 2600000.0,
  regulatory_penalties: 1800000.0,
  data_recovery_loss: 600000.0,
  formula_explanation: "Calculated via continuous Bayesian threat likelihood combined with Monte Carlo loss severity modeling over 10,000 simulations.",
  risk_drivers: [
    {
      feature_name: "Active KEV Exploit Weaponization",
      contribution_percentage: 28.4,
      impact_direction: "increases_risk",
      description: "CVE-2024-38077 and CVE-2024-3400 have public exploit code indexed in CISA KEV catalog."
    },
    {
      feature_name: "Direct Internet Ingress Exposure",
      contribution_percentage: 21.2,
      impact_direction: "increases_risk",
      description: "Public IP exposure without full cloud-native WAF inspection leaves API endpoints reachable externally."
    },
    {
      feature_name: "Critical Asset Financial Valuation",
      contribution_percentage: 18.6,
      impact_direction: "increases_risk",
      description: "Processes transaction volume with high per-hour business outage penalty."
    }
  ]
};

export const FALLBACK_OPTIMIZATION: OptimizationResponse = {
  budget: 10000000.0,
  total_spend: 9600000.0,
  estimated_risk_reduction: 46000000.0,
  post_mitigation_exposure: 38200000.0,
  rosi_percentage: 379.0,
  recommended_spend_zone_min: 8000000.0,
  recommended_spend_zone_max: 12000000.0,
  spend_curve: [
    { spend: 2000000.0, risk_reduction: 16500000.0, remaining_exposure: 67700000.0 },
    { spend: 5000000.0, risk_reduction: 30500000.0, remaining_exposure: 53700000.0 },
    { spend: 9600000.0, risk_reduction: 46000000.0, remaining_exposure: 38200000.0 },
    { spend: 15000000.0, risk_reduction: 52000000.0, remaining_exposure: 32200000.0 }
  ],
  selected_initiatives: [
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
    }
  ],
  unselected_initiatives: []
};

export const FALLBACK_COMPLIANCE_ITEMS: ComplianceItem[] = [
  {
    id: "comp-01",
    framework: "NIST CSF 2.0",
    requirement_id: "PR.AA-01",
    requirement_name: "Identities and credentials for authorized users, services, and hardware are managed",
    control_finding: "3 administrative accounts on IAM Directory lack mandated hardware-token MFA.",
    status: "Gap",
    evidence: "IAM Audit Log 2026-09-02; single-factor active on 3 svc accounts",
    gap_description: "Absence of step-up MFA on privileged administrative access pathways.",
    recommended_action: "Deploy FIDO2 / Authenticator token MFA enforcement for Tier-0 admin roles.",
    residual_exposure: 5400000.0
  },
  {
    id: "comp-05",
    framework: "RBI Cyber Security Framework",
    requirement_id: "RBI-CSF-Sec.3.1",
    requirement_name: "Network Management and Security - Boundary Protection & Isolation",
    control_finding: "SWIFT Transaction Gateway is isolated in dedicated security zone with air-gap checks.",
    status: "Compliant",
    evidence: "Annual third-party network architecture review dated 15-Jun-2026",
    gap_description: undefined,
    recommended_action: "Maintain continuous configuration drift monitoring.",
    residual_exposure: 0.0
  }
];

export const FALLBACK_COMPLIANCE_POSTURE: CompliancePostureSummary[] = [
  { framework: "NIST CSF 2.0", compliance_score: 76, compliant_count: 9, partial_count: 1, gap_count: 2, total_controls: 12 },
  { framework: "RBI Cyber Security Framework", compliance_score: 82, compliant_count: 8, partial_count: 1, gap_count: 1, total_controls: 10 },
  { framework: "SEBI CSCRF", compliance_score: 88, compliant_count: 7, partial_count: 1, gap_count: 0, total_controls: 8 },
  { framework: "ISO/IEC 27001", compliance_score: 84, compliant_count: 12, partial_count: 2, gap_count: 1, total_controls: 15 }
];

export const FALLBACK_SIMULATION: SimulationResponse = {
  baseline_exposure: 84200000.0,
  projected_exposure: 51200000.0,
  baseline_eal: 3170000.0,
  projected_eal: 1850000.0,
  risk_reduction: 33000000.0,
  reduction_percentage: 39.2,
  most_influential_change: "Enforce Privileged MFA (-₹1.40 Cr risk)",
  deltas_by_asset: [
    {
      asset_id: "asset-01",
      asset_name: "Payment Gateway Server",
      baseline_loss: 9200000.0,
      projected_loss: 4800000.0,
      reduction_percentage: 47.8
    },
    {
      asset_id: "asset-02",
      asset_name: "Customer Core Database",
      baseline_loss: 6800000.0,
      projected_loss: 4100000.0,
      reduction_percentage: 39.7
    },
    {
      asset_id: "asset-03",
      asset_name: "IAM Privileged Directory",
      baseline_loss: 5400000.0,
      projected_loss: 2900000.0,
      reduction_percentage: 46.3
    }
  ]
};

export const FALLBACK_REPORTS: ReportCard[] = [
  {
    id: "rep-01",
    title: "Executive Board Cyber Risk Briefing",
    category: "Board / C-Suite",
    generated_at: "05-Sep-2026",
    summary: "Board-level quantification of Aegis FinServe's cyber risk posture in INR monetary terms, highlighting top financial exposures, Value at Risk (95%), and expected annual loss.",
    key_metrics: {
      "Total Exposure": "₹8.42 Cr",
      "Expected Annual Loss": "₹3.17 Cr",
      "Value at Risk (95%)": "₹5.80 Cr",
      "Enterprise Risk Score": "72 / 100"
    },
    file_size: "1.8 MB"
  }
];
