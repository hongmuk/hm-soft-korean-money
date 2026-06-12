/**
 * 숫자 → 한글 금액 변환. 견적서·계약서의 "일금 …원정" 표기에 사용.
 */

const DIGITS = ["", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"];
const SMALL_UNITS = ["", "십", "백", "천"];
const BIG_UNITS = ["", "만", "억", "조", "경"];

/** 0~9999 한 그룹을 한글로. formal이면 일십/일백 처럼 '일'을 생략하지 않음. */
function readGroup(n: number, formal: boolean): string {
  let s = "";
  for (let i = 3; i >= 0; i--) {
    const d = Math.floor(n / Math.pow(10, i)) % 10;
    if (d === 0) continue;
    if (i > 0 && d === 1 && !formal) s += SMALL_UNITS[i];
    else s += DIGITS[d] + SMALL_UNITS[i];
  }
  return s;
}

/**
 * 숫자를 한글로 읽기. toKoreanNumber(123456) → "십이만삼천사백오십육"
 * formal:true → "일십이만삼천사백오십육" (금액 위변조 방지용 정식 표기)
 */
export function toKoreanNumber(amount: number, opts: { formal?: boolean } = {}): string {
  const formal = opts.formal ?? false;
  let n = Math.abs(Math.round(amount));
  if (n === 0) return "영";

  const groups: number[] = [];
  while (n > 0) {
    groups.push(n % 10000);
    n = Math.floor(n / 10000);
  }

  let s = "";
  for (let i = groups.length - 1; i >= 0; i--) {
    const g = groups[i];
    if (g === 0) continue;
    if (g === 1 && i > 0 && !formal) s += BIG_UNITS[i];
    else s += readGroup(g, formal) + BIG_UNITS[i];
  }
  return (amount < 0 ? "마이너스 " : "") + s;
}

/**
 * 한글 금액 표기. toKoreanMoney(123456) → "십이만삼천사백오십육원"
 * formal:true → "일금 일십이만삼천사백오십육원정"
 */
export function toKoreanMoney(amount: number, opts: { formal?: boolean } = {}): string {
  const formal = opts.formal ?? false;
  const body = toKoreanNumber(amount, { formal });
  if (formal) return `일금 ${body}원정`;
  return `${body}원`;
}
