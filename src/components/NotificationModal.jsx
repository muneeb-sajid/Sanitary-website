import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.5rem',
  },
  content: {
    position: 'relative',
    inset: 'auto',
    padding: '1.5rem',
    borderRadius: '1.75rem',
    border: '1px solid rgba(148, 163, 184, 0.25)',
    background: '#ffffff',
    maxWidth: '36rem',
    width: '100%',
    maxHeight: 'calc(100vh - 4rem)',
    overflow: 'auto',
    boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
  },
};

export default function NotificationModal({ open, title, message, onClose }) {
  return (
    <Modal
      isOpen={open}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Notification"
      shouldCloseOnOverlayClick={true}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500 font-semibold">Notification</p>
          <h2 className="mt-3 text-xl font-bold text-slate-900">{title}</h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-slate-400 hover:text-slate-700 transition-colors"
          aria-label="Close notification"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-600 break-words">{message}</p>
    </Modal>
  );
}
