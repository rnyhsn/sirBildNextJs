'use server';

import { revalidatePath } from "next/cache";
import { deleteFile, uploadFile } from "../cloudinary/config";
import { connecToDB } from "../dbConnect";
import { Member } from "../models/member.model";
import { errorResponse, successResponse } from "./response";
import { redirect } from "next/navigation";


export const registerMember = async (formData: FormData) => {
    console.log(formData);
    const {name, email, phone, role, designation, academy, location, file} = Object.fromEntries(formData);
    console.log(file);
    try {
        await connecToDB();
        const existingMember = await Member.findOne({email});
        if(existingMember) {
            return errorResponse(409, `Member with this email already exists named '${existingMember.name}'`);
        }
        let imgInfo: any;
        if(file) {
            imgInfo = await uploadFile(file as File, 'bild/teamMember');
            console.log(imgInfo);
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