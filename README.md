# daejung-dist-frontend

대정유통의 홍게 상품을 판매하는 커머스 웹사이트입니다.
React와 TypeScript를 기반으로 상품 탐색부터 주문까지 확장할 수 있도록 개발 환경과 역할별 디렉터리 구조를 구성했습니다.

## 기술 스택

### Core

- React 19
- TypeScript 6
- Vite 8

### Styling

- Tailwind CSS 4
- `@tailwindcss/vite`

### Application

- React Router 7: 클라이언트 라우팅
- Zustand 5: 클라이언트 상태 관리
- TanStack Query 5: 서버 상태 및 비동기 데이터 관리
- Axios: HTTP 요청
- Lucide: 아이콘

### Development

- ESLint
- TypeScript ESLint
- React Hooks ESLint plugin
- React Refresh ESLint plugin

## 시작하기

### 요구 사항

- Node.js 20 이상 권장
- npm

### 의존성 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

개발 서버가 실행되면 터미널에 표시된 로컬 주소로 접속합니다.

## 사용 가능한 스크립트

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | Vite 개발 서버 실행 및 HMR 제공 |
| `npm run build` | TypeScript 검사 후 프로덕션 빌드 |
| `npm run lint` | ESLint 정적 검사 |
| `npm run preview` | 프로덕션 빌드 결과 로컬 미리보기 |

## 프로젝트 구조

```text
.
├── public/                 # 정적 파일
├── src/
│   ├── app/                # 애플리케이션 진입 및 전역 설정
│   ├── assets/             # 이미지, SVG 등 번들 대상 에셋
│   ├── components/         # 여러 기능에서 재사용하는 UI 컴포넌트
│   ├── features/           # 도메인 또는 기능 단위 모듈
│   ├── hooks/              # 공통 React 커스텀 훅
│   ├── layouts/            # 페이지 레이아웃
│   ├── lib/                # 외부 라이브러리 초기화 및 공통 설정
│   ├── pages/              # 라우트 단위 페이지
│   ├── services/           # API 요청 및 외부 서비스 연동
│   ├── stores/             # Zustand 전역 상태
│   ├── types/              # 공통 TypeScript 타입
│   ├── utils/              # 공통 유틸리티 함수
│   ├── App.css             # 기본 화면 스타일
│   ├── App.tsx             # 현재 애플리케이션 화면
│   ├── index.css           # 전역 스타일 및 Tailwind CSS 진입점
│   └── main.tsx            # React 애플리케이션 진입점
├── eslint.config.js        # ESLint flat config
├── vite.config.ts          # Vite 및 Tailwind 플러그인 설정
├── tsconfig.json           # TypeScript 프로젝트 설정
├── tsconfig.app.json       # 앱 소스 TypeScript 설정
├── tsconfig.node.json      # Vite 설정 TypeScript 설정
└── package.json            # 의존성 및 npm 스크립트
```

## 품질 검사

커밋 전 아래 명령어를 실행합니다.

```bash
npm run lint
npm run build
```

## 브랜치 흐름

기본 개발 흐름은 다음과 같이 운영합니다.

```text
feature/* 또는 fix/* -> develop -> main
```

- `main`: 운영 배포 기준 브랜치
- `develop`: 개발 통합 브랜치
- `feature/*`: 신규 기능 개발
- `fix/*`: 버그 수정

