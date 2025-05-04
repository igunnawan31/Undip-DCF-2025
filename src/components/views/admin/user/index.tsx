import SidebarAdmin from "@/components/fragment/sidebar/admin";
import { useEffect, useState } from "react";

type User = {
    id: string;
    email: string;
    created_at: string;
    role: 'admin' | 'user';
};

const AdminUserView = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    const getUsers = async () => {
        try {
            const res = await fetch("/api/admin/user", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (res.status === 200) {
                const data = await res.json();
                return data.data;
            }
            throw new Error('Failed to fetch users');
        } catch (error) {
            console.error("Error fetching users:", error);
            return null;
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            const users = await getUsers();
            if (users) {
                setUsers(users);
                setFilteredUsers(users);
            }
            setLoading(false);
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        let filtered = users;
        
        // First apply role filter if needed
        if (activeFilter === 'admin') {
            filtered = users.filter(user => user.role === 'admin');
        } else if (activeFilter === 'user') {
            filtered = users.filter(user => user.role === 'user');
        }
        
        // Then apply search filter
        if (searchTerm.trim() !== '') {
            filtered = filtered.filter(user =>
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        setFilteredUsers(filtered);
    }, [searchTerm, users, activeFilter]);

    const handleUpdateRole = async () => {
        if (!selectedUser) return;
        
        try {
            setIsUpdating(true);
            const res = await fetch(`/api/admin/user?id=${selectedUser.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    role: selectedUser.role
                })
            });
            
            if (res.status === 200) {
                const updatedUsers = users.map(user => 
                    user.id === selectedUser.id ? selectedUser : user
                );
                setUsers(updatedUsers);
                setFilteredUsers(updatedUsers);
                setSelectedUser(null);
            } else {
                throw new Error('Failed to update user');
            }
        } catch (error) {
            console.error("Error updating user:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID');
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <SidebarAdmin />
            
            <div className="flex-1 p-4">
                <h1 className="text-xl font-bold mb-6">Daftar Pengguna</h1>
                
                {/* Filter and Search Section - Similar to the example image */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex space-x-2">
                        <button 
                            onClick={() => setActiveFilter('all')}
                            className={`px-4 py-2 text-sm rounded-md ${
                                activeFilter === 'all' 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-gray-200 text-gray-700'
                            }`}
                        >
                            Semua User
                        </button>
                        <button 
                            onClick={() => setActiveFilter('admin')}
                            className={`px-4 py-2 text-sm rounded-md ${
                                activeFilter === 'admin' 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-gray-200 text-gray-700'
                            }`}
                        >
                            Admin
                        </button>
                        <button 
                            onClick={() => setActiveFilter('user')}
                            className={`px-4 py-2 text-sm rounded-md ${
                                activeFilter === 'user' 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-gray-200 text-gray-700'
                            }`}
                        >
                            User
                        </button>
                    </div>
                    
                    {/* Search positioned on the right side like in the example */}
                    <div className="relative w-64">
                        <input
                            type="text"
                            placeholder="Cari berdasarkan email..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg
                            className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NO</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EMAIL</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROLE</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CREATED</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AKSI</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="px-3 py-4 text-center text-sm text-gray-500">
                                            Loading users...
                                        </td>
                                    </tr>
                                ) : filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-3 py-4 text-center text-sm text-gray-500">
                                            Tidak ada data pengguna
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((user, index) => (
                                        <tr key={user.id}>
                                            <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                                                {index + 1}
                                            </td>
                                            <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-900">
                                                {user.email}
                                            </td>
                                            <td className="px-3 py-3 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs rounded-full ${
                                                    user.role === 'admin' 
                                                        ? 'bg-purple-100 text-purple-800' 
                                                        : 'bg-blue-100 text-blue-800'
                                                }`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(user.created_at)}
                                            </td>
                                            <td className="px-3 py-3 whitespace-nowrap text-sm font-medium">
                                                <button
                                                    onClick={() => setSelectedUser(user)}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Edit Role Modal */}
                {selectedUser && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg p-4 w-full max-w-sm">
                            <h2 className="text-lg font-bold mb-3">Update User Role</h2>
                            <div className="space-y-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <div className="p-2 bg-gray-50 rounded text-sm">{selectedUser.email}</div>
                                </div>
                                <div>
                                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                                        Role
                                    </label>
                                    <select
                                        id="role"
                                        value={selectedUser.role}
                                        onChange={(e) => setSelectedUser({
                                            ...selectedUser,
                                            role: e.target.value as 'admin' | 'user'
                                        })}
                                        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm"
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-2 mt-4">
                                <button
                                    onClick={() => setSelectedUser(null)}
                                    className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUpdateRole}
                                    disabled={isUpdating}
                                    className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md disabled:opacity-50"
                                >
                                    {isUpdating ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminUserView;