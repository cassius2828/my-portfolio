import { useState } from "react";
import axios from "axios";
import PromptSignIn from "../Reuseables/PromptSignIn";
import { enable2FAService } from "../../service/authService";

const Enable2FA = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [manualKey, setManualKey] = useState(null);
  const token = localStorage.getItem("token");

  if (!token) {
    return <PromptSignIn />;
  }
  const enable2FA = async () => {
    try {
      const data = await enable2FAService();

      // Store the QR code URL and manual key
      setQrCodeUrl(data.qrCode);
      setManualKey(data.secret);
    } catch (error) {
      console.error("Error enabling 2FA:", error);
      alert("Failed to enable 2FA");
    }
  };

  return (
    <div className="enable-2fa min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <div className="w-full md:w-1/2 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Enable Two-Factor Authentication
        </h1>

        {/* Enable 2FA Button */}
        {!qrCodeUrl && (
          <button
            onClick={enable2FA}
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-500 transition-colors"
          >
            Generate QR Code
          </button>
        )}

        {/* QR Code Section */}
        {qrCodeUrl && (
          <div className="mt-8 text-center">
            <h3 className="text-xl font-semibold mb-4">
              Scan this QR Code with your Authenticator App
            </h3>
            <div className="flex justify-center mb-4">
              <img
                src={qrCodeUrl}
                alt="QR Code"
                className="w-48 h-48 border-4 border-white rounded-md"
              />
            </div>
            <p className="text-lg mb-4">
              If you cannot scan the QR code, use this key:
            </p>
            <div className="bg-gray-700 text-blue-400 text-lg font-mono p-4 rounded-md mb-6">
              {manualKey}
            </div>
            <p className="text-sm text-gray-400">
              Add this key manually in your authenticator app.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Enable2FA;
