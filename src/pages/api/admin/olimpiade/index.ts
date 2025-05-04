import { DeleteData, RetrieveData, RetrieveDataById, UpdateData } from "@/lib/supabase/services";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "GET") {
            const { id } = req.query;
            
            if (id === undefined) {
                // Handle get all data
                RetrieveData("pendaftar_olimpiade", (status: boolean, data: any) => {
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
                const data = await RetrieveDataById("pendaftar_olimpiade", participantId);
                
                if (data) {
                    res.status(200).json({ 
                        statusCode: 200, 
                        message: "Retrieve Data Success", 
                        data: data 
                    });
                } else {
                    res.status(404).json({ 
                        statusCode: 404, 
                        message: "Participant not found" 
                    });
                }
            }
        } 
        else if (req.method === "PUT") {
            const { id } = req.query;
            
            // Type guard untuk memastikan id adalah string
            if (!id || Array.isArray(id)) {
                return res.status(400).json({ 
                    statusCode: 400, 
                    message: "Invalid ID format" 
                });
            }

            // Pastikan body ada
            if (!req.body) {
                return res.status(400).json({ 
                    statusCode: 400, 
                    message: "Request body is required" 
                });
            }

            UpdateData(
                "pendaftar_olimpiade", 
                id, // Sekarang sudah dipastikan string
                req.body, 
                (status: boolean, data: any) => {
                    if (status) {
                        res.status(200).json({ 
                            statusCode: 200, 
                            message: "Update Data Success", 
                            data: data 
                        });
                    } else {
                        res.status(400).json({ 
                            statusCode: 400, 
                            message: "Update Data Failed" 
                        });
                    }
                }
            );
        } else if (req.method === "DELETE") {
            const { id } = req.query;
            console.log(id)
            await DeleteData("pendaftar_olimpiade", id as string, (status: boolean, data: any) => {
                if (status) {
                    res.status(200).json({ 
                        statusCode: 200, 
                        message: "Delete Data Success", 
                        data: data 
                    });
                } else {
                    res.status(400).json({
                        statusCode: 400,
                        message: "Delete Data Failed"
                })}
            })
        }
        else {
            res.status(405).json({ 
                statusCode: 405, 
                message: "Method not allowed" 
            });
        }
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ 
            statusCode: 500, 
            message: "Internal server error" 
        });
    }
}