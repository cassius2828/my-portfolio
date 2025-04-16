import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FixedAlert } from "../Reuseables/Alert";
const resumeS3Link = `https://5-06-sei.s3.us-west-1.amazonaws.com/portfolio/resume/Cassius_Reynolds_-_Software_Engineer.pdf`;
const googleDriveResumeLink = `https://drive.google.com/file/d/1Q3qWKgDjpOQriR39708bYz8hhhPDNFno/view?usp=drive_link`
const ResumePage = () => {
  const [isCopiedMessage, setIsCopiedMessage] = useState("");

  const navigate = useNavigate();

  const handleCopyLink = async () => {0
    try {
      await navigator.clipboard.writeText(googleDriveResumeLink);
      setIsCopiedMessage("Copied Link");

      // Clear the message after 1 second
      setTimeout(() => setIsCopiedMessage(""), 1000);
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full  text-white mt-20 md:mt-32">
      <div className="relative w-full max-w-4xl h-[85vh] overflow-y-auto border border-gray-700 shadow-lg rounded-lg">
        <iframe
          src={resumeS3Link}
          title="Cassius Reynolds Resume"
          className="w-full h-full rounded-lg"
        />
      </div>

      {/* Back Button */}
      <div className="flex mt-5 gap-8">
        <button
          onClick={() => navigate(-1)}
          className="mt-6 px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-md shadow-md transition-all duration-200"
        >
          Back
        </button>
        <button
          onClick={handleCopyLink}
          className="mt-6 px-6 py-2 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-md shadow-md transition-all duration-200"
        >
          Copy Link
        </button>
      </div>
      {isCopiedMessage && <FixedAlert success message={"Copied Link"} />}
    </div>
  );
};

export default ResumePage;
