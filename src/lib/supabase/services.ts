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

export async function UpdateData(
  tableName: string,
  id: string,
  data: any,
  callback: (success: boolean, result?: any) => void
) {
  console.log(data)
  console.log(id)
  console.log(tableName)
  try {
    const { data: result, error } = await supabase
      .from(tableName)
      .update(data)
      .eq('id', id)
      .select(); // Tambahkan .select() jika ingin mengembalikan data yang diupdate

    if (error) {
      console.error('Update error:', error);
      callback(false, error);
    } else {
      callback(true, result);
    }
  } catch (error) {
    console.error('Exception during update:', error);
    callback(false, error);
  }
}

export async function DeleteData(tableName : string , id : string , callback : Function) {
    try {
        const res = await supabase.from(tableName).delete().eq('id', id);
        if(res.error) {
            callback(false , res.error);
        } else {
            callback(true , res.data);
        }
    } catch (error) {
        callback(false , error);
    }
}

export async function RetrieveData(tableName : string ,  callback : Function) {
    try {
        const res = await supabase.from(tableName).select('*');
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

export const uploadFileAndGetUrlForPayment = async (file: File, fields : string , fullname : string) => {
    console.log(file)
  try {
    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `bukti-pembayaran-${fullname}-${Date.now()}.${fileExt}`;
    const filePath = `${fields}/${fileName}`;

    // Upload file to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('payment-proofs')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('payment-proofs')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const uploadTwibbonAndGetUrl = async (file: File , fields : string , fullname : String) => {
  try {
    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `twibbon-${fullname}-${Date.now()}.${fileExt}`;
    const filePath = `${fields}/${fileName}`;

    // Upload file to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('twibbon')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('twibbon')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

export const uploadAbstrakAndGetUrl = async (file : File , teamName : string) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `abstrak-${teamName}-${Date.now()}.${fileExt}`;
    const filePath = `${teamName}/${fileName}`;

    const { error: uploadError } = await supabase.storage.from('abstrak').upload(filePath , file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage.from('abstrak').getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

export const uploadFullpaperAndGetUrl = async (file : File , teamName : string) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `fullpaper-${teamName}-${Date.now()}.${fileExt}`;
    const filePath = `${teamName}/${fileName}`;

    const { error: uploadError } = await supabase.storage.from('fullpaper').upload(filePath , file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage.from('fullpaper').getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

export const uploadKTPAndGetUrl = async (file : File , teamName : string , field : string) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `ktp-${teamName}-${Date.now()}.${fileExt}`;
    const filePath = `${field}/${teamName}/${fileName}`;

    const { error: uploadError } = await supabase.storage.from('ktp').upload(filePath , file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage.from('ktp').getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading file:', error);    
    throw error;
  }
}

