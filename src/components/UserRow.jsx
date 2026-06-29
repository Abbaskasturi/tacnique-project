import { Edit2, Trash2 } from 'lucide-react';

export default function UserRow({ user, onEdit, onDelete }) {
    return (
        <tr>
            <td>{user.id}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>
                <span className="department-label">{user.department}</span>
            </td>
            <td>
                <div className="action-buttons">
                    <button
                        className="action-icon-btn edit-btn"
                        onClick={() => onEdit(user)}
                        title="Edit User"
                    >
                        <Edit2 size={16} />
                    </button>
                    <button
                        className="action-icon-btn delete-btn"
                        onClick={() => onDelete(user)}
                        title="Delete User"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </td>
        </tr>
    );
}
