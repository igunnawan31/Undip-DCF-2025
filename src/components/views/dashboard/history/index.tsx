import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import DashboardSidebar from "@/components/fragment/sidebar/dashboard";

type PendaftarLKTI = {
  id: number;
  team_name: string;
  leader_name: string;
  leader_email: string;
  leader_phone: string;
  institution: string;
  member1: string;
  member2?: string;
  member3?: string;
  member4?: string;
  member5?: string;
  work_title: string;
  abstract_url: string;
  full_paper_url: string;
  payment_proof_url: string;
  twibbon_url: string;
  isverified: boolean;
  idAccount: string;
  ktm_leader: string;
  ktm_member1: string;
  ktm_member2?: string | null;
  ktm_member3?: string | null;
  ktm_member4?: string | null;
  ktm_member5?: string | null;
};

interface Participant {
  id: number;
  nama_lengkap?: string;
  email?: string;
  no_hp?: string;
  nama_instansi?: string;
  proof_url?: string;
  twibbon_url: string;
  ktp_url?: string;
  isverified: boolean;
}

const HistoryView = () => {
  const { data: session } = useSession();
  const [sessionId, setSessionId] = useState<string>("");
  const [formHistoryOlimpiade, setFormHistoryOlimpiade] = useState<Participant[]>([]);
  const [formHistoryLKTI, setFormHistoryLKTI] = useState<PendaftarLKTI[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [formType, setFormType] = useState<"olimpiade" | "lkti" | null>(null);

  useEffect(() => {
    if ((session?.user as any)?.id) {
      setSessionId((session?.user as any).id);
    }
  }, [session]);

  const getFormHistoryById = async (id: string) => {
    try {
      const res = await fetch(`/api/history?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        const data = await res.json();
        return data;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    if (sessionId) {
      setIsLoading(true);
      getFormHistoryById(sessionId)
        .then((data) => {
          if (data?.jenis === "olimpiade") {
            setFormHistoryOlimpiade(data.data);
            setFormType("olimpiade");
          } else if (data?.jenis === "lkti") {
            setFormHistoryLKTI(data.data);
            setFormType("lkti");
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [sessionId]);

  console.log(formHistoryOlimpiade);
  console.log(formHistoryLKTI);

  const renderOlimpiadeView = (participant: Participant) => (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-200">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 md:mb-0">Olimpiade Registration</h2>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          participant.isverified ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
        }`}>
          {participant.isverified ? "Verified" : "Pending Verification"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">Personal Information</h3>
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Full Name</span>
              <span className="font-medium">{participant.nama_lengkap}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Email</span>
              <span className="font-medium">{participant.email}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Phone Number</span>
              <span className="font-medium">{participant.no_hp}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Institution</span>
              <span className="font-medium">{participant.nama_instansi}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">Documents</h3>
          <div className="grid grid-cols-2 gap-4">
            {participant.twibbon_url && (
              <DocumentCard 
                title="Twibbon" 
                url={participant.twibbon_url} 
                icon={
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                } 
              />
            )}
            {participant.ktp_url && (
              <DocumentCard 
                title="KTM" 
                url={participant.ktp_url} 
                icon={
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                } 
              />
            )}
            {participant.proof_url && (
              <DocumentCard 
                title="Payment Proof" 
                url={participant.proof_url} 
                icon={
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                } 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderLKTIDetails = (team: PendaftarLKTI) => (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-200">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">LKTI Team Registration</h2>
          <p className="text-gray-600">{team.work_title}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          team.isverified ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
        }`}>
          {team.isverified ? "Verified" : "Pending Verification"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        <div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">Team Information</h3>
            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 mb-1">Team Name</span>
                <span className="font-medium">{team.team_name}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 mb-1">Institution</span>
                <span className="font-medium">{team.institution}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">Leader Information</h3>
            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 mb-1">Name</span>
                <span className="font-medium">{team.leader_name}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 mb-1">Email</span>
                <span className="font-medium">{team.leader_email}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 mb-1">Phone</span>
                <span className="font-medium">{team.leader_phone}</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">Team Members</h3>
          <div className="space-y-4">
            {[
              { name: team.member1, ktm: team.ktm_member1 },
              { name: team.member2, ktm: team.ktm_member2 },
              { name: team.member3, ktm: team.ktm_member3 },
              { name: team.member4, ktm: team.ktm_member4 },
              { name: team.member5, ktm: team.ktm_member5 }
            ]
              .filter(member => member.name)
              .map((member, index) => (
                <div key={index} className="flex flex-col pb-4 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center mb-2">
                    <span className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-800 rounded-full text-xs font-medium mr-3">
                      {index + 1}
                    </span>
                    <span className="font-medium">{member.name}</span>
                  </div>
                  {member.ktm && (
                    <div className="ml-9">
                      <DocumentLink 
                        url={member.ktm} 
                        label="View KTM" 
                        size="sm" 
                      />
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">Documents</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {team.ktm_leader && (
            <DocumentCard 
              title="Leader KTM" 
              url={team.ktm_leader} 
              icon={
                <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              } 
            />
          )}
          {team.abstract_url && (
            <DocumentCard 
              title="Abstract" 
              url={team.abstract_url} 
              icon={
                <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              } 
            />
          )}
          {team.full_paper_url && (
            <DocumentCard 
              title="Full Paper" 
              url={team.full_paper_url} 
              icon={
                <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              } 
            />
          )}
          {team.payment_proof_url && (
            <DocumentCard 
              title="Payment Proof" 
              url={team.payment_proof_url} 
              icon={
                <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              } 
            />
          )}
          {team.twibbon_url && (
            <DocumentCard 
              title="Twibbon" 
              url={team.twibbon_url} 
              icon={
                <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              } 
            />
          )}
        </div>
      </div>
    </div>
  );

  const DocumentCard = ({ title, url, icon }: { title: string; url: string; icon: React.ReactNode }) => (
    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:border-blue-300 transition-colors">
      <div className="flex items-center mb-1">
        {icon}
        <span className="text-sm text-gray-500">{title}</span>
      </div>
      <DocumentLink url={url} />
    </div>
  );

  const DocumentLink = ({ url, label = "View File", size = "base" }: { url: string; label?: string; size?: "sm" | "base" }) => (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`text-blue-600 hover:text-blue-800 hover:underline ${size === "sm" ? "text-xs" : "text-sm"} font-medium flex items-center mt-1`}
    >
      <svg className={`${size === "sm" ? "w-3 h-3" : "w-4 h-4"} mr-1`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
      {label}
    </a>
  );

  if (isLoading) {
    return (
      <div className="flex flex-col">
        <DashboardSidebar />
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="mb-8 text-center">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-48 mx-auto animate-pulse"></div>
          </div>
          <div className="space-y-6">
            <div className="h-40 bg-gray-200 rounded-xl animate-pulse"></div>
            <div className="h-40 bg-gray-200 rounded-xl animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <DashboardSidebar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Registration History</h1>
          <p className="text-gray-600">View your submitted registration details</p>
        </div>

        {formHistoryOlimpiade.length > 0 ? (
          formHistoryOlimpiade.map((participant) => (
            renderOlimpiadeView(participant)
          ))
        ) : formHistoryLKTI.length > 0 ? (
          formHistoryLKTI.map((team) => (
            renderLKTIDetails(team)
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-md p-8 text-center border border-gray-200">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Registration Found</h3>
            <p className="text-gray-600 mb-6">You havent submitted any registration form yet.</p>
            <a 
              href="/registration" 
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Register Now
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryView;