import { Users } from 'lucide-react';
import './Header.css';

export default function Header() {
    return (
        <header className="header">
            <div className="header-container">
                <div className="header-logo">
                    <Users size={28} className="logo-icon" />
                    <h1>User Management Dashboard</h1>
                </div>
                <div className="header-profile">
                    <div className="avatar">Admin</div>
                </div>
            </div>
        </header>
    );
}
