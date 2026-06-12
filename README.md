# @hm-soft/korean-money

원화 금액을 다루는 의존성 없는 유틸 모음 — **콤마 포맷·파싱**, **한글 금액 변환(일금 …원정)**, **부가세 10% 계산/역산**.
견적서·계약서·회계 화면에 바로 쓰도록 만들었습니다.

## 설치

```bash
npm install @hm-soft/korean-money
```

## 사용

```ts
import {
  formatWon, parseWon, roundWon,
  toKoreanMoney, toKoreanNumber,
  calcVat, extractVat, vatOf,
} from "@hm-soft/korean-money";

// 포맷 / 파싱
formatWon(1234567);                 // "1,234,567"
formatWon(1234567, { suffix: true });// "1,234,567원"
formatWon(1000, { symbol: true });  // "₩1,000"
parseWon("1,234,567원");            // 1234567

// 한글 금액 (견적서·계약서)
toKoreanMoney(123456);                       // "십이만삼천사백오십육원"
toKoreanMoney(123456, { formal: true });     // "일금 일십이만삼천사백오십육원정"
toKoreanNumber(15000);                       // "만오천"

// 부가세 (기본 10%)
calcVat(10000);     // { supply: 10000, vat: 1000, total: 11000 }
extractVat(11000);  // { supply: 10000, vat: 1000, total: 11000 }
vatOf(10000);       // 1000

// 원 단위 정리
roundWon(12345, 100, "floor"); // 12300
```

## API

| 분류 | 함수 |
|------|------|
| 포맷 | `formatWon(amount, {symbol?, suffix?})`, `parseWon(str)`, `roundWon(amount, unit?, mode?)` |
| 한글 금액 | `toKoreanMoney(amount, {formal?})`, `toKoreanNumber(amount, {formal?})` |
| 부가세 | `calcVat(supply, {rate?, round?})`, `extractVat(total, {rate?, round?})`, `vatOf(supply, {rate?, round?})` |

- `formal: true` → 위변조 방지용 정식 표기(`일금 …원정`, `일십`/`일백` 생략 안 함)
- 부가세 세율·반올림 방식은 옵션으로 변경 가능 (`{ rate: 0.1, round: Math.floor }`)

## License

Apache-2.0
