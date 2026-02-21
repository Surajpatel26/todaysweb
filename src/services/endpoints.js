export const API_BASE_URL = "http://localhost:5001";


const apiEndpoints = {
  auth: {
    adminLogin: `${API_BASE_URL}/admin/admin-login`,
  },
  admin: {
    allUsers: `${API_BASE_URL}/admin/get/all-users`,
    allOrders: `${API_BASE_URL}/admin/orders/all`,
  },

   
};

export default apiEndpoints;