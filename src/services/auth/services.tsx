import { RetrieveDataByField } from "@/lib/supabase/services";

export async function SignIn(email : string){
    const data = await RetrieveDataByField("users" , "email" , email);
    if (!data || data.length === 0) {
        console.log("No user found with email:", email);
        return null;
    }
    console.log(data[0])
    return data[0];
}