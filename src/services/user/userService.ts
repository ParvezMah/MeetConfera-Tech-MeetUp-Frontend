"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";

// ----------------- Interfaces -----------------

export interface ICreateUserData {
  name: string;
  email: string;
  password: string;
  contactNumber: string;
  location: string;
}

export interface ICreateHostData {
  name: string;
  email: string;
  password: string;
  contactNumber: string;
  organization?: string;
}

export interface ICreateAdminData {
  name: string;
  email: string;
  password: string;
  contactNumber: string;
}

// ----------------- User APIs -----------------

export async function createUser(data: ICreateUserData, file?: File) {
  try {
    const formData = new FormData();

    formData.append(
      "data",
      JSON.stringify({
        password: data.password,
        user: {
          name: data.name,
          email: data.email,
          contactNumber: data.contactNumber,
          location: data.location,
        },
      })
    );

    if (file) formData.append("file", file);

    const res = await serverFetch.post("/user/create-user", {
      body: formData,
    });

    return await res.json();
  } catch (error: any) {
    console.error("createUser error:", error);
    return {
      success: false,
      message: error?.message || "Failed to create user",
    };
  }
}

// ----------------- Host APIs -----------------

export async function createHost(data: ICreateHostData, file?: File) {
  try {
    const formData = new FormData();

    formData.append(
      "data",
      JSON.stringify({
        password: data.password,
        host: {
          name: data.name,
          email: data.email,
          contactNumber: data.contactNumber,
          organization: data.organization,
        },
      })
    );

    if (file) formData.append("file", file);

    const res = await serverFetch.post("/user/create-host", {
      body: formData,
    });

    return await res.json();
  } catch (error: any) {
    console.error("createHost error:", error);
    return {
      success: false,
      message: error?.message || "Failed to create host",
    };
  }
}

// ----------------- Admin APIs -----------------

export async function createAdmin(data: ICreateAdminData, file?: File) {
  try {
    const formData = new FormData();

    formData.append(
      "data",
      JSON.stringify({
        password: data.password,
        admin: {
          name: data.name,
          email: data.email,
          contactNumber: data.contactNumber,
        },
      })
    );

    if (file) formData.append("file", file);

    const res = await serverFetch.post("/user/create-admin", {
      body: formData,
    });

    return await res.json();
  } catch (error: any) {
    console.error("createAdmin error:", error);
    return {
      success: false,
      message: error?.message || "Failed to create admin",
    };
  }
}

export async function deleteUser(userId: string) {
  try {
    const res = await serverFetch.delete(`/user/${userId}`);

    return await res.json();
  } catch (error: any) {
    console.error("deleteUser error:", error);
    return {
      success: false,
      message: error?.message || "Failed to delete user",
    };
  }
}

export async function softDeleteUser(userId: string) {
  try {
    const res = await serverFetch.delete(`/user/soft/${userId}`);

    return await res.json();
  } catch (error: any) {
    console.error("softDeleteUser error:", error);
    return {
      success: false,
      message: error?.message || "Failed to soft delete user",
    };
  }
}


