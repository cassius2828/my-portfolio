import { useState } from "react";
import { confirm2FAService, getUser } from "../../service/authService";
import { useAuthContext } from "../../context/auth/useAuthContext";
import { useNavigate } from "react-router-dom";

const ConfirmMFA = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code.trim().length !== 6) {
      setError("Please enter a valid 6-digit code.");
      return;
    }
    try {
      if (localStorage.getItem("userId")) {
        const userId = localStorage.getItem("userId");
        setError(""); // Clear any previous error
        const data = await confirm2FAService(code, userId); // Pass the code to the parent submit handler
        if (data.token) {
          setUser(getUser());
          navigate("/");
        } else {
          setError("Invalid code. Please try again.");
        }
      }
    } catch (err) {
      console.error(err);
      setError("Failed to confirm MFA. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-6">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Confirm Two-Factor Authentication
        </h1>
        <p className="text-gray-300 text-center mb-6">
          Enter the 6-digit code from your authenticator app to complete the
          setup.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input for 2FA code */}
          <div>
            <label htmlFor="mfa-code" className="block text-lg font-medium">
              6-Digit Code
            </label>
            <input
              type="text"
              id="mfa-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your code"
            />
          </div>

          {/* Error message */}
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-500 transition-colors"
          >
            Confirm MFA
          </button>
        </form>
        <p className="text-gray-400 text-sm text-center mt-4">
          Didn’t receive a code? Double-check your authenticator app.
        </p>
      </div>
    </div>
  );
};

export default ConfirmMFA;
