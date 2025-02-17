'use server';

import { revalidatePath } from "next/cache";
import { deleteFile, uploadFile } from "../cloudinary/config";
import { connecToDB } from "../dbConnect";
import { slugify } from "../fnc";
import { Post } from "../models/post.model";
import { errorResponse, successResponse } from "./response";
import { redirect } from "next/navigation";



export const createPost = async (formData: FormData) => {
    const {title, content} = Object.fromEntries(formData);
    const image = formData.get('image') as File;
    console.log("image:", image);
    try {
        await connecToDB();

        let featuredImg: string = "";

        if(image && image.size > 0) {
            if(image.size > 2*1024*1024) {
                return errorResponse(401, "Image size must not exceed 2MB");
            }
            const resp: any = await uploadFile(image as File, "bild/post");
            featuredImg = resp?.public_id;
        };



        const newPost = new Post({
            title,
            slug: slugify(title as string),
            user: "67b1f87ebb78fd085d4af08d",
            content,
            featuredImg
        })
        console.log(newPost);
        await newPost.save();
        return successResponse(202, "Post Created successfully");
    } catch (error) {
        return errorResponse();
    }
}


export const getPosts = async () => {

    try {
        await connecToDB();
        const posts = await Post.find().lean();
        return successResponse(200, "Post fetched successfully", posts);
    } catch (error) {
        console.log(error);
        return errorResponse();
    }
}


export const getPost = async () => {

}

export const deletePost = async (formData: FormData) => {
    const id = formData.get('id');
    try {
        await connecToDB();
        const post = await Post.findByIdAndDelete(id);
        console.log(post);
        if(post.featuredImg) {
            await deleteFile(post.featuredImg);
        }
    } catch (error) {
        console.log(error);
    }
    revalidatePath("/dashboard/archives");
    redirect("/dashboard/archives");
}