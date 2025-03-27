import { RetrieveDataByField } from "@/lib/supabase/services";

export async function SignIn(email : string){
    const data = await RetrieveDataByField("users" , "email" , email);
    console.log(data)
    return data[0];
}