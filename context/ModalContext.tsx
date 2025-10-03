
import React, { createContext, useContext, useState, ReactNode } from 'react';
import ShareModal from '../components/ShareModal';
import BeatModal from '../components/BeatModal';
import NegotiationModal from '../components/NegotiationModal'; // Import the NegotiationModal

type ModalType = 'share' | 'beat' | 'negotiation'; // Add 'negotiation' modal type

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
      case 'beat':
        return <BeatModal beat={modalProps.beat} isOpen={true} onClose={closeModal} />;
      case 'negotiation':
        return <NegotiationModal beat={modalProps.beat} isOpen={true} onClose={closeModal} />;
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
