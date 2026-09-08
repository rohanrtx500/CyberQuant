"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { AssetDetail } from "@/lib/types";
import { formatINR } from "@/lib/formatters";
import { Badge } from "@/components/ui/Badge";
import {
  Server,
  Filter,
  Search,
  X,
  Shield,
  AlertTriangle,
  ExternalLink,
  Clock,
  Activity,
  DollarSign
} from "@/components/icons";

import { FALLBACK_ASSETS } from "@/lib/fallbackData";

export default function AssetsPage() {
  const [assets, setAssets] = useState<AssetDetail[]>(FALLBACK_ASSETS);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedAsset, setSelectedAsset] = useState<AssetDetail | null>(null);

  // Filters
  const [buFilter, setBuFilter] = useState<string>("All");
  const [critFilter, setCritFilter] = useState<string>("All");
  const [internetOnly, setInternetOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    async function loadAssets() {
      try {
        const list = await api.getAssets({
          business_unit: buFilter,
          criticality: critFilter,
          internet_exposed: internetOnly ? true : undefined,
          search: searchQuery
        });
        if (list && list.length > 0) setAssets(list);
      } catch (err) {
        console.error("Failed to sync assets:", err);
      }
    }
    loadAssets();
  }, [buFilter, critFilter, internetOnly, searchQuery]);

  const getStatusVariant = (status: string) => {
    if (status === "Action Required") return "critical";
    if (status === "Elevated Risk") return "high";
    if (status === "Monitored") return "medium";
    return "success";
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-8 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200/90 shadow-xs">
        <div>
          <h1 className="text-lg font-bold tracking-tight text-slate-900">Enterprise Asset Inventory</h1>
          <p className="text-xs text-slate-500">
            Comprehensive business asset catalog with continuous control monitoring and financial liability mapping.
          </p>
        </div>
        <div className="text-xs font-mono text-slate-600 bg-slate-50 px-3 py-1.5 rounded border border-slate-200">
          Showing <strong className="text-slate-900">{assets.length}</strong> assets
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white p-3 rounded-lg border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search asset, type or unit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 w-52"
            />
          </div>

          {/* Business Unit Filter */}
          <select
            value={buFilter}
            onChange={(e) => setBuFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-slate-700 focus:outline-none"
          >
            <option value="All">All Business Units</option>
            <option value="Payments">Payments</option>
            <option value="Retail Banking">Retail Banking</option>
            <option value="Corporate IT">Corporate IT</option>
            <option value="Cloud Infrastructure">Cloud Infrastructure</option>
            <option value="Customer Support">Customer Support</option>
          </select>

          {/* Criticality Filter */}
          <select
            value={critFilter}
            onChange={(e) => setCritFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-slate-700 focus:outline-none"
          >
            <option value="All">All Criticality</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          {/* Internet Exposed Toggle */}
          <label className="flex items-center space-x-1.5 text-xs text-slate-700 cursor-pointer select-none bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded">
            <input
              type="checkbox"
              checked={internetOnly}
              onChange={(e) => setInternetOnly(e.target.checked)}
              className="rounded text-blue-600 focus:ring-0"
            />
            <span>Internet Exposed Only</span>
          </label>
        </div>

        {(buFilter !== "All" || critFilter !== "All" || internetOnly || searchQuery) && (
          <button
            onClick={() => {
              setBuFilter("All");
              setCritFilter("All");
              setInternetOnly(false);
              setSearchQuery("");
            }}
            className="text-xs text-rose-600 hover:text-rose-800 font-medium flex items-center space-x-1"
          >
            <X className="w-3.5 h-3.5" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>

      {/* ASSETS TABLE */}
      <div className="bg-white border border-slate-200/90 rounded-lg shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-semibold tracking-wider">
              <tr>
                <th className="py-2.5 px-3.5">Asset</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Business Unit</th>
                <th className="py-2.5 px-3">Criticality</th>
                <th className="py-2.5 px-3">Exposure</th>
                <th className="py-2.5 px-3 text-center">Control Eff.</th>
                <th className="py-2.5 px-3 text-center">Risk Score</th>
                <th className="py-2.5 px-3 text-right">Financial Exposure</th>
                <th className="py-2.5 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {assets.map((asset) => (
                <tr
                  key={asset.id}
                  onClick={() => setSelectedAsset(asset)}
                  className={`cursor-pointer hover:bg-slate-50/90 transition-colors ${
                    selectedAsset?.id === asset.id ? "bg-blue-50/60" : ""
                  }`}
                >
                  <td className="py-2.5 px-3.5 font-semibold text-slate-900">
                    <div className="flex items-center space-x-2">
                      <Server className="w-3.5 h-3.5 text-slate-400" />
                      <span>{asset.name}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">{asset.type}</td>
                  <td className="py-2.5 px-3 text-slate-600">{asset.business_unit}</td>
                  <td className="py-2.5 px-3">
                    <Badge variant={asset.criticality === "Critical" ? "critical" : asset.criticality === "High" ? "high" : "medium"}>
                      {asset.criticality}
                    </Badge>
                  </td>
                  <td className="py-2.5 px-3">
                    {asset.internet_exposed ? (
                      <span className="inline-flex items-center text-[10px] font-medium text-rose-700 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded">
                        Public Ingress
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-[10px] font-medium text-slate-600 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">
                        Internal Only
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono tabular-nums text-slate-700">
                    {(asset.control_effectiveness * 100).toFixed(0)}%
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono tabular-nums font-bold">
                    <span className={asset.risk_score >= 80 ? "text-rose-700" : asset.risk_score >= 60 ? "text-amber-700" : "text-emerald-700"}>
                      {asset.risk_score}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono tabular-nums font-bold text-slate-900">
                    {formatINR(asset.financial_exposure)}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <Badge variant={getStatusVariant(asset.status)}>{asset.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* RIGHT-SIDE ASSET DETAIL DRAWER */}
      {selectedAsset && (
        <div className="fixed inset-y-0 right-0 w-96 bg-white border-l border-slate-300 shadow-2xl z-50 flex flex-col p-5 overflow-y-auto">
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Asset Telemetry Drawer</div>
              <h2 className="text-base font-bold text-slate-900">{selectedAsset.name}</h2>
              <div className="text-xs text-slate-500">{selectedAsset.type} · {selectedAsset.business_unit}</div>
            </div>
            <button
              onClick={() => setSelectedAsset(null)}
              className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4 text-xs flex-1">
            {/* Financial Overview */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">Financial Loss Exposure</div>
              <div className="text-xl font-bold font-mono text-slate-900">{formatINR(selectedAsset.financial_exposure)}</div>
              <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-200 text-[11px]">
                <div>
                  <span className="text-slate-500">Expected Annual Loss:</span>
                  <div className="font-mono font-bold text-slate-800">{formatINR(selectedAsset.expected_annual_loss)}</div>
                </div>
                <div>
                  <span className="text-slate-500">Hourly Outage Cost:</span>
                  <div className="font-mono font-bold text-slate-800">{formatINR(selectedAsset.downtime_cost_per_hour)}/hr</div>
                </div>
              </div>
            </div>

            {/* Active Controls */}
            <div>
              <div className="font-bold text-slate-800 mb-1.5 flex items-center space-x-1.5">
                <Shield className="w-3.5 h-3.5 text-blue-600" />
                <span>Active Security Controls</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedAsset.controls_active.map((ctrl, i) => (
                  <span key={i} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                    {ctrl}
                  </span>
                ))}
              </div>
            </div>

            {/* Recent Telemetry Incidents */}
            <div>
              <div className="font-bold text-slate-800 mb-1.5 flex items-center space-x-1.5">
                <Activity className="w-3.5 h-3.5 text-amber-600" />
                <span>Recent Telemetry Events</span>
              </div>
              <ul className="space-y-1.5">
                {selectedAsset.recent_incidents.map((inc, i) => (
                  <li key={i} className="text-[11px] text-slate-600 bg-amber-50/60 p-2 rounded border border-amber-200/60 flex items-start space-x-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended Action */}
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-blue-900">
              <div className="font-bold mb-1">Recommended Action</div>
              <p className="text-[11px] leading-relaxed">
                Prioritize deployment of Privileged MFA and micro-segmentation to reduce exposure by ~40%.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
