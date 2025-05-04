import { RetrieveDataByField } from "@/lib/supabase/services";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req : NextApiRequest , res : NextApiResponse){
    if(req.method === "GET") {
        const {id} = req.query;
        let jenis = '' ;
        const dataOlimpiade = await RetrieveDataByField("pendaftar_olimpiade" , "idAccount" , id as string )
        const dataLKTI = await RetrieveDataByField("pendaftar_lkti" , "idAccount" , id as string )
        if (dataOlimpiade.length > 0) jenis = 'olimpiade';
        if (dataLKTI.length > 0) jenis = 'lkti';
        const data = [...dataOlimpiade , ...dataLKTI ]
        res.status(200).json({statusCode : 200 , jenis , data});
    }
}