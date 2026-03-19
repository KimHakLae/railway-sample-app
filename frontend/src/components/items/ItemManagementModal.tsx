import { useState } from "react";
import type { Category } from "../../types/ingredient";
import { CATEGORY_INFO } from "../../constants/categoryConstants";


// 카테고리 버튼 목록은 CATEGORY_INFO에서 생성
const CATEGORY_KEYS = Object.keys(CATEGORY_INFO) as Category[];

interface Props {
  title: string;
  initialData?: any;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
}

export default function ItemManagementModal({ title, initialData, onClose, onSubmit }: Props) {
  const [name, setName] = useState(initialData?.name || "");
  const [category, setCategory] = useState<Category>(initialData?.category || "ETC");
  const [version, setVersion] = useState(initialData?.version || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return alert("품목명을 입력해주세요.");
    setLoading(true);
    try {
      await onSubmit({ name, category, version });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-scale-up">
        <div className="px-8 pt-8 pb-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">{title}</h2>
            <button 
              onClick={onClose}
              className="p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 dark:text-gray-300 rounded-xl transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">식재료명</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="예: 신선한 오이"
                className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 transition-all font-medium"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">카테고리</label>
              <div className="grid grid-cols-3 gap-2">
                {CATEGORY_KEYS.map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setCategory(key)}
                    className={`
                      py-3 rounded-xl text-xs font-bold transition-all text-left px-3
                      ${category === key
                        ? `${CATEGORY_INFO[key].style} shadow-lg ring-2 ring-current ring-offset-1`
                        : "bg-gray-50 dark:bg-slate-900 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800"}
                    `}
                  >
                    {CATEGORY_INFO[key].label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">버전 (선택 사항)</label>
              <input
                type="text"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                placeholder="예: v1.0"
                className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 transition-all font-medium"
              />
            </div>

            <div className="pt-4 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-4 rounded-2xl bg-gray-50 dark:bg-slate-900 text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-100 dark:hover:bg-slate-800 transition-all active:scale-95"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-[2] py-4 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 dark:from-brand-600 dark:to-brand-700 dark:hover:from-brand-500 dark:hover:to-brand-600 text-white font-bold shadow-lg shadow-brand-500/20 dark:shadow-none transition-all active:scale-95 disabled:opacity-50"
              >
                {loading ? "처리 중..." : "저장하기"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
