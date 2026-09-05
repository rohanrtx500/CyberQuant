"""
Compliance Mapping & Regulatory Crosswalk Service
Maps cybersecurity findings, controls, and residual financial exposures
across NIST CSF 2.0, ISO/IEC 27001, CIS Controls, RBI Cyber Security Framework, and SEBI CSCRF.
NOTE: Strict enterprise risk vocabulary rules enforced.
"""

from typing import List, Dict, Any
from app.data.seed_data import COMPLIANCE_ITEMS
from app.schemas.models import ComplianceItem, CompliancePostureSummary

class ComplianceMapper:
    """
    Evaluates compliance posture and links control gaps to financial exposures.
    """

    @staticmethod
    def get_items(framework: str = "All") -> List[ComplianceItem]:
        items = [ComplianceItem(**item) for item in COMPLIANCE_ITEMS]
        if framework and framework != "All":
            return [i for i in items if i.framework.lower() == framework.lower()]
        return items

    @staticmethod
    def get_posture_summaries() -> List[CompliancePostureSummary]:
        frameworks = ["NIST CSF 2.0", "ISO/IEC 27001", "RBI Cyber Security Framework", "SEBI CSCRF", "CIS Controls"]
        summaries = []

        all_items = [ComplianceItem(**item) for item in COMPLIANCE_ITEMS]

        # Seeded realistic posture scores
        posture_defaults = {
            "NIST CSF 2.0": {"total": 24, "compliant": 18, "partial": 4, "gap": 2, "score": 79.2},
            "ISO/IEC 27001": {"total": 32, "compliant": 26, "partial": 5, "gap": 1, "score": 84.4},
            "RBI Cyber Security Framework": {"total": 28, "compliant": 23, "partial": 3, "gap": 2, "score": 83.9},
            "SEBI CSCRF": {"total": 22, "compliant": 19, "partial": 2, "gap": 1, "score": 88.6},
            "CIS Controls": {"total": 30, "compliant": 24, "partial": 4, "gap": 2, "score": 83.3}
        }

        for fw in frameworks:
            stats = posture_defaults.get(fw, {"total": 20, "compliant": 15, "partial": 3, "gap": 2, "score": 80.0})
            summaries.append(CompliancePostureSummary(
                framework=fw,
                total_controls=stats["total"],
                compliant_count=stats["compliant"],
                partial_count=stats["partial"],
                gap_count=stats["gap"],
                compliance_score=stats["score"]
            ))

        return summaries
