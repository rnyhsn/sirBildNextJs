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


export const getPosts = async ({limit = 0}: {limit?: number}) => {

    try {
        await connecToDB();
        const posts = await Post.find().populate('user').limit(limit).sort({createdAt: -1}).lean();
        return successResponse(200, "Post fetched successfully", posts);
    } catch (error) {
        console.log(error);
        return errorResponse();
    }
}


export const getPost = async (id: string) => {

    try {
        await connecToDB();
        let post = await Post.findById(id).lean();
        if(!post) {
            return errorResponse(404, "Post not Found");
        }
        // post = {...post, _id: String(post._id)};
        return successResponse(200, "Post fetched successfully", post);
    } catch (error) {
        return errorResponse();
    }
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



export const updatePost = async (formData: FormData, deleteImg: boolean) => {
    const {id, title, content, slug} = Object.fromEntries(formData);
    const image = formData.get('image') as File;
    console.log("Image delete:", deleteImg);
    try {
        // console.log(formData);
        await connecToDB();
        const existingPost = await Post.findById(id);
        if(!existingPost) {
            return errorResponse(404, "Post not found to update");
        }
        if(deleteImg) {
            await deleteFile(existingPost.featuredImg);
            await Post.findByIdAndUpdate(id, {
                featuredImg: ""
            })
        }
        let featuredImg = "";
        if(image && image.size > 0) {
            if(image.size > 2*1024*1024) {
                return errorResponse(401, "Image size must be less than 2MB");
            }

            // delete the image from cloudinary if any
            if(existingPost.featuredImg) {
                await deleteFile(existingPost.featuredImg);
            }
            
            // upolad the new image
            const resp: any = await uploadFile(image, "bild/post");
            featuredImg = resp?.public_id;
        }
        let newPost: any;
        if(featuredImg) {
            newPost =  {
                title,
                slug,
                content,
                featuredImg
            }
        } else {
            newPost =  {
                title,
                slug,
                content
            }
        }
        await Post.findByIdAndUpdate(id, newPost);

        return successResponse(204, "Updated successfully");
    } catch (error) {
        return errorResponse();
    }
}


export const getPostBySlug = async (slug: string) => {
    let decodedSlug = decodeURIComponent(slug);
    console.log("Decoded slug: ", decodedSlug);
    try {
        await connecToDB();
        const post = await Post.findOne({slug: decodedSlug}).populate('user').lean();

        if(!post) {
            return errorResponse(404, "Post not Found");
        }

        return successResponse(200, "", post);
    } catch (error) {
        return errorResponse();
    }
}

export const searchPosts = async (query: string) => {
    let regexp = new RegExp(query, 'i');
    try {
        await connecToDB();
        const posts = await Post.find({
            title: {
                $regex: regexp
            }
        }).populate("user").lean();
        console.log(posts);

        if(posts.length === 0) {
            return errorResponse(404, "Search Result: 0");
        }

        return successResponse(200, "", posts);
        
    } catch (error) {
        console.log(error);
        return errorResponse();
    }
}