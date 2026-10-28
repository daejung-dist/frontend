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

1. 로컬 `develop`에서 `feat/*`·`fix/*`·`refactor/*` 브랜치를 만들고, 모든 작업은 이 브랜치에서 한다.
2. 작업 완료 시 같은 이름의 원격 브랜치로 push.
3. GitHub에서 작업 브랜치 → 원격 `develop` PR 병합.
4. 배포: 원격 `develop` → 원격 `main` PR 병합.
5. 로컬 `develop`에서 pull 후 새 기능 브랜치를 만들어 다음 작업 시작.

- 커밋: `feat|fix|chore|refactor: 한국어 설명`.
- 커밋 전 `npm run format`, `npm run lint`, `npm run build` 확인.
