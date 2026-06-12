/**
 * @hm-soft/korean-money
 * 원화 포맷·파싱, 한글 금액 변환, 부가세 계산 유틸 (의존성 0).
 *
 *   import { formatWon, toKoreanMoney, calcVat } from "@hm-soft/korean-money";
 */
export { formatWon, parseWon, roundWon } from "./format.js";
export { toKoreanNumber, toKoreanMoney } from "./hangul.js";
export { calcVat, extractVat, vatOf } from "./vat.js";
export type { VatResult } from "./vat.js";
