"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useRole, UserRole } from "@/context/RoleContext";
import { Eye } from "@/components/icons";

interface RoleNoticeProps {
  moduleName: string;
  recommendedRole: UserRole;
  reason: string;
  children?: React.ReactNode;
}

export function RoleNotice({ moduleName, recommendedRole, children }: RoleNoticeProps) {
  const pathname = usePathname();
  const { role, isModuleRestricted } = useRole();

  const isRestricted = isModuleRestricted(pathname || "") || isModuleRestricted("/" + moduleName.toLowerCase());

  return (
    <div className="space-y-4">
      {isRestricted && (
        <div className="bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 rounded-lg p-2.5 flex items-center justify-between text-xs text-blue-900 dark:text-blue-200">
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <span>
              <strong>Cross-Functional Persona Lens:</strong> You are viewing <strong>{moduleName}</strong> as <strong>{role}</strong>. Primary governance lead: <strong>{recommendedRole}</strong>.
            </span>
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
