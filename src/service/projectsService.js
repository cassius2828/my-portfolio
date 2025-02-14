import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
export const getAllProjects = async () => {
  try {
    const response = await axios.get(BASE_URL + "/projects");
    return response.data;
  } catch (err) {
    console.error(err);

    throw err;
  }
};

export const getFeaturedProjects = async () => {
  try {
    const response = await axios.get(BASE_URL + "/projects/featured");
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getRegularProjects = async () => {
  try {
    const response = await axios.get(BASE_URL + "/projects/regular");
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getProjectById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/projects/${id}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
