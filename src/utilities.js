import axios from 'axios';

export async function commonAPICall(endpoint, data = '', method = 'get') {
  const endPoints = ['login', 'register'];

  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const headers = endPoints.includes(endpoint) ? {} : config;

    const response = await axios[method](
      `http://192.168.0.107:3000/api/v1/employee/` + endpoint,
      data,
      headers
    );
    console.log('response', response);
    return  (endpoint === "country" && method==="post")  ? response?.data : response?.data?.data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}