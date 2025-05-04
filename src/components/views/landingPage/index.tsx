import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Award, CalendarDays, CheckCircle2, FileText, Presentation, Upload , Trophy, Globe, UserPlus, LogIn, LayoutDashboard, ClipboardCheck } from 'lucide-react';
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
    images : '/images/kenangan/Utama.JPG',
  } , 
  {
    images : '/images/kenangan/1.JPG',
  } , 
  {
    images : '/images/kenangan/2.JPG',
  } , 
  {
    images : '/images/kenangan/3.JPG',
  } , 
  {
    images : '/images/kenangan/4.JPG',
  }
  
]

const testimonials = [
  {
    image : '/images/Foto Aida.jpg',
    name : "Aida" , 
    role : "Ketua pelaksana DCF 2023" , 
    apaKataMereka : "Ikut lomba DCF yang diadakan himpunan mahasiswa kimia Undip pada tahun 2024 jadi pengalaman seru sekalii untuk aku.  Nggak Cuma nulis karya tulis dan lomba, tapi aku juga dapat banyak pengetahuan baru dari juri dan sharing langsung bareng teman-teman finalis. Senang bisa belajar hal-hal baru, nambah wawasan, dan ketemu orang-orang hebat. Terimakasih banyak buat panitia yang sudah mengadakan acara sekeren ini. Semoga tahun depan bisa ikut lagi, dan acaranya semakin seru dan inspiratif",
  } , 
  {
    image : '/images/Foto Darren.jpg',
    name : "Darren" , 
    role : "Ketua pelaksana DCF 2023" , 
    apaKataMereka : "Ikut lomba Kimia DCF UNDIP tuh seru banget! Acaranya rame, panitianya juga ramah, dan yang paling bikin deg-degan tuh soalnya—bener-bener bikin mikir keras. Tapi justru itu yang bikin nagih, karena kita jadi bisa ngetes seberapa jauh pemahaman kita tentang kimia.Buat kalian yang suka tantangan dan pengen ngerasain serunya adu ilmu kimia bareng temen-temen dari berbagai daerah, cobain deh ikut lomba ini. Jangan takut soal susah, yang penting nikmatin prosesnya dan ambil pelajaran sebanyak mungkin. Gas terus belajar, siapa tahu bisa juara juga!"

  } , 
  {
    image : '/images/Foto Mas Arifin.jpg',
    name : "Arifin" , 
    role : "Ketua pelaksana DCF 2023" , 
    apaKataMereka : "Halo Calon Saintis Hebat!Setiap keberhasilan besar selalu dimulai dari sebuah keputusan kecil, berani mencoba. Inilah saatnya kamu melangkah menuju masa depan bersama Diponegoro Chemistry Fair (DCF) 2025! Sebuah acara kebanggaan dari Himpunan Mahasiswa Kimia (HMK) Universitas Diponegoro. Ajang yang bukan hanya tentang ilmu, tapi juga tentang semangat, impian, dan keberanian untuk melangkah lebih jauh.Apa saja yang menantimu di DCF 2025? ✨Olimpiade Kimia ✨Lomba Karya Tulis Ilmiah (LKTI) ✨Seminar NasionalSeluruh kegiatan ini terbuka bagi siswa SMA/SMK/sederajat dari seluruh penjuru negeri. Rangkaian kegiatan ini menjadi wadah aktualisasi diri dan pengembangan potensi generasi muda yang siap berpikir kreatif dan inovatif dalam menjawab tantangan zaman. Kini waktunya kita bergerak, menciptakan perubahan, dan membuktikan bahwa ilmu kimia bisa menjadi jembatan menuju dunia yang lebih baik."

  } , 
  {
    image : '/images/Foto Mba Redin.jpg',
    name : "Redin" , 
    role : "Ketua pelaksana DCF 2023" , 
    apaKataMereka : "Salam Saintis Muda! Melihat antusiasme para peserta dari berbagai daerah di Indonesia untuk ajang lomba Diponegoro Chemistry Fair di tahun lalu. Diponegoro Chemistry Fair diadakan kembali di tahun ini, bukan sekadar ajang lomba, tapi juga ruang bertumbuh bagi generasi muda yang mencintai ilmu kimia. Melalui Kompetisi Kimia, Lomba Karya Tulis Ilmiah, dan Seminar Nasional yang menjadi rangkaian di dalam DCF, kami ingin menyalakan semangat eksplorasi dan inovasi di bidang sains untuk teman - teman siswa SMA/SMK/Sederajat. Kami tunggu partisipasimu di DCF 2025. Tunjukan ide dan inovasimu dalam bidang kimia."

  } , 
  {
    image : '/images/Foto Yara.jpg',
    name : "Yara" , 
    role : "Ketua pelaksana DCF 2023" , 
    apaKataMereka : "'Genggam bara api sampai jadi arang' itulah semangat yang tercermin dalam setiap langkah peserta Diponegoro Chemistry Fair. Dalam ajang ini, kamu akan diajak untuk berani mengambil tantangan, menghadapi persaingan, dan terus belajar tanpa kenal lelah. Melalui lomba LKTI, kompetisi, dan seminar nasional, DCF menjadi ruang aktualisasi diri sekaligus tempat menimba ilmu dari berbagai sudut pandang. Kesan yang paling membekas adalah suasana kompetitif yang sehat dan penuh semangat, diiringi kebersamaan yang hangat antar peserta dari segala penjuru Indonesia. Harapannya, DCF terus menjadi tempat yang dapat mendorong mahasiswa untuk berpikir kritis, berinovasi, dan tentu saja, terus menggenggam bara semangat hingga suatu saat menjadi arang keberhasilan yang nyata. DCF bukan sekadar ajang perlombaan, melainkan proses menempa diri tempat di mana semangat pantang menyerah diuji, dan kerja keras berbuah prestasi. Untuk itu, yuk pantengin terus segala info dari DCF dan jangan lupa daftarkan diri kamu juga yaa!"

  } 
]




const LandingView = () => {

  const [activeTab, setActiveTab] = useState<'olimpiade' | 'lkti'>('olimpiade');
  const [activePrizeTab, setActivePrizeTab] = useState<'olimpiade' | 'lkti'>('olimpiade');
  const [modalTestimonial, setModalTestimonial] = useState(false)
  const [selectedTestimonial, setSelectedTestimonial] = useState(0);

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
              src="/images/kenangan/Utama.JPG" 
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
                  Olimpiade Kimia & LKTI terbesar tingkat nasional untuk siswa SMA/SMK sederajat!
                  <br />
                  <span className="text-teal-600 font-semibold">Tunjukkan inovasi dan kreativitas di bidang kimia!</span>
                </motion.p>
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
       
        

        {/* Main Content */}
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-teal-700 mb-4">Apa Itu DCF 2025?</h2>
            <div className="w-24 h-1 bg-orange-400 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Diponegoro Chemistry Fair adalah ajang olimpiade kimia terbesar tingkat nasional yang 
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
                    src="/images/Olimpiade.jpg" 
                    alt="Competition" 
                    fill
                    className="object-cover"
                    style={{ objectPosition: 'center' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-white/30"></div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-teal-700 mb-3">Olimpiade Kimia</h3>
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
                    src="/images/lkti.JPG" 
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
                    src="/images/Seminar.png" 
                    alt="Network" 
                    fill
                    className="object-cover"
                    style={{ objectPosition: 'center' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-white/30"></div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-teal-700 mb-3">Seminar Nasional</h3>
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

                      {/* Lihat selengkapnya  */}
                      <button 
                        onClick={() => {
                          setSelectedTestimonial(index);
                          setModalTestimonial(true);
                        }}
                        className='text-teal-500 pb-2 hover:text-teal-700 transition-colors'
                      >
                        Lihat selengkapnya
                      </button>
                      
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

        {/* Testimonial Modal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: modalTestimonial ? 1 : 0 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${modalTestimonial ? 'block' : 'hidden'}`}
        >
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setModalTestimonial(false)}
          ></div>
          
          {/* Modal Content */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="relative bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
          >
            {/* Close Button */}
            <button
              onClick={() => setModalTestimonial(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Modal Body */}
            <div className="p-8">
              {/* Profile Header */}
              <div className="flex items-center mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-teal-100">
                  <Image 
                    src={testimonials[0].image}
                    alt={testimonials[0].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{testimonials[0].name}</h3>
                  <p className="text-teal-600">{testimonials[0].role}</p>
                </div>
              </div>
              
              {/* Quote Icon */}
              <svg 
                className="w-10 h-10 text-teal-300 mb-4" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              
              {/* Full Testimonial Text */}
              <div className="prose prose-lg text-gray-600 mb-6">
                <p>{testimonials[0].apaKataMereka}</p>
              </div>
              
              {/* Decorative Elements */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                <div className="w-8 h-1 bg-gradient-to-r from-teal-400 to-orange-400 rounded-full"></div>
                <p className="text-sm text-gray-400">DCF Testimonial</p>
                <div className="w-8 h-1 bg-gradient-to-r from-orange-400 to-teal-400 rounded-full"></div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        

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

      {/* Timeline Section - Enhanced with Olimpiade and LKTI */}
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

          {/* Competition Type Tabs */}
          <motion.div variants={itemVariants} className="flex justify-center mb-12">
            <div className="inline-flex bg-white rounded-full p-1 shadow-md">
              <button className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'olimpiade' ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white' : 'text-gray-600 hover:text-teal-600'}`}
                onClick={() => setActiveTab('olimpiade')}>
                Olimpiade Kimia
              </button>
              <button className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'lkti' ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white' : 'text-gray-600 hover:text-orange-500'}`}
                onClick={() => setActiveTab('lkti')}>
                LKTI Nasional
              </button>
            </div>
          </motion.div>

          {/* Olimpiade Timeline */}
          {activeTab === 'olimpiade' && (
            <motion.div 
              initial="hidden"
              animate="show"
              variants={containerVariants}
              className="mb-16"
            >
              <h3 className="text-2xl font-bold text-teal-700 mb-8 text-center flex items-center justify-center">
                <Trophy className="w-8 h-8 mr-3 text-orange-400" />
                Timeline Olimpiade Kimia
              </h3>
              
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-teal-400 to-orange-400 rounded-full opacity-20 -translate-y-1/2"></div>
                
                {/* Timeline Items */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
                  {[
                    { 
                      title: "Pendaftaran Gel. 1", 
                      date: "5 Mei - 29 Juni 2025",
                      icon: <CalendarDays className="w-6 h-6 text-white" />
                    },
                    { 
                      title: "Pendaftaran Gel. 2", 
                      date: "5 Juli - 2 Agustus 2025",
                      icon: <CalendarDays className="w-6 h-6 text-white" />
                    },
                    { 
                      title: "Babak Penyisihan", 
                      date: "16 Agustus 2025",
                      icon: <CheckCircle2 className="w-6 h-6 text-white" />
                    },
                    { 
                      title: "Babak Perempatfinal", 
                      date: "30 Agustus 2025",
                      icon: <CheckCircle2 className="w-6 h-6 text-white" />
                    },
                    { 
                      title: "Babak Semifinal", 
                      date: "6 September 2025",
                      icon: <CheckCircle2 className="w-6 h-6 text-white" />
                    },
                    { 
                      title: "Final & Pengumuman", 
                      date: "28 September 2025",
                      icon: <Award className="w-6 h-6 text-white" />
                    }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      variants={itemVariants}
                      className="flex flex-col items-center"
                    >
                      {/* Timeline Dot */}
                      <div className="relative mb-4">
                        {/* Connector line */}
                        {index !== 0 && (
                          <div className="absolute -left-16 top-1/2 w-16 h-1 bg-gradient-to-r from-teal-300/50 to-orange-300/50 -translate-y-1/2"></div>
                        )}
                        
                        <motion.div 
                          whileHover={{ scale: 1.2 }}
                          className="w-14 h-14 flex items-center justify-center relative"
                        >
                          <motion.div 
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute inset-0 bg-teal-400/30 rounded-full"
                          />
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg z-10 ${
                            index < 2 ? 'bg-teal-500' : index < 4 ? 'bg-orange-400' : 'bg-gradient-to-br from-teal-500 to-orange-400'
                          }`}>
                            {item.icon}
                          </div>
                        </motion.div>
                      </div>

                      {/* Timeline Card */}
                      <motion.div 
                        whileHover={{ y: -5 }}
                        className="w-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
                      >
                        <div className={`h-2 ${
                          index < 2 ? 'bg-teal-500' : index < 4 ? 'bg-orange-400' : 'bg-gradient-to-r from-teal-500 to-orange-400'
                        }`}></div>
                        <div className="p-5 text-center">
                          <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                          <div className="text-sm text-gray-500 font-medium">{item.date}</div>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* LKTI Timeline */}
          {activeTab === 'lkti' && (
          <motion.div 
            initial="hidden"
            animate="show"
            variants={containerVariants}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-orange-600 mb-8 text-center flex items-center justify-center">
              <FileText className="w-8 h-8 mr-3 text-teal-500" />
              Timeline LKTI Nasional
            </h3>
            
            <div className="relative">
              {/* Timeline Line - Hide on mobile */}
              <div className="hidden md:block absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-orange-400 to-teal-400 rounded-full opacity-20 -translate-y-1/2"></div>
              
              {/* Timeline Items - Changed to vertical layout on mobile */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
                {[
                  { 
                    title: "Pendaftaran Gel. 1", 
                    date: "5 Mei - 29 Juni 2025",
                    icon: <CalendarDays className="w-6 h-6 text-white" />,
                    mobilePosition: "md:col-start-1"
                  },
                  { 
                    title: "Gelombang Diskon", 
                    date: "23 Juni - 25 Juni 2025",
                    icon: <Upload className="w-6 h-6 text-white" />,
                    mobilePosition: "md:col-start-2"
                  },
                  { 
                    title: "Pengumpulan Full paper Gelombang 1", 
                    date: "5 Juli - 2 Agustus 2025",
                    icon: <CalendarDays className="w-6 h-6 text-white" />,
                    mobilePosition: "md:col-start-3"
                  },
                  { 
                    title: "Pendaftaran dan Pengumpulan Abstrak Gelombang 2", 
                    date: "5 Juli - 2 Agustus 2025",
                    icon: <CheckCircle2 className="w-6 h-6 text-white" />,
                    mobilePosition: "md:col-start-4"
                  },
                  { 
                    title: "Pengumpulan Fullpaper Gelombang 2", 
                    date: "8 Agustus - 31 Agustus 2025",
                    icon: <CalendarDays className="w-6 h-6 text-white" />,
                    mobilePosition: "md:col-start-5"
                  },
                  { 
                    title: "Final dan Pengumuman Juara", 
                    date: "28 September 2025", 
                    icon: <Award className="w-6 h-6 text-white" />,
                    mobilePosition: "md:col-start-3"
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    variants={itemVariants}
                    className={`flex flex-col items-center ${item.mobilePosition}`}
                  >
                    {/* Timeline Dot */}
                    <div className="relative mb-4 w-full md:w-auto">
                      {/* Connector line - Hide on mobile */}
                      {index !== 0 && (
                        <div className="hidden md:block absolute -left-16 top-1/2 w-16 h-1 bg-gradient-to-r from-orange-300/50 to-teal-300/50 -translate-y-1/2"></div>
                      )}
                      
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className="w-14 h-14 flex items-center justify-center relative mx-auto md:mx-0"
                      >
                        <motion.div 
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="absolute inset-0 bg-orange-400/30 rounded-full"
                        />
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg z-10 ${
                          index < 2 ? 'bg-orange-500' : 
                          index < 4 ? 'bg-teal-400' : 
                          'bg-gradient-to-br from-orange-500 to-teal-400'
                        }`}>
                          {item.icon}
                        </div>
                      </motion.div>
                    </div>

                    {/* Timeline Card */}
                    <motion.div 
                      whileHover={{ y: -5 }}
                      className="w-full md:w-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 mx-4 md:mx-0"
                    >
                      <div className={`h-2 ${
                        index < 2 ? 'bg-orange-500' : 
                        index < 4 ? 'bg-teal-400' : 
                        'bg-gradient-to-r from-orange-500 to-teal-400'
                      }`}></div>
                      <div className="p-5 text-center">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                        <div className="text-sm text-gray-500 font-medium">{item.date}</div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          )}

          {/* Registration Fee Section */}
          <motion.div 
            variants={containerVariants}
            className="mb-20"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              Biaya Pendaftaran
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Olimpiade Fee */}
              <motion.div 
                variants={itemVariants}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
              >
                <div className="h-3 bg-gradient-to-r from-teal-500 to-teal-600"></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <Trophy className="w-8 h-8 mr-3 text-teal-600" />
                    <h4 className="text-xl font-bold text-gray-800">Olimpiade Kimia</h4>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-teal-50 rounded-lg">
                      <span className="font-medium text-gray-700">Gelombang 1</span>
                      <span className="font-bold text-teal-700">Rp 90.000</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <span className="font-medium text-gray-700">Gelombang 2</span>
                      <span className="font-bold text-orange-600">Rp 100.000</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-sm text-gray-500 italic">
                    *Harga belum termasuk biaya administrasi
                  </div>
                </div>
              </motion.div>
              
              {/* LKTI Fee */}
              <motion.div 
                variants={itemVariants}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
              >
                <div className="h-3 bg-gradient-to-r from-orange-400 to-orange-500"></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <FileText className="w-8 h-8 mr-3 text-orange-500" />
                    <h4 className="text-xl font-bold text-gray-800">LKTI Nasional</h4>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-teal-50 rounded-lg">
                      <span className="font-medium text-gray-700">Gelombang 1</span>
                      <span className="font-bold text-teal-700">Rp 95.000</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <span className="font-medium text-gray-700">Gelombang 2</span>
                      <span className="font-bold text-orange-600">Rp 110.000</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-sm text-gray-500 italic">
                    *Harga belum termasuk biaya administrasi
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Prizes Section */}
      <motion.section 
        id="hadiah"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={containerVariants}
        className="relative py-20 bg-gradient-to-b from-[#f0fdfa] to-[#e0f8f5] overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-teal-700 mb-4">Hadiah Menarik</h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-teal-500 via-orange-400 to-teal-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Raih kesempatan memenangkan hadiah total puluhan juta rupiah!
            </p>
          </motion.div>

          {/* Prizes Tabs */}
          <motion.div variants={itemVariants} className="flex justify-center mb-12">
            <div className="inline-flex bg-white rounded-full p-1 shadow-md">
              <button className={`px-6 py-2 rounded-full font-medium transition-all ${activePrizeTab === 'olimpiade' ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white' : 'text-gray-600 hover:text-teal-600'}`}
                onClick={() => setActivePrizeTab('olimpiade')}>
                Hadiah Olimpiade
              </button>
              <button className={`px-6 py-2 rounded-full font-medium transition-all ${activePrizeTab === 'lkti' ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white' : 'text-gray-600 hover:text-orange-500'}`}
                onClick={() => setActivePrizeTab('lkti')}>
                Hadiah LKTI
              </button>
            </div>
          </motion.div>

          {/* Olimpiade Prizes */}
          {activePrizeTab === 'olimpiade' && (
            <motion.div 
              initial="hidden"
              animate="show"
              variants={containerVariants}
              className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto"
            >
              {[
                { 
                  rank: "Juara 1", 
                  prize: "Rp 5.000.000", 
                  color: "from-amber-400 to-amber-500",
                  icon: <Award className="w-8 h-8 text-white" />
                },
                { 
                  rank: "Juara 2", 
                  prize: "Rp 3.500.000", 
                  color: "from-slate-400 to-slate-500",
                  icon: <Award className="w-8 h-8 text-white" />
                },
                { 
                  rank: "Juara 3", 
                  prize: "Rp 2.000.000", 
                  color: "from-amber-600 to-amber-700",
                  icon: <Award className="w-8 h-8 text-white" />
                },
                { 
                  rank: "Harapan 1", 
                  prize: "Rp 750.000", 
                  color: "from-teal-400 to-teal-500",
                  icon: <Award className="w-8 h-8 text-white" />
                },
                { 
                  rank: "Harapan 2", 
                  prize: "Rp 500.000", 
                  color: "from-orange-400 to-orange-500",
                  icon: <Award className="w-8 h-8 text-white" />
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className={`h-3 bg-gradient-to-r ${item.color}`}></div>
                  <div className="p-6 text-center">
                    <div className={`w-20 h-20 mx-auto rounded-full mb-4 flex items-center justify-center bg-gradient-to-br ${item.color} shadow-md`}>
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{item.rank}</h3>
                    <div className="text-xl font-bold bg-gradient-to-br bg-clip-text text-stone-400 ${item.color}">
                      {item.prize}
                    </div>
                    <div className="mt-4">
                      <div className="inline-block px-3 py-1 bg-teal-100 text-teal-800 text-xs font-medium rounded-full">
                        + Sertifikat
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* LKTI Prizes */}
          {activePrizeTab === 'lkti' && (
            <motion.div 
              initial="hidden"
              animate="show"
              variants={containerVariants}
              className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto"
            >
              {[
                { 
                  rank: "Juara 1", 
                  prize: "Rp 4.000.000", 
                  color: "from-amber-400 to-amber-500",
                  icon: <Award className="w-8 h-8 text-white" />
                },
                { 
                  rank: "Juara 2", 
                  prize: "Rp 2.500.000", 
                  color: "from-slate-400 to-slate-500",
                  icon: <Award className="w-8 h-8 text-white" />
                },
                { 
                  rank: "Juara 3", 
                  prize: "Rp 1.800.000", 
                  color: "from-amber-600 to-amber-700",
                  icon: <Award className="w-8 h-8 text-white" />
                },
                { 
                  rank: "Harapan 1", 
                  prize: "Rp 850.000", 
                  color: "from-teal-400 to-teal-500",
                  icon: <Award className="w-8 h-8 text-white" />
                },
                { 
                  rank: "Harapan 2", 
                  prize: "Rp 600.000", 
                  color: "from-orange-400 to-orange-500",
                  icon: <Award className="w-8 h-8 text-white" />
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className={`h-3 bg-gradient-to-r ${item.color}`}></div>
                  <div className="p-6 text-center">
                    <div className={`w-20 h-20 mx-auto rounded-full mb-4 flex items-center justify-center bg-gradient-to-br ${item.color} shadow-md`}>
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{item.rank}</h3>
                    <div className="text-xl font-bold bg-gradient-to-br bg-clip-text text-stone-400 ${item.color}">
                      {item.prize}
                    </div>
                    <div className="mt-4">
                      <div className="inline-block px-3 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                        + Sertifikat
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Total Prize Highlight */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 bg-gradient-to-r from-teal-500 to-orange-400 rounded-xl shadow-xl overflow-hidden max-w-4xl mx-auto"
          >
            <div className="p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Total Hadiah</h3>
              <div className="text-4xl font-extrabold text-white mb-4">
                {activePrizeTab === 'olimpiade' ? "Rp 11.750.000" : "Rp 9.750.000"}
              </div>
              <p className="text-teal-100">
                {activePrizeTab === 'olimpiade' 
                  ? "Total hadiah untuk pemenang Olimpiade Kimia DCF 2025" 
                  : "Total hadiah untuk pemenang LKTI Nasional DCF 2025"}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Floating decoration */}
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

      {/* Registration Process Section */}
      <motion.section 
        id="registration"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={containerVariants}
        className="relative py-20 bg-gradient-to-b from-white to-[#f0fdfa] overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-teal-700 mb-4">Alur Pendaftaran</h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-teal-500 via-orange-400 to-teal-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ikuti langkah-langkah berikut untuk mendaftar DCF 2025
            </p>
          </motion.div>

          {/* Timeline Steps */}
          <motion.div 
            variants={containerVariants}
            className="relative max-w-4xl mx-auto"
          >
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-400 to-orange-400 opacity-20 md:left-1/2 md:-translate-x-1/2"></div>
            
            {/* Steps */}
            <div className="space-y-12">
              {[
                {
                  step: 1,
                  title: "Akses Website",
                  description: "Peserta membuka website dan melihat informasi lomba",
                  icon: <Globe className="w-6 h-6 text-white" />
                },
                {
                  step: 2,
                  title: "Membuat Akun",
                  description: "Peserta wajib membuat akun dengan menggunakan email",
                  icon: <UserPlus className="w-6 h-6 text-white" />
                },
                {
                  step: 3,
                  title: "Login",
                  description: "Setelah akun dibuat, peserta dapat login ke dashboard mereka",
                  icon: <LogIn className="w-6 h-6 text-white" />
                },
                {
                  step: 4,
                  title: "Dashboard Pengguna",
                  description: "Setelah login, peserta akan diarahkan ke tampilan dashboard",
                  icon: <LayoutDashboard className="w-6 h-6 text-white" />
                },
                {
                  step: 5,
                  title: "Pendaftaran Lomba",
                  description: [
                    "Peserta memilih jenis lomba (Olimpiade, LKTI, Poster, atau Seminar)",
                    "Mengisi data yang diperlukan dan mengunggah dokumen persyaratan"
                  ],
                  icon: <ClipboardCheck className="w-6 h-6 text-white" />
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="relative flex flex-col md:flex-row items-center gap-8"
                >
                  {/* Step Number (Mobile) */}
                  <div className="md:hidden absolute -left-2 top-0 w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-lg z-10">
                    <span className="text-white font-bold">{item.step}</span>
                  </div>
                  
                  {/* Step Number (Desktop) */}
                  <div className="hidden md:flex w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex-shrink-0 items-center justify-center shadow-lg z-10">
                    <span className="text-white font-bold text-xl">{item.step}</span>
                  </div>
                  
                  {/* Step Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'} bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300`}>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                    </div>
                    
                    {Array.isArray(item.description) ? (
                      <ul className="space-y-2 text-gray-600">
                        {item.description.map((desc, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle2 className="w-4 h-4 text-teal-500 mt-1 mr-2 flex-shrink-0" />
                            {desc}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600">{item.description}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-10 w-32 h-32 bg-teal-100/20 rounded-full blur-xl"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-10 w-40 h-40 bg-orange-100/20 rounded-full blur-xl"
        />
      </motion.section>


      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default LandingView;