export const APP_VERSION = "v1.3.0";

export const LAST_UPDATED = "2026-03-13";

export interface VersionChange {
  version: string;
  date: string;
  changes: string[];
}

export const VERSION_HISTORY: VersionChange[] = [
  {
    version: "v1.3.0",
    date: "2026-03-13",
    changes: [
      "전용 '품목 관리' 메뉴 및 페이지 신설",
      "품목별 개별 버전 관리(Version) 필드 추가",
      "품목 삭제 시 재고 존재 여부 체크 로직 강화",
      "품목 리스트 내 전역 재고 합산 수량 시각화"
    ]
  },
  {
    version: "v1.2.0",
    date: "2026-03-12",
    changes: [
      "재고 관리 UI 대규모 고도화",
      "유통기한 D-Day 뱃지 및 상태별 시각화 도입",
      "긴급(Urgent) 항목 시각적 강조 강화 (글로우 효과, 전용 뱃지)",
      "필터 UI 현대화 (카테고리 선택 칩 시스템 도입)",
      "스테이터스 대시보드 프리미엄화 및 만료 항목 카운트 추가"
    ]
  },
  {
    version: "v1.1.1",
    date: "2026-03-12",
    changes: [
      "재고 삭제 확인 UI 버튼 가독성 개선",
      "모달 창 위에서 스낵바(알림 창)가 보이지 않던 문제 수정",
      "스낵바 시각적 계층(z-index) 최적화"
    ]
  },
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
