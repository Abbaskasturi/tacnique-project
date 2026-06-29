import { X } from 'lucide-react';
import './ConfirmDelete.css';

export default function ConfirmDelete({ isOpen, onClose, onConfirm, userName }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content form-modal">
                <div className="form-header">
                    <h2>Delete User</h2>
                    <button className="modal-close" onClick={onClose} type="button">
                        <X size={20} />
                    </button>
                </div>
                
                <div style={{ marginTop: '1rem' }}>
                    <p style={{ color: '#000000', margin: '0 0 1.5rem 0', fontSize: '14px', lineHeight: '1.5' }}>
                        Are you sure you want to delete <strong>{userName}</strong>? This action cannot be undone.
                    </p>

                    <div className="form-actions">
                        <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="button" className="btn-primary" style={{ backgroundColor: '#cf222e', borderColor: '#cf222e' }} onClick={onConfirm}>
                            Delete User
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
