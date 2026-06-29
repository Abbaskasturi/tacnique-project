import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { validateForm } from '../utils/validators';
import './UserForm.css';

export default function UserForm({ isOpen, onClose, onSubmit, editingUser, departments = [] }) {
    const defaultState = { firstName: '', lastName: '', email: '', department: '' };
    const [formData, setFormData] = useState(defaultState);
    const [errors, setErrors] = useState({});
    
    useEffect(() => {
        if (editingUser) {
            setFormData(editingUser);
        } else {
            setFormData(defaultState);
        }
        setErrors({});
    }, [editingUser, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        onSubmit(formData);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content form-modal">
                <div className="form-header">
                    <h2>{editingUser ? 'Edit User' : 'Add New User'}</h2>
                    <button className="modal-close" onClick={onClose} type="button">
                        <X size={20} />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="user-form">
                    <div className="form-group">
                        <label>First Name <span className="required">*</span></label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={errors.firstName ? 'error-input' : ''}
                            placeholder="e.g. John"
                        />
                        {errors.firstName && <span className="error-msg">{errors.firstName}</span>}
                    </div>

                    <div className="form-group">
                        <label>Last Name <span className="required">*</span></label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={errors.lastName ? 'error-input' : ''}
                            placeholder="e.g. Doe"
                        />
                        {errors.lastName && <span className="error-msg">{errors.lastName}</span>}
                    </div>

                    <div className="form-group">
                        <label>Email <span className="required">*</span></label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'error-input' : ''}
                            placeholder="e.g. john@example.com"
                        />
                        {errors.email && <span className="error-msg">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label>Department <span className="required">*</span></label>
                        <select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            className={errors.department ? 'error-input' : ''}
                        >
                            <option value="">Select a Department</option>
                            {departments.map(dept => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </select>
                        {errors.department && <span className="error-msg">{errors.department}</span>}
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn-primary">
                            {editingUser ? 'Save Changes' : 'Add User'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
