import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

export type NotificationType = 'success' | 'error' | 'info';

interface NotificationProps {
  type: NotificationType;
  message: string;
  onClose: () => void;
  duration?: number;
}

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: AlertCircle,
};

const styles = {
  success: 'bg-green-50 text-green-800 border-green-200',
  error: 'bg-red-50 text-red-800 border-red-200',
  info: 'bg-blue-50 text-blue-800 border-blue-200',
};

export function Notification({ type, message, onClose, duration = 3000 }: NotificationProps) {
  const Icon = icons[type];

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div className={`fixed top-4 right-4 z-50 animate-slide-in`}>
      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${styles[type]}`}>
        <Icon size={20} />
        <p className="text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className="ml-2 text-current opacity-70 hover:opacity-100 transition-opacity"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}