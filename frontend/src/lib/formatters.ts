/**
 * Currency and Numerical Formatters for CyberQuant AI
 * Formats all financial exposures in INR (₹ Crores, ₹ Lakhs) with tabular alignment.
 */

export function formatINR(value: number): string {
  if (value === undefined || value === null || isNaN(value)) return "₹0";

  const absVal = Math.abs(value);
  const sign = value < 0 ? "-" : "";

  if (absVal >= 10000000) {
    // 1 Crore = 10,000,000
    const crores = absVal / 10000000;
    return `${sign}₹${crores.toFixed(2)} Cr`;
  } else if (absVal >= 100000) {
    // 1 Lakh = 100,000
    const lakhs = absVal / 100000;
    return `${sign}₹${lakhs.toFixed(2)} L`;
  } else {
    return `${sign}₹${absVal.toLocaleString("en-IN")}`;
  }
}

export function formatINRFull(value: number): string {
  if (value === undefined || value === null || isNaN(value)) return "₹0";
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

export function formatPercent(value: number, decimals: number = 1): string {
  if (value === undefined || value === null || isNaN(value)) return "0%";
  return `${value.toFixed(decimals)}%`;
}

export function formatLikelihood(prob: number): string {
  if (prob === undefined || prob === null || isNaN(prob)) return "0%";
  return `${(prob * 100).toFixed(1)}%`;
}
