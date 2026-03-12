# Railway 샘플 앱 (재고 관리 시스템)

웹 기반의 개인 재고 및 메모 관리 애플리케이션입니다. React, Express, 그리고 Prisma를 통한 PostgreSQL을 사용하는 풀스택 프로젝트로 설계되었습니다.

## 🚀 주요 기능

### 1. 사용자 인증 및 권한 관리
*   **회원가입 및 로그인**: JWT(JSON Web Token)와 bcrypt 비밀번호 해싱을 사용하여 안전한 사용자 등록 및 로그인을 제공합니다.
*   **관리자 승인 시스템**: 신규 사용자는 가입 시 '대기(PENDING, "P")' 상태가 되며, 핵심 기능을 사용하기 위해서는 관리자의 수동 승인('승인완료(APPROVED, "V")')이 필요합니다.
*   **역할 기반 접근 제어**: 일반 사용자와 관리자를 구분합니다. 관리자는 사용자 계정을 관리할 수 있습니다.

### 2. 재고 관리 (Inventory Management)
*   **카테고리 및 보관 방식**: 야채, 과일, 고기, 간식, 음식, 냉동식품 등 다양한 카테고리와 냉장(🧊), 냉동(❄️) 등의 보관 방식을 관리합니다.
*   **재고 추적**: 품목별 수량, 가격, 입고일 및 유통기한을 추적합니다.
*   **긴급 항목 표시**: 유통기한이 임박한 항목 등을 "🚨 긴급"으로 표시하여 빠르게 확인할 수 있습니다.
*   **필터링 및 정렬**: 키워드, 보관 방식, 카테고리별 상세 필터링과 최신순, 오래된순, 이름순, 수량순 등 다양한 정렬 기능을 제공합니다.

### 3. 개인 메모 (Notes)
*   개인적인 텍스트 기반 메모를 저장하고 관리합니다.
*   사용자 계정에 귀속된 표준 CRUD(생성, 조회, 수정, 삭제) 기능을 제공합니다.

---

## 🛠️ 기술 스택

### 프론트엔드 (Frontend)
*   **React 19** / **React DOM**
*   **Vite** (빌드 도구 및 개발 서버)
*   **Tailwind CSS 4** (스타일링)
*   **React Router DOM** (라우팅)
*   **TypeScript**

### 백엔드 (Backend)
*   **Node.js** 및 **Express.js**
*   **Prisma ORM** (데이터베이스 상호작용 및 스키마 관리)
*   **PostgreSQL** (데이터베이스)
*   **TypeScript** / **ts-node-dev**

---

## 📁 프로젝트 구조

```text
c:\Project\Test\
├── frontend/                  # React 프론트엔드 애플리케이션
│   ├── src/
│   │   ├── components/        # 재사용 가능한 UI 컴포넌트
│   │   │   ├── inventory/     # 재고 관련 컴포넌트 (필터, 모달, 리스트 등)
│   │   │   └── ui/            # 공통 UI 컴포넌트 (레이아웃, 나바, 스낵바 등)
│   │   ├── pages/             # 페이지 단위 컴포넌트 (홈, 재고관리, 관리자 페이지 등)
│   │   ├── types/             # 프론트엔드 TypeScript 인터페이스 (품목, 재고, 사용자 등)
│   │   ├── App.tsx            # 메인 애플리케이션 라우터
│   │   └── main.tsx           # React DOM 시작점
│   ├── package.json
│   └── vite.config.ts         # Vite 설정 파일
│
├── prisma/                    # 데이터베이스 및 ORM 정의
│   ├── schema.prisma          # PostgreSQL 데이터베이스 스키마 정의 (User, Note, Item, Inventory)
│   └── ERD.png                # 자동 생성된 개체 관계도 (ERD)
│
├── src/                       # Express 백엔드 서버
│   ├── controllers/           # API 엔드포인트 (인증, 메모, 관리자, 재고 등)
│   ├── middlewares/           # Express 미들웨어 (인증 확인 등)
│   └── server.ts              # Express 앱 시작점, 라우터 및 포트 설정
│
├── package.json               # 백엔드 의존성 및 스크립트
├── .env                       # 환경 변수 (DB URL, JWT Secret 등)
└── README.md                  # 일반적인 프로젝트 안내 파일
```

---

## 💾 데이터베이스 스키마 개요

데이터베이스는 PostgreSQL을 사용하며 Prisma로 관리됩니다.

*   **`User`**: 사용자 계정 정보, 역할(`is_admin`), 승인 상태를 저장합니다.
*   **`Item`**: 전체 품목 사전으로, 이름과 카테고리(Enum) 정보를 포함합니다.
*   **`Inventory`**: `User`와 `Item`을 연결하는 테이블입니다. 수량, 가격, 보관 방식, 유통기한 등 실제 보유 현황을 저장합니다.
*   **`Note`**: `user_id` 외래 키를 통해 특정 사용자에 연결된 간단한 텍스트 메모입니다.
