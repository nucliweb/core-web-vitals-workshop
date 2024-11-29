import React, { createContext, useContext, useState } from 'react';

interface ModalContextType {
  showGifModal: boolean;
  showConfirmationModal: boolean;
  confirmationConfig: {
    title: string;
    message: string;
    onConfirm: () => void;
  } | null;
  setShowGifModal: (show: boolean) => void;
  openConfirmationModal: (config: {
    title: string;
    message: string;
    onConfirm: () => void;
  }) => void;
  closeConfirmationModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [showGifModal, setShowGifModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmationConfig, setConfirmationConfig] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  const openConfirmationModal = (config: {
    title: string;
    message: string;
    onConfirm: () => void;
  }) => {
    setConfirmationConfig(config);
    setShowConfirmationModal(true);
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
    setConfirmationConfig(null);
  };

  return (
    <ModalContext.Provider
      value={{
        showGifModal,
        showConfirmationModal,
        confirmationConfig,
        setShowGifModal,
        openConfirmationModal,
        closeConfirmationModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
