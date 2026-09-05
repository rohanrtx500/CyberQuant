"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { ReportCard } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { FileText, Download, Eye, X, Printer, CheckCircle2, Shield } from "@/components/icons";

export default function ReportsPage() {
  const [reports, setReports] = useState<ReportCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [previewData, setPreviewData] = useState<{ report: ReportCard; raw_text: string } | null>(null);

  useEffect(() => {
    async function loadReports() {
      try {
        const data = await api.getReports();
        setReports(data);
      } catch (err) {
        console.error("Failed to load reports:", err);
      } finally {
        setLoading(false);
      }
    }
    loadReports();
  }, []);

  const handlePreview = async (id: string) => {
    try {
      const res = await api.previewReport(id);
      setPreviewData(res);
    } catch (err) {
      console.error("Failed to preview report:", err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-lg font-bold tracking-tight text-slate-900">Governance & Executive Cyber Risk Reports</h1>
            <Badge variant="info">Board-Ready Artifacts</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Exportable regulatory briefings and financial cyber exposure audits for Aegis FinServe board committees.
          </p>
        </div>

        <div className="text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded border border-slate-200">
          Format: <strong>Standardized DPDP & RBI Audit Specification</strong>
        </div>
      </div>

      {/* REPORT CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => (
          <div
            key={report.id}
            className="bg-white border border-slate-200/90 rounded-lg p-4 shadow-xs flex flex-col justify-between hover:border-blue-300 transition"
          >
            <div>
              <div className="flex items-start justify-between mb-2">
                <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  {report.category}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{report.generated_at}</span>
              </div>

              <h2 className="text-sm font-bold text-slate-900 mb-1.5">{report.title}</h2>
              <p className="text-xs text-slate-600 line-clamp-3 mb-3 leading-relaxed">
                {report.summary}
              </p>

              {/* Key Metrics Chips */}
              <div className="grid grid-cols-2 gap-1.5 p-2 bg-slate-50 rounded border border-slate-200/80 mb-3 text-[11px]">
                {Object.entries(report.key_metrics).map(([key, val]) => (
                  <div key={key}>
                    <span className="text-slate-500 text-[10px] block">{key}</span>
                    <span className="font-mono font-bold text-slate-800">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[10px] text-slate-400 font-mono">{report.file_size}</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePreview(report.id)}
                  className="flex items-center space-x-1 text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded transition"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>
                <button
                  onClick={() => handlePreview(report.id)}
                  className="flex items-center space-x-1 text-white bg-blue-600 hover:bg-blue-700 px-2.5 py-1 rounded transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PREVIEW / PRINT MODAL */}
      {previewData && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-300 w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <div className="text-[10px] uppercase font-bold text-blue-600">Audit Document Preview</div>
                <h3 className="text-sm font-bold text-slate-900">{previewData.report.title}</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrint}
                  className="text-xs bg-slate-200 hover:bg-slate-300 text-slate-800 px-3 py-1.5 rounded flex items-center space-x-1.5 transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Save PDF</span>
                </button>
                <button
                  onClick={() => setPreviewData(null)}
                  className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed bg-slate-50/50 flex-1">
              {previewData.raw_text}
            </div>

            {/* Modal Footer */}
            <div className="p-3 border-t border-slate-200 bg-white flex items-center justify-between text-[11px] text-slate-500">
              <span>Verified for Aegis FinServe Board of Directors · Confidential Enterprise Briefing</span>
              <button
                onClick={() => setPreviewData(null)}
                className="text-xs text-slate-700 hover:text-slate-900 font-semibold px-3 py-1"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
