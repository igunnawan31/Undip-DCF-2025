import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import React, { useState } from 'react';
import Navbar from '@/components/fragment/navbar';
import Footer from '@/components/fragment/footer';

const PaymentSeminarView = () => {
  // State untuk form data
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    institution: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Fungsi untuk handle perubahan input text
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

      const data = {
        nama_lengkap: formData.fullName,
        email: formData.email,
        no_hp: formData.phoneNumber,
        nama_instansi: formData.institution,
        isverified: false
      }

      console.log(data);

      const res = await fetch(`/api/payment/seminar`, {
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
          institution: ''
        });

        setSubmitStatus({
          success: true,
          message: "Pendaftaran berhasil! Kami akan menghubungi Anda segera."
        });
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
            Pendaftaran Seminar
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Lengkapi data diri untuk menyelesaikan pendaftaran seminar
          </motion.p>
        </div>

        {/* Payment Form */}
        <motion.div 
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 max-w-2xl mx-auto"
        >
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-teal-700 mb-2">Data Pendaftaran</h2>
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
            {/* Form fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Masukkan nama lengkap"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="contoh@email.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nomor Telepon
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="081234567890"
                required
              />
            </div>
            
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
                placeholder="Nama sekolah/universitas/perusahaan"
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-teal-500 to-orange-400 text-white py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin mr-2">↻</span>
                  Memproses...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  Daftar Seminar
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PaymentSeminarView;