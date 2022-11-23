import React from 'react';

const ConfirmationModal = ({ title, message, btnName, closeModal, btnAction, dataModal }) => {
    return (
        <div>
            <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{message}</p>
                    <div className="modal-action">
                        <label onClick={() => btnAction(dataModal)} htmlFor="confirmation-modal" className="btn btn-sm bg-red-600 border-red-600">{btnName}</label>
                        <label onClick={closeModal} htmlFor="confirmation-modal" className="btn btn-outline btn-sm">Cancel</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;