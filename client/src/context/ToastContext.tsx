import { createContext, ReactNode, useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

interface ToastContextType {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastStorage = ({ children }: { children: ReactNode }) => {
  const success = (message: string) => toast.success(message);
  const error = (message: string) => toast.error(message);
  const info = (message: string) => toast.info(message);

  return (
    <ToastContext.Provider value={{ success, error, info }}>
      {children}
      <ToastContainer position="top-right" autoClose={5000} style={{ marginTop: '1rem' }}/>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast deve ser usado dentro de um ToastStorage');
  }
  return context;
};
