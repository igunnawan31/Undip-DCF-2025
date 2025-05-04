import { addData, RetrieveDataByField, UpdateData } from "@/lib/supabase/services";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req : NextApiRequest , res : NextApiResponse) {
    if(req.method === "POST") {
        const data = req.body;
        console.log(data);
        const data_email = await RetrieveDataByField("pendaftar_olimpiade" , "email" , data.email);
        if(data_email.length > 0) {
            res.status(401).json({statusCode : 400 , message : "Email Sudah Terdaftar"});
            console.log("jalan")
        } else {
            await addData("pendaftar_olimpiade" , data , (status : boolean , data : any) => {
                console.log("jalan")
                if(status) {
                    res.status(200).json({statusCode : 200 , message : "Register Succes"});
                } else {
                    res.status(400).json({statusCode : 400 , message : "Register Failed"});
                }
            })
        }
        
    } else if (req.method === "PUT"){
        const data = req.body;
        console.log(data);
        await UpdateData("pendaftar_olimpiade" , data.id , data , (status : boolean , data : any) => {
            if(status) {
                res.status(200).json({statusCode : 200 , message : "Register Succes"});
                console.log("jalan")
            } else {
                res.status(400).json({statusCode : 400 , message : "Register Failed"});
                console.log("jalan")
            }
        })
    }
}