import { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

const Toast = ({ message, type = 'info', onClose, duration = 5000 }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  }[type];

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-lg border p-4 shadow-lg transition-all',
        bgColor
      )}
    >
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="rounded-md p-1 hover:bg-black/10"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Toast;

