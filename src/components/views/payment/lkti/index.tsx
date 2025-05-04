import { motion } from 'framer-motion';
import { ArrowRight, Banknote, CreditCard, Landmark, X, ZoomIn, FileText, Image as ImageIcon } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { uploadAbstrakAndGetUrl,  uploadFullpaperAndGetUrl, uploadTwibbonAndGetUrl, uploadKTPAndGetUrl } from '@/lib/supabase/services';
import { useSession } from 'next-auth/react';

type PendaftarLKTI = {
    teamName: string;
    leaderName: string;
    leaderEmail: string;
    leaderPhone: string;
    ktmLeader: File | null;
    member1: string;
    ktmMember1: File | null;
    member2?: string;
    ktmMember2?: File | null;
    member3?: string;
    ktmMember3?: File | null;
    member4?: string;
    ktmMember4?: File | null;
    member5?: string;
    ktmMember5?: File | null;
    institution: string;
    workTitle: string;
    abstract: File | null;
    fullPaper: File | null;
    twibbon: File | null;
    idAccount: string;
};

const PaymentLKTIView = () => {
    const { data: session } = useSession();
    
    const [formData, setFormData] = useState<PendaftarLKTI>({
        teamName: '',
        leaderName: '',
        leaderEmail: '',
        leaderPhone: '',
        ktmLeader: null,
        member1: '',
        ktmMember1 : null,
        member2: '',
        ktmMember2: null,
        member3: '',
        ktmMember3: null,
        member4: '',
        ktmMember4: null,
        member5: '',
        ktmMember5: null,
        institution: '',
        workTitle: '',
        abstract: null,
        fullPaper: null,
        twibbon: null,
        idAccount: ''
    });

    const [abstractPreview, setAbstractPreview] = useState<string | null>(null);
    const [fullPaperPreview, setFullPaperPreview] = useState<string | null>(null);
    const [twibbonPreview, setTwibbonPreview] = useState<string | null>(null);
    const [showPreviewModal, setShowPreviewModal] = useState({
        open: false,
        type: '',
        url: ''
    });
    const [fileType, setFileType] = useState({
        abstract: '',
        fullPaper: '',
        twibbon: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        success: boolean;
        message: string;
    } | null>(null);
    const [sessionId, setSessionId] = useState<string>('');
    const [isFillForm, setIsFillForm] = useState(false);
    
    // KTM Preview States
    const [ktmLeaderPreview, setKtmLeaderPreview] = useState<string | null>(null);
    const [ktmMember1Preview, setKtmMember1Preview] = useState<string | null>(null);
    const [ktmMember2Preview, setKtmMember2Preview] = useState<string | null>(null);
    const [ktmMember3Preview, setKtmMember3Preview] = useState<string | null>(null);
    const [ktmMember4Preview, setKtmMember4Preview] = useState<string | null>(null);
    const [ktmMember5Preview, setKtmMember5Preview] = useState<string | null>(null);

    const abstractInputRef = useRef<HTMLInputElement>(null);
    const fullPaperInputRef = useRef<HTMLInputElement>(null);
    const twibbonInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if ((session?.user as any)?.id) {
            setSessionId((session?.user as any).id);
        }
    }, [session]);

    useEffect(() => {
        if (sessionId) {
            checkForm(sessionId);
        }
    }, [sessionId]);

    const checkForm = async (id: string) => {
        try {
            const res = await fetch(`/api/history?id=${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            
            if (res.status === 200) {
                const data = await res.json();
                if (data.data.length > 0) {
                    setIsFillForm(true);
                    setSubmitStatus({
                        success: false,
                        message: "Anda sudah melakukan pendaftaran (Olimpiade/LKTI). Jika ingin mengubah data, silahkan hubungi panitia."
                    });
                } 
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value } as PendaftarLKTI));
    };

    const handleFileUpload = (
        e: React.ChangeEvent<HTMLInputElement>, 
        fileType: 'abstract' | 'fullPaper' | 'twibbon',
        allowedTypes: string[],
        maxSize: number,
        setPreview: React.Dispatch<React.SetStateAction<string | null>>
    ) => {
        if (isFillForm) return;

        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > maxSize) {
            setSubmitStatus({
                success: false,
                message: `Ukuran file terlalu besar (maksimal ${maxSize / (1024 * 1024)}MB)`
            });
            return;
        }

        if (!allowedTypes.includes(file.type)) {
            setSubmitStatus({
                success: false,
                message: "Format file tidak didukung"
            });
            return;
        }

        setFormData(prev => ({ ...prev, [fileType]: file } as PendaftarLKTI));
        setFileType(prev => ({ ...prev, [fileType]: file.type }));

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        
        if (file.type.startsWith('image/')) {
            reader.readAsDataURL(file);
        } else if (file.type === 'application/pdf') {
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveFile = (type: 'abstract' | 'twibbon') => {
        if (isFillForm) return;

        const previewSetters = {
            abstract: setAbstractPreview,
            fullPaper: setFullPaperPreview,
            twibbon: setTwibbonPreview
        };

        setFormData(prev => ({ ...prev, [type]: null } as PendaftarLKTI));
        previewSetters[type](null);
        setFileType(prev => ({ ...prev, [type]: '' }));
        
        const refs = {
            abstract: abstractInputRef,
            fullPaper: fullPaperInputRef,
            twibbon: twibbonInputRef
        };

        if (refs[type].current) {
            refs[type].current!.value = '';
        }
    };

    const openFilePreview = (type: 'abstract' | 'twibbon' | string) => {
        const previews = {
            abstract: abstractPreview,
            fullPaper: fullPaperPreview,
            twibbon: twibbonPreview,
            ktmLeader: ktmLeaderPreview,
            ktmMember1: ktmMember1Preview,
            ktmMember2: ktmMember2Preview,
            ktmMember3: ktmMember3Preview,
            ktmMember4: ktmMember4Preview,
            ktmMember5: ktmMember5Preview
        };

        const url = previews[type as keyof typeof previews];
        if (url) {
            setShowPreviewModal({
                open: true,
                type,
                url
            });
        }
    };

    // KTM Upload Handlers
    const handleKtmLeaderUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isFillForm) return;
        
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            setSubmitStatus({
                success: false,
                message: "Ukuran file KTM ketua terlalu besar (maksimal 2MB)"
            });
            return;
        }

        if (!['image/jpeg', 'image/png'].includes(file.type)) {
            setSubmitStatus({
                success: false,
                message: "Format file KTM ketua tidak didukung (hanya JPG/PNG)"
            });
            return;
        }

        setFormData(prev => ({ ...prev, ktmLeader: file }));
        
        const reader = new FileReader();
        reader.onloadend = () => {
            setKtmLeaderPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleKtmMemberUpload = (e: React.ChangeEvent<HTMLInputElement>, memberNumber: number) => {
        if (isFillForm) return;
        
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            setSubmitStatus({
                success: false,
                message: `Ukuran file KTM anggota ${memberNumber} terlalu besar (maksimal 2MB)`
            });
            return;
        }

        if (!['image/jpeg', 'image/png'].includes(file.type)) {
            setSubmitStatus({
                success: false,
                message: `Format file KTM anggota ${memberNumber} tidak didukung (hanya JPG/PNG)`
            });
            return;
        }

        setFormData(prev => ({ 
            ...prev, 
            [`ktmMember${memberNumber}`]: file 
        } as PendaftarLKTI));
        
        const reader = new FileReader();
        reader.onloadend = () => {
            switch(memberNumber) {
                case 1: setKtmMember1Preview(reader.result as string); break;
                case 2: setKtmMember2Preview(reader.result as string); break;
                case 3: setKtmMember3Preview(reader.result as string); break;
                case 4: setKtmMember4Preview(reader.result as string); break;
                case 5: setKtmMember5Preview(reader.result as string); break;
            }
        };
        reader.readAsDataURL(file);
    };

    // KTM Remove Handlers
    const handleRemoveKtmLeader = () => {
        if (isFillForm) return;
        setFormData(prev => ({ ...prev, ktmLeader: null }));
        setKtmLeaderPreview(null);
    };

    const handleRemoveKtmMember = (memberNumber: number) => {
        if (isFillForm) return;
        setFormData(prev => ({ 
            ...prev, 
            [`ktmMember${memberNumber}`]: null 
        } as PendaftarLKTI));
        
        switch(memberNumber) {
            case 1: setKtmMember1Preview(null); break;
            case 2: setKtmMember2Preview(null); break;
            case 3: setKtmMember3Preview(null); break;
            case 4: setKtmMember4Preview(null); break;
            case 5: setKtmMember5Preview(null); break;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (isFillForm) {
            setSubmitStatus({
                success: false,
                message: "Anda sudah melakukan pendaftaran (Olimpiade/LKTI)"
            });
            return;
        }
        
        setIsLoading(true);
        setSubmitStatus(null);
    
        try {
            // Validasi field wajib
            if (!formData.teamName.trim()) {
                throw new Error('Nama tim harus diisi');
            }

            if (!formData.leaderName.trim()) {
                throw new Error('Nama ketua harus diisi');
            }
    
            if (!formData.leaderEmail.includes('@') || !formData.leaderEmail.includes('.')) {
                throw new Error('Email ketua tidak valid');
            }
    
            if (!formData.leaderPhone.trim()) {
                throw new Error('Nomor telepon ketua harus diisi');
            }
    
            if (!formData.institution.trim()) {
                throw new Error('Nama instansi harus diisi');
            }
    
            if (!formData.workTitle.trim()) {
                throw new Error('Judul karya harus diisi');
            }
    
            if (!formData.abstract) {
                throw new Error('File abstrak harus diunggah');
            }
    
            if (!formData.twibbon) {
                throw new Error('Twibbon harus diunggah');
            }
    
            if (!formData.ktmLeader) {
                throw new Error('KTM ketua harus diunggah');
            }
    
            // Validasi KTM Member 1 wajib jika nama member 1 diisi
            if (formData.member1 && !formData.ktmMember1) {
                throw new Error('KTM anggota 1 harus diunggah');
            }
    
            // Upload semua file
            const abstractUrl = await uploadAbstrakAndGetUrl(formData.abstract, formData.teamName);
            const twibbonUrl = await uploadTwibbonAndGetUrl(formData.twibbon, "lkti", formData.teamName);
            const ktmLeaderUrl = await uploadKTPAndGetUrl(formData.ktmLeader, formData.teamName , "lkti");
            
            // Hanya upload KTM member jika namanya ada
            const ktmMember1Url = formData.member1 
                ? await uploadKTPAndGetUrl(formData.ktmMember1!, formData.teamName , "lkti") 
                : null;
    
            const data = {
                team_name: formData.teamName,
                leader_name: formData.leaderName,
                leader_email: formData.leaderEmail,
                institution: formData.institution,
                leader_phone: formData.leaderPhone,
                ktm_leader: ktmLeaderUrl,
                member1: formData.member1,
                ktm_member1: ktmMember1Url,
                member2: formData.member2,
                ktm_member2: formData.member2 && formData.ktmMember2 
                    ? await uploadKTPAndGetUrl(formData.ktmMember2, formData.teamName , "lkti") 
                    : null,
                member3: formData.member3,
                ktm_member3: formData.member3 && formData.ktmMember3
                    ? await uploadKTPAndGetUrl(formData.ktmMember3, formData.teamName , "lkti") 
                    : null,
                member4: formData.member4,
                ktm_member4: formData.member4 && formData.ktmMember4
                    ? await uploadKTPAndGetUrl(formData.ktmMember4, formData.teamName , "lkti") 
                    : null,
                member5: formData.member5,
                ktm_member5: formData.member5 && formData.ktmMember5
                    ? await uploadKTPAndGetUrl(formData.ktmMember5, formData.teamName , "lkti") 
                    : null,
                work_title: formData.workTitle,
                abstract_url: abstractUrl,
                full_paper_url: null, 
                payment_proof_url: null,
                twibbon_url: twibbonUrl,
                isverified: false,
                idAccount: sessionId
            }

            console.log(data)
    
            const res = await fetch(`/api/payment/lkti`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
    
            if (res.status === 200) {
                const data = await res.json();
                setSubmitStatus({
                    success: true,
                    message: data.message
                });
                setIsFillForm(true);
            } else {
                const data = await res.json();
                setSubmitStatus({
                    success: false,
                    message: data.message
                })
            }
        } catch (error) {
            setSubmitStatus({
                success: false,
                message: error instanceof Error ? error.message : 'Terjadi kesalahan'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const FilePreview = ({ 
        type, 
        file, 
        preview, 
        fileType 
    }: { 
        type: 'abstract' |  'twibbon',
        file: File | null,
        preview: string | null,
        fileType: string
    }) => (
        <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="relative group">
                        {fileType.startsWith('image/') ? (
                            <Image
                                src={preview || ''}
                                alt={`Preview ${type}`}
                                className="h-12 w-12 object-cover rounded mr-3 cursor-pointer"
                                width={48}
                                height={48}
                                onClick={() => openFilePreview(type)}
                            />
                        ) : (
                            <div 
                                className="h-12 w-12 bg-gray-100 flex items-center justify-center rounded mr-3 cursor-pointer"
                                onClick={() => openFilePreview(type)}
                            >
                                <FileText className="text-gray-500" size={24} />
                            </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ZoomIn className="text-white bg-black bg-opacity-50 p-1 rounded-full" size={20} />
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700 flex items-center">
                            {file?.name}
                            <button
                                type="button"
                                onClick={() => openFilePreview(type)}
                                className="ml-2 text-teal-600 hover:text-teal-800 transition-colors"
                            >
                                <ZoomIn size={16} />
                            </button>
                        </p>
                        <p className="text-xs text-gray-500">
                            {(file?.size ? file.size / 1024 : 0).toFixed(2)} KB
                        </p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={() => handleRemoveFile(type)}
                    className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                    aria-label="Hapus file"
                    disabled={isFillForm}
                >
                    <X size={18} />
                </button>
            </div>
        </div>
    );

    const UploadArea = ({ 
        type, 
        inputRef, 
        onChange, 
        accept, 
        label, 
        description 
    }: { 
        type: 'abstract' | 'fullPaper' | 'twibbon',
        inputRef: React.RefObject<HTMLInputElement>,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
        accept: string,
        label: string,
        description: string
    }) => (
        <div className="flex items-center justify-center w-full">
            <label className={`flex flex-col w-full border-2 border-dashed ${isFillForm ? 'border-gray-200 bg-gray-50' : 'border-gray-300 hover:border-teal-500 hover:bg-teal-50'} rounded-lg cursor-pointer transition-all`}>
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FileText size={48} className="mb-4 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">{label}</span>
                    </p>
                    <p className="text-xs text-gray-500">
                        {description}
                    </p>
                </div>
                <input 
                    ref={inputRef}
                    type="file" 
                    name={type}
                    onChange={onChange}
                    className="hidden" 
                    accept={accept}
                    disabled={isFillForm}
                />
            </label>
        </div>
    );

    return (
        <div>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto px-4 pt-28 pb-16"
            >
                {/* Heading Section */}
                <div className="text-center mb-12">
                    <motion.h1 
                        initial={{ y: -20 }}
                        animate={{ y: 0 }}
                        className="text-4xl font-bold text-teal-700 mb-4"
                    >
                        Pendaftaran LKTI
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-600 max-w-2xl mx-auto"
                    >
                        Lengkapi data tim dan unggah dokumen yang diperlukan untuk menyelesaikan pendaftaran
                    </motion.p>
                </div>

                {/* Payment Form */}
                <motion.div 
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 max-w-2xl mx-auto"
                >
                    <div className="mb-8 text-center">
                        <h2 className="text-2xl font-bold text-teal-700 mb-2">Formulir Pendaftaran</h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-orange-400 mx-auto"></div>
                    </div>

                    {/* Status Message */}
                    {submitStatus && (
                        <div className={`p-4 rounded-lg mb-6 ${
                            submitStatus.success 
                                ? "bg-green-100 text-green-800" 
                                : "bg-red-100 text-red-800"
                        }`}>
                            {submitStatus.message}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>

                        {/* Nama Tim */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nama Tim
                            </label>
                            <input
                                type="text"
                                name="teamName"
                                value={formData.teamName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                placeholder="Masukkan nama tim anda"
                                required
                                disabled={isFillForm}
                            />
                        </div>

                        {/* Data Ketua */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800">Data Ketua Tim</h3>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nama Lengkap Ketua
                                </label>
                                <input
                                    type="text"
                                    name="leaderName"
                                    value={formData.leaderName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    placeholder="Masukkan nama lengkap ketua"
                                    disabled={isFillForm}
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Ketua
                                </label>
                                <input
                                    type="email"
                                    name="leaderEmail"
                                    value={formData.leaderEmail}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    placeholder="contoh@email.com"
                                    disabled={isFillForm}
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nomor Telepon Ketua
                                </label>
                                <input
                                    type="tel"
                                    name="leaderPhone"
                                    value={formData.leaderPhone}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    placeholder="081234567890"
                                    disabled={isFillForm}
                                />
                            </div>
                            
                            {/* KTM Leader Upload */}
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    KTM (Kartu Tanda Mahasiswa) Ketua
                                    <span className="text-xs text-gray-500 ml-1">(Format JPG/PNG, maksimal 2MB)</span>
                                </label>
                                
                                {ktmLeaderPreview ? (
                                    <div className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <Image
                                                    src={ktmLeaderPreview}
                                                    alt="Preview KTM Ketua"
                                                    className="h-12 w-12 object-cover rounded mr-3 cursor-pointer"
                                                    width={48}
                                                    height={48}
                                                    onClick={() => setShowPreviewModal({
                                                        open: true,
                                                        type: 'ktmLeader',
                                                        url: ktmLeaderPreview
                                                    })}
                                                />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-700">
                                                        {formData.ktmLeader?.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {(formData.ktmLeader?.size ? formData.ktmLeader.size / 1024 : 0).toFixed(2)} KB
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={handleRemoveKtmLeader}
                                                className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                                                disabled={isFillForm}
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center w-full">
                                        <label className={`flex flex-col w-full border-2 border-dashed ${isFillForm ? 'border-gray-200 bg-gray-50' : 'border-gray-300 hover:border-teal-500 hover:bg-teal-50'} rounded-lg cursor-pointer transition-all`}>
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <ImageIcon className="w-8 h-8 mb-4 text-gray-500" />
                                                <p className="mb-2 text-sm text-gray-500">
                                                    <span className="font-semibold">Klik untuk mengunggah KTM Ketua</span>
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    JPG atau PNG (MAX. 2MB)
                                                </p>
                                            </div>
                                            <input 
                                                type="file" 
                                                onChange={handleKtmLeaderUpload}
                                                className="hidden" 
                                                accept="image/png, image/jpeg"
                                                disabled={isFillForm}
                                            />
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Data Anggota Tim (Optional) */}
                        <div className="space-y-4">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Data Anggota Tim (Wajib untuk Anggota 1)</h2>
                        
                        {[1, 2, 3, 4, 5].map((num) => {
                            const memberName = formData[`member${num}` as keyof typeof formData] as string;
                            const ktmFile = formData[`ktmMember${num}` as keyof typeof formData] as File | null;
                            const ktmPreview = 
                            num === 1 ? ktmMember1Preview :
                            num === 2 ? ktmMember2Preview :
                            num === 3 ? ktmMember3Preview :
                            num === 4 ? ktmMember4Preview :
                            ktmMember5Preview;

                            return (
                            <div key={num} className="space-y-2 border-b pb-4">
                                <h3 className="font-medium text-gray-700">Nama Anggota {num}</h3>
                                
                                {/* Input Nama Anggota */}
                                <div className="flex items-center gap-2 mb-2">
                                <input
                                    type="text"
                                    name={`member${num}`}
                                    value={memberName}
                                    onChange={handleInputChange}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    placeholder={`Masukkan nama anggota ${num}`}
                                    disabled={isFillForm}
                                />
                                </div>

                                {/* Upload KTM (hanya muncul jika nama anggota diisi) */}
                                {memberName && (
                                <div className="ml-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Upload KTM Anggota {num}
                                    </label>
                                    
                                    {ktmPreview ? (
                                    <div className="flex items-center gap-3">
                                        <div className="relative group">
                                        <Image
                                            src={ktmPreview}
                                            alt={`Preview KTM Anggota ${num}`}
                                            className="h-10 w-10 object-cover rounded cursor-pointer"
                                            width={40}
                                            height={40}
                                            onClick={() => setShowPreviewModal({
                                            open: true,
                                            type: `ktmMember${num}`,
                                            url: ktmPreview
                                            })}
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ZoomIn className="text-white bg-black bg-opacity-50 p-1 rounded-full" size={16} />
                                        </div>
                                        </div>
                                        <div className="flex-1">
                                        <p className="text-sm text-gray-700 truncate max-w-xs">
                                            {ktmFile?.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {(ktmFile?.size ? (ktmFile.size / 1024).toFixed(2) : '0.00')} KB
                                        </p>
                                        </div>
                                        <button
                                        type="button"
                                        onClick={() => handleRemoveKtmMember(num)}
                                        className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                                        disabled={isFillForm}
                                        >
                                        <X size={16} />
                                        </button>
                                    </div>
                                    ) : (
                                    <label className={`flex flex-col items-center justify-center w-full border-2 border-dashed ${isFillForm ? 'border-gray-200 bg-gray-50' : 'border-gray-300 hover:border-teal-500 hover:bg-teal-50'} rounded-md cursor-pointer transition-all p-4`}>
                                        <div className="flex flex-col items-center justify-center">
                                        <ImageIcon className="w-6 h-6 mb-2 text-gray-500" />
                                        <p className="text-sm text-gray-500 text-center">
                                            <span className="font-medium">Klik untuk mengunggah KTM</span>
                                            <br />
                                            <span className="text-xs">JPG/PNG (MAX. 2MB)</span>
                                        </p>
                                        </div>
                                        <input 
                                        type="file" 
                                        onChange={(e) => handleKtmMemberUpload(e, num)}
                                        className="hidden" 
                                        accept="image/png, image/jpeg"
                                        disabled={isFillForm}
                                        />
                                    </label>
                                    )}
                                </div>
                                )}
                            </div>
                            );
                        })}
                        </div>


                        {/* Data Institusi dan Karya */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800">Data Institusi dan Karya</h3>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nama Instansi
                                </label>
                                <input
                                    type="text"
                                    name="institution"
                                    value={formData.institution}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    placeholder="Nama sekolah/universitas"
                                    disabled={isFillForm}
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Judul Karya Tulis
                                </label>
                                <input
                                    type="text"
                                    name="workTitle"
                                    value={formData.workTitle}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    placeholder="Masukkan judul karya tulis ilmiah"
                                    disabled={isFillForm}
                                />
                            </div>
                        </div>

                        {/* File Upload Section - Abstract */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Unggah Abstrak
                                <span className="text-xs text-gray-500 ml-1">(Format PDF, maksimal 5MB)</span>
                            </label>
                            
                            {abstractPreview ? (
                                <FilePreview 
                                    type="abstract"
                                    file={formData.abstract}
                                    preview={abstractPreview}
                                    fileType={fileType.abstract}
                                />
                            ) : (
                                <UploadArea
                                    type="abstract"
                                    inputRef={abstractInputRef}
                                    onChange={(e) => handleFileUpload(
                                        e, 
                                        'abstract', 
                                        ['application/pdf'], 
                                        5 * 1024 * 1024, 
                                        setAbstractPreview
                                    )}
                                    accept="application/pdf"
                                    label="Klik untuk mengunggah abstrak"
                                    description="PDF (MAX. 5MB)"
                                />
                            )}
                        </div>

                        {/* File Upload Section - Twibbon */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Unggah Twibbon
                                <span className="text-xs text-gray-500 ml-1">(Foto dengan frame twibbon, format JPG/PNG, maksimal 5MB)</span>
                            </label>
                            
                            {twibbonPreview ? (
                                <FilePreview 
                                    type="twibbon"
                                    file={formData.twibbon}
                                    preview={twibbonPreview}
                                    fileType={fileType.twibbon}
                                />
                            ) : (
                                <div className="flex items-center justify-center w-full">
                                    <label className={`flex flex-col w-full border-2 border-dashed ${isFillForm ? 'border-gray-200 bg-gray-50' : 'border-gray-300 hover:border-orange-500 hover:bg-orange-50'} rounded-lg cursor-pointer transition-all`}>
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <ImageIcon className="w-8 h-8 mb-4 text-gray-500" />
                                            <p className="mb-2 text-sm text-gray-500">
                                                <span className="font-semibold">Klik untuk mengunggah twibbon</span>
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                JPG atau PNG (MAX. 5MB)
                                            </p>
                                        </div>
                                        <input 
                                            ref={twibbonInputRef}
                                            type="file" 
                                            name="twibbon" 
                                            onChange={(e) => handleFileUpload(
                                                e, 
                                                'twibbon', 
                                                ['image/jpeg', 'image/png'], 
                                                5 * 1024 * 1024, 
                                                setTwibbonPreview
                                            )}
                                            className="hidden" 
                                            accept="image/png, image/jpeg"
                                            disabled={isFillForm}
                                        />
                                    </label>
                                </div>
                            )}
                        </div>

                        <motion.button
                            whileHover={{ scale: isFillForm ? 1 : 1.02 }}
                            whileTap={{ scale: isFillForm ? 1 : 0.98 }}
                            type="submit"
                            disabled={isLoading || isFillForm}
                            className={`w-full bg-gradient-to-r ${isFillForm ? 'from-gray-400 to-gray-500' : 'from-teal-500 to-orange-400'} text-white py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300 group disabled:opacity-70 disabled:cursor-not-allowed`}
                        >
                            {isFillForm ? (
                                "Anda telah melakukan pengisian form (Olimpiade/LKTI)"
                            ) : isLoading ? (
                                <span className="flex items-center justify-center">
                                    <span className="animate-spin mr-2">↻</span>
                                    Memproses...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center">
                                    Konfirmasi Pendaftaran
                                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </span>
                            )}
                        </motion.button>
                    </form>
                </motion.div>
            </motion.div>

            {/* File Preview Modal */}
            {showPreviewModal.open && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                    onClick={() => setShowPreviewModal({ open: false, type: '', url: '' })}
                >
                    <motion.div 
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="sticky top-0 bg-white p-4 border-b flex items-center justify-between">
                            <h3 className="font-bold text-lg text-teal-700">
                                {showPreviewModal.type.startsWith('ktm') 
                                    ? 'Preview KTM'
                                    : showPreviewModal.type === 'abstract' 
                                    ? formData.abstract?.name || "Preview Abstrak"
                                    : showPreviewModal.type === 'fullPaper'
                                    ? formData.fullPaper?.name || "Preview Full Paper"
                                    : formData.twibbon?.name || "Preview Twibbon"}
                            </h3>
                            <button
                                onClick={() => setShowPreviewModal({ open: false, type: '', url: '' })}
                                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        
                        <div className="p-4">
                            {showPreviewModal.type.startsWith('ktm') || showPreviewModal.type === 'twibbon' ? (
                                <div className="flex justify-center">
                                    <Image
                                        src={showPreviewModal.url}
                                        alt="KTM preview"
                                        width={600}
                                        height={600}
                                        className="w-auto h-auto max-w-full max-h-[70vh] object-contain"
                                    />
                                </div>
                            ) : fileType[showPreviewModal.type as keyof typeof fileType] === 'application/pdf' ? (
                                <div className="aspect-video flex flex-col items-center">
                                    <embed 
                                        src={showPreviewModal.url}
                                        type="application/pdf"
                                        width="100%"
                                        height="600px"
                                        className="border rounded"
                                    />
                                    <a 
                                        href={showPreviewModal.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="mt-4 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center"
                                    >
                                        Buka PDF di Tab Baru
                                        <ArrowRight className="ml-2" size={16} />
                                    </a>
                                </div>
                            ) : fileType[showPreviewModal.type as keyof typeof fileType]?.startsWith('image/') ? (
                                <Image
                                    src={showPreviewModal.url}
                                    alt="File preview"
                                    width={800}
                                    height={600}
                                    className="w-full h-auto object-contain"
                                />
                            ) : (
                                <div className="text-center p-8">
                                    <FileText size={64} className="mx-auto mb-4 text-gray-400" />
                                    <p className="text-gray-700">File tidak dapat ditampilkan secara langsung</p>
                                    <a 
                                        href={showPreviewModal.url} 
                                        download={
                                            showPreviewModal.type === 'abstract' 
                                                ? formData.abstract?.name 
                                                : showPreviewModal.type === 'fullPaper'
                                                ? formData.fullPaper?.name
                                                : formData.twibbon?.name
                                        }
                                        className="inline-block mt-4 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg transition-colors"
                                    >
                                        Download File
                                    </a>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default PaymentLKTIView;