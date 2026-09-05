"""
Seeded Enterprise Security Telemetry and Asset Inventory for Aegis FinServe Ltd.
Calculated consistently for Smart India Hackathon 2026 Problem Statement SIH26105.
NOTE: Strict enterprise risk vocabulary rules enforced.
"""

ORG_NAME = "Aegis FinServe Ltd."

KPI_DATA = {
    "total_financial_exposure": 84200000.0,  # ₹8.42 Cr
    "expected_annual_loss": 31700000.0,      # ₹3.17 Cr
    "value_at_risk_95": 58000000.0,          # ₹5.80 Cr
    "enterprise_risk_score": 72,
    "risk_change_percentage": -12.4,
    "active_critical_cves": 7,
    "kev_listed_cves": 4,
    "organization_name": ORG_NAME,
    "last_telemetry_sync": "4 mins ago"
}

ASSETS = [
    {
        "id": "asset-01",
        "name": "Payment Gateway Server",
        "type": "Application Server",
        "business_unit": "Payments",
        "criticality": "Critical",
        "internet_exposed": True,
        "downtime_cost_per_hour": 320000.0,
        "control_effectiveness": 0.58,
        "risk_score": 88,
        "financial_exposure": 24000000.0, # ₹2.40 Cr
        "expected_annual_loss": 9200000.0,  # ₹92 Lakhs
        "incident_likelihood": 0.384,
        "var_95": 18500000.0,
        "status": "Action Required",
        "vulnerabilities_count": 5,
        "controls_active": ["WAF", "TLS 1.3", "Rate Limiting", "Basic EDR"],
        "recent_incidents": ["Brute-force credential stuffing spike on 28-Aug", "WAF SQLi bypass attempt blocked on 01-Sep"]
    },
    {
        "id": "asset-02",
        "name": "Customer Core Database",
        "type": "Database Cluster",
        "business_unit": "Retail Banking",
        "criticality": "Critical",
        "internet_exposed": False,
        "downtime_cost_per_hour": 450000.0,
        "control_effectiveness": 0.72,
        "risk_score": 81,
        "financial_exposure": 18500000.0,
        "expected_annual_loss": 6800000.0,
        "incident_likelihood": 0.367,
        "var_95": 14200000.0,
        "status": "Elevated Risk",
        "vulnerabilities_count": 3,
        "controls_active": ["Database Activity Monitoring", "TDE Encryption", "Privileged Bastion"],
        "recent_incidents": ["Unusual query volume alert from service account on 24-Aug"]
    },
    {
        "id": "asset-03",
        "name": "IAM Privileged Directory",
        "type": "Identity Provider",
        "business_unit": "Corporate IT",
        "criticality": "Critical",
        "internet_exposed": False,
        "downtime_cost_per_hour": 280000.0,
        "control_effectiveness": 0.61,
        "risk_score": 79,
        "financial_exposure": 14200000.0,
        "expected_annual_loss": 5400000.0,
        "incident_likelihood": 0.380,
        "var_95": 11000000.0,
        "status": "Action Required",
        "vulnerabilities_count": 4,
        "controls_active": ["Kerberos Pre-auth", "Tiered Admin Model", "Audit Logging"],
        "recent_incidents": ["3 non-MFA privileged logins flagged from internal subnet on 30-Aug"]
    },
    {
        "id": "asset-04",
        "name": "Cloud Production Cluster",
        "type": "Kubernetes Cluster",
        "business_unit": "Cloud Infrastructure",
        "criticality": "High",
        "internet_exposed": True,
        "downtime_cost_per_hour": 210000.0,
        "control_effectiveness": 0.65,
        "risk_score": 74,
        "financial_exposure": 9500000.0,
        "expected_annual_loss": 3800000.0,
        "incident_likelihood": 0.400,
        "var_95": 7200000.0,
        "status": "Elevated Risk",
        "vulnerabilities_count": 6,
        "controls_active": ["NetworkPolicies", "RBAC", "Falco Runtime Monitoring"],
        "recent_incidents": ["Privileged container execution attempt detected and evicted on 02-Sep"]
    },
    {
        "id": "asset-05",
        "name": "Core Banking API Gateway",
        "type": "API Gateway",
        "business_unit": "Retail Banking",
        "criticality": "Critical",
        "internet_exposed": True,
        "downtime_cost_per_hour": 390000.0,
        "control_effectiveness": 0.68,
        "risk_score": 71,
        "financial_exposure": 8200000.0,
        "expected_annual_loss": 2900000.0,
        "incident_likelihood": 0.353,
        "var_95": 6100000.0,
        "status": "Monitored",
        "vulnerabilities_count": 2,
        "controls_active": ["OAuth 2.0 / mTLS", "Kong API Gateway", "IP Throttling"],
        "recent_incidents": ["Intermittent 429 response rate surge on partner endpoints on 27-Aug"]
    },
    {
        "id": "asset-06",
        "name": "SWIFT Transaction Gateway",
        "type": "Financial Gateway",
        "business_unit": "Payments",
        "criticality": "Critical",
        "internet_exposed": False,
        "downtime_cost_per_hour": 500000.0,
        "control_effectiveness": 0.85,
        "risk_score": 52,
        "financial_exposure": 4200000.0,
        "expected_annual_loss": 1200000.0,
        "incident_likelihood": 0.285,
        "var_95": 3100000.0,
        "status": "Compliant",
        "vulnerabilities_count": 1,
        "controls_active": ["Hardware Security Module (HSM)", "Air-gapped Zone", "Dual Custody Authorizations"],
        "recent_incidents": ["Scheduled key rotation completed successfully on 15-Aug"]
    },
    {
        "id": "asset-07",
        "name": "Endpoint Fleet - Finance Dept",
        "type": "Workstations (140 units)",
        "business_unit": "Corporate IT",
        "criticality": "Medium",
        "internet_exposed": False,
        "downtime_cost_per_hour": 80000.0,
        "control_effectiveness": 0.64,
        "risk_score": 62,
        "financial_exposure": 3200000.0,
        "expected_annual_loss": 1100000.0,
        "incident_likelihood": 0.343,
        "var_95": 2400000.0,
        "status": "Action Required",
        "vulnerabilities_count": 8,
        "controls_active": ["Endpoint EDR Agent", "BitLocker Full-Disk", "USB Port Restriction"],
        "recent_incidents": ["Phishing lure attachment quarantined by EDR on 2 workstations on 29-Aug"]
    },
    {
        "id": "asset-08",
        "name": "Customer Mobile Banking Backend",
        "type": "Microservices Mesh",
        "business_unit": "Retail Banking",
        "criticality": "High",
        "internet_exposed": True,
        "downtime_cost_per_hour": 240000.0,
        "control_effectiveness": 0.70,
        "risk_score": 58,
        "financial_exposure": 2800000.0,
        "expected_annual_loss": 900000.0,
        "incident_likelihood": 0.321,
        "var_95": 2100000.0,
        "status": "Monitored",
        "vulnerabilities_count": 4,
        "controls_active": ["Envoy Proxy", "JWT Verification", "Redis Token Revocation"],
        "recent_incidents": ["Minor token verification latency noticed during peak hours on 31-Aug"]
    },
    {
        "id": "asset-09",
        "name": "Disaster Recovery Backup Vault",
        "type": "Storage Appliance",
        "business_unit": "Cloud Infrastructure",
        "criticality": "Critical",
        "internet_exposed": False,
        "downtime_cost_per_hour": 350000.0,
        "control_effectiveness": 0.78,
        "risk_score": 48,
        "financial_exposure": 1900000.0,
        "expected_annual_loss": 550000.0,
        "incident_likelihood": 0.289,
        "var_95": 1400000.0,
        "status": "Compliant",
        "vulnerabilities_count": 1,
        "controls_active": ["Immutable WORM Storage", "Offline Air-gap Replication", "AES-256 GCM"],
        "recent_incidents": ["Quarterly disaster recovery restoration drill verified on 20-Aug"]
    },
    {
        "id": "asset-10",
        "name": "Customer Support CRM Portal",
        "type": "Web Application",
        "business_unit": "Customer Support",
        "criticality": "Medium",
        "internet_exposed": True,
        "downtime_cost_per_hour": 95000.0,
        "control_effectiveness": 0.62,
        "risk_score": 54,
        "financial_exposure": 1500000.0,
        "expected_annual_loss": 450000.0,
        "incident_likelihood": 0.300,
        "var_95": 1100000.0,
        "status": "Monitored",
        "vulnerabilities_count": 3,
        "controls_active": ["SSO Integration", "Role-Based Access Control", "Data Masking for PII"],
        "recent_incidents": ["Attempted credential stuffing mitigated by IP rate limits on 25-Aug"]
    }
]

VULNERABILITIES = [
    {
        "id": "vuln-01",
        "cve_id": "CVE-2024-38077",
        "cvss": 9.8,
        "kev_status": True,
        "exploit_available": True,
        "affected_asset_id": "asset-01",
        "affected_asset_name": "Payment Gateway Server",
        "asset_criticality": "Critical",
        "patch_age_days": 68,
        "incident_likelihood": 0.384,
        "expected_loss": 9200000.0,
        "priority": "Critical",
        "financially_material": True,
        "summary": "Remote Code Execution vulnerability in Windows Remote Access Connection Manager allowing unauthenticated RCE over RPC."
    },
    {
        "id": "vuln-02",
        "cve_id": "CVE-2024-21413",
        "cvss": 9.8,
        "kev_status": True,
        "exploit_available": True,
        "affected_asset_id": "asset-03",
        "affected_asset_name": "IAM Privileged Directory",
        "asset_criticality": "Critical",
        "patch_age_days": 82,
        "incident_likelihood": 0.380,
        "expected_loss": 5400000.0,
        "priority": "Critical",
        "financially_material": True,
        "summary": "Microsoft Outlook / Exchange Moniker Link RCE flaw actively weaponized in credential harvesting campaigns."
    },
    {
        "id": "vuln-03",
        "cve_id": "CVE-2024-4577",
        "cvss": 9.8,
        "kev_status": True,
        "exploit_available": True,
        "affected_asset_id": "asset-04",
        "affected_asset_name": "Cloud Production Cluster",
        "asset_criticality": "High",
        "patch_age_days": 54,
        "incident_likelihood": 0.400,
        "expected_loss": 3800000.0,
        "priority": "Critical",
        "financially_material": True,
        "summary": "PHP CGI Argument Injection vulnerability allowing arbitrary code execution in web application container ingresses."
    },
    {
        "id": "vuln-04",
        "cve_id": "CVE-2024-6387",
        "cvss": 8.1,
        "kev_status": False,
        "exploit_available": True,
        "affected_asset_id": "asset-02",
        "affected_asset_name": "Customer Core Database",
        "asset_criticality": "Critical",
        "patch_age_days": 47,
        "incident_likelihood": 0.367,
        "expected_loss": 6800000.0,
        "priority": "High",
        "financially_material": True,
        "summary": "regreSSHion: OpenSSH unauthenticated RCE in default installations on glibc-based Linux database servers."
    },
    {
        "id": "vuln-05",
        "cve_id": "CVE-2024-3400",
        "cvss": 10.0,
        "kev_status": True,
        "exploit_available": True,
        "affected_asset_id": "asset-01",
        "affected_asset_name": "Payment Gateway Server",
        "asset_criticality": "Critical",
        "patch_age_days": 90,
        "incident_likelihood": 0.350,
        "expected_loss": 7400000.0,
        "priority": "Critical",
        "financially_material": True,
        "summary": "Palo Alto Networks PAN-OS command injection in GlobalProtect gateway leading to root compromise."
    },
    {
        "id": "vuln-06",
        "cve_id": "CVE-2024-21762",
        "cvss": 9.6,
        "kev_status": True,
        "exploit_available": True,
        "affected_asset_id": "asset-05",
        "affected_asset_name": "Core Banking API Gateway",
        "asset_criticality": "Critical",
        "patch_age_days": 75,
        "incident_likelihood": 0.353,
        "expected_loss": 2900000.0,
        "priority": "Critical",
        "financially_material": True,
        "summary": "FortiOS out-of-bounds write allowing unauthenticated arbitrary code execution via specially crafted HTTP requests."
    },
    {
        "id": "vuln-07",
        "cve_id": "CVE-2024-27198",
        "cvss": 9.8,
        "kev_status": True,
        "exploit_available": True,
        "affected_asset_id": "asset-04",
        "affected_asset_name": "Cloud Production Cluster",
        "asset_criticality": "High",
        "patch_age_days": 60,
        "incident_likelihood": 0.310,
        "expected_loss": 2200000.0,
        "priority": "Critical",
        "financially_material": True,
        "summary": "JetBrains TeamCity authentication bypass permitting administrative account takeover in CI/CD cloud orchestrators."
    },
    {
        "id": "vuln-08",
        "cve_id": "CVE-2024-38112",
        "cvss": 7.5,
        "kev_status": True,
        "exploit_available": True,
        "affected_asset_id": "asset-07",
        "affected_asset_name": "Endpoint Fleet - Finance Dept",
        "asset_criticality": "Medium",
        "patch_age_days": 35,
        "incident_likelihood": 0.343,
        "expected_loss": 1100000.0,
        "priority": "High",
        "financially_material": True,
        "summary": "Windows MSHTML Platform Spoofing vulnerability exploited in-the-wild to bypass Mark of the Web (MoTW)."
    },
    {
        "id": "vuln-09",
        "cve_id": "CVE-2023-48795",
        "cvss": 5.9,
        "kev_status": False,
        "exploit_available": False,
        "affected_asset_id": "asset-08",
        "affected_asset_name": "Customer Mobile Banking Backend",
        "asset_criticality": "High",
        "patch_age_days": 180,
        "incident_likelihood": 0.120,
        "expected_loss": 280000.0,
        "priority": "Medium",
        "financially_material": False,  # Note: Low financial impact despite widespread presence
        "summary": "Terrapin attack: prefix truncation attack in SSH protocol integrity handshake."
    },
    {
        "id": "vuln-10",
        "cve_id": "CVE-2024-0012",
        "cvss": 9.3,
        "kev_status": True,
        "exploit_available": True,
        "affected_asset_id": "asset-01",
        "affected_asset_name": "Payment Gateway Server",
        "asset_criticality": "Critical",
        "patch_age_days": 21,
        "incident_likelihood": 0.320,
        "expected_loss": 6200000.0,
        "priority": "Critical",
        "financially_material": True,
        "summary": "Authentication bypass in PAN-OS web management interface facilitating admin privilege acquisition."
    },
    {
        "id": "vuln-11",
        "cve_id": "CVE-2024-1709",
        "cvss": 9.8,
        "kev_status": True,
        "exploit_available": True,
        "affected_asset_id": "asset-10",
        "affected_asset_name": "Customer Support CRM Portal",
        "asset_criticality": "Medium",
        "patch_age_days": 95,
        "incident_likelihood": 0.280,
        "expected_loss": 450000.0,
        "priority": "High",
        "financially_material": False,
        "summary": "ConnectWise ScreenConnect authentication bypass allowing administrative user creation."
    }
]

SECURITY_INITIATIVES = [
    {
        "id": "init-01",
        "name": "Enterprise MFA Enforcement for Privileged Accounts",
        "cost": 1200000.0,           # ₹12 Lakhs
        "estimated_risk_reduction": 14000000.0, # ₹1.40 Cr
        "implementation_days": 14,
        "dependency": None,
        "rosi_percentage": 1066.0,
        "category": "Identity & Access"
    },
    {
        "id": "init-02",
        "name": "Emergency Critical CVE Patching Program",
        "cost": 800000.0,            # ₹8 Lakhs
        "estimated_risk_reduction": 16500000.0, # ₹1.65 Cr
        "implementation_days": 7,
        "dependency": None,
        "rosi_percentage": 1962.0,
        "category": "Vulnerability Management"
    },
    {
        "id": "init-03",
        "name": "Managed EDR Upgrade & 24/7 Threat Hunting Coverage",
        "cost": 2800000.0,           # ₹28 Lakhs
        "estimated_risk_reduction": 8500000.0,  # ₹85 Lakhs
        "implementation_days": 30,
        "dependency": None,
        "rosi_percentage": 203.0,
        "category": "Endpoint & Detection"
    },
    {
        "id": "init-04",
        "name": "Micro-segmentation for Payment & Core Banking Network",
        "cost": 3100000.0,           # ₹31 Lakhs
        "estimated_risk_reduction": 11000000.0, # ₹1.10 Cr
        "implementation_days": 45,
        "dependency": "init-01",
        "rosi_percentage": 254.0,
        "category": "Network Architecture"
    },
    {
        "id": "init-05",
        "name": "Privileged Access Management (PAM) & Hardening",
        "cost": 1700000.0,           # ₹17 Lakhs
        "estimated_risk_reduction": 5500000.0,  # ₹55 Lakhs
        "implementation_days": 21,
        "dependency": "init-01",
        "rosi_percentage": 223.0,
        "category": "Identity & Access"
    },
    {
        "id": "init-06",
        "name": "Air-Gapped Immutable Backup & Rapid Recovery Vault",
        "cost": 2200000.0,           # ₹22 Lakhs
        "estimated_risk_reduction": 4200000.0,  # ₹42 Lakhs
        "implementation_days": 25,
        "dependency": None,
        "rosi_percentage": 90.0,
        "category": "Resilience & Recovery"
    },
    {
        "id": "init-07",
        "name": "Cloud Security Posture Management (CSPM) & IaC Auditing",
        "cost": 1500000.0,           # ₹15 Lakhs
        "estimated_risk_reduction": 3100000.0,  # ₹31 Lakhs
        "implementation_days": 18,
        "dependency": None,
        "rosi_percentage": 106.0,
        "category": "Cloud Governance"
    },
    {
        "id": "init-08",
        "name": "Centralized SIEM Telemetry & Automated SOAR Playbooks",
        "cost": 2500000.0,           # ₹25 Lakhs
        "estimated_risk_reduction": 3600000.0,  # ₹36 Lakhs
        "implementation_days": 35,
        "dependency": "init-03",
        "rosi_percentage": 44.0,
        "category": "Security Operations"
    },
    {
        "id": "init-09",
        "name": "Third-Party Vendor Risk Evaluation & Continuous Monitoring",
        "cost": 900000.0,            # ₹9 Lakhs
        "estimated_risk_reduction": 1400000.0,  # ₹14 Lakhs
        "implementation_days": 14,
        "dependency": None,
        "rosi_percentage": 55.0,
        "category": "Supply Chain Security"
    },
    {
        "id": "init-10",
        "name": "Annual Red Team Adversary Emulation & Breach Simulation",
        "cost": 1400000.0,           # ₹14 Lakhs
        "estimated_risk_reduction": 1900000.0,  # ₹19 Lakhs
        "implementation_days": 10,
        "dependency": "init-04",
        "rosi_percentage": 35.0,
        "category": "Offensive Security"
    }
]

SHAP_RISK_DRIVERS_PAYMENT_GATEWAY = [
    {
        "feature_name": "Active KEV Exploit Weaponization",
        "contribution_percentage": 28.4,
        "impact_direction": "increases_risk",
        "description": "CVE-2024-38077 and CVE-2024-3400 have public exploit code indexed in CISA KEV catalog."
    },
    {
        "feature_name": "Direct Internet Ingress Exposure",
        "contribution_percentage": 21.2,
        "impact_direction": "increases_risk",
        "description": "Public IP exposure without full cloud-native WAF inspection leaves API endpoints reachable externally."
    },
    {
        "feature_name": "Critical Asset Financial Valuation",
        "contribution_percentage": 18.6,
        "impact_direction": "increases_risk",
        "description": "Processes ₹45+ Cr daily transaction volume with high per-hour business outage penalty (₹3.2L/hr)."
    },
    {
        "feature_name": "Privileged Account MFA Incomplete",
        "contribution_percentage": 14.1,
        "impact_direction": "increases_risk",
        "description": "Administrative maintenance jump-box allows single-factor Kerberos authentication from corporate subnets."
    },
    {
        "feature_name": "Overdue Critical Patch Age (>60 Days)",
        "contribution_percentage": 11.5,
        "impact_direction": "increases_risk",
        "description": "Production maintenance window delays leave 2 critical CVEs unpatched for over 68 days."
    },
    {
        "feature_name": "Active Host-Level EDR Monitoring",
        "contribution_percentage": -6.2,
        "impact_direction": "mitigates_risk",
        "description": "Active EDR agent partially mitigates secondary post-exploitation and lateral traversal attempts."
    }
]

COMPLIANCE_ITEMS = [
    {
        "id": "comp-01",
        "framework": "NIST CSF 2.0",
        "requirement_id": "PR.AA-01",
        "requirement_name": "Identities and credentials for authorized users, services, and hardware are managed",
        "control_finding": "3 administrative accounts on IAM Directory lack mandated hardware-token MFA.",
        "status": "Gap",
        "evidence": "IAM Audit Log 2026-09-02; single-factor active on 3 svc accounts",
        "gap_description": "Absence of step-up MFA on privileged administrative access pathways.",
        "recommended_action": "Deploy FIDO2 / Authenticator token MFA enforcement for Tier-0 admin roles.",
        "residual_exposure": 5400000.0
    },
    {
        "id": "comp-02",
        "framework": "NIST CSF 2.0",
        "requirement_id": "PR.PS-02",
        "requirement_name": "Software is maintained, patched, and replaced in a timely manner",
        "control_finding": "Payment Gateway Server has 2 CISA KEV vulnerabilities unpatched for >60 days.",
        "status": "Gap",
        "evidence": "Nessus Vulnerability Scan ID #49210; CVE-2024-38077 unpatched",
        "gap_description": "Patch cadence exceeds enterprise 14-day critical remediation SLA.",
        "recommended_action": "Apply emergency security patch during approved maintenance window.",
        "residual_exposure": 9200000.0
    },
    {
        "id": "comp-03",
        "framework": "NIST CSF 2.0",
        "requirement_id": "PR.IR-01",
        "requirement_name": "Networks and environments are protected from unauthorized logical access",
        "control_finding": "Flat network routing between internal corporate workstations and Payment Gateway.",
        "status": "Partial",
        "evidence": "VLAN 104 allows direct SSH/RPC routing to Payment Gateway host IP",
        "gap_description": "Insufficient micro-segmentation exposing critical zone to lateral movement.",
        "recommended_action": "Implement Zero Trust Network Access (ZTNA) and firewall micro-segmentation.",
        "residual_exposure": 4800000.0
    },
    {
        "id": "comp-04",
        "framework": "ISO/IEC 27001",
        "requirement_id": "A.8.8",
        "requirement_name": "Management of technical vulnerabilities",
        "control_finding": "Quarterly scanning implemented, but remediation tracking lacks automated verification.",
        "status": "Partial",
        "evidence": "Security Operations ticketing queue shows 18 open CVE tickets past SLA",
        "gap_description": "Manual hand-off between security analysis and DevOps engineering.",
        "recommended_action": "Automate patch verification via CI/CD pipeline and continuous posture validation.",
        "residual_exposure": 3600000.0
    },
    {
        "id": "comp-05",
        "framework": "RBI Cyber Security Framework",
        "requirement_id": "RBI-CSF-Sec.3.1",
        "requirement_name": "Network Management and Security - Boundary Protection & Isolation",
        "control_finding": "SWIFT Transaction Gateway is isolated in dedicated security zone with air-gap checks.",
        "status": "Compliant",
        "evidence": "Annual third-party network architecture review dated 15-Jun-2026",
        "gap_description": None,
        "recommended_action": "Maintain continuous configuration drift monitoring.",
        "residual_exposure": 0.0
    },
    {
        "id": "comp-06",
        "framework": "RBI Cyber Security Framework",
        "requirement_id": "RBI-CSF-Sec.5.2",
        "requirement_name": "Privileged Access Management & Mandatory Multi-Factor Authentication",
        "control_finding": "Core Banking database access requires dual-custody approval; MFA missing on 2 legacy terminals.",
        "status": "Partial",
        "evidence": "PAM audit log indicates 2 finance analyst workstations bypass MFA gateway",
        "gap_description": "Legacy client endpoints not onboarded to modern SAML/OIDC provider.",
        "recommended_action": "Retire legacy thick-client console and enforce centralized PAM portal.",
        "residual_exposure": 2800000.0
    },
    {
        "id": "comp-07",
        "framework": "SEBI CSCRF",
        "requirement_id": "SEBI-CSCRF-Part II",
        "requirement_name": "Cyber Resilience & Business Continuity - 4-hour RTO/RPO Compliance",
        "control_finding": "Disaster Recovery backup vault verified with 2.5-hour RTO during drill on 20-Aug.",
        "status": "Compliant",
        "evidence": "DR Drill Sign-off Report signed by Chief Information Security Officer",
        "gap_description": None,
        "recommended_action": "Conduct semi-annual automated failover drills.",
        "residual_exposure": 0.0
    },
    {
        "id": "comp-08",
        "framework": "CIS Controls",
        "requirement_id": "CIS Control 10",
        "requirement_name": "Data Recovery Capabilities",
        "control_finding": "Immutable WORM storage enabled for transaction ledgers and customer DB snapshots.",
        "status": "Compliant",
        "evidence": "AWS S3 Object Lock configuration compliance report verified",
        "gap_description": None,
        "recommended_action": "Validate cryptographic hash verification on restored datasets.",
        "residual_exposure": 0.0
    }
]

REPORTS_DATA = [
    {
        "id": "rep-01",
        "title": "Executive Board Cyber Risk Briefing",
        "category": "Board / C-Suite",
        "generated_at": "05-Sep-2026",
        "summary": "Board-level quantification of Aegis FinServe's cyber risk posture in INR monetary terms, highlighting top financial exposures, Value at Risk (95%), and expected annual loss.",
        "key_metrics": {
            "Total Exposure": "₹8.42 Cr",
            "Expected Annual Loss": "₹3.17 Cr",
            "Value at Risk (95%)": "₹5.80 Cr",
            "Enterprise Risk Score": "72 / 100"
        },
        "file_size": "1.8 MB"
    },
    {
        "id": "rep-02",
        "title": "Financial Exposure & Monte Carlo Loss Analysis",
        "category": "Risk Analytics",
        "generated_at": "04-Sep-2026",
        "summary": "Detailed statistical breakdown of 10,000 Monte Carlo simulation runs evaluating operational downtime, breach remediation, regulatory penalties, and customer churn.",
        "key_metrics": {
            "Simulated Iterations": "10,000",
            "Max Foreseeable Loss": "₹14.20 Cr",
            "Median Loss": "₹2.95 Cr",
            "Primary Loss Driver": "Downtime (48%)"
        },
        "file_size": "2.4 MB"
    },
    {
        "id": "rep-03",
        "title": "Vulnerability Materiality & Threat Attribution Report",
        "category": "Threat Intelligence",
        "generated_at": "03-Sep-2026",
        "summary": "Audit of all active CVEs cross-referenced against CISA KEV and business criticality, filtering technically high CVSS scores by actual financial materiality.",
        "key_metrics": {
            "Total CVEs": "11 Tracked",
            "Material CVEs": "8",
            "KEV Weaponized": "7",
            "Top Threat CVE": "CVE-2024-38077"
        },
        "file_size": "3.1 MB"
    },
    {
        "id": "rep-04",
        "title": "Multi-Framework Regulatory Compliance Gap Matrix",
        "category": "Governance & Audit",
        "generated_at": "01-Sep-2026",
        "summary": "Comprehensive regulatory crosswalk for NIST CSF 2.0, ISO/IEC 27001, RBI Cyber Security Framework, and SEBI CSCRF identifying residual exposures and audit gaps.",
        "key_metrics": {
            "NIST CSF Posture": "76%",
            "RBI Framework": "82%",
            "SEBI CSCRF": "88%",
            "Active Gaps": "3 Critical"
        },
        "file_size": "4.2 MB"
    },
    {
        "id": "rep-05",
        "title": "Capital Allocation & Investment Optimization Proposal",
        "category": "Budget & Strategy",
        "generated_at": "05-Sep-2026",
        "summary": "Constrained mathematical portfolio optimization output under ₹1.00 Cr budget constraint, proving 379% Return on Security Investment (ROSI) with ₹4.60 Cr risk reduction.",
        "key_metrics": {
            "Approved Budget": "₹1.00 Cr",
            "Optimized Spend": "₹96 Lakhs",
            "Risk Reduction": "₹4.60 Cr",
            "Calculated ROSI": "379%"
        },
        "file_size": "1.5 MB"
    }
]
