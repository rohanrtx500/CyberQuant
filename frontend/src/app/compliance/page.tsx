"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { ComplianceItem, CompliancePostureSummary } from "@/lib/types";
import { formatINR } from "@/lib/formatters";
import { Badge } from "@/components/ui/Badge";
import { CheckSquare, AlertTriangle, ShieldCheck, FileCheck, CheckCircle2 } from "@/components/icons";

import { FALLBACK_COMPLIANCE_ITEMS, FALLBACK_COMPLIANCE_POSTURE } from "@/lib/fallbackData";

const FRAMEWORKS = [
  "All",
  "NIST CSF 2.0",
  "ISO/IEC 27001",
  "RBI Cyber Security Framework",
  "SEBI CSCRF",
  "CIS Controls"
];

export default function CompliancePage() {
  const [selectedFramework, setSelectedFramework] = useState<string>("All");
  const [items, setItems] = useState<ComplianceItem[]>(FALLBACK_COMPLIANCE_ITEMS);
  const [postures, setPostures] = useState<CompliancePostureSummary[]>(FALLBACK_COMPLIANCE_POSTURE);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function loadCompliance() {
      try {
        const [itemList, postureList] = await Promise.all([
          api.getComplianceItems(selectedFramework),
          api.getCompliancePosture()
        ]);
        if (itemList && itemList.length > 0) setItems(itemList);
        if (postureList && postureList.length > 0) setPostures(postureList);
      } catch (err) {
        console.error("Compliance sync note:", err);
      }
    }
    loadCompliance();
  }, [selectedFramework]);

  const getStatusBadge = (status: string) => {
    if (status === "Compliant") return <Badge variant="success">Compliant</Badge>;
    if (status === "Partial") return <Badge variant="warning">Partial Compliance</Badge>;
    return <Badge variant="critical">Audit Gap</Badge>;
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-lg font-bold tracking-tight text-slate-900">Regulatory Compliance & Framework Crosswalk</h1>
            <Badge variant="info">Audit-Ready</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Maps technical security telemetry and findings to statutory mandates (NIST CSF 2.0, RBI CSF, SEBI CSCRF, ISO 27001).
          </p>
        </div>

        <div className="text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded border border-slate-200">
          Statutory Scope: <strong>Indian Financial Regulators (RBI & SEBI)</strong>
        </div>
      </div>

      {/* POSTURE SUMMARY CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {postures.map((p) => (
          <div key={p.framework} className="bg-white p-3 rounded-lg border border-slate-200/90 shadow-xs">
            <div className="text-[10px] uppercase font-bold text-slate-500 truncate" title={p.framework}>
              {p.framework}
            </div>
            <div className="text-xl font-bold font-mono text-slate-900 mt-1">
              {p.compliance_score}%
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2 pt-2 border-t border-slate-100">
              <span className="text-emerald-700 font-semibold">{p.compliant_count} Pass</span>
              <span className="text-amber-700 font-semibold">{p.partial_count} Part</span>
              <span className="text-rose-700 font-semibold">{p.gap_count} Gaps</span>
            </div>
          </div>
        ))}
      </div>

      {/* FRAMEWORK TABS */}
      <div className="flex items-center space-x-1.5 overflow-x-auto border-b border-slate-200 pb-2">
        {FRAMEWORKS.map((fw) => (
          <button
            key={fw}
            onClick={() => setSelectedFramework(fw)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition whitespace-nowrap ${
              selectedFramework === fw
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {fw}
          </button>
        ))}
      </div>

      {/* MAPPING TABLE */}
      <div className="bg-white border border-slate-200/90 rounded-lg shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-semibold tracking-wider">
              <tr>
                <th className="py-2.5 px-3.5">Framework Req.</th>
                <th className="py-2.5 px-3">Control / Technical Finding</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-3">Audit Evidence</th>
                <th className="py-2.5 px-3 text-right">Residual Exposure</th>
                <th className="py-2.5 px-3">Recommended Remediation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">Loading audit findings...</td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70">
                    <td className="py-2.5 px-3.5 font-mono text-slate-900">
                      <div className="font-bold">{item.requirement_id}</div>
                      <div className="text-[10px] text-slate-500 font-sans">{item.framework}</div>
                    </td>
                    <td className="py-2.5 px-3 text-slate-800">
                      <div className="font-semibold">{item.requirement_name}</div>
                      <div className="text-[11px] text-slate-600 mt-0.5">{item.control_finding}</div>
                    </td>
                    <td className="py-2.5 px-3 text-center">{getStatusBadge(item.status)}</td>
                    <td className="py-2.5 px-3 font-mono text-[11px] text-slate-600">
                      {item.evidence}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums font-bold text-slate-900">
                      {item.residual_exposure > 0 ? formatINR(item.residual_exposure) : "₹0"}
                    </td>
                    <td className="py-2.5 px-3 text-slate-700 text-[11px]">
                      {item.recommended_action}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
