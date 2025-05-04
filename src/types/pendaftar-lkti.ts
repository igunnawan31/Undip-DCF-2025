type PendaftarLKTI = {
    leaderName: string;
    leaderEmail: string;
    leaderPhone: string;
    member1: string;
    member2?: string;
    member3?: string;
    member4?: string;
    member5?: string;
    institution: string;
    workTitle: string;
    abstract: File | null;
    fullPaper: File | null;
    paymentProof: File | null;
    twibbon: File | null;
};

export default PendaftarLKTI;