import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
/////////////////////
// Get User Function
/////////////////////
export function getUser() {
  const token = localStorage.getItem("token");

  if (!token) return null;

  const user = JSON.parse(atob(token.split(".")[1]));
  return user.user;
}

/////////////////////
// ? POST | User Signup Function
/////////////////////
export async function register(formData) {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, formData);

    const data = response.data;
    if (data.err) {
      throw new Error(data.err);
    }

    if (data.token) {
      // store the token! in localstorage
      localStorage.setItem("token", data.token);
      const user = JSON.parse(atob(data.token.split(".")[1]));
      console.log(user, " <- user in signup!");
      return user.user;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
}

/////////////////////
// User Signin Function
/////////////////////
export async function login(userCredentials) {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/login`,
      userCredentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;
    if (data.error) {
      throw new Error(data.error);
    }

    if (data.token) {
      // store the token! in localstorage
      localStorage.setItem("token", data.token);
      const user = JSON.parse(atob(data.token.split(".")[1]));
      return user.user;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}
