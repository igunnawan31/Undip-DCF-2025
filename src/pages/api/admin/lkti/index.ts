import { DeleteData, RetrieveData, RetrieveDataById, UpdateData } from "@/lib/supabase/services";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (req : NextApiRequest , res : NextApiResponse){
    if(req.method === "GET") {
        const { id } = req.query;
        if (id === undefined) {
            // Handle get all data
            RetrieveData("pendaftar_lkti", (status: boolean, data: any) => {
                if (status) {
                    res.status(200).json({ 
                        statusCode: 200, 
                        message: "Retrieve Data Success", 
                        data: data 
                    });
                } else {
                    res.status(400).json({ 
                        statusCode: 400, 
                        message: "Retrieve Data Failed" 
                    });
                }
            });
        } else {
            // Handle get single data
            const participantId = Array.isArray(id) ? id[0] : id;
            const data = await RetrieveDataById("pendaftar_lkti", participantId);
            
            if (data) {
                res.status(200).json({ 
                    statusCode: 200, 
                    message: "Retrieve Data Success", 
                    data: data 
                });
            } else {
                res.status(400).json({ 
                    statusCode: 400, 
                    message: "Retrieve Data Failed" 
                });
            }
        }
    } else if (req.method === "PUT"){
        const { id } = req.query;
        const data = req.body;
        await UpdateData("pendaftar_lkti" , id as string , data , (status : boolean , data : any) => {
            if(status) {
                res.status(200).json({statusCode : 200 , message : "Update Data Successs"});
            } else {
                res.status(400).json({statusCode : 400 , message : "Update Data Failed"});
            }
        })
    } else if (req.method === "DELETE") {
        const { id } = req.query;
        await DeleteData("pendaftar_lkti" , id as string , (status : boolean , data : any) => {
            if(status) {
                res.status(200).json({statusCode : 200 , message : "Delete Data Success"});
            } else {
                res.status(400).json({statusCode : 400 , message : "Delete Data Failed"});
            }
        })
    }
}