import { Search } from 'lucide-react';
import './SearchBar.css';

export default function SearchBar({ searchQuery, setSearchQuery }) {
    return (
        <div className="search-bar">
            <Search className="search-icon" size={20} />
            <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
            />
        </div>
    );
}
