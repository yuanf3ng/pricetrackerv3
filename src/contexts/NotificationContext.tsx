import React, { createContext, useContext, useState, useCallback } from 'react';
import { Notification, NotificationType } from '../components/ui/Notification';

interface NotificationContextType {
  showNotification: (type: NotificationType, message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notification, setNotification] = useState<{
    type: NotificationType;
    message: string;
  } | null>(null);

  const showNotification = useCallback((type: NotificationType, message: string) => {
    setNotification({ type, message });
  }, []);

  const handleClose = useCallback(() => {
    setNotification(null);
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={handleClose}
        />
      )}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}