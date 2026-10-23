# CLAUDE.md

React19+TS+Vite+Tailwind4. 상태: zustand, 서버: react-query+axios.
구조: app(라우터)/pages/features(api·hooks·components)/shared. alias `@`=src.
명령: dev, build, lint.
모든 답변은 한국어로 할 것.

## Code Style

- 탭 들여쓰기, 세미콜론 없음, 작은따옴표.
- import 순서: 외부 → 빈 줄 → `@/` 절대경로. 타입은 `import type`.
- 컴포넌트는 `function` 선언 + `export default`, API·훅은 named export.
- API는 `shared/lib/axios`의 `api` 사용, 조회는 `useQuery` 훅으로 감싼다.
- 주석은 한국어로, "왜"만 짧게.

## Workflow

- `develop`에서 `feat/*`·`fix/*`·`refactor/*` 브랜치 → develop으로 PR.
- 커밋: `feat|fix|chore|refactor: 한국어 설명`.
- 커밋 전 `npm run format`, `npm run lint`, `npm run build` 확인.
