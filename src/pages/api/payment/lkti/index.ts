import { addData, RetrieveDataByField, UpdateData } from "@/lib/supabase/services";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req : NextApiRequest , res : NextApiResponse) {
    if(req.method === "POST") {
        const data = req.body;
        console.log(data);
        const data_email = await RetrieveDataByField("pendaftar_lkti" , "leader_email" , data.leader_email);
        if(data_email.length > 0) {
            res.status(401).json({statusCode : 400 , message : "Email Sudah Terdaftar"});
            console.log("jalan")
        } else {
            await addData("pendaftar_lkti" , data , (status : boolean , data : any) => {
                console.log("jalan")
                console.log(data)
                console.log(status)
                if(status) {
                    res.status(200).json({statusCode : 200 , message : "Register Succes" } );
                } else {
                    res.status(400).json({statusCode : 400 , message : "Register Failed"});
                }
            })
        }
        
    } else if (req.method === "GET"){
        const {id} = req.query;
        const data = await RetrieveDataByField("pendaftar_lkti" , "idAccount" , id as string )
        if (data.length > 0) {
            res.status(200).json({statusCode : 200 , message : "Retrieve Data Success" , data : data[0]});
        } else {
            res.status(400).json({statusCode : 400 , message : "Retrieve Data Failed"});
        }
    } else if (req.method === "PUT") {
        const data = req.body;
        const {id} = req.query;
        await UpdateData("pendaftar_lkti" , id as string , data , (status : boolean , data : any) => {
            if(status) {
                res.status(200).json({statusCode : 200 , message : "Register Succes"});
            } else {
                res.status(400).json({statusCode : 400 , message : "Register Failed"});
            }
        })
    }
}