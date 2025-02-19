'use server';

import { revalidatePath } from "next/cache";
import { deleteFile, uploadFile } from "../cloudinary/config";
import { connecToDB } from "../dbConnect";
import { Member } from "../models/member.model";
import { errorResponse, successResponse } from "./response";
import { redirect } from "next/navigation";


export const registerMember = async (formData: FormData) => {
    const {name, email, phone, role, designation, academy, location} = Object.fromEntries(formData);
    // console.log(file);
    let file = formData.get('file') as File
    try {
        await connecToDB();
        const existingMember = await Member.findOne({email});
        if(existingMember) {
            return errorResponse(409, `Member with this email already exists named '${existingMember.name}'`);
        }
        let imgInfo: any;
        if(file && file.size > 0) {
            if(file.size > 2*1024*1024) {
                return errorResponse(401, "Image size must not exceed 2MB");
            }
            imgInfo = await uploadFile(file, 'bild/teamMember');
        }

        let newMember = new Member({
            name,
            email,
            phone,
            role,
            designation,
            academy,
            location,
            image: imgInfo?.public_id || ""
        })
        await newMember.save();
        return successResponse(202, "Member created successfully");
    } catch (error) {
        return errorResponse();
    }
}



export const getMembers = async (role?: string) => {
    try {
        await connecToDB();
        const members = role ?  await Member.find({role}).lean() : await Member.find().lean();

        return successResponse(200, "", members);
    } catch (error) {
        return errorResponse();
    }
}


export const deleteMember = async (formData: FormData) => {
    const id = formData.get('id');
    try {
        const member = await Member.findByIdAndDelete(id);
        console.log(member);
        if(member.image) {
            await deleteFile(member.image);
        }
    } catch (error) {
        console.log(error);
    }

    revalidatePath("/dashboard/team");
    redirect("/dashboard/team");
}


export const getMember = async (id: string) => {

    try {
        await connecToDB();
        const member = await Member.findById(id).lean();

        if(!member) {
            return errorResponse(404, "Member not Found");
        }
        return successResponse(200, "Member fetched successfully", member);
    } catch (error) {
        return errorResponse();
    }
}



export const updateMember = async (formData: FormData) => {
    let dataArray = Array.from(formData.entries()).filter(([_, value]) => value !== "" && value !== null);
    let member = Object.fromEntries(dataArray);
    let file = member.file as File;
    let id = member.id;
    try {
        await connecToDB();
        
        if(file && file.size === 0) {
            delete member.file;
        }
    
        const memberExist = await Member.findById(id);

        if(!memberExist) {
            return errorResponse(404, "Member not Found");
        }

        if(file && file.size > 0) {
            // check the image size must not exceed
            if(file.size > 2*1024*1024) {
                return errorResponse(409, "Image size must not exceed 2MB");
            }

            // upload the image on cloudinary
            const fileResp: any = await uploadFile(file, "bild/teamMember");
            member.image = fileResp.public_id;

            // delete the already existing file in cloudinary and formData
            if(memberExist.image) {
                await deleteFile(memberExist.image);
            }
            delete member.file;
        }

        delete member.id;
        await Member.findByIdAndUpdate(id, member);
        console.log(member);

        return successResponse(202, "Member Updated successfully");

    } catch (error) {
        return errorResponse();
    }
}