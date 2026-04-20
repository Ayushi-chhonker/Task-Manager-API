import API from "./api";

// Register
export const registerUser = async (userData) => {

  try {

    const response =
      await API.post(
        "/auth/register",
        userData
      );

    return response.data;

  } catch (error) {

    throw error.response?.data || error.message;

  }

};

// Login
export const loginUser = async (userData) => {

  try {

    const response =
      await API.post(
        "/auth/login",
        userData
      );

    if (response.data.token) {

      localStorage.setItem(
        "token",
        response.data.token
      );

    }

    return response.data;

  } catch (error) {

    throw error.response?.data || error.message;

  }

};