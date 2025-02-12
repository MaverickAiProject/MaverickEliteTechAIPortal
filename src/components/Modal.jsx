import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                {children}
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-mainPurple text-white rounded hover:bg-mainPurpleDark"
                >
                    Close
                </button>
            </div>
        </div>,
        document.getElementById('modal-root')
    );
};

export default Modal;
