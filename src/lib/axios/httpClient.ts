/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from '@/types/api.types';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined in the environment variables.');
}

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000, // Set a timeout for requests (in milliseconds)
    headers: {
        'Content-Type': 'application/json',
    },
});


export interface ApiRequestOptions {
    params?: Record<string, unknown>;
    headers?: Record<string, string>;
}

const httpGet = async <TData>(endpoint: string, options?: ApiRequestOptions):
    Promise<ApiResponse<TData>> => {
    try {
        const instance = axiosInstance;
        const response = await instance.get<ApiResponse<TData>>(endpoint, {
            params: options?.params,
            headers: options?.headers,
        });
        return response.data;
    } catch (error: any) {
        console.error(`Get request failed for ${endpoint}:`, error.response?.data || error.message);
        throw error;
    }
};

const httpPost = async <TData>(endpoint: string, data: unknown, options?: ApiRequestOptions):
    Promise<ApiResponse<TData>> => {
    try {
        const response = await axiosInstance.post<ApiResponse<TData>>(endpoint, data, {
            params: options?.params,
            headers: options?.headers,
        });
        return response.data;
    } catch (error: any) {
        console.error(`Post request failed for ${endpoint}:`, error.response?.data || error.message);
        throw error;
    }
}

const httpPut = async <TData>(endpoint: string, data: unknown, options?: ApiRequestOptions):
    Promise<ApiResponse<TData>> => {
    try {
        const response = await axiosInstance.put<ApiResponse<TData>>(endpoint, data, {
            params: options?.params,
            headers: options?.headers,
        });
        return response.data;
    } catch (error: any) {
        console.error(`Put request failed for ${endpoint}:`, error.response?.data || error.message);
        throw error;
    }
}

const httpPatch = async <TData>(endpoint: string, data: unknown, options?: ApiRequestOptions):
    Promise<ApiResponse<TData>> => {
    try {
        const response = await axiosInstance.patch<ApiResponse<TData>>(endpoint, data, {
            params: options?.params,
            headers: options?.headers,
        });
        return response.data;
    } catch (error: any) {
        console.error(`Patch request failed for ${endpoint}:`, error.response?.data || error.message);
        throw error;
    }
}

const httpDelete = async <TData>(endpoint: string, options?: ApiRequestOptions):
    Promise<ApiResponse<TData>> => {
    try {
        const response = await axiosInstance.delete<ApiResponse<TData>>(endpoint, {
            params: options?.params,
            headers: options?.headers,
        });
        return response.data;
    } catch (error: any) {
        console.error(`Delete request failed for ${endpoint}:`, error.response?.data || error.message);
        throw error;
    }
}

export const httpClient = {
    get: httpGet,
    post: httpPost,
    put: httpPut,
    patch: httpPatch,
    delete: httpDelete,
};  