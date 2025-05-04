import PaymentOlimpiadeView from "../../payment/olimpiade";
import DashboardSidebar from "@/components/fragment/sidebar/dashboard";

const DashboardOlimpiadeView = () => {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <DashboardSidebar />
            <div className="flex-1 ml-72"> {/* Adjust margin to match sidebar width */}
                <div className="p-8">
                    <PaymentOlimpiadeView />
                </div>
            </div>
        </div>
    );
};

export default DashboardOlimpiadeView;