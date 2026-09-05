import React from "react";
import Link from "next/link";
import { TopRiskContributor } from "@/lib/types";
import { formatINR, formatLikelihood } from "@/lib/formatters";
import { Badge } from "@/components/ui/Badge";
import { ArrowUpRight, ChevronRight } from "@/components/icons";

interface TopRiskTableProps {
  contributors: TopRiskContributor[];
}

export function TopRiskTable({ contributors }: TopRiskTableProps) {
  const getStatusVariant = (status: string) => {
    if (status === "Action Required") return "critical";
    if (status === "Elevated Risk") return "high";
    if (status === "Monitored") return "medium";
    return "success";
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-lg shadow-xs overflow-hidden">
      <div className="p-3.5 border-b border-slate-200 flex items-center justify-between">
        <div>
          <div className="text-xs font-bold text-slate-800 tracking-tight">Top Risk Contributors</div>
          <div className="text-[11px] text-slate-500">Assets ranked by financial Expected Annual Loss (EAL)</div>
        </div>
        <Link
          href="/assets"
          className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1"
        >
          <span>View All Assets</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-semibold tracking-wider">
            <tr>
              <th className="py-2.5 px-3.5">Asset</th>
              <th className="py-2.5 px-3">Business Unit</th>
              <th className="py-2.5 px-3">Primary Risk Driver</th>
              <th className="py-2.5 px-3 text-right">Likelihood</th>
              <th className="py-2.5 px-3 text-right">Expected Loss (EAL)</th>
              <th className="py-2.5 px-3 text-center">Trend</th>
              <th className="py-2.5 px-3 text-center">Status</th>
              <th className="py-2.5 px-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {contributors.map((c) => (
              <tr key={c.asset_id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-2.5 px-3.5 font-semibold text-slate-900">
                  {c.asset_name}
                </td>
                <td className="py-2.5 px-3 text-slate-600">{c.business_unit}</td>
                <td className="py-2.5 px-3 text-slate-700">
                  <span className="font-mono text-[11px] bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                    {c.primary_risk_driver}
                  </span>
                </td>
                <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-700">
                  {formatLikelihood(c.incident_likelihood)}
                </td>
                <td className="py-2.5 px-3 text-right font-mono tabular-nums font-bold text-slate-900">
                  {formatINR(c.expected_loss)}
                </td>
                <td className="py-2.5 px-3 text-center">
                  <span className="text-rose-600 font-medium text-[11px] flex items-center justify-center">
                    <ArrowUpRight className="w-3 h-3 mr-0.5" />
                    +4.2%
                  </span>
                </td>
                <td className="py-2.5 px-3 text-center">
                  <Badge variant={getStatusVariant(c.status)}>{c.status}</Badge>
                </td>
                <td className="py-2.5 px-3 text-center">
                  <Link
                    href={`/risk-analysis?asset=${c.asset_id}`}
                    className="text-[11px] font-medium text-blue-600 hover:text-blue-800 underline"
                  >
                    Drilldown
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
