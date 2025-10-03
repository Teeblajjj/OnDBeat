
import React, { createContext, useContext, useState, ReactNode } from 'react';
import ShareModal from '../components/ShareModal';

type ModalType = 'share'; // Can be expanded with other modal types

interface ModalContextType {
  openModal: (type: ModalType, props: any) => void;
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
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [modalProps, setModalProps] = useState<any>({});

  const openModal = (type: ModalType, props: any) => {
    setModalType(type);
    setModalProps(props);
  };

  const closeModal = () => {
    setModalType(null);
    setModalProps({});
  };

  const renderModal = () => {
    switch (modalType) {
      case 'share':
        return <ShareModal item={modalProps.item} isVisible={true} onClose={closeModal} />;
      default:
        return null;
    }
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {renderModal()}
    </ModalContext.Provider>
  );
};
