"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { SimulationResponse } from "@/lib/types";
import { formatINR } from "@/lib/formatters";
import { MetricCard } from "@/components/ui/MetricCard";
import { Sliders, ArrowRight, ShieldCheck, CheckCircle2, TrendingDown, RefreshCw, Zap } from "@/components/icons";

import { FALLBACK_SIMULATION } from "@/lib/fallbackData";

export default function SimulatorPage() {
  const [mfaPrivileged, setMfaPrivileged] = useState<boolean>(false);
  const [patchCritical, setPatchCritical] = useState<boolean>(false);
  const [edrCoverage, setEdrCoverage] = useState<number>(74);
  const [networkSegmentation, setNetworkSegmentation] = useState<boolean>(false);
  const [backupResilience, setBackupResilience] = useState<boolean>(false);
  const [delayDays, setDelayDays] = useState<number>(0);

  const [simResult, setSimResult] = useState<SimulationResponse>(FALLBACK_SIMULATION);
  const [calculating, setCalculating] = useState<boolean>(false);

  // Recalculate whenever any control changes
  useEffect(() => {
    async function runSim() {
      setCalculating(true);
      try {
        const res = await api.simulateScenario({
          mfa_privileged: mfaPrivileged,
          patch_critical: patchCritical,
          edr_coverage_percent: edrCoverage,
          network_segmentation: networkSegmentation,
          backup_resilience: backupResilience,
          delay_remediation_days: delayDays
        });
        setSimResult(res);
      } catch (err) {
        console.error("Simulation error:", err);
      } finally {
        setCalculating(false);
      }
    }
    runSim();
  }, [mfaPrivileged, patchCritical, edrCoverage, networkSegmentation, backupResilience, delayDays]);

  const handleReset = () => {
    setMfaPrivileged(false);
    setPatchCritical(false);
    setEdrCoverage(74);
    setNetworkSegmentation(false);
    setBackupResilience(false);
    setDelayDays(0);
  };

  const handleRecommendedScenario = () => {
    setMfaPrivileged(true);
    setPatchCritical(true);
    setEdrCoverage(95);
    setNetworkSegmentation(true);
    setBackupResilience(false);
    setDelayDays(0);
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-lg font-bold tracking-tight text-slate-900">Interactive What-If Risk Simulator</h1>
            <span className="text-[11px] font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
              Live Recalculation
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Simulate mitigation controls, patch velocity, and delays to observe immediate financial exposure reduction.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleRecommendedScenario}
            className="text-xs bg-blue-600 hover:bg-blue-700 text-white font-medium px-3 py-1.5 rounded transition shadow-xs flex items-center space-x-1.5"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Load Quick Win Scenario</span>
          </button>
          <button
            onClick={handleReset}
            className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-3 py-1.5 rounded transition border border-slate-300"
          >
            Reset
          </button>
        </div>
      </div>

      {/* 3-COLUMN INTERACTIVE LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* LEFT: Current Baseline Risk */}
        <div className="bg-white border border-slate-200/90 rounded-lg p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Current Baseline Risk</span>
              <span className="text-[10px] text-slate-400 font-mono">Status Quo</span>
            </div>

            <div className="space-y-3 mt-3">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-[11px] text-slate-500 font-medium">Gross Financial Exposure</div>
                <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
                  {simResult ? formatINR(simResult.baseline_exposure) : "₹8.42 Cr"}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Aggregate single-event risk liability</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-[11px] text-slate-500 font-medium">Expected Annual Loss (EAL)</div>
                <div className="text-xl font-bold font-mono text-amber-700 mt-1">
                  {simResult ? formatINR(simResult.baseline_eal) : "₹3.17 Cr"}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Annualized probability-weighted loss</div>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] text-slate-500">
            Current controls reflect standard baseline perimeter defenses with 7 unpatched critical CVEs.
          </div>
        </div>

        {/* MIDDLE: Scenario Controls */}
        <div className="bg-white border border-slate-200/90 rounded-lg p-4 shadow-xs">
          <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
            <Sliders className="w-4 h-4 text-blue-600" />
            <span>Scenario Intervention Controls</span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Control 1: MFA */}
            <label className="flex items-start justify-between p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100/80 transition cursor-pointer">
              <div className="pr-2">
                <span className="font-semibold text-slate-900 block">Enforce Privileged MFA</span>
                <span className="text-[11px] text-slate-500">Hardware token on admin jump-boxes & IAM accounts</span>
              </div>
              <input
                type="checkbox"
                checked={mfaPrivileged}
                onChange={(e) => setMfaPrivileged(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded mt-1 cursor-pointer"
              />
            </label>

            {/* Control 2: Patch Critical */}
            <label className="flex items-start justify-between p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100/80 transition cursor-pointer">
              <div className="pr-2">
                <span className="font-semibold text-slate-900 block">Patch Critical CISA KEV Vulnerabilities</span>
                <span className="text-[11px] text-slate-500">Emergency out-of-band deployment on Payment & DB</span>
              </div>
              <input
                type="checkbox"
                checked={patchCritical}
                onChange={(e) => setPatchCritical(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded mt-1 cursor-pointer"
              />
            </label>

            {/* Control 3: EDR Slider */}
            <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between font-semibold text-slate-900 mb-1">
                <span>Managed EDR Coverage</span>
                <span className="font-mono text-blue-600 font-bold">{edrCoverage}%</span>
              </div>
              <input
                type="range"
                min={50}
                max={100}
                value={edrCoverage}
                onChange={(e) => setEdrCoverage(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                <span>50%</span>
                <span>Baseline (74%)</span>
                <span>100%</span>
              </div>
            </div>

            {/* Control 4: Network Segmentation */}
            <label className="flex items-start justify-between p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100/80 transition cursor-pointer">
              <div className="pr-2">
                <span className="font-semibold text-slate-900 block">Payment Network Micro-segmentation</span>
                <span className="text-[11px] text-slate-500">Isolate PCI-DSS zone from internal corporate subnets</span>
              </div>
              <input
                type="checkbox"
                checked={networkSegmentation}
                onChange={(e) => setNetworkSegmentation(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded mt-1 cursor-pointer"
              />
            </label>

            {/* Control 5: Backup Resilience */}
            <label className="flex items-start justify-between p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100/80 transition cursor-pointer">
              <div className="pr-2">
                <span className="font-semibold text-slate-900 block">Air-Gapped Immutable Backup Vault</span>
                <span className="text-[11px] text-slate-500">Accelerates disaster recovery RTO to &lt; 2.5 hours</span>
              </div>
              <input
                type="checkbox"
                checked={backupResilience}
                onChange={(e) => setBackupResilience(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded mt-1 cursor-pointer"
              />
            </label>

            {/* Control 6: Remediation Delay */}
            <div className="p-2.5 rounded-lg border border-rose-200/80 bg-rose-50/40">
              <div className="flex items-center justify-between font-semibold text-rose-900 mb-1">
                <span>Delay Remediation SLA</span>
                <span className="font-mono text-rose-700 font-bold">+{delayDays} days</span>
              </div>
              <input
                type="range"
                min={0}
                max={60}
                step={5}
                value={delayDays}
                onChange={(e) => setDelayDays(Number(e.target.value))}
                className="w-full accent-rose-600 cursor-pointer"
              />
              <div className="text-[10px] text-rose-700 mt-0.5">
                Simulates business cost of postponing patch deployment
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Projected Outcome */}
        <div className="bg-white border border-slate-200/90 rounded-lg p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Projected Risk Post-Intervention</span>
              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Live Projected
              </span>
            </div>

            {simResult && (
              <div className="space-y-3 mt-3">
                <div className="p-3 bg-emerald-50/70 rounded-lg border border-emerald-200">
                  <div className="text-[11px] text-emerald-800 font-medium">Projected Exposure</div>
                  <div className="text-2xl font-bold font-mono text-emerald-950 mt-1">
                    {formatINR(simResult.projected_exposure)}
                  </div>
                  <div className="text-[11px] text-emerald-800 font-semibold mt-1">
                    Reduced by {formatINR(simResult.risk_reduction)} ({simResult.reduction_percentage}%)
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="text-[11px] text-slate-500 font-medium">Projected EAL</div>
                  <div className="text-xl font-bold font-mono text-slate-900 mt-1">
                    {formatINR(simResult.projected_eal)}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">
                    Annual savings: {formatINR(simResult.baseline_eal - simResult.projected_eal)}
                  </div>
                </div>

                {/* Most Influential Change Callout */}
                <div className="p-3 bg-blue-50/80 rounded-lg border border-blue-200 text-blue-900">
                  <div className="text-[10px] uppercase font-bold text-blue-600 mb-0.5">Most Influential Change</div>
                  <div className="text-xs font-semibold">{simResult.most_influential_change}</div>
                </div>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-100 text-[10px] text-slate-400">
            Calculated via deterministic continuous risk transfer functions.
          </div>
        </div>
      </div>

      {/* BEFORE VS AFTER ASSET BREAKDOWN TABLE */}
      {simResult && (
        <div className="bg-white border border-slate-200/90 rounded-lg shadow-xs overflow-hidden">
          <div className="p-3.5 border-b border-slate-200">
            <h2 className="text-xs font-bold text-slate-800 tracking-tight">Before vs. After Asset Impact Breakdown</h2>
            <p className="text-[11px] text-slate-500">Asset-by-asset Expected Annual Loss delta under current simulated scenario</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-semibold tracking-wider">
                <tr>
                  <th className="py-2.5 px-3.5">Asset</th>
                  <th className="py-2.5 px-3 text-right">Baseline Loss</th>
                  <th className="py-2.5 px-3 text-right">Projected Loss</th>
                  <th className="py-2.5 px-3 text-right">Monetary Savings</th>
                  <th className="py-2.5 px-3 text-center">Reduction %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {simResult.deltas_by_asset.map((d) => (
                  <tr key={d.asset_id} className="hover:bg-slate-50/70">
                    <td className="py-2.5 px-3.5 font-semibold text-slate-900">{d.asset_name}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-600">{formatINR(d.baseline_loss)}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">{formatINR(d.projected_loss)}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-700">
                      {formatINR(d.baseline_loss - d.projected_loss)}
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono font-bold text-emerald-700">
                      -{d.reduction_percentage}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
