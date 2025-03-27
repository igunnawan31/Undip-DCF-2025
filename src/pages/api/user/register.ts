import { addData } from "@/lib/supabase/services";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req : NextApiRequest , res : NextApiResponse) {
    if(req.method === "POST") {
        const userData = req.body;
        console.log(userData)
        const data ={
            email : userData.email ,
            password : await bcrypt.hash(userData.password , 10)
        }
        await addData("users" , data , (status : boolean , data : any) => {
            if(status) {
                res.status(200).json({statusCode : 200 , message : "Register Succes"});
            } else {
                res.status(400).json({statusCode : 400 , message : "Register Failed"});
            }
            console.log(status)
        })
    }
} 