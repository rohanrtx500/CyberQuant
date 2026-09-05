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
  ShieldCheck
} from "@/components/icons";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
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
      <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
        <div className="px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          Core Platform
        </div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                isActive
                  ? "bg-blue-600/20 text-blue-400 border-l-2 border-blue-500 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-blue-400" : "text-slate-400"}`} />
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Footer Info */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/30 text-[11px] text-slate-500">
        <div className="flex items-center space-x-1 text-slate-400 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          <span>Continuous Quantification</span>
        </div>
        <div className="mt-1 text-[10px] text-slate-500">Enterprise Risk Intelligence</div>
      </div>
    </aside>
  );
}
