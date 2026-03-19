import { VERSION_HISTORY } from "../../utils/version";

interface Props {
  onClose: () => void;
}

export default function VersionHistory({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-fade-in">
        <div className="p-6 border-b flex justify-between items-center bg-gray-50 dark:bg-slate-900">
          <h2 className="text-xl font-bold">버전 연혁 (Changelog)</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black dark:text-white text-2xl">×</button>
        </div>
        
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-8">
          {VERSION_HISTORY.map((v: any) => (
            <div key={v.version} className="relative pl-6 border-l-2 border-brand-500">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-brand-500 border-4 border-white shadow-sm"></div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-lg font-bold text-brand-600">{v.version}</span>
                <span className="text-xs text-gray-400">{v.date}</span>
              </div>
              <ul className="space-y-1.5">
                {v.changes.map((change: string, j: number) => (
                  <li key={j} className="text-sm text-gray-600 flex gap-2">
                    <span className="text-brand-400">•</span>
                    {change}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="p-4 bg-gray-50 dark:bg-slate-900 text-center">
          <button 
            onClick={onClose}
            className="w-full py-3 bg-gray-800 text-white rounded-xl font-semibold hover:bg-black transition-all"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
