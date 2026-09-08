import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { RoleProvider } from "@/context/RoleContext";

export const metadata: Metadata = {
  title: "CyberQuant AI - Continuous Cyber Risk Quantification",
  description: "Enterprise Financial Cyber Risk Quantification & Investment Optimization Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="text-slate-900 min-h-screen flex antialiased selection:bg-blue-200 selection:text-blue-900 bg-slate-100 dark:bg-slate-950 font-sans">
        <RoleProvider>
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <Topbar />
            <main className="flex-1 overflow-y-auto p-5">{children}</main>
          </div>
        </RoleProvider>
      </body>
    </html>
  );
}
