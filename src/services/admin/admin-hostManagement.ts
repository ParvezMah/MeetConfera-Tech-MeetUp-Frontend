"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";

export interface IHostFilters {
  searchTerm?: string;
  [key: string]: any;
}

export interface IPaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export async function getAllHosts(
  filters: IHostFilters = {},
  options: IPaginationOptions = {}
) {
  try {
    // Build query string
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

    const endpoint = `/hosts${ queryParams.toString() ? `?${queryParams.toString()}` : "" }`;
    const response = await serverFetch.get(endpoint);
    return await response.json();

  } catch (error: any) {
    console.error("getAllHosts error:", error?.message || error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch hosts",
    };
  }
}

export async function getSingleHost(hostId: string) {
  try {
    const endpoint = `/hosts/${hostId}`
    const response = await serverFetch.get(endpoint);
    return await response.json();
  } catch (error: any) {
    console.error("getSingleHost error:", error?.message || error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch host",
    };
  }
}
