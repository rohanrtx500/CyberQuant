"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "CISO" | "Executive" | "Risk Officer" | "Security Analyst";

export interface RoleConfig {
  id: UserRole;
  label: string;
  badgeLabel: string;
  badgeColor: string;
  dotColor: string;
  summary: string;
  scopeDescription: string;
  keyMetricsFocus: string[];
  primaryModules: string[];
  restrictedModules: string[];
}

export const ROLE_CONFIGS: Record<UserRole, RoleConfig> = {
  CISO: {
    id: "CISO",
    label: "Chief Information Security Officer",
    badgeLabel: "CISO Command View",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800",
    dotColor: "bg-indigo-500",
    summary: "Complete strategic, operational, and capital governance. Full end-to-end command across all systems.",
    scopeDescription: "Full access across continuous risk telemetry, Monte Carlo loss modeling, 0/1 knapsack budget optimizer, and board reports.",
    keyMetricsFocus: ["Total Financial Exposure", "95% Value-at-Risk (VaR)", "Budget Allocation & ROSI", "Audit Posture"],
    primaryModules: [
      "/dashboard",
      "/risk-analysis",
      "/assets",
      "/vulnerabilities",
      "/simulator",
      "/optimizer",
      "/copilot",
      "/compliance",
      "/reports",
    ],
    restrictedModules: [],
  },
  Executive: {
    id: "Executive",
    label: "Executive Board & CFO",
    badgeLabel: "Board & CFO View",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800",
    dotColor: "bg-amber-500",
    summary: "High-level balance sheet exposure, capital allocation (ROSI), statutory liability, and board briefings.",
    scopeDescription: "Curated executive view. Low-level operational CVE logs, raw IP telemetry, and technical parameters are abstracted into financial summaries.",
    keyMetricsFocus: ["₹8.42 Cr Enterprise Exposure", "₹3.17 Cr Expected Annual Loss", "379% ROSI on ₹1.00 Cr Budget", "RBI / SEBI Penalty Liability"],
    primaryModules: [
      "/dashboard",
      "/optimizer",
      "/compliance",
      "/reports",
      "/copilot",
    ],
    restrictedModules: ["/vulnerabilities", "/assets"],
  },
  "Risk Officer": {
    id: "Risk Officer",
    label: "Chief Risk Officer (CRO)",
    badgeLabel: "Risk Governance View",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800",
    dotColor: "bg-sky-500",
    summary: "Quantitative risk modeling, Open FAIR decomposition, What-If simulation, and statutory regulatory crosswalks.",
    scopeDescription: "Focus on statistical loss distributions (10,000 Monte Carlo runs), feature attribution drivers, and statutory compliance (NIST/RBI/SEBI).",
    keyMetricsFocus: ["Monte Carlo 95% VaR (₹5.80 Cr)", "Primary vs Secondary Loss", "Feature Attribution (+28.4% KEV)", "Regulatory Audit Scores"],
    primaryModules: [
      "/dashboard",
      "/risk-analysis",
      "/simulator",
      "/compliance",
      "/reports",
      "/copilot",
    ],
    restrictedModules: ["/optimizer"],
  },
  "Security Analyst": {
    id: "Security Analyst",
    label: "SecOps & Vulnerability Analyst",
    badgeLabel: "SecOps Operational View",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
    dotColor: "bg-emerald-500",
    summary: "Tactical threat triage, CISA KEV exploitation, asset attack surfaces, and rapid vulnerability remediation.",
    scopeDescription: "Direct access to active CVEs, asset telemetry drawers, open ports, and financially material vulnerability prioritization.",
    keyMetricsFocus: ["7 Critical CVEs (4 Weaponized)", "18 Production Assets", "Internet-Exposed Attack Surfaces", "Mean Time to Remediate (MTTR)"],
    primaryModules: [
      "/dashboard",
      "/assets",
      "/vulnerabilities",
      "/simulator",
      "/risk-analysis",
      "/copilot",
    ],
    restrictedModules: ["/optimizer", "/reports"],
  },
};

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  config: RoleConfig;
  filterNavByRole: boolean;
  setFilterNavByRole: (filter: boolean) => void;
  isModulePrimary: (href: string) => boolean;
  isModuleRestricted: (href: string) => boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>("CISO");
  const [filterNavByRole, setFilterNavByRole] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cyberquant_user_role") as UserRole;
      if (stored && ROLE_CONFIGS[stored]) {
        setRoleState(stored);
      }
    } catch {
      // ignore
    }
  }, []);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    try {
      localStorage.setItem("cyberquant_user_role", newRole);
    } catch {
      // ignore
    }
  };

  const config = ROLE_CONFIGS[role];

  const isModulePrimary = (href: string) => {
    return config.primaryModules.includes(href);
  };

  const isModuleRestricted = (href: string) => {
    return config.restrictedModules.includes(href);
  };

  return (
    <RoleContext.Provider
      value={{
        role,
        setRole,
        config,
        filterNavByRole,
        setFilterNavByRole,
        isModulePrimary,
        isModuleRestricted,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}
