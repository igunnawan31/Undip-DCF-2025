import { motion } from "framer-motion";
import { 
  Home, 
  LayoutDashboard, 
  Users, 
  User, 
  LogOut, 
  Menu, 
  X,
  Medal,
  ClipboardList,
  History,
  ChevronDown,
  ChevronUp,
  FileText,
  Upload
} from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const DashboardSidebar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [expanded, setExpanded] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [lktiOpen, setLktiOpen] = useState(false);

  // Jika tidak ada session, redirect ke login
  if (status === "unauthenticated") {
    router.push('/auth/login');
    return null;
  }

  // Jika masih loading, tampilkan loading state
  if (status === "loading") {
    return (
      <div className="h-screen w-20 bg-white flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  // Pastikan session ada sebelum melanjutkan
  if (!session?.user) {
    return null;
  }

  const profileData = session.user;

  const menuItems = [
    { name: "Beranda", icon: Home, href: "/" },
    { name: "Olimpiade", icon: Medal, href: "/dashboard/olimpiade" },
    { 
      name: "LKTI", 
      icon: ClipboardList, 
      href: "/dashboard/lkti",
      submenu: [
        { name: "Form", icon: FileText, href: "/dashboard/lkti" },
        { name: "Upload Fullpaper", icon: Upload, href: "/dashboard/uploadFullpaper" }
      ]
    },
    { name: "Seminar", icon: Users, href: "/dashboard/seminar" },
    { name: "History", icon: History, href: "/dashboard/history" },
  ];

  const getActiveItem = () => {
    const currentPath = router.pathname;
    
    const activeItem = menuItems.find(item => {
      if (item.href === "/dashboard") {
        return currentPath === "/dashboard";
      }
      return currentPath === item.href || 
             (item.href !== "/" && currentPath.startsWith(item.href));
    });
    
    return activeItem?.name || "";
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/auth/login' });
  };

  const toggleLktiMenu = () => {
    setLktiOpen(!lktiOpen);
  };

  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`h-screen flex flex-col fixed ${
        expanded ? "w-72" : "w-20"
      } transition-all duration-300 bg-white shadow-lg border-r border-gray-100`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* DCF Logo Header */}
      <div className="p-4 flex justify-between items-center bg-white border-b border-gray-100">
        {expanded ? (
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="relative w-10 h-10">
              <Image 
                src="/images/LogoMaskot.png" 
                alt="DCF Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <span className="ml-3 text-xl font-bold text-[#008080]">
              DCF UNDIP
            </span>
          </motion.div>
        ) : (
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="relative w-10 h-10 mx-auto"
          >
            <Image 
              src="/images/LogoMaskot.png" 
              alt="DCF Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </motion.div>
        )}
        <button 
          onClick={() => setExpanded(!expanded)}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-all"
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {expanded ? (
            <X className="w-5 h-5 text-[#008080]" />
          ) : (
            <Menu className="w-5 h-5 text-[#008080]" />
          )}
        </button>
      </div>

      {/* Profile Section */}
      <div className="p-4 flex flex-col items-center border-b border-gray-100 bg-white">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="relative mb-3 group"
        >
          <div className={`rounded-full border-2 border-[#008080] p-1 transition-all duration-300 ${
            expanded ? "w-20 h-20" : "w-12 h-12"
          }`}>
            {profileData.image ? (
              <Image
                src={profileData.image}
                alt="Profile"
                width={expanded ? 80 : 48}
                height={expanded ? 80 : 48}
                className="rounded-full object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-[#008080] flex items-center justify-center text-white font-bold text-xl">
                {profileData.email?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          {expanded && (
            <motion.div 
              className="absolute bottom-0 right-0 w-6 h-6 bg-[#00b3b3] rounded-full border-2 border-white flex items-center justify-center shadow-sm"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <User className="w-3 h-3 text-white" />
            </motion.div>
          )}
        </motion.div>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h3 className="text-gray-900 font-semibold text-lg mb-1">{profileData.name}</h3>
            <p className="text-gray-500 text-sm">{profileData.email}</p>
          </motion.div>
        )}
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-3 overflow-y-auto custom-scrollbar">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = getActiveItem() === item.name;
            const isLktiItem = item.name === "LKTI";
            
            return (
              <div key={item.name}>
                {isLktiItem ? (
                  <>
                    <motion.div
                      whileHover={{ 
                        scale: 1.02,
                        backgroundColor: "rgba(0, 179, 179, 0.05)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={toggleLktiMenu}
                      className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                        isActive || (item.submenu && item.submenu.some(sub => router.pathname.startsWith(sub.href)))
                          ? "bg-[#008080]/10 text-[#008080] border-l-4 border-[#008080]" 
                          : "text-gray-700 hover:bg-gray-50"
                      } ${!expanded ? "justify-center" : ""}`}
                    >
                      <div className={`p-2 rounded-lg transition-all ${
                        isActive || (item.submenu && item.submenu.some(sub => router.pathname.startsWith(sub.href)))
                          ? "bg-[#008080] text-white" 
                          : "bg-gray-100 text-[#008080]"
                      }`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      {expanded && (
                        <div className="flex-1 ml-3 flex justify-between items-center">
                          <span className={`font-medium`}>{item.name}</span>
                          {lktiOpen ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      )}
                    </motion.div>

                    {lktiOpen && expanded && item.submenu && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.2 }}
                        className="ml-12 space-y-1 mt-1"
                      >
                        {item.submenu.map((subItem) => {
                          const isSubActive = router.pathname === subItem.href;
                          return (
                            <Link href={subItem.href} key={subItem.name} passHref>
                              <motion.div
                                whileHover={{ 
                                  scale: 1.02,
                                  backgroundColor: "rgba(0, 179, 179, 0.05)"
                                }}
                                whileTap={{ scale: 0.98 }}
                                className={`flex items-center p-2 pl-3 rounded-lg cursor-pointer transition-all duration-200 ${
                                  isSubActive
                                    ? "bg-[#008080]/10 text-[#008080]" 
                                    : "text-gray-700 hover:bg-gray-50"
                                }`}
                              >
                                <div className={`p-1.5 rounded-lg transition-all ${
                                  isSubActive
                                    ? "bg-[#008080] text-white" 
                                    : "bg-gray-100 text-[#008080]"
                                }`}>
                                  <subItem.icon className="w-4 h-4" />
                                </div>
                                <span className="ml-3 text-sm font-medium">{subItem.name}</span>
                              </motion.div>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </>
                ) : (
                  <Link href={item.href} passHref>
                    <motion.div
                      whileHover={{ 
                        scale: 1.02,
                        backgroundColor: "rgba(0, 179, 179, 0.05)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                        isActive
                          ? "bg-[#008080]/10 text-[#008080] border-l-4 border-[#008080]" 
                          : "text-gray-700 hover:bg-gray-50"
                      } ${!expanded ? "justify-center" : ""}`}
                    >
                      <div className={`p-2 rounded-lg transition-all ${
                        isActive
                          ? "bg-[#008080] text-white" 
                          : "bg-gray-100 text-[#008080]"
                      }`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      {expanded && (
                        <motion.div
                          className="flex-1 ml-3"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <span className={`font-medium`}>{item.name}</span>
                        </motion.div>
                      )}
                      {isActive && expanded && (
                        <motion.div 
                          className="w-2 h-2 bg-[#008080] rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 }}
                        />
                      )}
                    </motion.div>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* Logout Button */}
      <div className="p-3 border-t border-gray-100 bg-white">
        <motion.button
          whileHover={{ 
            scale: 1.03,
            backgroundColor: "#f8f8f8"
          }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className={`flex items-center p-3 rounded-lg text-gray-700 font-medium transition-all duration-200 ${
            expanded ? "w-full justify-between hover:bg-gray-100" : "w-full justify-center hover:bg-gray-100"
          }`}
        >
          <div className="flex items-center">
            <LogOut className="w-5 h-5 text-gray-500" />
            {expanded && <span className="ml-3">Keluar</span>}
          </div>
          {expanded && (
            <span className="text-xs text-gray-400">
              v1.0.0
            </span>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default DashboardSidebar;