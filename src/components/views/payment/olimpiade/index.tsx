import { motion } from 'framer-motion';
import { ArrowRight, Banknote, CreditCard, Landmark, X, FileText, Image as ImageIcon, Upload, Download } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { uploadFileAndGetUrlForPayment, uploadTwibbonAndGetUrl, uploadKTPAndGetUrl } from '@/lib/supabase/services';
import { useSession } from 'next-auth/react';

const PaymentOlimpiadeView = () => {
  // State untuk form data
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    institution: '',
    proof: null as File | null,
    twibbon: null as File | null,
    ktp: null as File | null,
    idAccount: ''
  });

  // State untuk UI
  const [proofPreview, setProofPreview] = useState<string | null>(null);
  const [twibbonPreview, setTwibbonPreview] = useState<string | null>(null);
  const [ktpPreview, setKtpPreview] = useState<string | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState({
    open: false,
    type: '', // 'proof', 'twibbon', or 'ktp'
    url: ''
  });
  const [fileType, setFileType] = useState({
    proof: '',
    twibbon: '',
    ktp: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const { data: session } = useSession();
  const [sessionId, setSessionId] = useState('');
  const [isFillForm, setIsFillForm] = useState(false);

  useEffect(() => {
    if ((session?.user as any)?.id) {
      setSessionId((session?.user as any).id);
    }
  }, [session]);

  const proofInputRef = useRef<HTMLInputElement>(null);
  const twibbonInputRef = useRef<HTMLInputElement>(null);
  const ktpInputRef = useRef<HTMLInputElement>(null);

  // Fungsi untuk memeriksa apakah user sudah mengisi form
  console.log(sessionId)
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
        console.log(data.data)
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

  useEffect(() => {
    if (sessionId) {
      checkForm(sessionId);
    }
  }, [sessionId]);

  // Fungsi untuk handle perubahan input text
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Fungsi untuk handle upload file bukti transfer
  const handleProofChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validasi file
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf', 'image/jpg'];

    if (file.size > MAX_FILE_SIZE) {
      setSubmitStatus({
        success: false,
        message: "Ukuran file bukti transfer terlalu besar (maksimal 5MB)"
      });
      return;
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setSubmitStatus({
        success: false,
        message: "Format file bukti transfer tidak didukung (hanya JPEG, PNG, PDF dan JPG)"
      });
      return;
    }

    setFormData(prev => ({ ...prev, proof: file }));
    setFileType(prev => ({ ...prev, proof: file.type }));

    // Buat preview untuk ditampilkan
    const reader = new FileReader();
    reader.onloadend = () => {
      setProofPreview(reader.result as string);
    };
    
    if (file.type.startsWith('image/')) {
      reader.readAsDataURL(file);
    } else if (file.type === 'application/pdf') {
      reader.readAsDataURL(file);
    }
  };

  // Fungsi untuk handle upload file twibbon
  const handleTwibbonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validasi file twibbon (hanya gambar)
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

    if (file.size > MAX_FILE_SIZE) {
      setSubmitStatus({
        success: false,
        message: "Ukuran file twibbon terlalu besar (maksimal 5MB)"
      });
      return;
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setSubmitStatus({
        success: false,
        message: "Format file twibbon tidak didukung (hanya JPEG, PNG, dan JPG)"
      });
      return;
    }

    setFormData(prev => ({ ...prev, twibbon: file }));
    setFileType(prev => ({ ...prev, twibbon: file.type }));

    // Buat preview untuk ditampilkan
    const reader = new FileReader();
    reader.onloadend = () => {
      setTwibbonPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Fungsi untuk handle upload file KTP
  const handleKTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validasi file KTP
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

    if (file.size > MAX_FILE_SIZE) {
      setSubmitStatus({
        success: false,
        message: "Ukuran file KTP terlalu besar (maksimal 5MB)"
      });
      return;
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setSubmitStatus({
        success: false,
        message: "Format file KTP tidak didukung (hanya JPEG, PNG, dan JPG)"
      });
      return;
    }

    setFormData(prev => ({ ...prev, ktp: file }));
    setFileType(prev => ({ ...prev, ktp: file.type }));

    // Buat preview untuk ditampilkan
    const reader = new FileReader();
    reader.onloadend = () => {
      setKtpPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Fungsi untuk menghapus file yang sudah diupload
  const handleRemoveFile = (type: 'proof' | 'twibbon' | 'ktp') => {
    if (type === 'proof') {
      setFormData(prev => ({ ...prev, proof: null }));
      setProofPreview(null);
      setFileType(prev => ({ ...prev, proof: '' }));
      if (proofInputRef.current) {
        proofInputRef.current.value = '';
      }
    } else if (type === 'twibbon') {
      setFormData(prev => ({ ...prev, twibbon: null }));
      setTwibbonPreview(null);
      setFileType(prev => ({ ...prev, twibbon: '' }));
      if (twibbonInputRef.current) {
        twibbonInputRef.current.value = '';
      }
    } else if (type === 'ktp') {
      setFormData(prev => ({ ...prev, ktp: null }));
      setKtpPreview(null);
      setFileType(prev => ({ ...prev, ktp: '' }));
      if (ktpInputRef.current) {
        ktpInputRef.current.value = '';
      }
    }
  };

  // Fungsi untuk menampilkan preview file
  const openFilePreview = (type: 'proof' | 'twibbon' | 'ktp') => {
    const url = type === 'proof' ? proofPreview : 
                type === 'twibbon' ? twibbonPreview : 
                ktpPreview;
    if (url) {
      setShowPreviewModal({
        open: true,
        type,
        url
      });
    }
  };

  // Fungsi untuk handle submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus(null);

    try {
      // Validasi form
      if (!formData.fullName.trim()) {
        throw new Error('Nama lengkap harus diisi');
      }

      if (!formData.email.includes('@') || !formData.email.includes('.')) {
        throw new Error('Email tidak valid');
      }

      if (!formData.phoneNumber.trim()) {
        throw new Error('Nomor telepon harus diisi');
      }

      if (!formData.institution.trim()) {
        throw new Error('Nama instansi harus diisi');
      }

      if (!formData.proof) {
        throw new Error('Bukti transfer harus diunggah');
      }

      if (!formData.twibbon) {
        throw new Error('Twibbon harus diunggah');
      }

      if (!formData.ktp) {
        throw new Error('KTP harus diunggah');
      }

      // Upload file dan dapatkan URL
      const proofUrl = await uploadFileAndGetUrlForPayment(formData.proof as File, "olimpiade", formData.fullName);
      const twibbonUrl = await uploadTwibbonAndGetUrl(formData.twibbon as File, "olimpiade", formData.fullName);
      const ktpUrl = await uploadKTPAndGetUrl(formData.ktp as File, formData.fullName , "olimpiade");
      
      const data = {
        nama_lengkap: formData.fullName,
        email: formData.email,
        no_hp: formData.phoneNumber,
        nama_instansi: formData.institution,
        proof_url: proofUrl,
        twibbon_url: twibbonUrl,
        ktp_url: ktpUrl,
        isverified: false, 
        idAccount: sessionId
      }

      const res = await fetch(`/api/payment/olimpiade`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      if (res.status === 200) {
        // Reset form setelah berhasil submit
        setFormData({
          fullName: '',
          email: '',
          phoneNumber: '',
          institution: '',
          proof: null,
          twibbon: null,
          ktp: null,
          idAccount: ''
        });
        setProofPreview(null);
        setTwibbonPreview(null);
        setKtpPreview(null);
        setFileType({ proof: '', twibbon: '', ktp: '' });
        if (proofInputRef.current) proofInputRef.current.value = '';
        if (twibbonInputRef.current) twibbonInputRef.current.value = '';
        if (ktpInputRef.current) ktpInputRef.current.value = '';

        setSubmitStatus({
          success: true,
          message: "Pendaftaran berhasil! Akan segera dihubungi jika berhasil."
        });
        setIsFillForm(true);
      } else if (res.status === 400) {
        setSubmitStatus({
          success: false,
          message: "Pendaftaran gagal! Silahkan coba lagi."
        });
      } else if (res.status === 401) {
        setSubmitStatus({
          success: false,
          message: "Email Sudah Terdaftar"
        });
      } else {
        setSubmitStatus({
          success: false,
          message: "Pendaftaran gagal! Silahkan coba lagi."
        });
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

  return (
    <div className="bg-gray-50 min-h-screen">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-4xl mx-auto px-4 py-12"
      >
        {/* Header Section */}
        <div className="text-center mb-10">
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-3xl md:text-4xl font-bold text-teal-700 mb-3"
          >
            Pembayaran Registrasi
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Lengkapi data diri dan unggah bukti transfer serta twibbon untuk menyelesaikan pendaftaran
          </motion.p>
        </div>

        {/* Main Form Container */}
        <motion.div 
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 max-w-2xl mx-auto"
        >
          {/* Status Message */}
          {submitStatus && (
            <div className={`p-4 rounded-lg mb-6 ${
              submitStatus.success 
                ? "bg-green-50 text-green-800 border border-green-200" 
                : "bg-red-50 text-red-800 border border-red-200"
            }`}>
              {submitStatus.message}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Personal Information Section */}
            <div className="space-y-5">
              <h2 className="text-xl font-semibold text-teal-700 border-b pb-2">Data Peserta</h2>
              
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="contoh@email.com"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nomor Telepon <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="081234567890"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Instansi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Nama sekolah/universitas/perusahaan"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Bank Accounts Section */}
            <div className="space-y-5">
              <h2 className="text-xl font-semibold text-teal-700 border-b pb-2">Rekening Pembayaran</h2>
              <p className="text-gray-600 text-sm">
                Silahkan transfer ke salah satu rekening berikut:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Mandiri */}
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-gray-50">
                  <div className="flex items-center mb-2">
                    <Landmark className="text-teal-600 mr-2" size={20} />
                    <span className="font-medium">Bank BRI</span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p className="font-mono">0038 0116 3600 500</p>
                    <p className="text-xs">a/n Karini
                    </p>
                  </div>
                </div>
                
                {/* BCA */}
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-gray-50">
                  <div className="flex items-center mb-2">
                    <CreditCard className="text-blue-600 mr-2" size={20} />
                    <span className="font-medium">ShoopePay</span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p className="font-mono">081292252275</p>
                    <p className="text-xs">a/n Anggita Novarinda</p>
                  </div>
                </div>
                
                {/* BNI */}
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-gray-50">
                  <div className="flex items-center mb-2">
                    <Banknote className="text-yellow-600 mr-2" size={20} />
                    <span className="font-medium">OVO</span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p className="font-mono">089682004507</p>
                    <p className="text-xs">a/n kahini/Desvita
                    </p>
                  </div>
                </div>
                {/* BNI */}
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-gray-50">
                  <div className="flex items-center mb-2">
                    <Banknote className="text-yellow-600 mr-2" size={20} />
                    <span className="font-medium">Gopay</span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p className="font-mono">089682004507</p>
                    <p className="text-xs">a/n Desvita Tri Anggraeni
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* File Upload Sections */}
            <div className="space-y-5">
              <h2 className="text-xl font-semibold text-teal-700 border-b pb-2">Upload Dokumen</h2>
              
              {/* Proof of Payment Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bukti Transfer <span className="text-red-500">*</span>
                </label>
                
                {proofPreview ? (
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative group cursor-pointer" onClick={() => openFilePreview('proof')}>
                          {fileType.proof.startsWith('image/') ? (
                            <Image
                              src={proofPreview}
                              alt="Bukti transfer"
                              width={48}
                              height={48}
                              className="h-12 w-12 object-cover rounded"
                            />
                          ) : (
                            <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center">
                              <FileText className="text-gray-500" size={24} />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            {formData.proof?.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(formData.proof?.size ? formData.proof.size / 1024 : 0).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile('proof')}
                        className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-teal-500 hover:bg-teal-50 transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                      <Upload className="w-8 h-8 mb-3 text-gray-400" />
                      <p className="mb-1 text-sm text-gray-500">
                        <span className="font-semibold">Klik untuk upload</span> atau drag & drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, atau PDF (Maks. 5MB)
                      </p>
                    </div>
                    <input 
                      ref={proofInputRef}
                      type="file"
                      onChange={handleProofChange}
                      className="hidden"
                      accept="image/png, image/jpeg, application/pdf"
                      required
                    />
                  </label>
                )}
              </div>

              {/* Twibbon Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Twibbon <span className="text-gray-500 font-normal">(Foto dengan frame twibbon)</span> <span className="text-red-500">*</span>
                </label>
                
                {twibbonPreview ? (
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative group cursor-pointer" onClick={() => openFilePreview('twibbon')}>
                          <Image
                            src={twibbonPreview}
                            alt="Twibbon"
                            width={48}
                            height={48}
                            className="h-12 w-12 object-cover rounded"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            {formData.twibbon?.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(formData.twibbon?.size ? formData.twibbon.size / 1024 : 0).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile('twibbon')}
                        className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                      <ImageIcon className="w-8 h-8 mb-3 text-gray-400" />
                      <p className="mb-1 text-sm text-gray-500">
                        <span className="font-semibold">Klik untuk upload</span> atau drag & drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG atau JPG (Maks. 5MB)
                      </p>
                    </div>
                    <input 
                      ref={twibbonInputRef}
                      type="file"
                      onChange={handleTwibbonChange}
                      className="hidden"
                      accept="image/png, image/jpeg"
                      required
                    />
                  </label>
                )}
              </div>

              {/* KTP (Kartu Tanda Pelajar) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kartu Tanda Pelajar <span className="text-gray-500 font-normal">(KTP/Kartu Pelajar)</span> <span className="text-red-500">*</span>
                </label>
                {ktpPreview ? (
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative group cursor-pointer" onClick={() => openFilePreview('ktp')}>
                          <Image
                            src={ktpPreview}
                            alt="KTP"
                            width={48}
                            height={48}
                            className="h-12 w-12 object-cover rounded"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            {formData.ktp?.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(formData.ktp?.size ? formData.ktp.size / 1024 : 0).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile('ktp')}
                        className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                      <ImageIcon className="w-8 h-8 mb-3 text-gray-400" />
                      <p className="mb-1 text-sm text-gray-500">
                        <span className="font-semibold">Klik untuk upload</span> atau drag & drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG atau JPG (Maks. 5MB)
                      </p>
                    </div>
                    <input 
                      ref={ktpInputRef}
                      type="file"
                      onChange={handleKTPChange}
                      className="hidden"
                      accept="image/png, image/jpeg"
                      required
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Submit Button */}
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

      {/* Preview Modal */}
      {showPreviewModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
              <h3 className="text-lg font-medium">
                Preview {showPreviewModal.type === 'proof' ? 'Bukti Transfer' : 
                        showPreviewModal.type === 'twibbon' ? 'Twibbon' : 'KTP'}
              </h3>
              <button 
                onClick={() => setShowPreviewModal({ open: false, type: '', url: '' })}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-4 flex justify-center">
              {showPreviewModal.type === 'proof' && fileType.proof === 'application/pdf' ? (
                <iframe 
                  src={showPreviewModal.url} 
                  className="w-full h-[70vh] border"
                  title="Bukti Transfer PDF"
                />
              ) : (
                <Image
                  src={showPreviewModal.url}
                  alt="Preview"
                  width={800}
                  height={600}
                  className="max-w-full h-auto"
                  objectFit="contain"
                />
              )}
            </div>
            <div className="p-4 border-t flex justify-end">
              <a
                href={showPreviewModal.url}
                download
                className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors"
              >
                <Download size={18} />
                Download
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentOlimpiadeView;