import ContactView from "@/components/views/contact";
import Navbar from "@/components/fragment/navbar";
import Footer from "@/components/fragment/footer";
import { div } from "motion/react-client";

const ContactPage = () => {
    return (

    <div>
        <Navbar />
        <ContactView />
        <Footer />
    </div>
    )
}

export default ContactPage