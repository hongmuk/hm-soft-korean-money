/**
 * 부가가치세(VAT) 계산. 기본 세율 10%.
 */

export interface VatResult {
  /** 공급가액 */
  supply: number;
  /** 부가세 */
  vat: number;
  /** 합계(공급가 + 부가세) */
  total: number;
}

type RoundFn = (n: number) => number;

/** 공급가액 → 부가세·합계. calcVat(10000) → {supply:10000, vat:1000, total:11000} */
export function calcVat(
  supply: number,
  opts: { rate?: number; round?: RoundFn } = {},
): VatResult {
  const rate = opts.rate ?? 0.1;
  const round = opts.round ?? Math.round;
  const vat = round(supply * rate);
  return { supply, vat, total: supply + vat };
}

/** 부가세 포함 합계 → 공급가액·부가세 역산. extractVat(11000) → {supply:10000, vat:1000, total:11000} */
export function extractVat(
  total: number,
  opts: { rate?: number; round?: RoundFn } = {},
): VatResult {
  const rate = opts.rate ?? 0.1;
  const round = opts.round ?? Math.round;
  const supply = round(total / (1 + rate));
  return { supply, vat: total - supply, total };
}

/** 공급가액에 대한 부가세만. vatOf(10000) → 1000 */
export function vatOf(supply: number, opts: { rate?: number; round?: RoundFn } = {}): number {
  const rate = opts.rate ?? 0.1;
  const round = opts.round ?? Math.round;
  return round(supply * rate);
}
