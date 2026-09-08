"use client";

import React, { useState, useEffect } from "react";
import { Building2, User, Clock, Sun, Moon } from "@/components/icons";
import { useRole, UserRole } from "@/context/RoleContext";

export function Topbar() {
  const { role, setRole, config } = useRole();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem("cyberquant_theme");
      if (storedTheme === "dark" || (!storedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        setIsDark(true);
        document.documentElement.classList.add("dark");
      } else {
        setIsDark(false);
        document.documentElement.classList.remove("dark");
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    try {
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("cyberquant_theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("cyberquant_theme", "light");
      }
    } catch {
      // ignore
    }
  };

  return (
    <header className="h-14 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-5 flex items-center justify-between sticky top-0 z-30 shadow-xs transition-colors duration-200 select-none">
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

      {/* Right: Theme Toggle, Timestamp, Persona Switcher */}
      <div className="flex items-center space-x-3">
        {/* Theme Switcher Button */}
        <button
          onClick={toggleTheme}
          title={isDark ? "Switch to Light Theme" : "Switch to Dark SOC Theme"}
          className="flex items-center space-x-1.5 text-xs px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer"
        >
          {isDark ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] font-medium">Light</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span className="text-[11px] font-medium">SOC Dark</span>
            </>
          )}
        </button>

        <div className="hidden lg:flex items-center space-x-1 text-xs text-slate-500 dark:text-slate-400 font-mono">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[11px]">05-Sep-2026 21:30 IST</span>
        </div>

        {/* Active Role Persona Badge */}
        <div className={`hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-md border text-[11px] font-semibold transition-all ${config.badgeColor}`}>
          <span className={`w-2 h-2 rounded-full ${config.dotColor}`}></span>
          <span>{config.badgeLabel}</span>
        </div>

        {/* Persona Switcher Dropdown */}
        <div className="flex items-center space-x-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-md shadow-xs">
          <User className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Role:</span>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
            className="text-xs font-semibold text-slate-800 dark:text-slate-100 bg-transparent border-none focus:outline-none cursor-pointer"
          >
            <option value="CISO" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">CISO</option>
            <option value="Executive" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">Executive Board & CFO</option>
            <option value="Risk Officer" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">Risk Officer (CRO)</option>
            <option value="Security Analyst" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">Security Analyst (SecOps)</option>
          </select>
        </div>
      </div>
    </header>
  );
}
