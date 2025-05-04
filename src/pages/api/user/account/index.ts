import { RetrieveDataById } from "@/lib/supabase/services";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req : NextApiRequest , res : NextApiResponse) {
    if(req.method === "GET") {
        const {id} = req.query;
        const data = await RetrieveDataById("users" , id as string )
        if (data.length > 0) {
            res.status(200).json({statusCode : 200 , message : "Retrieve Data Success" , data : data[0]});
        } else {
            res.status(400).json({statusCode : 400 , message : "Retrieve Data Failed"});
        }
    }
}