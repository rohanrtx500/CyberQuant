"""
CyberQuant AI - FastAPI Backend Application
Problem Statement ID: SIH26105 (Smart India Hackathon 2026)
Enterprise Continuous Cyber Risk Quantification and Investment Optimization Platform
Demo Organization: Aegis FinServe Ltd.
NOTE: Strict enterprise risk vocabulary rules enforced.
"""

from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional, Dict, Any

from app.schemas.models import (
    KPISummary, FinancialTrendPoint, RiskDistribution, TopRiskContributor,
    RiskReductionOpportunity, AssetDetail, VulnerabilityItem, AssetRiskAnalysis,
    SimulationRequest, SimulationResponse, OptimizationRequest, OptimizationResponse,
    CopilotQueryRequest, CopilotQueryResponse, ComplianceItem, CompliancePostureSummary,
    ReportCard
)
from app.data.seed_data import (
    KPI_DATA, ASSETS, VULNERABILITIES, SECURITY_INITIATIVES,
    SHAP_RISK_DRIVERS_PAYMENT_GATEWAY, COMPLIANCE_ITEMS, REPORTS_DATA
)
from app.services.risk_engine import RiskEngine
from app.services.financial_model import FinancialRiskModel
from app.services.explainability import RiskExplainability
from app.services.scenario_engine import ScenarioEngine
from app.services.optimization_engine import OptimizationEngine
from app.services.compliance_mapper import ComplianceMapper
from app.services.copilot_service import CopilotService

app = FastAPI(
    title="CyberQuant AI Engine",
    description="Enterprise Continuous Cyber Risk Quantification & Investment Optimization API",
    version="2.0.0"
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "platform": "CyberQuant AI",
        "organization": "Aegis FinServe Ltd.",
        "status": "Operational",
        "edition": "Enterprise Suite",
        "documentation": "/docs"
    }

# ==========================================
# 1. OVERVIEW DASHBOARD
# ==========================================

@app.get("/api/dashboard/summary")
def get_dashboard_summary():
    # Top Risk Contributors
    top_contributors = []
    for asset in ASSETS[:5]:
        top_contributors.append(TopRiskContributor(
            asset_id=asset["id"],
            asset_name=asset["name"],
            business_unit=asset["business_unit"],
            primary_risk_driver="CISA KEV Weaponization" if asset["id"] == "asset-01" else "Unpatched Critical CVE",
            incident_likelihood=asset["incident_likelihood"],
            expected_loss=asset["expected_annual_loss"],
            risk_trend="stable" if asset["risk_score"] < 70 else "increasing",
            status=asset["status"]
        ))

    # Prioritized Opportunities
    opportunities = []
    for init in SECURITY_INITIATIVES[:4]:
        opportunities.append(RiskReductionOpportunity(
            id=init["id"],
            action_title=init["name"],
            category=init["category"],
            estimated_cost=init["cost"],
            estimated_risk_reduction=init["estimated_risk_reduction"],
            priority="Critical" if init["rosi_percentage"] > 500 else "High",
            rosi_percentage=init["rosi_percentage"],
            applicable_asset="Payment Gateway / Enterprise Identity"
        ))

    return {
        "kpi": KPISummary(**KPI_DATA),
        "risk_distribution": RiskDistribution(
            critical_percent=18.0,
            high_percent=34.0,
            medium_percent=32.0,
            low_percent=16.0
        ),
        "top_contributors": top_contributors,
        "opportunities": opportunities
    }

@app.get("/api/risk/trend")
def get_risk_trend(days: int = Query(30, ge=7, le=90)):
    points = []
    base_exposure = 96000000.0  # ₹9.60 Cr starting 30 days ago
    target_exposure = KPI_DATA["total_financial_exposure"]  # ₹8.42 Cr today

    step = (base_exposure - target_exposure) / float(days)

    for i in range(days):
        day_num = days - i
        curr_exp = base_exposure - (i * step) + ((i % 4 - 2) * 450000.0)
        points.append(FinancialTrendPoint(
            date=f"-{day_num}d" if day_num > 0 else "Today",
            exposure=round(curr_exp, 2),
            eal=round(curr_exp * 0.376, 2),
            tolerance_threshold=70000000.0  # ₹7.00 Cr Board Risk Tolerance
        ))

    return points

# ==========================================
# 2. ASSETS
# ==========================================

@app.get("/api/assets", response_model=List[AssetDetail])
def list_assets(
    business_unit: Optional[str] = None,
    criticality: Optional[str] = None,
    internet_exposed: Optional[bool] = None,
    search: Optional[str] = None
):
    results = [AssetDetail(**a) for a in ASSETS]

    if business_unit and business_unit != "All":
        results = [a for a in results if a.business_unit.lower() == business_unit.lower()]
    if criticality and criticality != "All":
        results = [a for a in results if a.criticality.lower() == criticality.lower()]
    if internet_exposed is not None:
        results = [a for a in results if a.internet_exposed == internet_exposed]
    if search:
        s = search.lower()
        results = [a for a in results if s in a.name.lower() or s in a.type.lower() or s in a.business_unit.lower()]

    return results

@app.get("/api/assets/{asset_id}", response_model=AssetDetail)
def get_asset_by_id(asset_id: str):
    asset = next((a for a in ASSETS if a["id"] == asset_id), None)
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")
    return AssetDetail(**asset)

# ==========================================
# 3. VULNERABILITIES
# ==========================================

@app.get("/api/vulnerabilities", response_model=List[VulnerabilityItem])
def list_vulnerabilities(only_financially_material: bool = False):
    items = [VulnerabilityItem(**v) for v in VULNERABILITIES]
    if only_financially_material:
        items = [v for v in items if v.financially_material]
    return items

# ==========================================
# 4. RISK ANALYSIS & EXPLAINABILITY
# ==========================================

@app.get("/api/risk/{asset_id}", response_model=AssetRiskAnalysis)
def get_asset_risk_analysis(asset_id: str):
    asset = next((a for a in ASSETS if a["id"] == asset_id), None)
    if not asset:
        asset = ASSETS[0]  # Default to Payment Gateway

    drivers = RiskExplainability.get_asset_feature_attribution(asset["id"])

    # Breakdown simulation values
    mc_results = FinancialRiskModel.simulate_loss_distribution(
        downtime_cost_per_hour=asset["downtime_cost_per_hour"],
        criticality=asset["criticality"],
        incident_likelihood=asset["incident_likelihood"],
        simulations=5000,
        seed=101
    )

    return AssetRiskAnalysis(
        asset_id=asset["id"],
        asset_name=asset["name"],
        asset_criticality=asset["criticality"],
        incident_likelihood=asset["incident_likelihood"],
        control_effectiveness=asset["control_effectiveness"],
        financial_impact=asset["financial_exposure"],
        expected_annual_loss=asset["expected_annual_loss"],
        var_95=asset["var_95"],
        downtime_loss=mc_results["downtime_component"],
        breach_response_loss=mc_results["breach_response_component"],
        regulatory_penalties=mc_results["regulatory_penalties_component"],
        data_recovery_loss=mc_results["data_recovery_component"],
        risk_drivers=drivers,
        formula_explanation="Expected Annual Loss (EAL) ≈ Incident Likelihood × Estimated Financial Impact, where Financial Impact integrates Operational Downtime (hourly rate × log-normal outage duration), Breach Response & Forensics, Regulatory Penalties, and Data Reconstruction."
    )

# ==========================================
# 5. WHAT-IF SIMULATOR
# ==========================================

@app.post("/api/simulate", response_model=SimulationResponse)
def simulate_scenario(req: SimulationRequest):
    return ScenarioEngine.run_simulation(req)

# ==========================================
# 6. INVESTMENT OPTIMIZER
# ==========================================

@app.post("/api/optimize", response_model=OptimizationResponse)
def optimize_investments(req: OptimizationRequest):
    return OptimizationEngine.optimize_portfolio(req)

@app.get("/api/optimizer/initiatives", response_model=List[Dict[str, Any]])
def get_all_initiatives():
    return SECURITY_INITIATIVES

# ==========================================
# 7. AI COPILOT
# ==========================================

@app.post("/api/copilot/query", response_model=CopilotQueryResponse)
def copilot_query(req: CopilotQueryRequest):
    return CopilotService.answer_query(req)

# ==========================================
# 8. COMPLIANCE
# ==========================================

@app.get("/api/compliance/items", response_model=List[ComplianceItem])
def get_compliance_items(framework: str = Query("All")):
    return ComplianceMapper.get_items(framework)

@app.get("/api/compliance/posture", response_model=List[CompliancePostureSummary])
def get_compliance_posture():
    return ComplianceMapper.get_posture_summaries()

# ==========================================
# 9. REPORTS
# ==========================================

@app.get("/api/reports", response_model=List[ReportCard])
def list_reports():
    return [ReportCard(**r) for r in REPORTS_DATA]

@app.get("/api/reports/{report_id}/preview")
def preview_report(report_id: str):
    report = next((r for r in REPORTS_DATA if r["id"] == report_id), None)
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")

    content = f"""
================================================================================
                         CYBERQUANT AI EXECUTIVE REPORT
                      Organization: Aegis FinServe Ltd.
                             Date: {report['generated_at']}
================================================================================

TITLE: {report['title']}
CATEGORY: {report['category']}

1. EXECUTIVE SUMMARY
--------------------------------------------------------------------------------
{report['summary']}

2. CORE QUANTITATIVE METRICS (INR)
--------------------------------------------------------------------------------
"""
    for k, v in report['key_metrics'].items():
        content += f"  - {k.ljust(30)}: {v}\n"

    content += """
3. REGULATORY AND GOVERNANCE VALIDATION
--------------------------------------------------------------------------------
This report is derived from continuous automated telemetry data, CISA KEV feeds,
and NIST CSF 2.0 alignment. All financial figures are quantified using Monte Carlo
probabilistic modeling with 10,000 statistical iterations at 95% confidence.

4. AUDIT & BOARD SIGN-OFF
--------------------------------------------------------------------------------
Chief Information Security Officer (CISO)    : [Verified]
Chief Risk Officer (CRO)                     : [Acknowledged]
Audit Committee Representation                : Aegis FinServe Risk Committee
================================================================================
"""
    return {
        "report": report,
        "raw_text": content
    }
