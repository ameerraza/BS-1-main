import axios from "axios";
import Cookies from "js-cookie";
// let token = localStorage.getItem("authToken");
const token = Cookies.get("authToken");
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
export const authSignUp = async (data: any) => {
  let response: any = null;
  console.log("data", data);
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}users`, data);
    response = res?.data;
    console.log("addAdministration response from api :>> ", response);
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
};

export const authLogin = async (data: any) => {
  let response: any = null;
  console.log("data", data);
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}users/login`,
      data
    );
    response = res?.data;
    console.log("addAdministration response from api :>> ", response);
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
};

export const verifyOtp = async (data: any) => {
  let response: any = null;
  console.log("data", data);
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}users/verifyOtp`,
      data
    );
    response = res?.data;
    console.log("addAdministration response from api :>> ", response);
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
};

export const forgetPassword = async (data: any) => {
  let response: any = null;
  console.log("data", data);
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}users/forgotPassword`,
      data
    );
    response = res?.data;
    console.log("addAdministration response from api :>> ", response);
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
};

export const updatePassword = async (data: any) => {
  let response: any = null;
  console.log("data", data);
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}users/updatePassword`,
      data
    );
    response = res?.data;
    console.log("addAdministration response from api :>> ", response);
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
};

export const applyForVender = async (data: any) => {
  let response: any = null;
  console.log("data", data);
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}users/vendor-request`,
      data,
      config
    );
    response = res?.data;
    console.log("addAdministration response from api :>> ", response);
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
};

export const contactRequest = async (data: any) => {
  let response: any = null;
  console.log("data", data);
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}users/contact-request`,
      data,
      config
    );
    response = res?.data;
    console.log("addAdministration response from api :>> ", response);
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
};

export const uploadImages = async (data: any) => {
  let response: any = null;

  const dataa = {
    imageBase64: data,
  };
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_URL_IMAGE}upload-image`,
      dataa,
      config
    );
    response = res?.data;
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
};

export const updateProfile = async (id: any, data: any) => {
  let response: any = null;
  console.log("data", data);
  console.log("config :>> ", config);
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_URL}users/update-profile/${id}`,
      data,
      config
    );
    response = res?.data;
    console.log("addAdministration response from api :>> ", response);
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
};

export const getUserById = async () => {
  let response: any = null;
  // console.log("data", data);
  // console.log("config :>> ", config);
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}users/token`,
      config
    );
    response = res?.data;
    console.log("addAdministration response from api :>> ", response);
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
};

export const order = async (data: any) => {
  let response: any = null;
  console.log("data", data);
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}order/create-order`,
      data,
      config
    );
    response = res?.data;
    console.log("addAdministration response from api :>> ", response);
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
};

export const getProductById = async (id: any) => {
  let response: any = null;
  // console.log("data", data);
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}product/${id}`,
      config
    );
    response = res?.data;
    console.log("addAdministration response from api :>> ", response);
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
};

export const searchProduct = async (name: any) => {
  let response: any = null;
  // console.log("data", data);
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}product/search/${name}`,
      config
    );
    response = res?.data;
    console.log("addAdministration response from api :>> ", response);
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
};

export const getAllProducts = async () => {
  let response: any = null;
  // console.log("data", data);
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}product`);
    response = res?.data;
    console.log("addAdministration response from api :>> ", response);
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
};

export const getOrderByUser = async (userId: string) => {
  let response: any = null;
  const data = { userId }; // Create request body with userId

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}order/orders-by-user`,
      data,
      config
    );
    response = res?.data;
    console.log("Orders by user response:", response);
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
};
