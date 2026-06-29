import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import './FilterPopup.css';

export default function FilterPopup({ filters, setFilters, departments = [] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [localFilters, setLocalFilters] = useState(filters);

    const handleApply = () => {
        setFilters(localFilters);
        setIsOpen(false);
    };

    const handleClear = () => {
        const clearedFilters = { firstName: '', lastName: '', email: '', department: '' };
        setLocalFilters(clearedFilters);
        setFilters(clearedFilters);
        setIsOpen(false);
    };

    return (
        <div className="filter-container">
            <button className="filter-btn" onClick={() => setIsOpen(!isOpen)}>
                <Filter size={20} />
                <span>Filters</span>
            </button>

            {isOpen && (
                <div className="filter-popup">
                    <div className="filter-header">
                        <h3>Filter Users</h3>
                        <button className="close-btn" onClick={() => setIsOpen(false)}>
                            <X size={20} />
                        </button>
                    </div>
                    
                    <div className="filter-body">
                        <div className="form-group">
                            <label>First Name</label>
                            <input 
                                type="text" 
                                value={localFilters.firstName}
                                onChange={(e) => setLocalFilters({...localFilters, firstName: e.target.value})}
                                placeholder="Enter first name"
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input 
                                type="text" 
                                value={localFilters.lastName}
                                onChange={(e) => setLocalFilters({...localFilters, lastName: e.target.value})}
                                placeholder="Enter last name"
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input 
                                type="text" 
                                value={localFilters.email}
                                onChange={(e) => setLocalFilters({...localFilters, email: e.target.value})}
                                placeholder="Enter email"
                            />
                        </div>
                        <div className="form-group">
                            <label>Department</label>
                            <select 
                                value={localFilters.department}
                                onChange={(e) => setLocalFilters({...localFilters, department: e.target.value})}
                            >
                                <option value="">All Departments</option>
                                {departments.map(dept => (
                                    <option key={dept} value={dept}>{dept}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    
                    <div className="filter-footer">
                        <button className="btn-secondary" onClick={handleClear}>Clear</button>
                        <button className="btn-primary" onClick={handleApply}>Apply Filters</button>
                    </div>
                </div>
            )}
        </div>
    );
}
