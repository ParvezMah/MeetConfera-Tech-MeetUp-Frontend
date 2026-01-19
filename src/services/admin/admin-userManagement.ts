"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";

export interface IUserFilters {
  searchTerm?: string;
  [key: string]: any;
}

export interface IPaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// ----------------- User APIs -----------------

// 1. Get all users (Admin / Super Admin)
export async function getAllUsers(
  filters: IUserFilters = {},
  options: IPaginationOptions = {}
) {
  try {
    const queryParams = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        queryParams.set(key, String(value));
      }
    });

    Object.entries(options).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.set(key, String(value));
      }
    });

    const endpoint = `/user${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    const res = await serverFetch.get(endpoint);
    return await res.json();
  } catch (error: any) {
    console.error("getAllUsers error:", error?.message || error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch users",
    };
  }
}

// 2. Get my profile (All roles)
export async function getMyProfile() {
  try {
    const res = await serverFetch.get("/user/me");
    return await res.json();
  } catch (error: any) {
    console.error("getMyProfile error:", error?.message || error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch profile",
    };
  }
}

// 3. Update my profile (All roles, optional file upload)
export async function updateMyProfile(data: any, file?: File) {
  try {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (file) formData.append("file", file);

    const res = await serverFetch.patch("/user/update-my-profile", {
      body: formData,
    });
    return await res.json();
  } catch (error: any) {
    console.error("updateMyProfile error:", error?.message || error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to update profile",
    };
  }
}
