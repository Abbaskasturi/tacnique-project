import { useState, useMemo } from 'react';
import { UserPlus, AlertCircle, CheckCircle } from 'lucide-react';
import { useUsers } from './hooks/useUsers';
import { createUser, updateUser, deleteUser } from './api/userService';

import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FilterPopup from './components/FilterPopup';
import SortControl from './components/SortControl';
import UserTable from './components/UserTable';
import Pagination from './components/Pagination';
import UserForm from './components/UserForm';
import ConfirmDelete from './components/ConfirmDelete';
import ErrorBoundary from './components/ErrorBoundary';

import './App.css';

function Dashboard() {
  const { users, setUsers, loading, error, fetchUsers } = useUsers();

  // UI State
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ firstName: '', lastName: '', email: '', department: '' });
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Modal State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [actionError, setActionError] = useState(null);
  const [actionSuccess, setActionSuccess] = useState(null);

  // Derived State: Dynamic Departments
  const dynamicDepartments = useMemo(() => {
    const depts = new Set(users.map(u => u.department).filter(Boolean));
    return Array.from(depts).sort();
  }, [users]);

  // Derived State: Search & Filter
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      // Search Query matching
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        user.firstName.toLowerCase().includes(searchLower) ||
        user.lastName.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower);

      if (!matchesSearch) return false;

      // Advanced Filters
      if (filters.firstName && !user.firstName.toLowerCase().includes(filters.firstName.toLowerCase())) return false;
      if (filters.lastName && !user.lastName.toLowerCase().includes(filters.lastName.toLowerCase())) return false;
      if (filters.email && !user.email.toLowerCase().includes(filters.email.toLowerCase())) return false;
      if (filters.department && user.department !== filters.department) return false;

      return true;
    });
  }, [users, searchQuery, filters]);

  // Derived State: Sort
  const sortedUsers = useMemo(() => {
    let sortableItems = [...filteredUsers];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key].toString().toLowerCase();
        const bValue = b[sortConfig.key].toString().toLowerCase();
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredUsers, sortConfig]);

  // Derived State: Pagination
  const currentUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedUsers.slice(startIndex, startIndex + pageSize);
  }, [sortedUsers, currentPage, pageSize]);

  // Handlers

  const handleAddUser = () => {
    setEditingUser(null);
    setIsFormOpen(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
  };

  const handleFormSubmit = async (formData) => {
    setActionError(null);
    setActionSuccess(null);
    try {
      if (editingUser) {
        // Update
        // Bypass API call if it's a locally added mock user (JSONPlaceholder only has 10 users)
        if (editingUser.id <= 10) {
          await updateUser(editingUser.id, formData);
        }
        setUsers(users.map(u => (u.id === editingUser.id ? { ...u, ...formData } : u)));
        setActionSuccess("User updated successfully!");
      } else {
        // Create
        const response = await createUser(formData);
        const newUser = { ...formData, id: response.data.id || Date.now() };
        setUsers([newUser, ...users]);
        setActionSuccess("User added successfully!");
      }
      setIsFormOpen(false);
      setTimeout(() => setActionSuccess(null), 3000);
    } catch (err) {
      setActionError("Failed to save user. Please try again.");
    }
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    setActionError(null);
    try {
      // Bypass API call if it's a locally added mock user
      if (userToDelete.id <= 10) {
        await deleteUser(userToDelete.id);
      }
      setUsers(users.filter(u => u.id !== userToDelete.id));
      setUserToDelete(null);

      // Adjust pagination if needed
      const newTotalPages = Math.ceil((filteredUsers.length - 1) / pageSize);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }

      setActionSuccess("User deleted successfully!");
      setTimeout(() => setActionSuccess(null), 3000);
    } catch (err) {
      setActionError("Failed to delete user. Please try again.");
      setUserToDelete(null);
    }
  };

  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">
        {(error || actionError) && (
          <div className="global-alert">
            <AlertCircle size={20} />
            <span>{error || actionError}</span>
          </div>
        )}
        {actionSuccess && (
          <div className="global-success">
            <CheckCircle size={20} />
            <span>{actionSuccess}</span>
          </div>
        )}

        <div className="toolbar">
          <div className="toolbar-left">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <FilterPopup filters={filters} setFilters={setFilters} departments={dynamicDepartments} />
            <SortControl sortConfig={sortConfig} setSortConfig={setSortConfig} />
          </div>
          <div className="toolbar-right">
            <button className="btn-primary" onClick={handleAddUser}>
              <UserPlus size={16} />
              Add User
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading-container">Loading users...</div>
        ) : (
          <>
            <UserTable
              users={currentUsers}
              sortConfig={sortConfig}
              onEdit={handleEditUser}
              onDelete={handleDeleteClick}
            />
            <Pagination
              currentPage={currentPage}
              totalItems={sortedUsers.length}
              pageSize={pageSize}
              setCurrentPage={setCurrentPage}
            />
          </>
        )}
      </main>

      <UserForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        editingUser={editingUser}
        departments={dynamicDepartments}
      />

      <ConfirmDelete
        isOpen={!!userToDelete}
        onClose={() => setUserToDelete(null)}
        onConfirm={handleConfirmDelete}
        userName={userToDelete ? `${userToDelete.firstName} ${userToDelete.lastName}` : ''}
      />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Dashboard />
    </ErrorBoundary>
  );
}
