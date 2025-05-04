import SidebarAdmin from "@/components/fragment/sidebar/admin";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";

interface LKTIParticipant {
  id: number;
  team_name: string;
  leader_name: string;
  leader_email: string;
  institution: string;
  leader_phone: string;
  member1: string;
  member2: string;
  member3: string;
  member4: string;
  member5: string;
  work_title: string;
  abstract_url?: string;
  full_paper_url?: string;
  payment_proof_url?: string;
  twibbon_url?: string;
  ktm_leader?: string;
  ktm_member1?: string;
  ktm_member2?: string;
  ktm_member3?: string | null;
  ktm_member4?: string | null;
  ktm_member5?: string | null;
  isverified?: boolean;
  idAccount?: string;
}

const LKTIAdminView = () => {
    const [LKTIRegister, setLKTIRegister] = useState<LKTIParticipant[]>([]);
    const [filter, setFilter] = useState<'all' | 'verified' | 'unverified'>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [teamToDelete, setTeamToDelete] = useState<number | null>(null);

    // Debounce effect for search
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300);

        return () => {
            clearTimeout(timerId);
        };
    }, [searchTerm]);

    const fetchLKTIRegister = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/admin/lkti", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if(res.status === 200) {    
                const data = await res.json();
                // Ensure all member fields are strings, converting null to empty string
                const normalizedData = data.data.map((team: LKTIParticipant) => ({
                    ...team,
                    member1: team.member1 || '',
                    member2: team.member2 || '',
                    member3: team.member3 || '',
                    member4: team.member4 || '',
                    member5: team.member5 || '',
                    ktm_member1: team.ktm_member1 || null,
                    ktm_member2: team.ktm_member2 || null,
                    ktm_member3: team.ktm_member3 || null,
                    ktm_member4: team.ktm_member4 || null,
                    ktm_member5: team.ktm_member5 || null,
                }));
                setLKTIRegister(normalizedData);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const getDetailAccount = async (id: number) => {
        try {
            const res = await fetch(`/api/admin/lkti?id=${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if(res.status === 200) {
                const data = await res.json();
                return data.data;
            }
            return null;
        } catch (error) {
            console.error("Error fetching detail:", error);
            return null;
        }
    };

    const handleVerify = async (id: number) => {
        try {
            const detailAccount = await getDetailAccount(id);
            if (detailAccount !== null) {
                const res = await fetch(`/api/admin/lkti?id=${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({...detailAccount, isverified: true})
                });
                if(res.status === 200) {
                    fetchLKTIRegister();
                }
            }
        } catch (error) {
            console.error("Error verifying:", error);
        }
    };

    const handleReject = async (id: number) => {
        try {
            const detailAccount = await getDetailAccount(id);
            if (detailAccount !== null) {
                const res = await fetch(`/api/admin/lkti?id=${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({...detailAccount, isverified: false})
                });
                if(res.status === 200) {
                    fetchLKTIRegister();
                }
            }
        } catch (error) {
            console.error("Error rejecting:", error);
        }
    };

    const openDeleteConfirmation = (id: number) => {
        setTeamToDelete(id);
        setShowDeleteModal(true);
    };
    
    const closeDeleteConfirmation = () => {
        setShowDeleteModal(false);
        setTeamToDelete(null);
    };

    const confirmDelete = async () => {
        if (teamToDelete !== null) {
            await handleDelete(teamToDelete);
            closeDeleteConfirmation();
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const res = await fetch(`/api/admin/lkti?id=${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if(res.status === 200) {
                fetchLKTIRegister();
            } else {
                console.error("Failed to delete team");
            }
        } 
        catch (error) {
            console.error("Error deleting team:", error);
        }
    }

    const displayMember = (member: string) => {
        return member && member.trim() !== "" ? member : "-";
    };

    // Filtered participants with memoization
    const filteredTeams = useMemo(() => {
        return LKTIRegister.filter(team => {
            // Apply verification filter
            if (filter === 'verified' && !team.isverified) return false;
            if (filter === 'unverified' && team.isverified) return false;
            
            // Apply search filter if search term exists
            if (debouncedSearchTerm) {
                const searchLower = debouncedSearchTerm.toLowerCase();
                return (
                    team.team_name.toLowerCase().includes(searchLower) ||
                    team.leader_name.toLowerCase().includes(searchLower) ||
                    (team.member1 && team.member1.toLowerCase().includes(searchLower)) ||
                    (team.member2 && team.member2.toLowerCase().includes(searchLower)) ||
                    (team.member3 && team.member3.toLowerCase().includes(searchLower)) ||
                    (team.member4 && team.member4.toLowerCase().includes(searchLower)) ||
                    (team.member5 && team.member5.toLowerCase().includes(searchLower)) ||
                    team.work_title.toLowerCase().includes(searchLower) ||
                    team.institution.toLowerCase().includes(searchLower)
                );
            }
            
            return true;
        });
    }, [LKTIRegister, filter, debouncedSearchTerm]);

    useEffect(() => {
        fetchLKTIRegister();
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <SidebarAdmin />
            
            <div className="flex-1 p-8 overflow-x-auto">
                <h1 className="text-2xl font-bold mb-6">Daftar Peserta LKTI</h1>
                
                {/* Filter and Search Controls */}
                <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-md text-sm ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                            Semua Tim
                        </button>
                        <button
                            onClick={() => setFilter('verified')}
                            className={`px-4 py-2 rounded-md text-sm ${filter === 'verified' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                            Terverifikasi
                        </button>
                        <button
                            onClick={() => setFilter('unverified')}
                            className={`px-4 py-2 rounded-md text-sm ${filter === 'unverified' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                            Belum Verifikasi
                        </button>
                    </div>
                    
                    {/* Search Bar */}
                    <div className="relative w-full md:w-64">
                        <input
                            type="text"
                            placeholder="Cari (Nama Tim/Anggota/Karya/Institusi)..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
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
                
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Tim</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ketua</th>
                                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Anggota 1</th>
                                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Anggota 2</th>
                                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Anggota 3</th>
                                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Anggota 4</th>
                                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Anggota 5</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Institusi</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul Karya</th>
                                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Abstrak</th>
                                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Full Paper</th>
                                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Bukti Bayar</th>
                                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Twibbon</th>
                                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">KTM Ketua</th>
                                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredTeams.length > 0 ? (
                                        filteredTeams.map((team, index) => (
                                            <tr key={team.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{index + 1}</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {team.team_name}
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-semibold text-gray-900">{team.leader_name}</div>
                                                    <div className="text-sm text-gray-500">{team.leader_email}</div>
                                                    <div className="text-sm text-gray-500">{team.leader_phone}</div>
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                                    {displayMember(team.member1)}
                                                    {team.ktm_member1 && (
                                                        <div className="mt-1">
                                                            <Link 
                                                                href={team.ktm_member1} 
                                                                target="_blank" 
                                                                rel="noopener noreferrer" 
                                                                className="text-xs text-blue-500 hover:text-blue-700"
                                                            >
                                                                (KTM)
                                                            </Link>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                                    {displayMember(team.member2)}
                                                    {team.ktm_member2 && (
                                                        <div className="mt-1">
                                                            <Link 
                                                                href={team.ktm_member2} 
                                                                target="_blank" 
                                                                rel="noopener noreferrer" 
                                                                className="text-xs text-blue-500 hover:text-blue-700"
                                                            >
                                                                (KTM)
                                                            </Link>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                                    {displayMember(team.member3)}
                                                    {team.ktm_member3 && (
                                                        <div className="mt-1">
                                                            <Link 
                                                                href={team.ktm_member3} 
                                                                target="_blank" 
                                                                rel="noopener noreferrer" 
                                                                className="text-xs text-blue-500 hover:text-blue-700"
                                                            >
                                                                (KTM)
                                                            </Link>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                                    {displayMember(team.member4)}
                                                    {team.ktm_member4 && (
                                                        <div className="mt-1">
                                                            <Link 
                                                                href={team.ktm_member4} 
                                                                target="_blank" 
                                                                rel="noopener noreferrer" 
                                                                className="text-xs text-blue-500 hover:text-blue-700"
                                                            >
                                                                (KTM)
                                                            </Link>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                                    {displayMember(team.member5)}
                                                    {team.ktm_member5 && (
                                                        <div className="mt-1">
                                                            <Link 
                                                                href={team.ktm_member5} 
                                                                target="_blank" 
                                                                rel="noopener noreferrer" 
                                                                className="text-xs text-blue-500 hover:text-blue-700"
                                                            >
                                                                (KTM)
                                                            </Link>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {team.institution}
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 max-w-xs">
                                                    {team.work_title}
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-center">
                                                    {team.abstract_url ? (
                                                        <Link href={team.abstract_url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:text-blue-700">
                                                            Download
                                                        </Link>
                                                    ) : '-'}
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-center">
                                                    {team.full_paper_url ? (
                                                        <Link href={team.full_paper_url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:text-blue-700">
                                                            Download
                                                        </Link>
                                                    ) : '-'}
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-center">
                                                    {team.payment_proof_url ? (
                                                        <Link href={team.payment_proof_url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:text-blue-700">
                                                            Lihat
                                                        </Link>
                                                    ) : '-'}
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-center">
                                                    {team.twibbon_url ? (
                                                        <Link href={team.twibbon_url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:text-blue-700">
                                                            Lihat
                                                        </Link>
                                                    ) : '-'}
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-center">
                                                    {team.ktm_leader ? (
                                                        <Link href={team.ktm_leader} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:text-blue-700">
                                                            Lihat
                                                        </Link>
                                                    ) : '-'}
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-center">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                        ${team.isverified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                        {team.isverified ? 'Terverifikasi' : 'Belum Verifikasi'}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-center">
                                                    <div className="flex space-x-2 justify-center">
                                                        <button
                                                            onClick={() => handleVerify(team.id)}
                                                            className="text-green-600 hover:text-green-900 p-1 text-lg"
                                                            title="Verifikasi"
                                                        >
                                                            ✓
                                                        </button>
                                                        <button
                                                            onClick={() => handleReject(team.id)}
                                                            className="text-red-600 hover:text-red-900 p-1 text-lg"
                                                            title="Tolak"
                                                        >
                                                            ✕
                                                        </button>
                                                        <button
                                                            onClick={() => openDeleteConfirmation(team.id)}
                                                            className="text-gray-600 hover:text-gray-900 p-1 text-lg"
                                                            title="Hapus"
                                                        >
                                                            🗑️
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={17} className="px-4 py-4 text-center text-sm text-gray-500">
                                                {searchTerm ? 'Tidak ada tim yang sesuai dengan pencarian' : 'Tidak ada data tim'}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                
                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Konfirmasi Hapus</h3>
                            <p className="text-gray-700 mb-6">
                                Apakah Anda yakin ingin menghapus tim ini? Tindakan ini tidak dapat dibatalkan.
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
        </div>
    );
};

export default LKTIAdminView;