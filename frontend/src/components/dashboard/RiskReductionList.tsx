import React from "react";
import Link from "next/link";
import { RiskReductionOpportunity } from "@/lib/types";
import { formatINR } from "@/lib/formatters";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Zap } from "@/components/icons";

interface RiskReductionListProps {
  opportunities: RiskReductionOpportunity[];
}

export function RiskReductionList({ opportunities }: RiskReductionListProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-lg shadow-xs overflow-hidden">
      <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <div className="text-xs font-bold text-slate-800 dark:text-slate-100 tracking-tight flex items-center space-x-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Risk Reduction Opportunities</span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            High-ROSI security actions ranked by financial impact per rupee invested
          </div>
        </div>
        <Link
          href="/optimizer"
          className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium flex items-center space-x-1"
        >
          <span>Open Optimizer</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-semibold tracking-wider">
            <tr>
              <th className="py-2.5 px-3.5">Recommended Action</th>
              <th className="py-2.5 px-3">Category</th>
              <th className="py-2.5 px-3 text-right">Est. Cost</th>
              <th className="py-2.5 px-3 text-right">Est. Risk Reduction</th>
              <th className="py-2.5 px-3 text-right">ROSI</th>
              <th className="py-2.5 px-3 text-center">Priority</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {opportunities.map((opp) => (
              <tr key={opp.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-2.5 px-3.5 font-semibold text-slate-900 dark:text-slate-100">
                  {opp.action_title}
                  <div className="text-[10px] font-normal text-slate-500 dark:text-slate-400">{opp.applicable_asset}</div>
                </td>
                <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">{opp.category}</td>
                <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-700 dark:text-slate-300">
                  {formatINR(opp.estimated_cost)}
                </td>
                <td className="py-2.5 px-3 text-right font-mono tabular-nums font-bold text-emerald-700 dark:text-emerald-400">
                  {formatINR(opp.estimated_risk_reduction)}
                </td>
                <td className="py-2.5 px-3 text-right font-mono tabular-nums font-bold text-blue-700 dark:text-blue-400">
                  {opp.rosi_percentage}%
                </td>
                <td className="py-2.5 px-3 text-center">
                  <Badge variant={opp.priority === "Critical" ? "critical" : "high"}>
                    {opp.priority}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
