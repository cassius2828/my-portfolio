import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// services

// context
import { useAuthContext } from "../../context/auth/useAuthContext";
import { login } from "../../service/authService";

const Login = () => {
  const [message, setMessage] = useState([""]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  // hooks
  const { setUser } = useAuthContext();
  const navigate = useNavigate(); // added this for navigation purposes
  ///////////////////////////
  // Update Message
  ///////////////////////////
  const updateMessage = (msg) => {
    setMessage(msg);
  };
  ///////////////////////////
  // Handle Change
  ///////////////////////////
  const handleChange = (e) => {
    updateMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  ///////////////////////////
  // Handle Submit
  ///////////////////////////
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(formData); // TODO build login service function
      if (data.token) {
        setUser(data.token);
        navigate("/");
      } else if (data.twoFactorFA) {
        localStorage.setItem("userId", data.userId);
        navigate("/auth/verify-2FA");
      } else {
        updateMessage("Invalid credentials");
      }
    } catch (err) {
      updateMessage(err.response.data.error);
    }
  };

  return (
    <main className="bg-theme-dn min-h-screen flex flex-col items-center justify-start md:justify-center mt-52 md:mt-0">
      <div className="bg-theme-darkest border-gray-400 border-2 p-8 rounded-lg shadow-md w-full max-w-md mt-20">
        <h1 className="text-3xl text-gray-100 mb-4 text-center">Log In</h1>
        <span className="text-center">
          This is for admin access only, you will not be able to sign in to an
          account
        </span>
        <p className="text-red-500 mb-4 text-center">{message}</p>
        <form autoComplete="off" onSubmit={handleSubmit} className="space-y-6">
          {/* username */}
          <div>
            <label htmlFor="username" className="block text-gray-100 mb-2">
              Username:
            </label>
            <input
              type="text"
              autoComplete="off"
              id="username"
              value={formData.username}
              name="username"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
            />
          </div>
          {/* password */}
          <div>
            <label htmlFor="password" className="block text-gray-100 mb-2">
              Password:
            </label>
            <input
              type="password"
              autoComplete="off"
              id="password"
              value={formData.password}
              name="password"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
            />
          </div>
          {/* action btns */}
          <div className="flex justify-between items-center">
            <Link to="/">
              <button
                type="button"
                className="bg-gray-700 text-gray-100 px-4 py-2 rounded-md focus:outline-none hover:bg-gray-600 transition-colors duration-200"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className="bg-gray-700 text-gray-100 px-4 py-2 rounded-md focus:outline-none hover:bg-gray-600 transition-colors duration-200"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
      <div className="w-full  flex justify-center items-end gap-12 text-xl"></div>
    </main>
  );
};

export default Login;
