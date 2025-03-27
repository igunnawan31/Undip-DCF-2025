import React from 'react';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/fragment/navbar';
import Footer from '@/components/fragment/footer';
import { motion } from 'framer-motion';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8 } }
};

const slideInFromLeft = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

const slideInFromRight = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};



const LandingView = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#f0fdfa] flex flex-col overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <main className="relative flex-grow">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-[#008080]/30 z-10"></div>
          <Image 
            src="/images/placeholder.jpg" 
            alt="Chemistry Background"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Animated blobs */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[#00b3b3] opacity-10 blur-3xl"
          ></motion.div>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
            className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-[#fdbe85] opacity-10 blur-3xl"
          ></motion.div>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", delay: 0.3 }}
            className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-[#008080] opacity-10 blur-2xl"
          ></motion.div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          {/* Redesigned Title Box with Chemistry Theme */}
          <motion.div 
            initial="hidden"
            animate="show"
            variants={containerVariants}
            className="relative space-y-6 bg-white rounded-2xl shadow-2xl border border-white overflow-hidden"
          >
            {/* Gradient Background Effect */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-orange-400 to-teal-500"></div>
            
            {/* Blurred Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-50/30 to-orange-50/30 opacity-50 blur-xl"></div>
            
            {/* Content Container */}
            <div className="relative z-10 p-8 text-center">
              {/* Title with Improved Typography */}
              <motion.h1 variants={itemVariants} className="text-4xl font-bold mb-4">
                <span className="block text-teal-700">Diponegoro</span>
                <span className="block text-orange-500">Chemistry Fair 2025</span>
              </motion.h1>
              
              {/* Subtitle with Roboto Font */}
              <motion.h2 variants={itemVariants} className="text-2xl font-light text-gray-700 mb-6 font-roboto">
                Tunjukkan Bakat Kimiamu!
              </motion.h2>
              
              {/* Description */}
              <motion.p variants={itemVariants} className="text-md text-gray-600 mb-8 font-roboto">
                Kompetisi Kimia & LKTI terbesar tingkat nasional untuk siswa SMA/SMK sederajat!
                <br />
                <span className="text-teal-600 font-semibold">Tunjukkan inovasi dan kreativitas di bidang kimia!</span>
              </motion.p>
              
              {/* Action Buttons */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center bg-teal-500 text-white px-6 py-3 rounded-full hover:bg-teal-600 transition duration-300 group"
                >
                  <span className="mr-2">Daftar Sekarang</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center border-2 border-teal-500 text-teal-700 px-6 py-3 rounded-full hover:bg-teal-50 transition duration-300 group"
                >
                  <span className="mr-2">Info Lengkap</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Maskot with improved animation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="flex justify-center relative"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-[#00b3b3]/10 blur-xl"
              />
              <Image 
                src="/images/LogoMaskot.png" 
                alt="DCF Maskot" 
                fill
                className="object-contain drop-shadow-lg"
              />
              {/* Floating particles around maskot */}
              {[...Array(6)].map((_, i) => (
                <motion.div 
                  key={i}
                  animate={{
                    y: [0, -20, 0],
                    x: [0, Math.random() > 0.5 ? 10 : -10, 0]
                  }}
                  transition={{
                    duration: Math.random() * 6 + 4,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                  className={`absolute rounded-full bg-gradient-to-br ${i%2 === 0 ? 'from-[#008080] to-[#00b3b3]' : 'from-[#fdbe85] to-[#ff9a3c]'} opacity-70`}
                  style={{
                    width: `${Math.random() * 10 + 5}px`,
                    height: `${Math.random() * 10 + 5}px`,
                    top: `${Math.random() * 70 + 15}%`,
                    left: `${Math.random() * 70 + 15}%`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Engaging Content Section Before Footer */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={containerVariants}
        className="relative py-16 bg-gradient-to-b from-[#f0fdfa] to-[#e0f8f5] overflow-hidden"
      >
        {/* Decorative Chemistry Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          {/* Floating chemistry icons */}
          <motion.div 
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-1/4 left-1/6 w-16 h-16"
          >
            <Image src="/images/chemistry-flask.png" alt="Flask" fill className="object-contain" />
          </motion.div>
          <motion.div 
            animate={{ y: [-15, 15, -15] }}
            transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
            className="absolute top-1/3 right-1/5 w-12 h-12"
          >
            <Image src="/images/chemistry-atom.png" alt="Atom" fill className="object-contain" />
          </motion.div>
          <motion.div 
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.3 }}
            className="absolute bottom-1/4 right-1/4 w-14 h-14"
          >
            <Image src="/images/chemistry-beaker.png" alt="Beaker" fill className="object-contain" />
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-teal-700 mb-4">Apa Itu DCF 2025?</h2>
            <div className="w-24 h-1 bg-orange-400 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Diponegoro Chemistry Fair adalah ajang kompetisi kimia terbesar tingkat nasional yang 
              memadukan sains, kreativitas, dan inovasi untuk menciptakan solusi di bidang pangan berkelanjutan.
            </p>
          </motion.div>

          {/* Features Grid - Preserving all content from the image */}
          <motion.div variants={containerVariants} className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 - Kompetisi Kimia */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition duration-300"
            >
              <div className="h-48 relative bg-gradient-to-r from-teal-100 to-orange-50">
                <div className="absolute inset-0">
                  <Image 
                    src="/images/placeholder.jpg" 
                    alt="Competition" 
                    fill
                    className="object-cover"
                    style={{ objectPosition: 'center' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-white/30"></div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-teal-700 mb-3">Kompetisi Kimia</h3>
                <p className="text-gray-600">
                  Uji pengetahuan kimiamu dalam kompetisi seru dengan sistem gugur dan hadiah menarik.
                </p>
              </div>
            </motion.div>

            {/* Feature 2 - LKTI Nasional */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition duration-300"
            >
              <div className="h-48 relative bg-gradient-to-r from-orange-100 to-teal-50">
                <div className="absolute inset-0">
                  <Image 
                    src="/images/placeholder.jpg" 
                    alt="Research" 
                    fill
                    className="object-cover"
                    style={{ objectPosition: 'center' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-white/30"></div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-orange-600 mb-3">LKTI Nasional</h3>
                <p className="text-gray-600">
                  Tunjukkan karya penelitian inovatifmu di bidang kimia untuk menyelesaikan masalah nyata.
                </p>
              </div>
            </motion.div>

            {/* Feature 3 - Jaringan Nasional */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition duration-300"
            >
              <div className="h-48 relative bg-gradient-to-r from-teal-50 to-orange-100">
                <div className="absolute inset-0">
                  <Image 
                    src="/images/placeholder.jpg" 
                    alt="Network" 
                    fill
                    className="object-cover"
                    style={{ objectPosition: 'center' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-white/30"></div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-teal-700 mb-3">Jaringan Nasional</h3>
                <p className="text-gray-600">
                  Bangun relasi dengan peserta dari seluruh Indonesia dan ahli di bidang kimia.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={containerVariants}
            className="mt-16 bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
          >
            <div className="grid md:grid-cols-4 gap-6 text-center">
              {[
                { value: "10+", label: "Tahun Pengalaman", color: "text-teal-600" },
                { value: "500+", label: "Peserta/Tahun", color: "text-orange-500" },
                { value: "30+", label: "Sekolah Terlibat", color: "text-teal-600" },
                { value: "5", label: "Jenis Lomba", color: "text-orange-500" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="p-4"
                >
                  <div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 text-center"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Siap menjadi bagian dari DCF 2025?</h3>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center bg-gradient-to-r from-teal-500 to-orange-400 text-white px-8 py-4 rounded-full hover:shadow-lg transition-all duration-300 group"
            >
              <span className="mr-2 font-medium">Daftar Sekarang</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>

        {/* Floating bubbles decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div 
              key={i}
              animate={{
                y: [-10, -50],
                opacity: [0.2, 0]
              }}
              transition={{
                duration: Math.random() * 6 + 4,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              className="absolute rounded-full bg-white opacity-20"
              style={{
                width: `${Math.random() * 30 + 10}px`,
                height: `${Math.random() * 30 + 10}px`,
                bottom: `${Math.random() * 20}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </motion.section>

      {/* Timeline Section */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={containerVariants}
        className="relative py-16 bg-gradient-to-b from-[#e0f8f5] to-[#c0f0e5] overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
          {/* Timeline Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-teal-700 mb-4">Timeline Diponegoro Chemistry Fair 2024</h2>
            <div className="w-24 h-1 bg-orange-400 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Ikuti setiap tahapan penting dalam perjalanan Diponegoro Chemistry Fair 2024
            </p>
          </motion.div>

          {/* Timeline Container */}
          <motion.div variants={containerVariants} className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-teal-400 to-orange-400 h-full opacity-20"></div>

            {/* Timeline Items */}
            {[
              { date: "3 Mei 2024", title: "Pengumpulan Artemest dan Abstrak LKTI", icon: "start" },
              { date: "27 Juni 2024", title: "Pengumpulan Fullpaper LKTI", icon: "progress" },
              { date: "27 Juli 2024", title: "Pengumpulan Artemest dan Abstrak LKTI Gen 2", icon: "progress" },
              { date: "10 Agustus 2024", title: "Penyisihan Kompetisi Kimia", icon: "progress" },
              { date: "24 Agustus 2024", title: "Perapatan Final Kompetisi Kimia", icon: "progress" },
              { date: "8 September 2024", title: "Pengumuman Juara Artemest", icon: "progress" },
              { date: "21 September 2024", title: "Semifinal Kompetisi Kimia", icon: "progress" },
              { date: "22 September 2024", title: "Final Kompetisi Kimia dan LKTI", icon: "progress" },
              { date: "29 September 2024", title: "Seminar Nasional", icon: "end" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className={`flex items-center mb-8 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
              >
                {/* Timeline Dot */}
                <div className="w-16 h-16 flex-shrink-0 relative z-10">
                  <div className="absolute inset-0 bg-white rounded-full shadow-lg transform rotate-45"></div>
                  <div className="absolute inset-2 bg-gradient-to-br from-teal-400 to-orange-400 rounded-full"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    {item.icon === "start" ? (
                      <CheckCircle2 className="text-white w-8 h-8" />
                    ) : item.icon === "end" ? (
                      <CheckCircle2 className="text-white w-8 h-8" />
                    ) : (
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    )}
                  </div>
                </div>

                {/* Timeline Content */}
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  className={`
                    w-1/2 p-6 rounded-2xl bg-white shadow-lg border border-gray-100 
                    ${index % 2 === 0 ? 'mr-8 text-right' : 'ml-8 text-left'}
                  `}
                >
                  <div className="text-sm text-gray-500 mb-2">{item.date}</div>
                  <div className="text-lg font-bold text-teal-700">{item.title}</div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Background Decorative Elements */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 w-64 h-64 bg-teal-100 opacity-10 rounded-full blur-2xl"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -right-20 w-80 h-80 bg-orange-100 opacity-10 rounded-full blur-2xl"
        />
      </motion.section>


      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default LandingView;