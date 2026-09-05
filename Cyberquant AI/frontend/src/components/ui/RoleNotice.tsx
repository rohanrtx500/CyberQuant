"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { useRole, UserRole } from "@/context/RoleContext";
import { Lock, Shield, ArrowRight, Eye } from "@/components/icons";

interface RoleNoticeProps {
  moduleName: string;
  recommendedRole: UserRole;
  reason: string;
  children?: React.ReactNode;
}

export function RoleNotice({ moduleName, recommendedRole, reason, children }: RoleNoticeProps) {
  const pathname = usePathname();
  const { role, setRole, isModuleRestricted } = useRole();
  const [bypass, setBypass] = useState(false);

  const isRestricted = isModuleRestricted(pathname || "") || isModuleRestricted("/" + moduleName.toLowerCase());

  if (!isRestricted) {
    return <>{children}</>;
  }

  if (bypass) {
    return (
      <div className="space-y-4">
        <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-lg p-3 flex items-center justify-between text-xs text-amber-800 dark:text-amber-300">
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>
              <strong>Cross-Functional Audit Mode:</strong> You are viewing <strong>{moduleName}</strong> as <strong>{role}</strong>. Typically managed by <strong>{recommendedRole}</strong>.
            </span>
          </div>
          <button
            onClick={() => setBypass(false)}
            className="text-[11px] underline hover:text-amber-950 font-medium"
          >
            Re-enable Role Filter
          </button>
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 shadow-sm text-center space-y-5">
      <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
        <Lock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
      </div>

      <div className="space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
          <span>{role} Scope Boundary</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          {moduleName} is Curated for {recommendedRole}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
          {reason}
        </p>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={() => setRole(recommendedRole)}
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition"
        >
          <span>Switch to {recommendedRole} View</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setBypass(true)}
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium transition"
        >
          <Eye className="w-3.5 h-3.5 text-slate-500" />
          <span>Inspect as {role} (Audit Mode)</span>
        </button>
      </div>
    </div>
  );
}
