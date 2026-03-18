import React from "react";
import UserStatusBadge from "./UserStatusBadge";

interface User {
  id: number;
  email: string;
  auth_status: string;
  is_admin: boolean;
}

interface UserTableProps {
  users: User[];
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onApprove, onReject }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50/50 text-gray-400 font-bold uppercase tracking-wider text-[10px] border-b border-gray-100">
          <tr>
            <th className="p-5">사용자 계정 (이메일)</th>
            <th className="p-5">현재 상태</th>
            <th className="p-5 text-right">작업</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-50">
          {users.map((u) => (
            <tr key={u.id} className="hover:bg-gray-50/30 transition-colors">
              <td className="p-5 font-semibold text-gray-900">{u.email}</td>

              <td className="p-5">
                <UserStatusBadge status={u.auth_status} isAdmin={u.is_admin} />
              </td>

              <td className="p-5 text-right">
                {!u.is_admin && u.auth_status === "P" ? (
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onApprove(u.id)}
                      className="px-4 py-1.5 bg-green-500 text-white rounded-lg text-xs font-bold hover:bg-green-600 shadow-lg shadow-green-100 active:scale-95 transition-all"
                    >
                      승인
                    </button>
                    <button
                      onClick={() => onReject(u.id)}
                      className="px-4 py-1.5 bg-red-50 text-red-500 border border-red-100 rounded-lg text-xs font-bold hover:bg-red-500 hover:text-white active:scale-95 transition-all"
                    >
                      거절
                    </button>
                  </div>
                ) : (
                  <span className="text-gray-300">-</span>
                )}
              </td>
            </tr>
          ))}

          {users.length === 0 && (
            <tr>
              <td colSpan={3} className="p-20 text-center">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-4xl text-gray-300">📭</span>
                  <p className="text-gray-400 font-medium">관리할 사용자가 없습니다.</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
