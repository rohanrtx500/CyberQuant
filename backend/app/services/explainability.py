"""
Risk Engine Feature Attribution & Explainability Service
Translates statistical feature weights and telemetry contributions into
clear, board-level explanations of why an asset or vulnerability has high financial risk.
NOTE: Strict enterprise risk vocabulary rules enforced.
"""

from typing import List, Dict, Any
from app.schemas.models import FeatureAttribution

class RiskExplainability:
    """
    Decomposes risk prediction scores into contributing factors,
    displaying positive contributors (increasing risk) and negative contributors (mitigating controls).
    """

    @staticmethod
    def get_asset_feature_attribution(asset_id: str) -> List[FeatureAttribution]:
        """
        Returns feature contributions for the specified asset.
        """
        if asset_id == "asset-01" or "payment" in asset_id.lower():
            return [
                FeatureAttribution(
                    feature_name="Active KEV Exploit Weaponization",
                    contribution_percentage=28.4,
                    impact_direction="increases_risk",
                    description="CVE-2024-38077 and CVE-2024-3400 have public exploit code weaponized in-the-wild."
                ),
                FeatureAttribution(
                    feature_name="Direct Public Ingress Exposure",
                    contribution_percentage=21.2,
                    impact_direction="increases_risk",
                    description="Asset listens on internet-facing IP addresses with high external threat reconnaissance."
                ),
                FeatureAttribution(
                    feature_name="Critical Business Asset Valuation",
                    contribution_percentage=18.6,
                    impact_direction="increases_risk",
                    description="Processes core payment transactions with an estimated downtime cost of ₹3.2 Lakhs per hour."
                ),
                FeatureAttribution(
                    feature_name="Incomplete Privileged MFA Policy",
                    contribution_percentage=14.1,
                    impact_direction="increases_risk",
                    description="Administrative maintenance port allows single-factor authentication from internal subnets."
                ),
                FeatureAttribution(
                    feature_name="Overdue Critical Patch SLA (>60 Days)",
                    contribution_percentage=11.5,
                    impact_direction="increases_risk",
                    description="2 critical CVEs remain unpatched past the organization's 14-day SLA deadline."
                ),
                FeatureAttribution(
                    feature_name="Active Host EDR Agent Monitoring",
                    contribution_percentage=-6.2,
                    impact_direction="mitigates_risk",
                    description="Active host-level telemetry partially impedes lateral movement and post-exploitation persistence."
                )
            ]
        elif asset_id == "asset-02" or "database" in asset_id.lower():
            return [
                FeatureAttribution(
                    feature_name="High-Density PII & Financial Records",
                    contribution_percentage=32.0,
                    impact_direction="increases_risk",
                    description="Holds unencrypted transaction tables subject to strict regulatory penalty mandates."
                ),
                FeatureAttribution(
                    feature_name="Active OpenSSH RCE Vulnerability",
                    contribution_percentage=26.5,
                    impact_direction="increases_risk",
                    description="CVE-2024-6387 (regreSSHion) unpatched on database node cluster."
                ),
                FeatureAttribution(
                    feature_name="Internal Service Account Privilege Sprawl",
                    contribution_percentage=16.8,
                    impact_direction="increases_risk",
                    description="Excessive read/write grants assigned to legacy microservices without mTLS."
                ),
                FeatureAttribution(
                    feature_name="Isolated Non-Internet Network Segment",
                    contribution_percentage=-14.2,
                    impact_direction="mitigates_risk",
                    description="Database is not directly addressable from public IP space."
                )
            ]
        else:
            return [
                FeatureAttribution(
                    feature_name="Vulnerability Severity & Threat Exposure",
                    contribution_percentage=35.0,
                    impact_direction="increases_risk",
                    description="Presence of unpatched vulnerabilities with known exploit vectors."
                ),
                FeatureAttribution(
                    feature_name="Asset Operational Criticality",
                    contribution_percentage=28.0,
                    impact_direction="increases_risk",
                    description="Asset outage directly impacts business continuity and revenue velocity."
                ),
                FeatureAttribution(
                    feature_name="Baseline Perimeter Controls",
                    contribution_percentage=-12.0,
                    impact_direction="mitigates_risk",
                    description="Standard firewall rules and monitoring agents reduce unauthenticated intrusion risk."
                )
            ]
