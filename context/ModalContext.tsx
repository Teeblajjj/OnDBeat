
import React, { createContext, useContext, useState, ReactNode } from 'react';

type ModalType = 'share' | 'beat' | 'negotiation' | 'playlist' | 'upload' | 'auth' | 'welcome';

interface ModalState {
  type: ModalType | null;
  props: any;
}

interface ModalContextType {
  modal: ModalState;
  openModal: (type: ModalType, props?: any) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<ModalState>({ type: null, props: {} });

  const openModal = (type: ModalType, props: any = {}) => {
    setModal({ type, props });
  };

  const closeModal = () => {
    setModal({ type: null, props: {} });
  };

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
