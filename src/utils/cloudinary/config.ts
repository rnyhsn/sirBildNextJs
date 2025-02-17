import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


export const uploadFile = async (file: File, folder: string) => {

    const arrayBuffer = await file.arrayBuffer();
    const bytes = Buffer.from(arrayBuffer);

    return new Promise(async (resolve, reject) => {
        await cloudinary.uploader.upload_stream({
            resource_type: 'auto',
            folder,
        }, async (error, result) => {
            if(error) {
                reject(error);
            } else {
                resolve(result);
            }
        }).end(bytes);
    })
}


export const deleteFile = (publicId: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const resp = await cloudinary.uploader.destroy(publicId);
            resolve(resp);
        } catch (error) {  
            reject(error);
        }
    })
}

export const getFile = (publicId: string) => {
    return cloudinary.url(publicId, {
        secure: true
    })
}