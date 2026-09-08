"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { VulnerabilityItem } from "@/lib/types";
import { formatINR, formatLikelihood } from "@/lib/formatters";
import { Badge } from "@/components/ui/Badge";
import { Sparkles } from "@/components/icons";
import { RoleNotice } from "@/components/ui/RoleNotice";

import { FALLBACK_VULNERABILITIES } from "@/lib/fallbackData";

export default function VulnerabilitiesPage() {
  const [vulns, setVulns] = useState<VulnerabilityItem[]>(FALLBACK_VULNERABILITIES);
  const [loading, setLoading] = useState<boolean>(false);
  const [onlyMaterial, setOnlyMaterial] = useState<boolean>(false);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await api.getVulnerabilities(onlyMaterial);
        if (data && data.length > 0) setVulns(data);
      } catch (err) {
        console.error("Failed to sync vulnerabilities:", err);
      }
    }
    loadData();
  }, [onlyMaterial]);

  return (
    <RoleNotice
      moduleName="Vulnerabilities"
      recommendedRole="Security Analyst"
      reason="Executive Board and CFO personas review aggregate financial risk exposure rather than low-level CVE registries. Technical vulnerability prioritization is managed by SecOps."
    >
      <div className="space-y-4 max-w-7xl mx-auto pb-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200/90 dark:border-slate-800 shadow-xs transition-colors">
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">Vulnerability Inventory & Materiality</h1>
              <Badge variant="neutral">NVD & CISA KEV Ingest</Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Enriched vulnerability repository linking technical CVSS scores to business financial impact and exploit weaponization.
            </p>
          </div>

          {/* MATERIALITY TOGGLE */}
          <div className="flex items-center space-x-2.5 bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/90 dark:border-blue-800/80 px-3.5 py-2 rounded-lg">
            <input
              id="materialToggle"
              type="checkbox"
              checked={onlyMaterial}
              onChange={(e) => setOnlyMaterial(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded border-slate-300 dark:border-slate-700 focus:ring-0 cursor-pointer accent-blue-600"
            />
            <label htmlFor="materialToggle" className="text-xs font-semibold text-blue-900 dark:text-blue-200 cursor-pointer select-none">
              Show only financially material vulnerabilities
            </label>
          </div>
        </div>

        {/* Info Callout */}
        {onlyMaterial && (
          <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 p-3 rounded-lg text-xs text-amber-900 dark:text-amber-200 flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>
              <strong>Materiality Filter Active:</strong> Filtered out low-financial-consequence CVEs (e.g. non-critical test systems), prioritizing only vulnerabilities creating actionable monetary exposure.
            </span>
          </div>
        )}

        {/* VULNERABILITIES TABLE */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-lg shadow-xs overflow-hidden transition-colors">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-semibold tracking-wider">
                <tr>
                  <th className="py-2.5 px-3.5">CVE Identifier</th>
                  <th className="py-2.5 px-3 text-center">CVSS v3</th>
                  <th className="py-2.5 px-3 text-center">CISA KEV</th>
                  <th className="py-2.5 px-3 text-center">Exploit Status</th>
                  <th className="py-2.5 px-3">Affected Asset</th>
                  <th className="py-2.5 px-3 text-center">Patch Age</th>
                  <th className="py-2.5 px-3 text-right">Likelihood</th>
                  <th className="py-2.5 px-3 text-right">Expected Loss</th>
                  <th className="py-2.5 px-3 text-center">Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {loading ? (
                  <tr>
                    <td colSpan={9} className="py-8 text-center text-slate-400">Loading vulnerabilities...</td>
                  </tr>
                ) : (
                  vulns.map((v) => (
                    <tr key={v.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-2.5 px-3.5">
                        <div className="font-mono font-bold text-slate-900 dark:text-slate-100">{v.cve_id}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-xs">{v.summary}</div>
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono font-bold">
                        <span className={v.cvss >= 9.0 ? "text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 px-1.5 py-0.5 rounded border border-rose-200 dark:border-rose-900" : "text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-200 dark:border-amber-900"}>
                          {v.cvss.toFixed(1)}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        {v.kev_status ? (
                          <Badge variant="critical">KEV Listed</Badge>
                        ) : (
                          <span className="text-[10px] text-slate-400">No</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        {v.exploit_available ? (
                          <Badge variant="high">Weaponized</Badge>
                        ) : (
                          <span className="text-[10px] text-slate-400">PoC / None</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="font-semibold text-slate-800 dark:text-slate-200">{v.affected_asset_name}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">{v.asset_criticality} Tier</div>
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono tabular-nums text-slate-600 dark:text-slate-400">
                        <span className={v.patch_age_days > 60 ? "text-rose-700 dark:text-rose-400 font-bold" : ""}>
                          {v.patch_age_days} days
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-700 dark:text-slate-300">
                        {formatLikelihood(v.incident_likelihood)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums font-bold text-slate-900 dark:text-slate-100">
                        {formatINR(v.expected_loss)}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <Badge variant={v.priority === "Critical" ? "critical" : v.priority === "High" ? "high" : "medium"}>
                          {v.priority}
                        </Badge>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </RoleNotice>
  );
}
