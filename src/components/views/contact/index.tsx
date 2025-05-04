import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactView: React.FC = () => {
    // State for form fields
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    // Handle input changes
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    // Handle WhatsApp click
    const handleWhatsappClick = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Format the message for WhatsApp
        const whatsappMessage = encodeURIComponent(
            `Data Form:\n` +
            `Nama: ${formData.name}\n` +
            `Email: ${formData.email}\n` +
            `Subjek: ${formData.subject}\n` +
            `Pesan: ${formData.message}`
        );
        
        // Open WhatsApp with the formatted message
        window.open(`https://wa.me/6285601792920?text=${whatsappMessage}`, '_blank');
        
        // Reset form after submission
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
    };

    return (
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
                    Hubungi Kami
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-gray-600 max-w-2xl mx-auto"
                >
                    Punya pertanyaan tentang DCF 2025? Kirim pesan kepada kami melalui form berikut ini.
                </motion.p>
            </div>

            {/* Contact Form */}
            <motion.div 
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 max-w-2xl mx-auto"
            >
                <div className="mb-8 text-center">
                    <h2 className="text-2xl font-bold text-teal-700 mb-2">Kirim Pesan</h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-orange-400 mx-auto"></div>
                </div>

                <form className="space-y-6" onSubmit={handleWhatsappClick}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Nama Anda
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            placeholder="Masukkan nama lengkap"
                            required
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Anda
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            placeholder="contoh@email.com"
                            required
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                            Subjek
                        </label>
                        <input
                            type="text"
                            id="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            placeholder="Tentang apa pesan Anda?"
                            required
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                            Pesan Anda
                        </label>
                        <textarea
                            id="message"
                            rows={5}
                            value={formData.message}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            placeholder="Tulis pesan Anda secara detail di sini..."
                            required
                        ></textarea>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full bg-gradient-to-r from-teal-500 to-orange-400 text-white py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300 group"
                    >
                        <span className="flex items-center justify-center">
                            Kirim Pesan
                            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </motion.button>
                </form>
            </motion.div>

            {/* Additional Info */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-12 text-center"
            >
                <p className="text-gray-600">
                    Kami akan membalas pesan Anda dalam waktu 1-2 hari kerja.
                </p>
            </motion.div>
        </motion.div>
    );
};

export default ContactView;