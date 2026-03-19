
interface User {
  user_id: number;
  email: string;
  auth_status: string;
  is_admin: boolean;
}

interface UserCardProps {
  user: User;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

export default function UserCard({ user, onApprove, onReject }: UserCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-[32px] border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all space-y-4">
      <div className="flex items-center justify-between">
        <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-xl">👤</div>
        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
          user.auth_status === 'P' ? 'bg-orange-100 text-orange-600' :
          user.auth_status === 'V' ? 'bg-emerald-100 text-emerald-600' :
          'bg-rose-100 text-rose-600'
        }`}>
          {user.auth_status === 'P' ? '승인 대기' : user.auth_status === 'V' ? '승인 완료' : '거절됨'}
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Email Address</p>
        <p className="text-lg font-black text-gray-900 dark:text-white truncate">{user.email}</p>
      </div>

      {user.auth_status === 'P' && (
        <div className="flex gap-2 pt-2">
          <button 
            onClick={() => onApprove(user.user_id)}
            className="flex-1 py-3 bg-brand-600 text-white text-sm font-black rounded-xl hover:bg-brand-700 transition-all active:scale-95 shadow-lg shadow-brand-100"
          >
            승인
          </button>
          <button 
            onClick={() => onReject(user.user_id)}
            className="flex-1 py-3 bg-gray-50 dark:bg-slate-900 text-gray-400 text-sm font-black rounded-xl hover:bg-gray-100 transition-all active:scale-95"
          >
            거절
          </button>
        </div>
      )}
    </div>
  );
}
