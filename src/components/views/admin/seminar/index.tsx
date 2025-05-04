import SidebarAdmin from "@/components/fragment/sidebar/admin";
import { useEffect, useState, useMemo } from "react";

interface SeminarParticipant {
  id: number;
  nama_lengkap: string;
  email: string;
  no_hp: string;
  nama_instansi: string;
  isverified: boolean;
}

const SeminarAdminView = () => {
    const [seminarRegister, setSeminarRegister] = useState<SeminarParticipant[]>([]);
    const [filter, setFilter] = useState<'all' | 'verified' | 'unverified'>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // Debounce effect for search
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300);

        return () => {
            clearTimeout(timerId);
        };
    }, [searchTerm]);

    const fetchSeminar = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/admin/seminar", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if(res.status === 200) {    
                const data = await res.json();
                setSeminarRegister(data.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const getDetailAccount = async (id: number) => {
        console.log(id)
        try {
            const res = await fetch(`/api/admin/seminar?id=${id}`, {
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
        console.log(id)
        try {
            const dataDetailAccount = await getDetailAccount(id);
            console.log(dataDetailAccount)
            if (dataDetailAccount !== null) {
                const newData = {
                    ...dataDetailAccount, 
                    isverified: true
                };
                console.log(newData)
                const res = await fetch(`/api/admin/seminar?id=${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newData)
                });
                if(res.status === 200) {
                    await fetchSeminar();
                }
            }
        } catch (error) {
            console.error("Error verifying participant:", error);
        }
    };

    const handleReject = async (id: number) => {
        console.log(id)
        const isConfirmed = window.confirm("Apakah Anda yakin ingin menolak verifikasi peserta ini?");
        if (!isConfirmed) return;
        
        try {
            const dataDetailAccount = await getDetailAccount(id);
            if (dataDetailAccount !== null) {
                const newData = {
                    ...dataDetailAccount, 
                    isverified: false
                };
                const res = await fetch(`/api/admin/seminar?id=${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newData)
                });
                if(res.status === 200) {
                    await fetchSeminar();
                }
            }
        } catch (error) {
            console.error("Error rejecting participant:", error);
        }
    };

    // Filtered participants with memoization
    const filteredParticipants = useMemo(() => {
        return seminarRegister.filter(participant => {
            // Apply verification filter
            if (filter === 'verified' && !participant.isverified) return false;
            if (filter === 'unverified' && participant.isverified) return false;
            
            // Apply search filter if search term exists
            if (debouncedSearchTerm) {
                const searchLower = debouncedSearchTerm.toLowerCase();
                return (
                    participant.nama_lengkap.toLowerCase().includes(searchLower) ||
                    participant.email.toLowerCase().includes(searchLower) ||
                    participant.no_hp.toLowerCase().includes(searchLower) ||
                    participant.nama_instansi.toLowerCase().includes(searchLower)
                );
            }
            
            return true;
        });
    }, [seminarRegister, filter, debouncedSearchTerm]);

    useEffect(() => {
        fetchSeminar();
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    console.log()

    return (
        <div className="flex min-h-screen bg-gray-100">
            <SidebarAdmin />
            
            <div className="flex-1 p-8">
                <h1 className="text-2xl font-bold mb-6">Daftar Peserta Seminar</h1>
                
                {/* Filter and Search Controls */}
                <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-md text-sm ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                            Semua Peserta
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
                            placeholder="Cari (Nama/Email/No HP/Instansi)..."
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
                    <div className="overflow-x-auto bg-white rounded-lg shadow">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Lengkap</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No HP</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instansi</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredParticipants.length > 0 ? (
                                    filteredParticipants.map((participant, index) => (
                                        <tr key={participant.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {participant.nama_lengkap}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{participant.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{participant.no_hp}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {participant.nama_instansi}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                    ${participant.isverified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                    {participant.isverified ? 'Terverifikasi' : 'Belum Verifikasi'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-4">
                                                    {!participant.isverified && (
                                                        <button
                                                            onClick={() => handleVerify(participant.id)}
                                                            className="text-green-600 hover:text-green-900 p-1"
                                                            title="Verifikasi"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleReject(participant.id)}
                                                        className="text-red-600 hover:text-red-900 p-1"
                                                        title="Tolak"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                                            {searchTerm ? 'Tidak ada peserta yang sesuai dengan pencarian' : 'Tidak ada data peserta'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SeminarAdminView;