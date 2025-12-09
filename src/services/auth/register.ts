/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { registerValidationZodSchema } from "@/zod/auth.validation";
import { loginUser } from "./loginUser";


export const register = async (_currentState: any, formData: any): Promise<any> => {
    try {
        console.log(formData.get("address"));
        const payload = {
            name: formData.get('name'),
            address: formData.get('address'),
            email: formData.get('email'),
            contactNumber: formData.get("contactNumber"),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
        }

        if (zodValidator(payload, registerValidationZodSchema).success === false) {
            return zodValidator(payload, registerValidationZodSchema);
        }

        const validatedPayload: any = zodValidator(payload, registerValidationZodSchema).data;
        const registerData = {
            password: validatedPayload.password,
            user: {
                name: validatedPayload.name,
                address: validatedPayload.address,
                email: validatedPayload.email,
                contactNumber: validatedPayload.contactNumber,
            }
        }

        const newFormData = new FormData();

        newFormData.append("data", JSON.stringify(registerData));

        if (formData.get("file")) {
            newFormData.append("file", formData.get("file") as Blob);
        }

        const res = await serverFetch.post("/user/create-user", {
            body: newFormData,
        })

        const result = await res.json();


        if (result.success) {
            await loginUser(_currentState, formData);
        }

        return result;



    } catch (error: any) {
        // Re-throw NEXT_REDIRECT errors so Next.js can handle them
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.log(error);
        return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : "Registration Failed. Please try again."}` };
    }
}