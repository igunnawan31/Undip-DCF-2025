import { addData, RetrieveDataByField } from "@/lib/supabase/services";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (req : NextApiRequest , res : NextApiResponse){
    if (req.method === 'POST'){
        const data = req.body;
        console.log(data);
        const existtingEmail = await RetrieveDataByField("pendaftar_seminar" , "email" , data.email);
        if(existtingEmail.length > 0){
            res.status(401).json({statusCode : 400 , message : "Email Sudah Terdaftar"});
        } else {
            await addData("pendaftar_seminar" , data , (status : boolean , data : any) => {
                if(status){
                    res.status(200).json({statusCode : 200 , message : "Register Succes"});
                } else {
                    res.status(400).json({statusCode : 400 , message : "Register Failed"});
                }
            })
        }
    }
}