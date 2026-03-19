# 🍳 Railway Cooking Assistant (Fullstack)

Backend: Node.js + Express + Prisma (PostgreSQL)
Frontend: React 19 + Vite + Tailwind CSS 4 + Framer Motion

단순한 식재료 관리를 넘어, 사용자 간 공유되는 DB 데이터를 바탕으로 최적의 레시피를 추천하고 스마트하게 재고를 역추산으로 소모하는 **지능형 주방 관리 솔루션**입니다.

## 🚀 Key Features
- **스마트 대시보드 (Smart Dashboard)**: 유통기한이 임박한 식재료 알림 및 전체 재고 요약 카드를 애니메이션 기반으로 직관적으로 제공
- **지능형 레시피 추천 (Global & Shared Stock)**: 사용자가 보유한 재료(전체 사용자 공유 기준)의 30% 이상을 만족하는 최적의 레시피 톱 5 자동 추천
- **다크 테마 (Dark Mode) 완벽 지원**: 전역 상태 기반의 테마 토글 버튼 추가 및 시인성을 극적으로 확보한 세밀한 다크 톤앤매너 프레젠테이션 디자인 적용
- **자동 재고 소모 (FIFO)**: '요리하기' 기능을 통해 요리를 완료 시, 가장 유통기한이 짧은(오래된) 재고부터 자동으로 차감하는 스마트 로직 도입

## 🛠️ Stack

### Backend
* Node.js / Express
* TypeScript
* Prisma ORM
* PostgreSQL
* JWT Authentication

### Frontend
* React 19 / TypeScript
* Vite 4
* Tailwind CSS 4 / Framer Motion
* React Router

## ⚙️ Setup

### Backend (Root Directory)
```bash
npm install
npx prisma generate
npx prisma migrate dev # DB 마이그레이션 필수
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📡 API Endpoints (Prefix: `/api`)
- **Auth**: `/auth/register`, `/auth/login`
- **Admin**: `/admin/users`, `/admin/users/:id/approve`
- **Ingredients**: `/ingredients/types` (식재료 품목 관리), `/ingredients/stocks` (내 재고 관리)
- **Recipes**: `/recipes`, `/recipes/recommendations`, `/recipes/:id/cook`

## 📁 Project Structure
```text
root/
 ├─ src/                  # Backend Express 비즈니스 로직 및 서버
 ├─ prisma/               # Database 스키마 및 마이그레이션 이력
 ├─ frontend/             # Frontend React 앱 공간
 │   ├─ src/
 │   │   ├─ components/   # 재사용 UI 조각 및 특수 모달 (auth, items, recipes, admin 등)
 │   │   ├─ pages/        # 메인 라우터 진입점 페이지 모음
 │   │   ├─ api/          # 백엔드 API 통신 레이어
 │   │   └─ utils/        # 공통 유틸리티 (version 등)
 │   └─ index.html
 ├─ PROJECT.md            # 소프트웨어 상세 기획 및 업데이트 체인지로그
 └─ GEMINI.md             # AI 개발 지시사항(Rules) 및 환경 동기화 문서
```
