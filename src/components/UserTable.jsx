
import UserRow from './UserRow';
import './UserTable.css';

export default function UserTable({ users, onEdit, onDelete }) {
    return (
        <div className="table-container">
            <table className="user-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="empty-state">
                                No users found matching your criteria.
                            </td>
                        </tr>
                    ) : (
                        users.map(user => (
                            <UserRow 
                                key={user.id} 
                                user={user} 
                                onEdit={onEdit} 
                                onDelete={onDelete} 
                            />
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
