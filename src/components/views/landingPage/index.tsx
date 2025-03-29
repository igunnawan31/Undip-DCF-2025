import React from 'react';
import Image from 'next/image';
import { ArrowRight, Award, CalendarDays, CheckCircle2, FileText, Presentation, Upload } from 'lucide-react';
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

const memories = [
  {
    images : '/images/placeholder2.jpg',
  } , 
  {
    images : '/images/placeholder2.jpg',
  } , 
  {
    images : '/images/placeholder2.jpg',
  } , 
  {
    images : '/images/placeholder2.jpg',
  } , 
  {
    images : '/images/placeholder2.jpg',
  }
  
]

const testimonials = [
  {
    image : '/images/placeholder2.jpg',
    name : "Steven Sihombing" , 
    role : "Ketua pelaksana DCF 2023" , 
    apaKataMereka : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae."

  } , 
  {
    image : '/images/placeholder2.jpg',
    name : "Steven Sihombing" , 
    role : "Ketua pelaksana DCF 2023" , 
    apaKataMereka : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae."

  } , 
  {
    image : '/images/placeholder2.jpg',
    name : "Steven Sihombing" , 
    role : "Ketua pelaksana DCF 2023" , 
    apaKataMereka : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae."

  } , 
  {
    image : '/images/placeholder2.jpg',
    name : "Steven Sihombing" , 
    role : "Ketua pelaksana DCF 2023" , 
    apaKataMereka : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae."

  } , 
  {
    image : '/images/placeholder2.jpg',
    name : "Steven Sihombing" , 
    role : "Ketua pelaksana DCF 2023" , 
    apaKataMereka : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae."

  } , 
  {
    image : '/images/placeholder2.jpg',
    name : "Steven Sihombing" , 
    role : "Ketua pelaksana DCF 2023" , 
    apaKataMereka : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae."

  }
]




const LandingView = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#f0fdfa] flex flex-col overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section id='home'>
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
      </section>

      {/* Engaging Content Section Before Footer */}
      <motion.section 
        id='about'
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

          

          {/* Memories Section - Redesigned */}
          <motion.section 
            id="memories"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={containerVariants}
            className="relative py-16 bg-gradient-to-b from-[#f0fdfa] to-[#e0f8f5]"
          >
            <div className="container mx-auto px-4">
              {/* Section Header with Creative Design */}
              <motion.div variants={itemVariants} className="text-center mb-12 relative">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-teal-400 to-orange-400 rounded-full"></div>
                <h2 className="text-4xl font-bold text-teal-700 mb-3 relative inline-block">
                  <span className="relative z-10">Galeri Kenangan</span>
                  <span className="absolute -bottom-1 left-0 w-full h-2 bg-orange-200/50 z-0"></span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
                  Kumpulan momen berkesan dari penyelenggaraan DCF tahun sebelumnya
                </p>
              </motion.div>

              {/* Creative Gallery Layout */}
              <motion.div 
                variants={containerVariants}
                className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
              >
                {memories.map((memory, index) => (
                  <motion.div 
                    key={index}
                    variants={itemVariants}
                    className={`relative group overflow-hidden rounded-2xl shadow-lg ${index === 0 ? 'md:row-span-2 md:col-span-2 h-full' : 'h-48'}`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Image with Creative Frame */}
                    <div className="absolute inset-0 p-1">
                      <div className="relative w-full h-full overflow-hidden rounded-xl">
                        <Image 
                          src={memory.images} 
                          alt={`Memory ${index + 1}`}
                          fill
                          className="object-cover transition-all duration-500 group-hover:scale-105"
                        />
                        {/* Creative Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              </div>
                              <span className="text-white font-medium">DCF 2024</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Creative Corner Accent */}
                    <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500 transform rotate-45 origin-bottom-left translate-y-1/4 opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              
            </div>

            {/* Decorative Floating Elements */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#00b3b3] opacity-5 blur-xl"
            ></motion.div>
            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 10, repeat: Infinity, delay: 0.5 }}
              className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#fdbe85] opacity-5 blur-xl"
            ></motion.div>
          </motion.section>

          {/* Elegant Testimonials Section with Images */}
          <motion.section 
            id="testimonials"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={containerVariants}
            className="relative py-20 bg-white"
          >
            <div className="container mx-auto px-4">
              {/* Section Header */}
              <motion.div 
                variants={itemVariants}
                className="text-center mb-16"
              >
                <h2 className="text-3xl font-bold text-teal-700 mb-4">Apa Kata Mereka?</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-orange-400 mx-auto rounded-full"></div>
                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                  Pendapat peserta dan panitia DCF sebelumnya
                </p>
              </motion.div>

              {/* Testimonials Grid */}
              <motion.div 
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="relative group"
                  >
                    {/* Testimonial Card */}
                    <div className="h-full bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col">
                      {/* Quote Icon */}
                      <svg 
                        className="w-8 h-8 text-teal-300 mb-4" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      
                      {/* Testimonial Text */}
                      <p className="text-gray-600 mb-6 flex-grow">{testimonial.apaKataMereka}</p>
                      
                      {/* Author */}
                      <div className="flex items-center pt-4 border-t border-gray-100">
                        {/* Profile Image */}
                        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-teal-100">
                          <Image 
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-800">{testimonial.name}</h4>
                          <p className="text-sm text-gray-500">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Decorative Element */}
                    <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.div>
                ))}
              </motion.div>

              
            </div>
          </motion.section>

          
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
        id="timeline"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={containerVariants}
        className="relative py-20 bg-gradient-to-b from-[#e0f8f5] to-[#c0f0e5] overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
          {/* Timeline Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-teal-700 mb-4">Timeline DCF 2025</h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-teal-500 via-orange-400 to-teal-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ikuti setiap tahapan penting dalam perjalanan Diponegoro Chemistry Fair 2025
            </p>
          </motion.div>

          {/* Timeline Container */}
          <motion.div variants={containerVariants} className="relative">
            {/* Horizontal Line */}
            <div className="absolute left-0 right-0 top-1/2 h-2 bg-gradient-to-r from-teal-400 to-orange-400 rounded-full opacity-20 -translate-y-1/2"></div>

            {/* Timeline Items */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
              {[
                { 
                  date: "3 Mei 2025", 
                  title: "Pendaftaran & Pengumpulan Abstrak", 
                  phase: "Fase Awal",
                  icon: <CalendarDays className="w-8 h-8 text-white" />
                },
                { 
                  date: "27 Juni 2025", 
                  title: "Pengumpulan Full Paper", 
                  phase: "Fase Pengembangan",
                  icon: <FileText className="w-8 h-8 text-white" />
                },
                { 
                  date: "27 Juli 2025", 
                  title: "Pengumpulan Karya Final", 
                  phase: "Fase Penyempurnaan",
                  icon: <Upload className="w-8 h-8 text-white" />
                },
                { 
                  date: "24 Agustus 2025", 
                  title: "Presentasi Final", 
                  phase: "Babak Final",
                  icon: <Presentation className="w-8 h-8 text-white" />
                },
                { 
                  date: "29 September 2025", 
                  title: "Seminar & Awarding", 
                  phase: "Puncak Acara",
                  icon: <Award className="w-8 h-8 text-white" />
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="flex flex-col items-center"
                >
                  {/* Timeline Dot and Connector */}
                  <div className="relative mb-4">
                    {/* Connector line */}
                    {index !== 0 && (
                      <div className="absolute -left-16 top-1/2 w-16 h-1 bg-gradient-to-r from-teal-300/50 to-orange-300/50 -translate-y-1/2"></div>
                    )}
                    
                    {/* Animated dot */}
                    <motion.div 
                      whileHover={{ scale: 1.2 }}
                      className="w-16 h-16 flex items-center justify-center relative"
                    >
                      <motion.div 
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute inset-0 bg-teal-400/30 rounded-full"
                      />
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-orange-400 rounded-full flex items-center justify-center shadow-lg z-10">
                        {item.icon}
                      </div>
                    </motion.div>
                  </div>

                  {/* Timeline Card */}
                  <motion.div 
                    whileHover={{ y: -10 }}
                    className="w-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="h-2 bg-gradient-to-r from-teal-500 to-orange-400"></div>
                    <div className="p-6 text-center">
                      <div className="text-xs font-semibold text-orange-500 mb-1">{item.phase}</div>
                      <h3 className="text-lg font-bold text-teal-700 mb-2">{item.title}</h3>
                      <div className="text-sm text-gray-500 font-medium">{item.date}</div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Floating chemistry elements */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute -left-10 top-1/4 w-20 h-20 opacity-20"
            >
              <Image src="/images/chemistry-flask.png" alt="Flask" fill className="object-contain" />
            </motion.div>
            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 7, repeat: Infinity, delay: 0.5 }}
              className="absolute -right-10 bottom-1/4 w-24 h-24 opacity-20"
            >
              <Image src="/images/chemistry-atom.png" alt="Atom" fill className="object-contain" />
            </motion.div>
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-20 text-center"
          >
            <div className="inline-block bg-white rounded-full px-6 py-2 shadow-md mb-6">
              <span className="text-teal-600 font-medium">Jangan sampai ketinggalan!</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Siap menjadi bagian dari DCF 2025?</h3>
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center bg-gradient-to-r from-teal-500 to-orange-400 text-white px-8 py-4 rounded-full hover:shadow-lg transition-all duration-300 group shadow-md"
            >
              <span className="mr-3 font-medium text-lg">Daftar Sekarang</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>

        {/* Animated background elements */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-40 h-40 bg-teal-100/20 rounded-full blur-xl"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-orange-100/20 rounded-full blur-xl"
        />
      </motion.section>


      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default LandingView;