'use server';
import bcrypt from "bcryptjs";

import { connecToDB } from "../dbConnect";
import { errorResponse, successResponse } from "./response";
import { User } from "../models/user";


/** Authentication Section Starts */

export const register = async (formData: FormData) => {
    const {name, email, password} = Object.fromEntries(formData);
    try {
        await connecToDB();
        console.log(name, email, password);
        const existingUser = await User.findOne({email});
        if(existingUser) {
            throw new Error("User with this email already exists");
        }

        let hashPassword = await bcrypt.hash(password.toString(), 10);
        let newUser = new User({
            name,
            email,
            password: hashPassword
        })

        await newUser.save();
        return successResponse(202, "Registered successfully");
    } catch (error: any) {
        return errorResponse(409, error.message);
    }

}


export const login = async (formData: FormData) => {
    const email = formData.get('email');
    const password = formData.get('password')!.toString();
    try {
        await connecToDB();
        const existingUser = await User.findOne({email});
        if(!existingUser) {
            throw new Error("User with this email does not found");
        }

        const passwordMatched = await bcrypt.compare(password, existingUser.password);
        if(!passwordMatched) {
            return errorResponse(401, "Wrong Credentials");
        }
        return successResponse(200, "Logged in Successfully");
    } catch (error: any) {
        return errorResponse(404, error.message);
    }
}


/** Authentication Section Ends */




/** User Action Section Starts */
export const getUsers = async () => {

    try {
        const users = await User.find().lean();
        
        return successResponse(200, "User Fetched successfully", users);
        
    } catch (error) {
        console.log(error);
        return errorResponse();
    }
}

/** User Action Section Ends */