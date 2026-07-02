import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';

type ToastType = 'info' | 'success' | 'warning' | 'error';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: {
    success: (msg: string) => void;
    error: (msg: string) => void;
    info: (msg: string) => void;
    warning: (msg: string) => void;
  };
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const toastMethods = {
    success: (msg: string) => addToast(msg, 'success'),
    error: (msg: string) => addToast(msg, 'error'),
    info: (msg: string) => addToast(msg, 'info'),
    warning: (msg: string) => addToast(msg, 'warning'),
  };

  const getIcon = (type: ToastType) => {
    switch(type) {
      case 'success': return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-rose-400" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      default: return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const getStyle = (type: ToastType) => {
    switch(type) {
      case 'success': return 'bg-emerald-950/80 border-emerald-500/30 text-emerald-100';
      case 'error': return 'bg-rose-950/80 border-rose-500/30 text-rose-100';
      case 'warning': return 'bg-amber-950/80 border-amber-500/30 text-amber-100';
      default: return 'bg-blue-950/80 border-blue-500/30 text-blue-100';
    }
  };

  return (
    <ToastContext.Provider value={{ toast: toastMethods }}>
      {children}
      {toasts.length > 0 && (
        <div className="toast toast-end toast-bottom z-[9999] mb-4 mr-4">
          {toasts.map((t) => (
            <div 
              key={t.id} 
              className={`alert border backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] animate-in slide-in-from-right-8 fade-in duration-300 flex items-center gap-3 rounded-2xl ${getStyle(t.type)}`}
            >
              {getIcon(t.type)}
              <span className="font-medium tracking-wide">{t.message}</span>
            </div>
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}
