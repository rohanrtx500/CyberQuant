# CyberQuant AI — Enterprise Cyber Risk Quantification Platform

**Smart India Hackathon 2026 — Problem Statement:** `SIH26105`  
**Theme:** Blockchain & Cybersecurity  
**Demo Organization:** Aegis FinServe Ltd. (Indian Mid-Cap Financial Institution)

---

## 📌 Executive Summary
Traditional cyber risk assessments rely on qualitative, ambiguous labels (*Low / Medium / High*). These labels fail to articulate how much money an organization could lose, which technical vulnerabilities drive the greatest monetary exposure, or how a CISO should allocate limited capital.

**CyberQuant AI** solves this by:
1. **Translating Technical Threat Telemetry into INR Monetary Exposure** (₹ Crores / Lakhs) using probabilistic Monte Carlo simulation and log-normal loss distributions.
2. **Decomposing Risk via Feature Attribution** to show board members exactly *why* a particular asset is risky (e.g. KEV weaponization vs. public ingress vs. lack of MFA).
3. **Interactive What-If Simulation** allowing executives to toggle mitigation controls and observe immediate real-time financial risk reduction.
4. **Constrained Mathematical Investment Optimization** using 0/1 Knapsack algorithms to maximize risk reduction under a fixed budgetary constraint (e.g., ₹1.00 Cr).
5. **Grounded Enterprise AI Copilot** providing strict, hallucination-free answers anchored directly in calculated system state with verifiable source citations.
6. **Regulatory Compliance Crosswalk** mapping technical findings to NIST CSF 2.0, RBI Cyber Security Framework, and SEBI CSCRF statutory requirements.

---

## 🚀 Technology Stack
- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS, Lucide Icons
- **Backend:** Python, FastAPI, Pydantic, Uvicorn
- **Analytics & Simulation:** Monte Carlo Loss Modeling, Log-Normal Outage Distribution, Value at Risk (95% VaR)
- **Optimization:** Constrained Knapsack Solver & Marginal ROSI Optimizer
- **Architecture:** Zero-authentication fast testing prototype; loads directly to `/dashboard`.

---

## 🏃 Quick Start Instructions

### 1. Unified Launch (Recommended)
Double-click [`run_cyberquant.bat`](file:///D:/SIH%202026/run_cyberquant.bat) or run in terminal:
```powershell
.\run_cyberquant.bat
```

### 2. Manual Launch
**Backend (FastAPI):**
```powershell
cd backend
.\.venv\Scripts\python.exe run_backend.py
# Running on http://127.0.0.1:8000 (Docs: http://127.0.0.1:8000/docs)
```

**Frontend (Next.js):**
```powershell
cd frontend
npm run dev
# Running on http://localhost:3000/dashboard
```

---

## 🧭 Judge Demonstration Flow

1. **Overview Dashboard (`/dashboard`)**:
   - Inspect the top KPI strip: Total Financial Exposure (**₹8.42 Cr**), Expected Annual Loss (**₹3.17 Cr**), and 95% VaR (**₹5.80 Cr**).
   - Review the 30/60/90-day exposure trend vs. the Board Risk Tolerance threshold (**₹7.00 Cr**).
   - Identify top risky assets: Payment Gateway Server and Customer Core Database.

2. **Asset Risk Drilldown (`/risk-analysis`)**:
   - Select **Payment Gateway Server**.
   - Review the conceptual financial equation: $EAL \approx Likelihood \times Impact$.
   - Inspect the **Feature Attribution** waterfall: active KEV weaponization contributes $+28.4\%$, public ingress $+21.2\%$, while host EDR mitigates $-6.2\%$.

3. **Asset Inventory (`/assets`)**:
   - Filter by Business Unit (*Payments*) and Criticality (*Critical*).
   - Click **Payment Gateway Server** to inspect the right-hand slide-over drawer displaying live telemetry and controls.

4. **Vulnerabilities & Materiality (`/vulnerabilities`)**:
   - Toggle **"Show only financially material vulnerabilities"** to demonstrate how the platform filters out low-impact CVEs, prioritizing only those causing tangible monetary risk.

5. **What-If Simulator (`/simulator`)**:
   - Click **"Load Quick Win Scenario"** (enables Privileged MFA, patches critical CVEs, boosts EDR coverage to 95%, adds network segmentation).
   - Watch the right-hand panel instantly drop exposure from **₹8.42 Cr to ₹5.12 Cr** (a **₹3.30 Cr / 39.2%** reduction).

6. **Investment Optimizer (`/optimizer`)**:
   - Set the budget slider to **₹1,00,00,000** (₹1.00 Crore).
   - Click **"Optimize Investment"** to run the constrained solver.
   - Review the recommended portfolio spending **₹96 Lakhs** to eliminate **₹4.60 Cr** of risk, delivering a **379% Return on Security Investment (ROSI)**.

7. **Grounded AI Copilot (`/copilot`)**:
   - Click quick query: *"Why is Payment Gateway risk so high?"* or *"What should we fix first under ₹50 lakh?"*
   - Verify structured, factual answers citing verifiable source telemetry tags.

8. **Compliance Mapping (`/compliance`)**:
   - Switch between **RBI Cyber Security Framework** and **SEBI CSCRF** tabs to inspect statutory pass/gap posture.

9. **Board Reports (`/reports`)**:
   - Click **"Preview"** on the *Executive Board Cyber Risk Briefing* to view a printable audit document.
