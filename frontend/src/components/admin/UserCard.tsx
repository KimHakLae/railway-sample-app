import React from "react";
import Card from "../ui/Card";
import UserStatusBadge from "./UserStatusBadge";

interface User {
  id: number;
  email: string;
  auth_status: string;
  is_admin: boolean;
}

interface UserCardProps {
  user: User;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onApprove, onReject }) => {
  const isPending = !user.is_admin && user.auth_status === "P";

  return (
    <Card className="group hover:shadow-lg transition-all border-none relative flex flex-col justify-between h-full">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="p-2.5 bg-gray-50 rounded-xl group-hover:bg-brand-50 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-brand-500 transition-colors">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <UserStatusBadge status={user.auth_status} isAdmin={user.is_admin} />
        </div>
        
        <div>
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-tight mb-1">User Account</h3>
          <p className="text-lg font-bold text-gray-900 break-all">{user.email}</p>
        </div>
      </div>

      {isPending && (
        <div className="mt-6 pt-4 border-t border-gray-50 flex gap-2">
          <button
            onClick={() => onApprove(user.id)}
            className="flex-1 py-2.5 bg-green-500 text-white rounded-xl text-xs font-black hover:bg-green-600 shadow-lg shadow-green-100 active:scale-95 transition-all"
          >
            승인
          </button>
          <button
            onClick={() => onReject(user.id)}
            className="flex-1 py-2.5 bg-red-50 text-red-500 border border-red-100 rounded-xl text-xs font-black hover:bg-red-500 hover:text-white active:scale-95 transition-all"
          >
            거절
          </button>
        </div>
      )}
      
      {!isPending && (
        <div className="mt-6 pt-4 border-t border-gray-50">
          <p className="text-center text-[10px] font-bold text-gray-300 uppercase tracking-widest">Processed or Admin</p>
        </div>
      )}
    </Card>
  );
};

export default UserCard;
