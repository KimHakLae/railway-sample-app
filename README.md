# Fullstack Template (Node.js + React)

Backend: Express + TypeScript + Prisma
Frontend: React + TypeScript + Vite + TailwindCSS

## Stack

### Backend

* Node.js 20
* TypeScript
* Express
* Prisma ORM
* SQLite (default)

### Frontend

* React 18
* TypeScript
* Vite 4
* TailwindCSS
* React Router

## Setup

### Backend

```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend: [http://localhost:5173](http://localhost:5173)
Backend: [http://localhost:3000](http://localhost:3000)

## Environment Variables

### Backend (.env)

```
DATABASE_URL=sqlite:./dev.db
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

### Frontend (.env.development)

```
VITE_API_URL=http://localhost:3000
```


## API Endpoints (Prefix: `/api`)

### Auth (`/api/auth`)
* `POST /register` - 사용자 등록
* `POST /login` - 로그인 및 토큰 발급

### Notes (`/api/notes`)
* `GET /` - 모든 노트 조회
* `POST /` - 새 노트 작성
* `GET /:id` - 특정 노트 상세 조회
* `DELETE /:id` - 노트 삭제

### Admin (`/api/admin`)
* `GET /users` - 전체 사용자 목록 (관리자 전용)
* `PATCH /users/:id/approve` - 사용자 승인
* `PATCH /users/:id/reject` - 사용자 거절

### Ingredients (`/api/ingredients/types`)
* `GET /` - 식재료 품목 목록 조회
* `POST /` - 새 품목 등록
* `PUT /:id` - 품목 정보 수정
* `DELETE /:id` - 품목 삭제

### Stocks (`/api/ingredients/stocks`)
* `GET /` - 현재 보유 재고 목록
* `POST /` - 재고 등록
* `PUT /:id` - 재고 수량/정보 수정
* `DELETE /:id` - 재고 삭제
* `PATCH /:id/urgent` - 긴급(유통기한 임박) 상태 토글

### Recipes (`/api/recipes`)
* `GET /` - 전체 레시피 목록
* `GET /recommendations` - 맞춤형/공유 재고 기반 추천 요리
* `POST /:id/cook` - 요리 완료 처리 (재고 자동 소모)

## Routing Structure

```
/login                → 로그인 페이지
/user                 → 사용자 메뉴
/notes                → 내 노트 관리
/admin                → 관리자 메뉴
/admin/users          → 사용자 관리
/admin/notes          → 전체 노트 관리
```

## Project Structure

```
root
 ├─ backend
 │   ├─ src
 │   │   ├─ routes
 │   │   ├─ services
 │   │   ├─ middleware
 │   │   ├─ lib
 │   │   └─ app.ts
 │   ├─ prisma
 │   └─ package.json
 └─ frontend
     ├─ src
     │   ├─ pages
     │   ├─ components
     │   │   ├─ auth
     │   │   ├─ notes
     │   │   ├─ admin
     │   │   ├─ items
     │   │   ├─ common
     │   │   └─ ui
     │   ├─ layouts
     │   ├─ utils
     │   └─ App.tsx
     └─ package.json
```

## Future Improvements

* 사용자 프로필 관리
* 파일 첨부 기능
* 노트 검색 및 페이지네이션
* 관리자 대시보드 및 통계
* 모바일 반응형 UI
