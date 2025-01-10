import { axiosInstance } from "@/apis/axios.js";
import toast from "react-hot-toast";

export const signup = async (data) => {
     const response = await axiosInstance.post('auth/signup', data);
     return response?.data;
};

export const login = async (data) => {
     const response = await axiosInstance.post('auth/login', data);
     return response?.data;
};

export const checkAuth = async () => {
     const response = await axiosInstance.get('/auth/check');
     return response?.data;
};

export const updateProfile = async (data) => {
     try {
          const response = await axiosInstance.put('/auth/updateProfile', data);
          toast.success("Profile Picture updated Successfully")
          return response?.data;
     } catch (error) {
          toast.error('Failed to update profile:', error);
          throw error;
     }
};

