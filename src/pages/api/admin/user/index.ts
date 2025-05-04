import { DeleteData, RetrieveData , RetrieveDataById, UpdateData } from "@/lib/supabase/services";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req : NextApiRequest , res : NextApiResponse) {
    if(req.method === "GET") {
        const {id} = req.query
        if (id !== undefined) {
            const data = await RetrieveDataById("users" , id as string )
            if (data.length > 0) {
                res.status(200).json({statusCode : 200 , message : "Retrieve Data Success" , data : data[0]});
            } else {
                res.status(400).json({statusCode : 400 , message : "Retrieve Data Failed"});
            }
        } else {
            const data = await RetrieveData("users" , (status : boolean , data : any) => {
                if(status) {
                    res.status(200).json({statusCode : 200 , message : "Retrieve Data Success" , data : data});
                } else {
                    res.status(400).json({statusCode : 400 , message : "Retrieve Data Failed"});
                }
            })
        }
        
    } else if (req.method === "PUT") {
        const {id} = req.query;
        const data = req.body;
        await UpdateData("users" , id as string , data , (status : boolean , data : any) => {
            if(status) {
                res.status(200).json({statusCode : 200 , message : "Update Data Success"});
            } else {
                res.status(400).json({statusCode : 400 , message : "Update Data Failed"});
            }
        })
    } else if (req.method === "DELETE") {
        const {id} = req.query;
        await DeleteData("users" , id as string , (status : boolean , data : any) => {
            if(status) {
                res.status(200).json({statusCode : 200 , message : "Delete Data Success"});
            } else {
                res.status(400).json({statusCode : 400 , message : "Delete Data Failed"});
            }
        })
    }
}