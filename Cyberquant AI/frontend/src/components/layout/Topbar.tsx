"use client";

import React, { useState, useEffect } from "react";
import { Building2, RefreshCw, Shield, User, Clock, CheckCircle2, Sun, Moon } from "@/components/icons";

export function Topbar() {
  const [activeRole, setActiveRole] = useState("CISO");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial or stored theme
    if (document.documentElement.classList.contains("dark")) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <header className="h-14 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-5 flex items-center justify-between sticky top-0 z-30 shadow-xs transition-colors duration-200">
      {/* Left: Organization Context */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 transition px-2.5 py-1 rounded-md border border-slate-300/70 dark:border-slate-700 text-slate-800 dark:text-slate-100">
          <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-xs font-semibold tracking-tight">Aegis FinServe Ltd.</span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">IN-MUM-PRD</span>
        </div>

        <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />

        {/* Data Freshness Indicator */}
        <div className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300">Telemetry Sync: 4m ago</span>
        </div>
      </div>

      {/* Right: Theme Toggle, Timestamp, Prototype Badge, Persona Switcher */}
      <div className="flex items-center space-x-3">
        {/* Theme Switcher Button */}
        <button
          onClick={toggleTheme}
          title={isDark ? "Switch to Executive Light" : "Switch to SOC Midnight Theme"}
          className="flex items-center space-x-1.5 text-xs px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
        >
          {isDark ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] font-medium">Light</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-indigo-600" />
              <span className="text-[11px] font-medium">SOC Dark</span>
            </>
          )}
        </button>

        <div className="flex items-center space-x-1 text-xs text-slate-500 dark:text-slate-400 font-mono">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[11px]">05-Sep-2026 21:30 IST</span>
        </div>

        <div className="flex items-center space-x-1 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded text-[11px] font-medium">
          <Shield className="w-3 h-3 text-amber-600 dark:text-amber-400" />
          <span>SIH26105 Prototype</span>
        </div>

        <div className="flex items-center space-x-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-1 rounded-md">
          <User className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
          <span className="text-[11px] text-slate-500 dark:text-slate-400">View:</span>
          <select
            value={activeRole}
            onChange={(e) => setActiveRole(e.target.value)}
            className="text-xs font-semibold text-slate-700 dark:text-slate-200 bg-transparent border-none focus:outline-none cursor-pointer"
          >
            <option value="CISO" className="dark:bg-slate-900">CISO</option>
            <option value="Risk Officer" className="dark:bg-slate-900">Risk Officer</option>
            <option value="Executive" className="dark:bg-slate-900">Executive Board</option>
            <option value="Security Analyst" className="dark:bg-slate-900">Security Analyst</option>
          </select>
        </div>
      </div>
    </header>
  );
}
