import { test } from "node:test";
import assert from "node:assert/strict";
import {
  formatWon,
  parseWon,
  roundWon,
  toKoreanNumber,
  toKoreanMoney,
  calcVat,
  extractVat,
  vatOf,
} from "../dist/index.js";

test("formatWon: 콤마/기호/접미", () => {
  assert.equal(formatWon(1234567), "1,234,567");
  assert.equal(formatWon(1234567, { suffix: true }), "1,234,567원");
  assert.equal(formatWon(1000, { symbol: true }), "₩1,000");
  assert.equal(formatWon(-1000, { symbol: true }), "-₩1,000");
  assert.equal(formatWon(0), "0");
});

test("parseWon: 문자열 → 숫자", () => {
  assert.equal(parseWon("1,234,567원"), 1234567);
  assert.equal(parseWon("₩1,000"), 1000);
  assert.equal(parseWon("-₩1,000"), -1000);
  assert.ok(Number.isNaN(parseWon("없음")));
});

test("roundWon: 단위 반올림/올림/버림", () => {
  assert.equal(roundWon(12345, 100, "floor"), 12300);
  assert.equal(roundWon(12345, 100, "ceil"), 12400);
  assert.equal(roundWon(12345, 100), 12300);
  assert.equal(roundWon(12350, 100), 12400);
});

test("toKoreanNumber: 한글 읽기", () => {
  assert.equal(toKoreanNumber(0), "영");
  assert.equal(toKoreanNumber(123456), "십이만삼천사백오십육");
  assert.equal(toKoreanNumber(10000), "만");
  assert.equal(toKoreanNumber(15000), "만오천");
  assert.equal(toKoreanNumber(123456, { formal: true }), "일십이만삼천사백오십육");
});

test("toKoreanMoney: 금액 표기", () => {
  assert.equal(toKoreanMoney(123456), "십이만삼천사백오십육원");
  assert.equal(toKoreanMoney(10000), "만원");
  assert.equal(toKoreanMoney(123456, { formal: true }), "일금 일십이만삼천사백오십육원정");
  assert.equal(toKoreanMoney(10000, { formal: true }), "일금 일만원정");
});

test("VAT: 계산/역산", () => {
  assert.deepEqual(calcVat(10000), { supply: 10000, vat: 1000, total: 11000 });
  assert.deepEqual(extractVat(11000), { supply: 10000, vat: 1000, total: 11000 });
  assert.equal(vatOf(10000), 1000);
  // 반올림 동작
  assert.equal(vatOf(12345), 1235); // 1234.5 → 반올림 1235
  assert.deepEqual(extractVat(11000, { rate: 0.1 }), { supply: 10000, vat: 1000, total: 11000 });
});
