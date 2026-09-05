"""
Risk Engine Service
Continuous risk quantification and incident likelihood estimation.
Calculates technical risk factors and translates them into likelihood probabilities.
NOTE: Strict enterprise risk vocabulary rules enforced.
"""

import math
from typing import Dict, Any

class RiskEngine:
    """
    Predictive Risk Intelligence Engine.
    Estimates cyber-incident likelihood based on telemetry, exploit status,
    vulnerability metrics, internet exposure, and control effectiveness.
    """

    @staticmethod
    def calculate_incident_likelihood(
        cvss: float,
        kev_status: bool,
        exploit_available: bool,
        internet_exposed: bool,
        asset_criticality: str,
        patch_age_days: int,
        control_effectiveness: float
    ) -> float:
        """
        Calibrated mathematical scoring model.
        Returns a bounded likelihood probability in [0.02, 0.98].
        """
        base_logit = -2.5

        # Feature coefficients
        w_cvss = 0.35 * (cvss / 10.0)
        w_kev = 0.65 if kev_status else 0.0
        w_exploit = 0.50 if exploit_available else 0.0
        w_internet = 0.45 if internet_exposed else -0.20

        crit_map = {"Critical": 0.40, "High": 0.25, "Medium": 0.10, "Low": 0.0}
        w_criticality = crit_map.get(asset_criticality, 0.10)

        # Aging factor (logarithmic growth)
        w_age = 0.15 * math.log(1.0 + max(0, patch_age_days) / 10.0)

        # Mitigating controls
        w_control = 0.90 * max(0.0, min(1.0, control_effectiveness))

        raw_score = base_logit + w_cvss + w_kev + w_exploit + w_internet + w_criticality + w_age - w_control
        probability = 1.0 / (1.0 + math.exp(-raw_score))

        return round(max(0.02, min(0.98, probability)), 3)

    @staticmethod
    def calculate_asset_risk_score(likelihood: float, impact_normalized: float) -> int:
        """
        Calculates a composite risk score (0-100).
        """
        raw = (0.55 * likelihood + 0.45 * impact_normalized) * 100
        return int(round(max(5, min(99, raw))))
