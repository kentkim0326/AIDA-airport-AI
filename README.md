# AIDA v2 — AI Delay Assistant

**인천공항 AI-PORT 아이디어 공모전 세션2 출품작**
화이팅 네이션 | 대표 김형섭 (Kent Kim)

## 서비스 소개
베르디의 오페라 *Aida*에서 영감받은 이름 — 혼란 속 승객 곁의 목소리

항공편 지연·결항 시 승객에게 AI가 실시간 맞춤형 다국어 안내를 제공하는 서비스

## 주요 기능
- ✈ 지연 시뮬레이터 (AIDA 4단계 작동 시연)
- 📦 수하물 실시간 RFID 추적 맵
- 🤖 Claude AI 메시지 생성 (API 키 없이도 작동)
- 📡 실시간 공항 현황 (공공데이터포털 연동)

## 활용 공공데이터
- 인천국제공항공사 여객기 운항현황 (data.go.kr #15112968)
- 출국장 혼잡도 1분 주기 (data.go.kr #15148225)
- 시간대별 승객 예고 (data.go.kr #15095066)

## 기술 스택
- Vanilla JS + HTML/CSS (의존성 없음)
- Anthropic Claude API (claude-sonnet-4-20250514)
- 한국 공공데이터포털 Open API
- Vercel Static Hosting

## Vercel 배포
```
vercel --prod
```
