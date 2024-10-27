import axios from "axios";
import { baseURL } from "../utils/ServerURL";

export const forgotPassword = async (email, currentBaseUrl) => {
  try {
    //Send POST request for forgot password
    const response = await axios.post(`${baseURL}/auth/forgot-password`, { email, currentBaseUrl });
    if (response.status === 200) {
      return response.data.message;
    } else {
      throw new Error("Something went wrong.");
    }
  } catch (error) {
    throw error?.response?.data?.message || "An error occurred";
  }
};
export const loginUser = async (email, password) => {
    try {
      //Send POST request to Login
      const response = await axios.post(`${baseURL}/auth/login`, { email, password });
      return response.data.token;
    } catch (error) {
      throw error?.response?.data?.message || "Login failed";
    }
};
export const registerUser = async (email, password) => {
    try {
      //Send POST request to register
      await axios.post(`${baseURL}/auth/signup`, { email, password });
    } catch (error) {
      throw error?.response?.data?.message || "Registration failed";
    }
};
export const resetUserPassword = async (token, newPassword) => {
    try {
      //Send POST request for resetting the password
      await axios.post(`${baseURL}/auth/reset-password`, {
        token,
        newPassword,
      });
    } catch (error) {
      throw error?.response?.data?.message || "Password reset failed";
    }
};
export const verifyToken = async (token) => {
    try {
      //Send GET request to verify the token
      const response = await axios.get(`${baseURL}/auth/verify-token`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.error('Token verification failed:', error);
      return false;
    }
  };
  