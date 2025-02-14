import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const BLOG_BASE_URL = BASE_URL + "/blogs";

///////////////////////////
// ? POST | Create a new blog
///////////////////////////
export const createBlog = async (formData) => {
  const options = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  try {
    const response = await axios.post(
      `${BLOG_BASE_URL}/new`,
      formData,
      options
    );

    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

///////////////////////////
// * PUT | update a blog | img
///////////////////////////
export const updateBlogWithImg = async (formData, blogId) => {
  const options = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  try {
    const response = await axios.put(
      `${BLOG_BASE_URL}/${blogId}`,
      formData,
      options
    );

    return response.data;
  } catch (err) {
    console.error(err);

    throw err;
  }
};

///////////////////////////
// * PUT | update a blog | no img
///////////////////////////
export const updateBlogNoImg = async (formData, blogId) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  try {
    const response = await axios.put(
      `${BLOG_BASE_URL}/${blogId}`,
      formData,
      options
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
///////////////////////////
// ! DELETE | Delete a blog by ID
///////////////////////////
export const deleteBlog = async (blogId) => {
  const options = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  try {
    const response = await axios.delete(`${BLOG_BASE_URL}/${blogId}`, options);
    return response.data;
  } catch (err) {
    console.error("Error deleting blog:", err);
    throw err;
  }
};

///////////////////////////
// GET | Retrieve a single blog by ID
///////////////////////////
export const getBlog = async (blogId) => {
  try {
    const response = await axios.get(`${BLOG_BASE_URL}/${blogId}`);
    return response.data;
  } catch (err) {
    console.error("Error getting blog:", err);
    throw err;
  }
};

export const getAllBlogs = async () => {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const response = await axios.get(`${BLOG_BASE_URL}`, options);
    return response.data;
  } catch (err) {
    console.error("Error getting all blogs:", err);
    throw err;
  }
};
