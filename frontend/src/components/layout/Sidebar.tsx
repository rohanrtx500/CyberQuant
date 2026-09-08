"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  TrendingDown,
  Server,
  Bug,
  Sliders,
  Target,
  Bot,
  CheckSquare,
  FileText,
  ShieldCheck,
  Lock,
} from "@/components/icons";
import { useRole } from "@/context/RoleContext";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  scopeBadge?: Record<string, string>;
}

const NAV_ITEMS: NavItem[] = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Risk Analysis", href: "/risk-analysis", icon: TrendingDown },
  { name: "Assets", href: "/assets", icon: Server },
  { name: "Vulnerabilities", href: "/vulnerabilities", icon: Bug },
  { name: "What-If Simulator", href: "/simulator", icon: Sliders },
  { name: "Investment Optimizer", href: "/optimizer", icon: Target },
  { name: "AI Copilot", href: "/copilot", icon: Bot },
  { name: "Compliance", href: "/compliance", icon: CheckSquare },
  { name: "Reports", href: "/reports", icon: FileText },
];

export function Sidebar() {
  const pathname = usePathname();
  const { role, config, isModulePrimary, isModuleRestricted, filterNavByRole, setFilterNavByRole } = useRole();

  const primaryItems = NAV_ITEMS.filter((item) => isModulePrimary(item.href));
  const restrictedItems = NAV_ITEMS.filter((item) => isModuleRestricted(item.href));

  return (
    <aside className="w-56 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 shrink-0 select-none">
      {/* Brand Header */}
      <div className="h-14 px-4 flex items-center space-x-2.5 border-b border-slate-800/80 bg-slate-950/40">
        <div className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center text-white shadow-sm font-bold text-sm">
          CQ
        </div>
        <div>
          <div className="text-xs font-bold tracking-tight text-white flex items-center space-x-1.5">
            <span>CyberQuant AI</span>
          </div>
          <div className="text-[10px] text-slate-400 font-medium">Risk Intelligence</div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 py-3 px-2 space-y-3 overflow-y-auto">
        {/* Role Scope Header */}
        <div className="px-2 flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            {role === "CISO" ? "All Platform Modules" : `${role} Focus`}
          </span>
          {role !== "CISO" && (
            <button
              onClick={() => setFilterNavByRole(!filterNavByRole)}
              className={`text-[9px] px-1.5 py-0.5 rounded font-mono transition ${
                filterNavByRole
                  ? "bg-blue-600/30 text-blue-300 border border-blue-500/40"
                  : "text-slate-500 hover:text-slate-300 hover:bg-slate-800"
              }`}
              title="Toggle filtering navigation strictly to this role's scope"
            >
              {filterNavByRole ? "Filtered" : "All"}
            </button>
          )}
        </div>

        {/* Primary / Role-Permitted Items */}
        <div className="space-y-0.5">
          {primaryItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-blue-600/20 text-blue-400 border-l-2 border-blue-500 font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center space-x-2.5 truncate">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-blue-400" : "text-slate-400"}`} />
                  <span className="truncate">{item.name}</span>
                </div>
                {role !== "CISO" && (
                  <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor} opacity-70 shrink-0`} title="Role Core Focus" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Restricted / Non-Primary Items */}
        {restrictedItems.length > 0 && (
          <div className="pt-2 border-t border-slate-800/60 space-y-0.5">
            <div className="px-2 pb-1 flex items-center justify-between text-[9px] uppercase tracking-wider text-slate-500">
              <span>Outside {role} Scope</span>
              <Lock className="w-2.5 h-2.5 text-slate-500" />
            </div>
            {restrictedItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href);

              if (filterNavByRole) return null;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-colors ${
                    isActive
                      ? "bg-amber-600/20 text-amber-300 border-l-2 border-amber-500 font-semibold"
                      : "text-slate-500 hover:text-slate-400 hover:bg-slate-800/30"
                  }`}
                  title={`${item.name} is restricted or typically managed outside the ${role} persona`}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <Icon className="w-4 h-4 shrink-0 text-slate-600" />
                    <span className="truncate opacity-75">{item.name}</span>
                  </div>
                  <Lock className="w-3 h-3 text-slate-600 shrink-0" />
                </Link>
              );
            })}
          </div>
        )}
      </nav>

      {/* Bottom Footer Info with Active Role */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/40 text-[11px] text-slate-400">
        <div className="flex items-center space-x-1.5 font-medium text-slate-300">
          <span className={`w-2 h-2 rounded-full ${config.dotColor}`} />
          <span className="truncate text-xs font-semibold">{config.badgeLabel}</span>
        </div>
        <div className="mt-1 text-[10px] text-slate-500 line-clamp-1 leading-tight">{config.summary}</div>
      </div>
    </aside>
  );
}
