import { ArrowUp, ArrowDown } from 'lucide-react';
import './SortControl.css';

export default function SortControl({ sortConfig, setSortConfig }) {
    const handleFieldChange = (e) => {
        setSortConfig({ ...sortConfig, key: e.target.value });
    };

    const toggleDirection = () => {
        setSortConfig({
            ...sortConfig,
            direction: sortConfig.direction === 'asc' ? 'desc' : 'asc'
        });
    };

    return (
        <div className="sort-control">
            <div className="sort-dropdown-wrapper">
                <label htmlFor="sort-select">Sort by:</label>
                <select
                    id="sort-select"
                    value={sortConfig.key || 'id'}
                    onChange={handleFieldChange}
                    className="sort-select"
                >
                    <option value="id">ID</option>
                    <option value="firstName">First Name</option>
                    <option value="lastName">Last Name</option>
                    <option value="email">Email</option>
                    <option value="department">Department</option>
                </select>
            </div>

            <button
                className="sort-direction-btn"
                onClick={toggleDirection}
                title={`Sort ${sortConfig.direction === 'asc' ? 'Descending' : 'Ascending'}`}
            >
                {sortConfig.direction === 'asc' ? <ArrowUp size={18} /> : <ArrowDown size={18} />}
            </button>
        </div>
    );
}
