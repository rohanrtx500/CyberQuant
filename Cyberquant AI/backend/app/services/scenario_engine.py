"""
What-If Scenario Simulation Engine
Dynamically simulates cybersecurity control adjustments and predicts
post-mitigation financial risk, EAL, and percentage reduction.
NOTE: Strict enterprise risk vocabulary rules enforced.
"""

from typing import Dict, Any, List
from app.data.seed_data import KPI_DATA, ASSETS
from app.schemas.models import SimulationRequest, SimulationResponse

class ScenarioEngine:
    """
    Evaluates what-if mitigation scenarios in real-time.
    Provides immediate deterministic recalculation of monetary exposure.
    """

    @staticmethod
    def run_simulation(req: SimulationRequest) -> SimulationResponse:
        baseline_exposure = KPI_DATA["total_financial_exposure"]  # ₹8.42 Cr (84,200,000)
        baseline_eal = KPI_DATA["expected_annual_loss"]           # ₹3.17 Cr (31,700,000)

        total_reduction = 0.0
        influences = {}

        # 1. MFA Privileged Accounts
        if req.mfa_privileged:
            reduction = 14000000.0  # ₹1.40 Cr
            total_reduction += reduction
            influences["Enforcing MFA for Privileged Accounts"] = reduction

        # 2. Patch Critical CVEs
        if req.patch_critical:
            reduction = 16500000.0  # ₹1.65 Cr
            total_reduction += reduction
            influences["Patching Critical CISA KEV Vulnerabilities"] = reduction

        # 3. EDR Coverage Adjustment (baseline is 74%)
        edr_delta = req.edr_coverage_percent - 74
        if edr_delta != 0:
            edr_reduction = (edr_delta / 25.0) * 4500000.0  # Up to ₹45L reduction at 99%
            total_reduction += edr_reduction
            if edr_delta > 0:
                influences[f"Increasing EDR Coverage to {req.edr_coverage_percent}%"] = edr_reduction

        # 4. Network Segmentation
        if req.network_segmentation:
            reduction = 11000000.0  # ₹1.10 Cr
            total_reduction += reduction
            influences["Network Micro-segmentation for Payment Zone"] = reduction

        # 5. Backup Resilience & Recovery
        if req.backup_resilience:
            reduction = 4200000.0   # ₹42 Lakhs
            total_reduction += reduction
            influences["Air-Gapped Immutable Backup Vault"] = reduction

        # 6. Remediation Delay Penalty
        if req.delay_remediation_days > 0:
            penalty = (req.delay_remediation_days / 30.0) * 6500000.0  # +₹65L risk penalty per month
            total_reduction -= penalty
            influences[f"Delaying Remediation by {req.delay_remediation_days} Days"] = -penalty

        # Diminishing interaction factor if multiple controls are applied
        if total_reduction > 25000000.0:
            overlap_factor = 0.92
            total_reduction = total_reduction * overlap_factor

        # Ensure project exposure stays bounded
        projected_exposure = max(18000000.0, baseline_exposure - total_reduction)
        actual_reduction = baseline_exposure - projected_exposure

        reduction_ratio = actual_reduction / baseline_exposure
        projected_eal = max(6800000.0, baseline_eal * (1.0 - reduction_ratio * 0.95))

        # Find most influential change
        if influences:
            most_influential = max(influences.items(), key=lambda x: abs(x[1]))[0]
        else:
            most_influential = "Baseline Telemetry (No Scenario Controls Active)"

        # Asset deltas
        deltas = []
        for asset in ASSETS[:5]:
            asset_reduction_pct = round(reduction_ratio * 100 * (1.1 if "payment" in asset["id"] else 0.9), 1)
            deltas.append({
                "asset_id": asset["id"],
                "asset_name": asset["name"],
                "baseline_loss": asset["expected_annual_loss"],
                "projected_loss": round(asset["expected_annual_loss"] * (1.0 - asset_reduction_pct / 100.0), 2),
                "reduction_percentage": asset_reduction_pct
            })

        return SimulationResponse(
            baseline_exposure=round(baseline_exposure, 2),
            projected_exposure=round(projected_exposure, 2),
            baseline_eal=round(baseline_eal, 2),
            projected_eal=round(projected_eal, 2),
            risk_reduction=round(actual_reduction, 2),
            reduction_percentage=round((actual_reduction / baseline_exposure) * 100.0, 1),
            most_influential_change=most_influential,
            deltas_by_asset=deltas
        )
