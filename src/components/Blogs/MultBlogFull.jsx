import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { useState } from "react";
import { FixedAlert } from "../Reuseables/Alert";
export const MultipleBlogsFull = ({ title, img, content, path, createdAt }) => {
  const [isCopiedMessage, setIsCopiedMessage] = useState("");

  const url = encodeURI(window.location.href);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url); // Copy the URL to clipboard
      setIsCopiedMessage("Copied Link");

      // Clear the message after 1 second
      setTimeout(() => setIsCopiedMessage(""), 1000);
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };
  return (
    <>
      <div className="blog-container flex flex-col items-center relative max-h-[70rem]  p-5 ql-snow ql-editor  mx-auto my-12 pointer-events-none">
        <div className="mt-12">
          {img && <img className="w-full my-8" src={img} alt="" />}

          <div className=" w-9/12 text-start ml-20">
            <span className=" text-gray-100 md:text-xl ">
              {new Date(createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              &mdash; Cassius Reynolds Tech Blogs
            </span>
          </div>
        </div>

        {/* title and content */}
        <h2 className=" text-2xl md:text-4xl text-start leading-[3rem] text-gray-100 relative top-10  w-9/12 ">
          {title?.length > 90 ? `${title.slice(0, 90)}...` : title}
        </h2>
        <div
          className=" text-gray-100 md:text-xl mt-12 p-4 leading-[3rem]"
          dangerouslySetInnerHTML={{
            __html: `${DOMPurify.sanitize(content).slice(0, 150)} ...`,
          }}
        ></div>
      </div>

      {/* action btns */}
      <div className="flex items-center justify-around">
        <Link to={path}>
          <button
            type="button"
            className="text-xl md:text-3xl bg-gray-700 text-gray-100 px-4 py-2 rounded-md focus:outline-none hover:bg-gray-600 transition-colors duration-200"
          >
            read more
          </button>
        </Link>{" "}
        {isCopiedMessage && <FixedAlert success message={"Copied Link"} />}
        <button
          onClick={handleCopyLink}
          type="button"
          className="text-xl md:text-3xl bg-gray-700 text-gray-100 px-4 py-2 rounded-md focus:outline-none hover:bg-gray-600 transition-colors duration-200"
        >
          copy link
        </button>
      </div>
    </>
  );
};
