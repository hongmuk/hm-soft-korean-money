/**
 * 원화 포맷·파싱·반올림 유틸.
 */

/** 천 단위 콤마. formatWon(1234567) → "1,234,567" */
export function formatWon(
  amount: number,
  opts: { symbol?: boolean; suffix?: boolean } = {},
): string {
  const sign = amount < 0 ? "-" : "";
  const grouped = Math.abs(Math.round(amount))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const prefix = opts.symbol ? "₩" : "";
  const tail = opts.suffix ? "원" : "";
  return `${sign}${prefix}${grouped}${tail}`;
}

/** 문자열에서 금액 추출. parseWon("1,234,567원") → 1234567, "-₩1,000" → -1000 */
export function parseWon(value: string): number {
  const s = value ?? "";
  const neg = /-/.test(s);
  const digits = s.replace(/[^\d]/g, "");
  if (digits === "") return NaN;
  return (neg ? -1 : 1) * Number(digits);
}

/** 원 단위 반올림/올림/버림. roundWon(12345, 100, "floor") → 12300 */
export function roundWon(
  amount: number,
  unit = 1,
  mode: "round" | "floor" | "ceil" = "round",
): number {
  if (unit <= 0) return amount;
  const q = amount / unit;
  const r = mode === "floor" ? Math.floor(q) : mode === "ceil" ? Math.ceil(q) : Math.round(q);
  return r * unit;
}
