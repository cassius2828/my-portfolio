import { createContext, useReducer, useState } from "react";

const GlobalContext = createContext();
const initialState = {
  isLoading: false,
  featuredProjects: null,
  regularProjects: null,
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
    default:
      return state;
  }
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { featuredProjects, regularProjects, isLoading } = state;
  const fallbackImg =
    "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
  const fetchProjects = async (actionType, serviceFn) => {
    dispatch({ type: "startLoading" });
    try {
      const data = await serviceFn();
      dispatch({ type: actionType, payload: data });
    } catch (err) {
      console.error(err);
      console.log(`Unable to get projects from service file`);
      dispatch({ type: actionType, payload: [] });
    } finally {
      dispatch({ type: "stopLoading" });
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
