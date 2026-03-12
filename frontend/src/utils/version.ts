export const APP_VERSION = "v1.1.0";
export const LAST_UPDATED = "2026-03-12";

export interface VersionChange {
  version: string;
  date: string;
  changes: string[];
}

export const VERSION_HISTORY: VersionChange[] = [
  {
    version: "v1.1.0",
    date: "2026-03-12",
    changes: [
      "전체적인 UI 디자인 시스템 통일 및 반응형 레이아웃 개선",
      "상온(RT) 보관 방식 추가 및 아이콘 적용",
      "버전 관리 시스템(Footer 및 히스토리 모달) 도입",
      "일관된 카드 및 컨테이너 컴포넌트 적용"
    ]
  },
  {
    version: "v1.0.0",
    date: "2026-03-11",
    changes: [
      "재고 관리 및 메모 시스템 초기 배포",
      "관리자 승인 시스템(Pending/Approved) 구축",
      "카테고리(음식, 냉동식품) 초기 추가"
    ]
  }
];
