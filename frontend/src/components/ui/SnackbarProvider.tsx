import React, { createContext, useContext, useState } from "react";
type ReactNode = React.ReactNode;

type SnackbarOptions = {
  type?: "success" | "error" | "info";
  duration?: number | null; // null이면 사용자가 닫을 때까지 유지
  action?: ReactNode;        // confirm 버튼 등
};

type SnackbarContextType = {
  showSnackbar: (message: string, options?: SnackbarOptions) => void;
  hideSnackbar: () => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const useSnackbar = () => {
  const ctx = useContext(SnackbarContext);
  if (!ctx) throw new Error("SnackbarProvider 안에서 사용해야 합니다.");
  return ctx;
};

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbar, setSnackbar] = useState<{
    show: boolean;
    message: string;
    type?: "success" | "error" | "info";
    action?: ReactNode;
  }>({ show: false, message: "" });

  const showSnackbar = (
    message: string,
    options: SnackbarOptions = {}
  ) => {
    setSnackbar({ show: true, message, ...options });
    if (options.duration !== null) {
      setTimeout(() => setSnackbar(s => ({ ...s, show: false })), options.duration || 2200);
    }
  };

  const hideSnackbar = () => setSnackbar(s => ({ ...s, show: false }));

  return (
    <SnackbarContext.Provider value={{ showSnackbar, hideSnackbar }}>
      {children}

      {/* 하단 스낵바 */}
      <div
        className={`
          fixed left-1/2 -translate-x-1/2 bottom-6 z-50
          transition-all duration-300
          ${snackbar.show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"}
        `}
      >
        <div
          className={`
            px-5 py-3 rounded-xl shadow-lg text-sm font-medium
            backdrop-blur-md border
            pointer-events-auto
            ${snackbar.type === "success"
              ? "bg-emerald-500/90 text-white border-emerald-400/40"
              : snackbar.type === "error"
              ? "bg-rose-500/90 text-white border-rose-400/40"
              : "bg-gray-800/90 text-white border-gray-700/40"}
            flex flex-col items-center space-y-2
          `}
        >
          {/* 메시지 */}
          <div className="truncate text-center">{snackbar.message}</div>

          {/* 액션 버튼 */}
          {snackbar.action && <div className="flex gap-2">{snackbar.action}</div>}
        </div>
      </div>
    </SnackbarContext.Provider>
  );
};