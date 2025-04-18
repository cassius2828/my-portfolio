import { createContext, useReducer, useState } from "react";
import { getProjectById } from "../service/projectsService";
import { getAllBlogs } from "../service/blogsService";

const GlobalContext = createContext();
const initialState = {
  isLoading: false,
  featuredProjects: null,
  regularProjects: null,
  showProject: {},
};
const reducer = (state, action) => {
  switch (action.type) {
    case "startLoading":
      return { ...state, isLoading: true };
    case "stopLoading":
      return { ...state, isLoading: false };
    case "setFeaturedProjects":
      return { ...state, featuredProjects: action.payload };
    case "setRegularProjects":
      return { ...state, regularProjects: action.payload };
    case "setShowProject":
      return { ...state, showProject: action.payload };
    default:
      return state;
  }
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showGuestModal, setShowGuestModal] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [showBlog, setShowBlog] = useState({});
  const [blogIdArray, setBlogIdArray] = useState([]);

  const { featuredProjects, regularProjects, isLoading, showProject } = state;
  const fallbackImg =
    "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";

  const fetchBlogs = async () => {
    dispatch({ type: "startLoading" });

    try {
      const data = await getAllBlogs();

      setBlogs(data);
      if (data.length !== blogIdArray.length) {
        setBlogIdArray(data.map((blog) => blog._id));
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch({ type: "stopLoading" });
    }
  };

  const fetchProjects = async (actionType, serviceFn) => {
    dispatch({ type: "startLoading" });
    try {
      const data = await serviceFn();
      dispatch({ type: actionType, payload: data });
    } catch (err) {
      console.error(err);
      dispatch({ type: actionType, payload: [] });
    } finally {
      dispatch({ type: "stopLoading" });
    }
  };

  const fetchProjectById = async (id) => {
    dispatch({ type: "startLoading" });

    try {
      const data = await getProjectById(id);

      dispatch({ type: "setShowProject", payload: data });
    } catch (err) {
      console.error(err);
      dispatch({ type: "setShowProject", payload: {} });
    } finally {
      dispatch({ type: "stopLoading" });
    }
  };

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        fetchProjects,
        featuredProjects,
        regularProjects,
        isLoading,
        fallbackImg,
        scrollToTop,
        fetchProjectById,
        showProject,
        showGuestModal,
        setShowGuestModal,
        dispatch,
        fetchBlogs,
        blogs,
        setShowBlog,
        showBlog,
        blogIdArray,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
