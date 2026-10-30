/* eslint-disable @typescript-eslint/no-explicit-any */
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

const httpGet = async (endpoint: string, options?: ApiRequestOptions) => {
    try {
        const response = await axiosInstance.get(endpoint, {
            params: options?.params,
            headers: options?.headers,
        });
        return response.data;
    } catch (error: any) {
        // Print the detailed server response if available
        console.error(`Get request failed for ${endpoint}:`, error.response?.data || error.message);
        throw error;
    }
};

const httpPost = async (endpoint: string, data: unknown, options?: ApiRequestOptions) => {
    try {
        const response = await axiosInstance.post(endpoint, data, {
            params: options?.params,
            headers: options?.headers,
        });
        return response.data;
    } catch (error) {
        console.error(`Post request failed for ${endpoint}:`, error);
        throw error;
    }
}

const httpPut = async (endpoint: string, data: unknown, options?: ApiRequestOptions) => {
    try {
        const response = await axiosInstance.put(endpoint, data, {
            params: options?.params,
            headers: options?.headers,
        });
        return response.data;
    } catch (error) {
        console.error(`Put request failed for ${endpoint}:`, error);
        throw error;
    }
}

const httpPatch = async (endpoint: string, data: unknown, options?: ApiRequestOptions) => {
    try {
        const response = await axiosInstance.patch(endpoint, data, {
            params: options?.params,
            headers: options?.headers,
        });
        return response.data;
    } catch (error) {
        console.error(`Patch request failed for ${endpoint}:`, error);
        throw error;
    }
}

const httpDelete = async (endpoint: string, options?: ApiRequestOptions) => {
    try {
        const response = await axiosInstance.delete(endpoint, {
            params: options?.params,
            headers: options?.headers,
        });
        return response.data;
    } catch (error) {
        console.error(`Delete request failed for ${endpoint}:`, error);
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