"use client";

import React, { useState } from "react";
import { api } from "@/lib/api";
import { CopilotQueryResponse } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import {
  Bot,
  Send,
  Sparkles,
  HelpCircle,
  FileText,
  ShieldAlert,
  ArrowRight,
  Database,
  Layers,
  CheckCircle2
} from "@/components/icons";

interface MessageItem {
  id: string;
  sender: "user" | "copilot";
  timestamp: string;
  content: string;
  data?: CopilotQueryResponse;
}

const SUGGESTED_QUERIES = [
  "What is our highest financial cyber risk?",
  "Which vulnerabilities contribute most to expected loss?",
  "What should we fix first under ₹50 lakh?",
  "What changed in the last 7 days?",
  "Why is Payment Gateway risk so high?",
  "Why did you prioritize these controls?"
];

export default function CopilotPage() {
  const [inputQuery, setInputQuery] = useState<string>("");
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: "m-0",
      sender: "copilot",
      timestamp: "Just now",
      content:
        "Welcome to the CyberQuant Enterprise AI Copilot. I analyze live telemetry, Monte Carlo loss simulations, and investment optimization models for Aegis FinServe Ltd. All financial answers are strictly grounded in deterministic system state.",
      data: {
        query: "System Initialization",
        short_answer: "Continuous risk quantification engine is active. Total monitored exposure: ₹8.42 Cr across 18 assets.",
        financial_impact: "Expected Annual Loss: ₹3.17 Cr | Value at Risk (95%): ₹5.80 Cr",
        top_drivers: [
          "Payment Gateway Server & Customer DB generate 51% of gross risk exposure",
          "4 weaponized CISA KEV vulnerabilities unpatched past SLA"
        ],
        recommended_action: "Review recommended actions in the Investment Optimizer or ask specific telemetry questions below.",
        source_tags: ["Source: Telemetry Data Hub", "Source: CISA KEV Feed"]
      }
    }
  ]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSend = async (queryText: string) => {
    if (!queryText.trim()) return;

    const userMsg: MessageItem = {
      id: `u-${Date.now()}`,
      sender: "user",
      timestamp: "Just now",
      content: queryText
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setLoading(true);

    try {
      const res = await api.queryCopilot(queryText);
      const botMsg: MessageItem = {
        id: `c-${Date.now()}`,
        sender: "copilot",
        timestamp: "Just now",
        content: res.short_answer,
        data: res
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Copilot error:", err);
    } finally {
      setLoading(false);
    }
  };

  const activeResponse = messages.filter((m) => m.sender === "copilot" && m.data).slice(-1)[0]?.data;

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-lg font-bold tracking-tight text-slate-900">Grounded Enterprise AI Copilot</h1>
            <Badge variant="info">Grounded Facts Only</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Natural language interface strictly grounded in Aegis FinServe telemetry and mathematical loss distributions.
          </p>
        </div>

        <div className="text-[11px] text-slate-600 bg-slate-50 px-2.5 py-1 rounded border border-slate-200">
          Hallucination Guardrail: <strong className="text-emerald-700">Strict Grounding Enforced</strong>
        </div>
      </div>

      {/* Suggested Prompts Strip */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        <span className="text-[11px] font-semibold text-slate-500 shrink-0">Quick Queries:</span>
        {SUGGESTED_QUERIES.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="text-[11px] bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-700 text-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap transition shadow-2xs"
          >
            {q}
          </button>
        ))}
      </div>

      {/* MAIN TWO-COLUMN SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* LEFT 2 COLS: Chat Conversation */}
        <div className="lg:col-span-2 bg-white border border-slate-200/90 rounded-lg shadow-xs flex flex-col h-[560px]">
          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex space-x-2.5 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.sender === "copilot" && (
                  <div className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center text-white shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-xl text-xs rounded-lg p-3 ${
                    m.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-50 border border-slate-200 text-slate-800"
                  }`}
                >
                  <p className="leading-relaxed font-normal">{m.content}</p>

                  {/* Structured Analytical Response Box */}
                  {m.data && (
                    <div className="mt-3 pt-3 border-t border-slate-200/80 space-y-2 text-[11px]">
                      {/* Financial Impact */}
                      <div className="bg-white p-2 rounded border border-slate-200">
                        <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">
                          Financial Impact:
                        </span>
                        <span className="font-mono font-bold text-slate-900">{m.data.financial_impact}</span>
                      </div>

                      {/* Top Drivers */}
                      <div className="bg-white p-2 rounded border border-slate-200">
                        <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                          Primary Risk Drivers:
                        </span>
                        <ul className="space-y-0.5 list-disc list-inside text-slate-700">
                          {m.data.top_drivers.map((d, i) => (
                            <li key={i}>{d}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Recommended Action */}
                      <div className="bg-emerald-50 p-2 rounded border border-emerald-200 text-emerald-950 font-medium">
                        <span className="text-[10px] uppercase font-bold text-emerald-800 block mb-0.5">
                          Recommended Action:
                        </span>
                        <span>{m.data.recommended_action}</span>
                      </div>

                      {/* Grounded Source Tags */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {m.data.source_tags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-[9px] bg-slate-200/70 text-slate-700 px-1.5 py-0.5 rounded font-mono"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center space-x-2 text-xs text-slate-500">
                <Bot className="w-4 h-4 text-blue-600 animate-spin" />
                <span>Querying continuous risk intelligence repository...</span>
              </div>
            )}
          </div>

          {/* Input Box */}
          <div className="p-3 border-t border-slate-200 bg-slate-50/50">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputQuery);
              }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask executive cyber risk questions (e.g. Why is Payment Gateway risk high?)..."
                className="flex-1 text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={loading || !inputQuery.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-lg text-xs font-semibold transition disabled:opacity-50 flex items-center space-x-1"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Ask</span>
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COL: Contextual Insight Panel */}
        <div className="bg-white border border-slate-200/90 rounded-lg p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>Contextual System State</span>
            </div>
            <p className="text-[11px] text-slate-500 mb-4">
              Real-time telemetry and risk distribution loaded into copilot prompt context
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Organization</span>
                <span className="font-semibold text-slate-900">Aegis FinServe Ltd.</span>
              </div>

              <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Active Exposure</span>
                <span className="font-mono font-bold text-slate-900">₹8.42 Cr (EAL: ₹3.17 Cr)</span>
              </div>

              <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Critical Assets</span>
                <span className="text-slate-700">Payment Gateway, Customer DB, IAM Directory</span>
              </div>

              <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Remediation Budget</span>
                <span className="font-mono font-bold text-slate-900">₹1.00 Cr (5 Initiatives Selected)</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-[10px] text-slate-400">
            Source tags: verified against NIST CSF 2.0 and Monte Carlo simulation outputs.
          </div>
        </div>
      </div>
    </div>
  );
}
