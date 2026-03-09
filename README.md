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

### Frontend (.env.production)

```
VITE_API_URL=https://your-backend.up.railway.app
```

## API Endpoints

### Notes

* GET /notes  - Get all notes
* POST /notes - Create note
* GET /notes/:id - Get note by ID
* DELETE /notes/:id - Delete note

### Auth

* POST /auth/register - Register user
* POST /auth/login - Login

### Admin

* GET /admin/users - Get all users (admin only)
* PATCH /admin/users/:id/approve - Approve user
* PATCH /admin/users/:id/reject - Reject user

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
