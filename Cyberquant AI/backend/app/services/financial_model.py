"""
Financial Risk Model Service
Quantifies cyber risk into hard monetary exposure (INR), Value at Risk (VaR),
and Expected Annual Loss (EAL) using Monte Carlo statistical simulation.
NOTE: Strict enterprise risk vocabulary rules enforced.
"""

import math
import random
from typing import Dict, Any, Tuple

class FinancialRiskModel:
    """
    Translates technical vulnerability and incident likelihood into Board-level
    financial currency exposure (₹ Crores / Lakhs).
    """

    @staticmethod
    def simulate_loss_distribution(
        downtime_cost_per_hour: float,
        criticality: str,
        incident_likelihood: float,
        simulations: int = 5000,
        seed: int = 42
    ) -> Dict[str, float]:
        """
        Runs a reproducible Monte Carlo simulation over operational loss drivers:
        - Operational downtime loss (log-normal distribution)
        - Breach response & forensics cost
        - Regulatory penalties (e.g. DPDP Act, RBI penalties)
        - Data reconstruction and integrity verification
        """
        rng = random.Random(seed)

        crit_multiplier = {
            "Critical": 2.5,
            "High": 1.6,
            "Medium": 1.0,
            "Low": 0.5
        }.get(criticality, 1.0)

        simulated_losses = []

        # Mean hours of outage under incident scenario
        base_outage_hours = 12.0 * crit_multiplier
        # Forensics & legal incident baseline
        base_forensics = 2500000.0 * crit_multiplier  # ₹25L * multiplier
        # Regulatory fine baseline (risk-weighted)
        base_fine = 4000000.0 * crit_multiplier       # ₹40L * multiplier

        for _ in range(simulations):
            if rng.random() <= incident_likelihood:
                # Incident occurred in this simulated year
                # Outage hours follow log-normal distribution
                outage = rng.lognormvariate(math.log(base_outage_hours), 0.45)
                downtime_loss = outage * downtime_cost_per_hour

                # Breach response cost with variance
                response_cost = rng.gauss(base_forensics, base_forensics * 0.20)

                # Regulatory penalty (50% probability of enforcement investigation)
                penalty = rng.uniform(0.5, 1.8) * base_fine if rng.random() < 0.50 else 0.0

                # Data recovery cost
                recovery_cost = rng.uniform(500000.0, 2000000.0) * crit_multiplier

                total_loss = downtime_loss + response_cost + penalty + recovery_cost
                simulated_losses.append(total_loss)
            else:
                simulated_losses.append(0.0)

        simulated_losses.sort()
        n = len(simulated_losses)

        # Expected Annual Loss (mean of all iterations)
        eal = sum(simulated_losses) / float(n)

        # Value at Risk at 95% confidence (95th percentile)
        var_95_index = int(0.95 * n)
        var_95 = simulated_losses[var_95_index]

        # Value at Risk at 99% confidence (99th percentile)
        var_99_index = int(0.99 * n)
        var_99 = simulated_losses[var_99_index]

        # Max simulated financial exposure
        max_loss = simulated_losses[-1]

        return {
            "expected_annual_loss": round(eal, 2),
            "value_at_risk_95": round(var_95, 2),
            "value_at_risk_99": round(var_99, 2),
            "max_exposure": round(max_loss, 2),
            "downtime_component": round(base_outage_hours * downtime_cost_per_hour * incident_likelihood, 2),
            "breach_response_component": round(base_forensics * incident_likelihood, 2),
            "regulatory_penalties_component": round(base_fine * 0.50 * incident_likelihood, 2),
            "data_recovery_component": round(1200000.0 * crit_multiplier * incident_likelihood, 2)
        }
