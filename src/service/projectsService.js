import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
export const getAllProjects = async () => {
  try {
    const response = await axios.get(BASE_URL + "/projects");
    return response.data;
  } catch (err) {
    console.error(err);
    console.log(`Unable to get all projects from server`);
    //    return err.error.message
  }
};

export const getFeaturedProjects = async () => {
  try {
    const response = await axios.get(BASE_URL + "/projects/featured");
    return response.data;
  } catch (err) {
    console.error(err);
    console.log(`Unable to get featured projects from server`);
  }
};

export const getRegularProjects = async () => {
  try {
    const response = await axios.get(BASE_URL + "/projects/regular");
    return response.data;
  } catch (err) {
    console.error(err);
    console.log(`Unable to get regular projects from server`);
  }
};

export const getProjectById = async (id) => {
  console.log(id, ' <-- id in serveice')
  try {
    const response = await axios.get(`${BASE_URL}/projects/${id}`);
    return response.data;
  } catch (err) {
    console.error(err);
    console.log(`Unable to get project with id of ${id} from server`);
  }
};
