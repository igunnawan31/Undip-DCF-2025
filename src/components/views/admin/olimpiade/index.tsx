import SidebarAdmin from "@/components/fragment/sidebar/admin";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";

interface Participant {
  id: number;
  nama_lengkap?: string;
  email: string;
  no_hp: string;
  nama_instansi?: string;
  proof_url?: string;
  twibbon_url: string;
  ktp_url?: string;
  isverified: boolean;
}

const AdminOlimpiadeView = () => {
    const { data: session } = useSession();
    const [registerOlimpiade, setRegisterOlimpiade] = useState<Participant[]>([]);
    const [filter, setFilter] = useState<'all' | 'verified' | 'unverified'>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [participantToDelete, setParticipantToDelete] = useState<number | null>(null);
    
    // Debounce effect
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300);

        return () => {
            clearTimeout(timerId);
        };
    }, [searchTerm]);

    const fetchRegisterOlimpiade = async () => {
        try {
            const res = await fetch("/api/admin/olimpiade", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if(res.status === 200) {
                const data = await res.json();
                setRegisterOlimpiade(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getDetailAccount = async (id: number) => {
        try {
            const res = await fetch(`/api/admin/olimpiade?id=${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if(res.status === 200) {
                const data = await res.json();
                return data.data
            }
            return null
        } catch (error) {
            console.log(error);
            return null
        }
    }

    const handleVerify = async (id: number) => {
        const dataDetailAccount = await getDetailAccount(id);
        if (dataDetailAccount !== null) {
            const newData = {
                ...dataDetailAccount, 
                isverified: true
            }
            const res = await fetch(`/api/admin/olimpiade?id=${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newData)
            })
            if(res.status === 200) {
                fetchRegisterOlimpiade();
            }
        }
    };

    const handleReject = async (id: number) => {
        const dataDetailAccount = await getDetailAccount(id);
        if (dataDetailAccount !== null) {
            const newData = {
                ...dataDetailAccount, 
                isverified: false
            }
            const res = await fetch(`/api/admin/olimpiade?id=${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newData)
            })
            if(res.status === 200) {
                fetchRegisterOlimpiade();
            }
        }
    };

    const openDeleteConfirmation = (id: number) => {
        setParticipantToDelete(id);
        setShowDeleteModal(true);
    };
    
    const closeDeleteConfirmation = () => {
        setShowDeleteModal(false);
        setParticipantToDelete(null);
    };

    const confirmDelete = async () => {
        if (participantToDelete !== null) {
            await handleDelete(participantToDelete);
            closeDeleteConfirmation();
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const res = await fetch(`/api/admin/olimpiade?id=${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if(res.status === 200) {
                fetchRegisterOlimpiade();
            } else {
                console.error("Failed to delete participant");
            }
        } catch (error) {
            console.error("Error deleting participant:", error);
        }
    }

    const filteredParticipants = useMemo(() => {
        return registerOlimpiade.filter(participant => {
            // Apply verification filter
            if (filter === 'verified' && !participant.isverified) return false;
            if (filter === 'unverified' && participant.isverified) return false;
            
            // Apply debounced search filter
            if (debouncedSearchTerm) {
                const name = (participant.nama_lengkap || '').toLowerCase();
                return name.includes(debouncedSearchTerm.toLowerCase());
            }
            
            return true;
        });
    }, [registerOlimpiade, filter, debouncedSearchTerm]);
    
    useEffect(() => {
        fetchRegisterOlimpiade();
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <SidebarAdmin />
            
            <div className="flex-1 p-8">
                <h1 className="text-2xl font-bold mb-6">Daftar Peserta Olimpiade</h1>
                
                {/* Filter and Search Controls */}
                <div className="mb-6 flex justify-between items-center">
                    <div className="flex space-x-4">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                            Semua Peserta
                        </button>
                        <button
                            onClick={() => setFilter('verified')}
                            className={`px-4 py-2 rounded-md ${filter === 'verified' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                            Terverifikasi
                        </button>
                        <button
                            onClick={() => setFilter('unverified')}
                            className={`px-4 py-2 rounded-md ${filter === 'unverified' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                            Belum Verifikasi
                        </button>
                    </div>
                    
                    {/* Search Bar */}
                    <div className="relative w-64">
                        <input
                            type="text"
                            placeholder="Cari berdasarkan nama..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={handleSearch}
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
                
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Lengkap</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No HP</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instansi</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bukti Pembayaran</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Twibbon</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">KTP</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredParticipants.map((item, index) => (
                                <tr key={item.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {item.nama_lengkap || 'Nama tidak tersedia'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.no_hp}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {item.nama_instansi || 'Instansi tidak tersedia'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 hover:text-blue-700">
                                        {item.proof_url ? (
                                            <Link href={item.proof_url} target="_blank" rel="noopener noreferrer">
                                                Lihat Bukti
                                            </Link>
                                        ) : 'Tidak tersedia'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 hover:text-blue-700">
                                        <Link href={item.twibbon_url} target="_blank" rel="noopener noreferrer">
                                            Lihat Twibbon
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 hover:text-blue-700">
                                        {item.ktp_url ? (
                                            <Link href={item.ktp_url} target="_blank" rel="noopener noreferrer">
                                                Lihat KTP
                                            </Link>
                                        ) : 'Tidak tersedia'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${item.isverified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {item.isverified ? 'Terverifikasi' : 'Belum Verifikasi'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-4">
                                            <button
                                                onClick={() => handleVerify(item.id)}
                                                disabled={item.isverified}
                                                className={`p-1 ${item.isverified ? 'text-gray-400 cursor-not-allowed' : 'text-green-600 hover:text-green-900'}`}
                                                title={item.isverified ? 'Sudah Terverifikasi' : 'Verifikasi'}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleReject(item.id)}
                                                disabled={!item.isverified}
                                                className={`p-1 ${!item.isverified ? 'text-gray-400 cursor-not-allowed' : 'text-red-600 hover:text-red-900'}`}
                                                title={!item.isverified ? 'Belum Terverifikasi' : 'Tolak Verifikasi'}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => openDeleteConfirmation(item.id)}
                                                className="p-1 text-gray-600 hover:text-gray-900"
                                                title="Hapus Peserta"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Konfirmasi Hapus</h3>
                        <p className="text-gray-700 mb-6">
                            Apakah Anda yakin ingin menghapus peserta ini? Tindakan ini tidak dapat dibatalkan.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={closeDeleteConfirmation}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                            >
                                Tidak
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                            >
                                Ya, Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminOlimpiadeView;