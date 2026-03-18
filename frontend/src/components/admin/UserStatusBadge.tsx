import React from "react";

interface UserStatusBadgeProps {
  status: string;
  isAdmin: boolean;
}

const statusInfo: Record<string, { label: string; color: string }> = {
  P: { label: "승인대기", color: "bg-amber-100 text-amber-700" },
  V: { label: "승인완료", color: "bg-green-100 text-green-700" },
  F: { label: "거절됨", color: "bg-red-100 text-red-700" },
  E: { label: "만료됨", color: "bg-gray-100 text-gray-700" },
  R: { label: "취소됨", color: "bg-gray-100 text-gray-700" }
};

const UserStatusBadge: React.FC<UserStatusBadgeProps> = ({ status, isAdmin }) => {
  if (isAdmin) {
    return (
      <span className="px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-bold">
        최고 관리자
      </span>
    );
  }

  const info = statusInfo[status] || { label: status, color: "bg-gray-100" };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold ${info.color}`}>
      {info.label}
    </span>
  );
};

export default UserStatusBadge;
