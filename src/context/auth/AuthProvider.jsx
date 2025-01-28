import { createContext, useState } from "react";
import { getUser } from "../../service/authService";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());

  /////////////////////
  // Handle Logout
  /////////////////////
  function handleLogout() {
    localStorage.removeItem("token");

    setUser(null);
  }

  const showTargetUserName = (
    userId,
    targetedDisplayName,
    targetedUsername
  ) => {
    // fetchTargetUser(userId);
    const showUserName =
      userId !== user._id && (targetedDisplayName || targetedUsername) + "'s";
    console.log(showUserName, " <--show user name function result");
    return showUserName;
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        handleLogout,
        showTargetUserName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
