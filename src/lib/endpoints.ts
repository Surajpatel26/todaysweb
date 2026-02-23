// endpoints.ts
export const API_BASE_URL = "http://localhost:5001/api";

export const ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/admin/login`,
  forgotPassword: `${API_BASE_URL}/admin/forgot-password`,
  resetPassword: `${API_BASE_URL}/admin/reset-password`,
   
  Users: {
    createUser: `${API_BASE_URL}/admin/create-user`,
    updateUser: `${API_BASE_URL}/admin/edit-user`, 
    deleteUser: `${API_BASE_URL}/admin/delete-user`, 
    getUsers: `${API_BASE_URL}/admin/users`,
  },
};