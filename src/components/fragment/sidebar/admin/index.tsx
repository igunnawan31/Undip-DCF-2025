import { motion } from "framer-motion";
import { BookText, GraduationCap, Presentation, LogOut, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SidebarAdmin = () => {
  const { data: session } = useSession();
  const [dataSession, setDataSession] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (session) {
      setDataSession(session);
    }
  }, [session]);

  useEffect(() => {
    // Cek setelah dataSession terisi
    if (dataSession && dataSession.user?.role !== 'admin') {
      router.push('/');
    }
  }, [dataSession, router]);

  // Jika belum ada dataSession atau bukan admin, jangan render sidebar
  if (!dataSession || dataSession.user?.role !== 'admin') {
    return null;
  }

  const menuItems = [
    { name: "Olimpiade", icon: GraduationCap, href: "/admin/olimpiade" },
    { name: "LKTI", icon: BookText, href: "/admin/lkti" },
    { name: "Seminar", icon: Presentation, href: "/admin/seminar" },
    { name: "User Management", icon: Users, href: "/admin/user" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-screen w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#008080] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">D</span>
          </div>
          <h1 className="text-xl font-bold text-[#008080]">Admin Panel</h1>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link href={item.href} key={item.name}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                pathname === item.href
                  ? "bg-[#008080]/10 text-[#008080]"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span className="font-medium">{item.name}</span>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default SidebarAdmin;