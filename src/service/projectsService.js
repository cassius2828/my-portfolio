import axios from "axios";

export const getAllProjectsOfType = async (projectType) => {
  const url = `${BASE_URL}/${projectType}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.error(err);
    console.log(`Unable to get all ${projectType} objects from server`);
    //    return err.error.message
  }
};
