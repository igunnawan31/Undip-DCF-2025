import { supabase } from "./init";

export async function addData(tableName : string , data : any , callback : Function) {
    console.log(data)
    try {
        const res = await supabase.from(tableName).insert(data);
        console.log(res)
        if(res.error) {
            callback(false , res.error);
        } else {
            callback(true , res.data);
        }
    } catch (error) {
        callback(false , error);
    }
}

export async function RetrieveData(tableName : string , data : any , callback : Function) {
    try {
        const res = await supabase.from(tableName).select(data);
        if(res.error) {
            callback(false , res.error);
        } else {
            callback(true , res.data);
        }
    } catch (error) {
        callback(false , error);
    }
}

export async function RetrieveDataById(tableName: string, id: string) {
    const { data, error } = await supabase.from(tableName).select("*").eq("id", id).single();

    if (error) {
        console.error("Error fetching data by ID:", error.message);
        throw new Error(error.message);
    }

    return data;
}

/**
 * Mengambil data berdasarkan field tertentu dan nilai yang dicari.
 */
export async function RetrieveDataByField(tableName: string, field: string, value: any) {
    const { data, error } = await supabase.from(tableName).select("*").eq(field, value);

    if (error) {
        console.error(`Error fetching data by field ${field}:`, error.message);
        throw new Error(error.message);
    }

    return data;
}