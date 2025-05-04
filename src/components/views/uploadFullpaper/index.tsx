import { uploadFullpaperAndGetUrl, uploadFileAndGetUrlForPayment } from "@/lib/supabase/services";
import { useSession } from "next-auth/react";
import { useState, useEffect, ChangeEvent } from "react";
import { FileText, Upload, CheckCircle, AlertCircle, Loader, X, CreditCard } from "lucide-react";
import DashboardSidebar from "@/components/fragment/sidebar/dashboard";
import { Landmark, WalletCards, Banknote, ClipboardCopy , Info } from 'lucide-react';

interface User {
  id: string;
  // add other user properties as needed
}

interface SessionData {
  user: User;
  // add other session properties as needed
}

interface FormLKTI {
  team_name?: string;
  full_paper_url?: string;
  payment_proof_url?: string;
  payment_status?: string;
  // add other form properties as needed
}

const bankList = [
  { 
    name: "Bank BRI", 
    number: "0038 0116 3600 500", 
    account: "Karini",
    icon: <Landmark className="text-blue-600" />,
    color: "bg-blue-100"
  },
  { 
    name: "Gopay", 
    number: "089682004507", 
    account: "Desvita Tri Anggraeni",
    icon: <WalletCards className="text-green-600" />,
    color: "bg-green-100"
  },
  { 
    name: "OVO", 
    number: "089682004507", 
    account: "kahini/Desvita",
    icon: <Banknote className="text-violet-400" />,
    color: "bg-violet-400"
  },
  { 
    name: "Shopeepay", 
    number: "081292252275", 
    account: "Anggita Novarinda",
    icon: <Landmark className="text-yellow-600" />,
    color: "bg-yellow-100"
  },
];

const UploadFullpaperViews = () => {
  const { data: session } = useSession() as { data: SessionData | null };
  const [formLKTI, setFormLKTI] = useState<FormLKTI | null>(null);
  const [formLKTIId, setFormLKTIId] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingPayment, setIsUploadingPayment] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedPaymentFile, setSelectedPaymentFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [paymentUploadProgress, setPaymentUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [paymentUploadSuccess, setPaymentUploadSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  

  const checkForm = async (id: string | undefined) => {
    if (!id) {
      setIsLoading(false);
      return null;
    }
    
    try {
      const res = await fetch(`/api/payment/lkti?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (res.status === 200) {
        const data = await res.json();
        return data.data;
      } else if (res.status === 401) {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size exceeds the 5MB limit. Please choose a smaller file.");
        return;
      }
      // Check file type
      const validTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      if (!validTypes.includes(file.type)) {
        setError("Invalid file type. Please upload a PDF or Word document.");
        return;
      }
      setSelectedFile(file);
    }
  };

  const handlePaymentFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPaymentError(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setPaymentError("File size exceeds the 5MB limit. Please choose a smaller file.");
        return;
      }
      // Check file type
      const validTypes = ["image/jpeg", "image/png", "application/pdf"];
      if (!validTypes.includes(file.type)) {
        setPaymentError("Invalid file type. Please upload a JPG, PNG, or PDF.");
        return;
      }
      setSelectedPaymentFile(file);
    }
  };

  const handleSubmitAll = async () => {
    if (!selectedFile || !selectedPaymentFile || !session?.user?.id || !formLKTI?.team_name) {
      setSubmitError('Please upload both payment proof and full paper before submitting');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setHasSubmitted(true)

    try {
      // Upload payment proof first
      setIsUploadingPayment(true);
      const payment_proof_url = await uploadFileAndGetUrlForPayment(selectedPaymentFile, "lkti", formLKTI.team_name);
      
      // Then upload full paper
      setIsUploading(true);
      const fullpaper_url = await uploadFullpaperAndGetUrl(selectedFile, formLKTI.team_name);

      // Update the form data
      const data = {
        ...formLKTI,
        payment_proof_url: payment_proof_url,
        full_paper_url: fullpaper_url
      };

      console.log(data)

      const res = await fetch(`/api/payment/lkti?id=${formLKTIId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (res.status === 200) {
        const updatedData = await res.json();
        setFormLKTI(updatedData.data);
        setSubmitSuccess(true);
        setUploadSuccess(true);
        setPaymentUploadSuccess(true);
        
        // Refresh the data
        const refreshedData = await checkForm(session.user.id);
        if (refreshedData) {
          setFormLKTI(Array.isArray(refreshedData) ? refreshedData[0] : refreshedData);
        }
      } else {
        setSubmitError('Failed to submit documents. Please try again.');
        setHasSubmitted(false)
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError('Failed to submit documents. Please try again.');
      setHasSubmitted(false)
      
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
      setIsUploadingPayment(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.id) {
        try {
          const data = await checkForm(session.user.id);
          if (data) {
            setFormLKTI(Array.isArray(data) ? data[0] : data);
            setFormLKTIId(Array.isArray(data) ? data[0].id : data.id);
          }
        } catch (error) {
          console.error("Error fetching form data:", error);
        }
      }
      setIsLoading(false);
    };
    
    fetchData();
  }, [session]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-10 min-h-[300px]">
        <div className="flex flex-col items-center space-y-4">
          <Loader className="animate-spin text-teal-500" size={36} />
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="max-w-3xl mx-auto p-4 md:p-6 bg-white rounded-md shadow-sm">
        <h2 className="text-xl md:text-2xl font-bold text-teal-600 mb-4">Upload Full Paper</h2>
        <div className="bg-gray-50 border border-gray-200 p-4 md:p-6 rounded-md">
          <div className="flex flex-col md:flex-row items-start">
            <AlertCircle className="text-orange-500 mb-3 md:mb-0 md:mr-4 flex-shrink-0" size={24} />
            <div>
              <h3 className="text-base md:text-lg font-semibold text-gray-800">Authentication Required</h3>
              <p className="mt-2 text-sm md:text-base text-gray-600">Please sign in to access the Full Paper submission section.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!formLKTI) {
    return (
      <div className="max-w-3xl mx-auto p-4 md:p-6 bg-white rounded-md shadow-sm">
        <h2 className="text-xl md:text-2xl font-bold text-teal-600 mb-4">Upload Full Paper</h2>
        <div className="bg-gray-50 border border-gray-200 p-4 md:p-6 rounded-md">
          <div className="flex flex-col md:flex-row items-start">
            <AlertCircle className="text-orange-500 mb-3 md:mb-0 md:mr-4 flex-shrink-0" size={24} />
            <div>
              <h3 className="text-base md:text-lg font-semibold text-gray-800">Registration Required</h3>
              <p className="mt-2 text-sm md:text-base text-gray-600">You need to complete your LKTI registration form before submitting the full paper.</p>
              <button 
                className="mt-4 bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 md:py-2.5 md:px-5 rounded-md transition duration-200 inline-flex items-center text-sm md:text-base"
                onClick={() => window.location.href = "/dashboard/lkti"}
              >
                Daftar Sekarang
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (formLKTI.full_paper_url && formLKTI.payment_proof_url && formLKTI.payment_status === 'verified') {
    return (
      <div className="flex flex-col md:flex-row min-h-screen">
        <DashboardSidebar />
        <div className="flex-1 p-4 md:p-8">
          <div className="max-w-3xl mx-auto bg-white rounded-md shadow-sm">
            <div className="text-center py-6 md:py-8">
              <h2 className="text-xl md:text-2xl font-bold text-teal-600">Submission Complete</h2>
              <div className="w-16 h-1 bg-orange-500 mx-auto mt-2 mb-3 md:mb-4"></div>
              <p className="text-sm md:text-base text-gray-600">Your submission and payment are complete</p>
            </div>
            
            <div className="px-4 md:px-6 pb-6 md:pb-8">
              <div className="bg-green-50 border border-green-200 rounded-md p-6 mb-6">
                <div className="flex items-start">
                  <CheckCircle className="text-green-500 mt-1 mr-4 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Submission Successful</h3>
                    <p className="text-gray-700 mb-4">
                      Your team <span className="font-semibold">{formLKTI.team_name}</span> has successfully submitted the full paper and payment proof.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a 
                        href={formLKTI.full_paper_url} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-200 text-sm"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        View Submitted Paper
                      </a>
                      <a 
                        href={formLKTI.payment_proof_url} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-200 text-sm"
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        View Payment Proof
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md border-l-4 border-orange-500">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Note:</span> If you need to modify your submission after uploading, please contact the committee at <a href="mailto:lkti@example.com" className="text-teal-600 hover:underline">lkti@example.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-3xl mx-auto bg-white rounded-md shadow-sm">
          <div className="text-center py-6 md:py-8">
            <h2 className="text-xl md:text-2xl font-bold text-teal-600">Submission Portal</h2>
            <div className="w-16 h-1 bg-orange-500 mx-auto mt-2 mb-3 md:mb-4"></div>
            <p className="text-sm md:text-base text-gray-600">Upload full paper and payment proof for LKTI DCF 2025</p>
          </div>
          
          <div className="px-4 md:px-6 pb-6 md:pb-8">
            {/* Team Information Section */}
            <div className="mb-6 md:mb-8">
              <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4">Team Information</h3>
              <div className="bg-gray-50 p-4 md:p-5 rounded-md border border-gray-200">
                <div className="mb-2">
                  <span className="text-xs md:text-sm text-gray-500">Team Name:</span>
                  <p className="font-medium text-gray-800 text-sm md:text-base">{formLKTI.team_name || "N/A"}</p>
                </div>
              </div>
            </div>
  
            {/* Payment Proof Section - Diubah agar konsisten dengan Full Paper Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <CreditCard className="text-teal-500 mr-2" size={20} />
                Payment Proof Submission
              </h3>

              {paymentError && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4 flex items-start">
                  <AlertCircle className="text-red-500 mt-0.5 mr-3 flex-shrink-0" size={18} />
                  <div className="text-sm text-red-700">{paymentError}</div>
                  <button onClick={() => setPaymentError(null)} className="ml-auto text-red-500 hover:text-red-700">
                    <X size={18} />
                  </button>
                </div>
              )}
              
              {formLKTI.payment_proof_url ? (
                <div className="bg-green-50 border border-green-200 rounded-md p-6 mb-6">
                  <div className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-4 flex-shrink-0" size={24} />
                    <div>
                      <h3 className="text-lg font-semibold text-green-800 mb-2">
                        Payment Proof Submitted
                      </h3>
                      <p className="text-gray-700 mb-4">
                        {formLKTI.payment_status === 'verified' 
                          ? 'Your payment has been verified by our team.' 
                          : 'Your payment proof has been successfully submitted and is awaiting verification.'}
                      </p>
                      <a 
                        href={formLKTI.payment_proof_url} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-200 text-sm"
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        View Payment Proof
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <div className="flex items-center mb-6">
                      <CreditCard className="text-teal-600 mr-3" size={28} />
                      <h3 className="text-2xl font-bold text-gray-800">Payment Information</h3>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                          <Landmark className="text-teal-600 mr-2" />
                          Available Bank Transfers
                        </h4>
                        
                        <p className="text-gray-600 mb-6">Please transfer to one of our official bank accounts:</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {bankList.map((bank, index) => (
                            <div key={index} className={`${bank.color} p-4 rounded-lg border transition-all hover:shadow-md hover:border-teal-300`}>
                              <div className="flex items-start">
                                <div className="p-3 rounded-full bg-white shadow-sm mr-4">
                                  {bank.icon}
                                </div>
                                <div className="flex-1">
                                  <div className="font-bold text-gray-800">{bank.name}</div>
                                  <div className="mt-3 space-y-2">
                                    <div className="flex items-center text-sm">
                                      <span className="font-medium text-gray-600 mr-2">Account:</span>
                                      <span className="text-gray-800">{bank.account}</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                      <span className="font-medium text-gray-600 mr-2">Number:</span>
                                      <span className="font-mono text-gray-800">{bank.number}</span>
                                      <button 
                                        onClick={() => {
                                          navigator.clipboard.writeText(bank.number);
                                          // Tambahkan notifikasi copy jika perlu
                                        }}
                                        className="ml-2 text-teal-600 hover:text-teal-800 transition-colors"
                                        title="Copy account number"
                                      >
                                        <ClipboardCopy className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded-r-lg mb-4">
                        <div className="flex">
                          <AlertCircle className="text-teal-600 mt-0.5 mr-3 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-1">Payment Instructions</h4>
                            <p className="text-sm text-gray-700">
                              Use <span className="font-bold">{formLKTI.team_name || 'your team name'}</span> as transfer reference
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 flex items-start">
                        <Info className="text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                        <p className="text-sm text-blue-800">
                          Payment verification takes 1-2 business days. Youll receive confirmation email once processed.
                        </p>
                      </div>  
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-base md:text-lg font-semibold text-gray-800 mb-3">Upload Payment Proof</h4>
                    <div className="bg-gray-50 p-4 md:p-5 rounded-md border border-gray-200">
                      <div className="border-2 border-dashed border-gray-300 rounded-md p-6 md:p-8 flex flex-col items-center justify-center">
                        <CreditCard className="text-teal-500 mb-3" size={36} />
                        <p className="text-gray-700 mb-3 md:mb-4 text-center text-sm md:text-base">
                          Upload screenshot or scan of your payment receipt
                        </p>
                        
                        <input
                          type="file"
                          id="payment-upload"
                          accept="image/*,.pdf"
                          onChange={handlePaymentFileChange}
                          className="hidden"
                        />
                        
                        <label
                          htmlFor="payment-upload"
                          className="cursor-pointer bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 md:py-2.5 md:px-6 rounded-md transition duration-200 text-sm md:text-base"
                        >
                          Browse Files
                        </label>
                        
                        <div className="mt-2 md:mt-3 text-xs md:text-sm text-gray-500">
                          Accepted formats: JPG, PNG, PDF (Max 5MB)
                        </div>
                      </div>
                      
                      {selectedPaymentFile && (
                        <div className="mt-4 bg-gray-100 p-3 md:p-4 rounded-md flex items-center">
                          <FileText className="text-teal-500 mr-3" size={20} />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-700 truncate">{selectedPaymentFile.name}</div>
                            <div className="text-xs text-gray-500">
                              {(selectedPaymentFile.size / (1024 * 1024)).toFixed(2)} MB
                            </div>
                          </div>
                          <button
                            onClick={() => setSelectedPaymentFile(null)}
                            className="text-gray-500 hover:text-gray-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
  
            {/* Full Paper Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FileText className="text-teal-500 mr-2" size={20} />
                Full Paper Submission
              </h3>
  
              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4 flex items-start">
                  <AlertCircle className="text-red-500 mt-0.5 mr-3 flex-shrink-0" size={18} />
                  <div className="text-sm text-red-700">{error}</div>
                  <button onClick={() => setError(null)} className="ml-auto text-red-500 hover:text-red-700">
                    <X size={18} />
                  </button>
                </div>
              )}
              
              {formLKTI.full_paper_url ? (
                <div className="bg-green-50 border border-green-200 rounded-md p-6 mb-6">
                  <div className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-4 flex-shrink-0" size={24} />
                    <div>
                      <h3 className="text-lg font-semibold text-green-800 mb-2">Paper Submitted</h3>
                      <p className="text-gray-700 mb-4">
                        Your full paper has been successfully submitted.
                      </p>
                      <a 
                        href={formLKTI.full_paper_url} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-200 text-sm"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        View Submitted Paper
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-6 md:mb-8">
                    <h4 className="text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4">Upload Full Paper</h4>
                    
                    <div className="bg-gray-50 p-4 md:p-5 rounded-md border border-gray-200">
                      <div className="border-2 border-dashed border-gray-300 rounded-md p-6 md:p-8 flex flex-col items-center justify-center">
                        <FileText className="text-teal-500 mb-3" size={36} />
                        <p className="text-gray-700 mb-3 md:mb-4 text-center text-sm md:text-base">
                          Drag and drop your file here, or click to browse
                        </p>
                        
                        <input
                          type="file"
                          id="file-upload"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        
                        <label
                          htmlFor="file-upload"
                          className="cursor-pointer bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 md:py-2.5 md:px-6 rounded-md transition duration-200 text-sm md:text-base"
                        >
                          Browse Files
                        </label>
                        
                        <div className="mt-2 md:mt-3 text-xs md:text-sm text-gray-500">
                          Accepted formats: PDF, DOC, DOCX (Max 5MB)
                        </div>
                      </div>
                      
                      {selectedFile && (
                        <div className="mt-4 bg-gray-100 p-3 md:p-4 rounded-md flex items-center">
                          <FileText className="text-teal-500 mr-3" size={20} />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-700 truncate">{selectedFile.name}</div>
                            <div className="text-xs text-gray-500">
                              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                            </div>
                          </div>
                          <button
                            onClick={() => setSelectedFile(null)}
                            className="text-gray-500 hover:text-gray-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
              
              <div className="mt-4 md:mt-6 text-xs md:text-sm bg-gray-50 p-3 md:p-4 rounded-md border-l-4 border-orange-500">
                <p className="text-gray-700">
                  <span className="font-semibold">Important:</span> Ensure your full paper complies with the competition guidelines before uploading.
                </p>
              </div>
            </div>
  
            {/* Combined Submit Section */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              {submitError && (
                <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-4 flex items-start">
                  <AlertCircle className="text-red-500 mt-0.5 mr-3 flex-shrink-0" size={18} />
                  <div className="text-sm text-red-700">{submitError}</div>
                  <button onClick={() => setSubmitError(null)} className="ml-auto text-red-500 hover:text-red-700">
                    <X size={18} />
                  </button>
                </div>
              )}
  
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="text-sm text-gray-600">
                  {!selectedPaymentFile && !selectedFile && (
                    <p>Please upload both payment proof and full paper to submit</p>
                  )}
                  {selectedPaymentFile && !selectedFile && (
                    <p>Please upload your full paper to complete submission</p>
                  )}
                  {!selectedPaymentFile && selectedFile && (
                    <p>Please upload your payment proof to complete submission</p>
                  )}
                  {selectedPaymentFile && selectedFile && (
                    <p className="text-green-600">Ready to submit both documents</p>
                  )}
                </div>
  
                <button
                  onClick={handleSubmitAll}
                  disabled={hasSubmitted || !selectedPaymentFile || !selectedFile || isSubmitting}
                  className={`w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-6 rounded-md text-white font-medium text-base
                  ${hasSubmitted || !selectedPaymentFile || !selectedFile || isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-teal-500 to-orange-500 hover:from-teal-600 hover:to-orange-600'} transition duration-200`}
                >
                  {hasSubmitted ? (
                    <>
                      <CheckCircle className="text-white" size={20} />
                      Submitted Successfully
                    </>
                  ) : isSubmitting ? (
                    <>
                      <Loader className="animate-spin" size={20} />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit All Documents
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadFullpaperViews;