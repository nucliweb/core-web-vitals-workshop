import React from 'react';
import { createPortal } from 'react-dom';

interface GifModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GifModal({ isOpen, onClose }: GifModalProps) {
  console.log('GifModal rendered, isOpen:', isOpen); // Debug log

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 pointer-events-auto"
      onClick={onClose}
    >
      <div 
        className="relative z-[10000] w-[90%] max-w-[500px] rounded-lg bg-white shadow-lg overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <img 
          src="https://media.giphy.com/media/7B71Ci4KE3m0/giphy.gif" 
          alt="Show me the money - Tom Cruise"
          style={{ 
            width: '100%',
            height: 'auto',
            display: 'block'
          }}
        />
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            zIndex: 100001
          }}
        >
          ✕
        </button>
      </div>
    </div>,
    document.body
  );
}
