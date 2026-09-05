"use client";

import React, { useState } from "react";
import { Building2, RefreshCw, Shield, User, Clock, CheckCircle2 } from "@/components/icons";

export function Topbar() {
  const [activeRole, setActiveRole] = useState("CISO");

  return (
    <header className="h-14 bg-white border-b border-slate-200 px-5 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Left: Organization Context */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200/80 transition px-2.5 py-1 rounded border border-slate-300/70 text-slate-800">
          <Building2 className="w-4 h-4 text-slate-600" />
          <span className="text-xs font-semibold tracking-tight">Aegis FinServe Ltd.</span>
          <span className="text-[10px] text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">IN-MUM-PRD</span>
        </div>

        <div className="h-4 w-px bg-slate-200" />

        {/* Data Freshness Indicator */}
        <div className="flex items-center space-x-1.5 text-xs text-slate-500">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-medium text-slate-600">Telemetry Sync: 4m ago</span>
        </div>
      </div>

      {/* Right: Timestamp, Prototype Badge, Persona Switcher */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1 text-xs text-slate-500 font-mono">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[11px]">05-Sep-2026 21:30 IST</span>
        </div>

        <div className="flex items-center space-x-1 bg-amber-50 border border-amber-200/80 text-amber-800 px-2 py-0.5 rounded text-[11px] font-medium">
          <Shield className="w-3 h-3 text-amber-600" />
          <span>SIH26105 Prototype</span>
        </div>

        <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-200 px-2 py-1 rounded">
          <User className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-[11px] text-slate-500">View:</span>
          <select
            value={activeRole}
            onChange={(e) => setActiveRole(e.target.value)}
            className="text-xs font-semibold text-slate-700 bg-transparent border-none focus:outline-none cursor-pointer"
          >
            <option value="CISO">CISO</option>
            <option value="Risk Officer">Risk Officer</option>
            <option value="Executive">Executive Board</option>
            <option value="Security Analyst">Security Analyst</option>
          </select>
        </div>
      </div>
    </header>
  );
}
