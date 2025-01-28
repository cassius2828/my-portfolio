import { useState } from "react";
import { Link } from "react-router-dom";
import { FixedAlert } from "../Reuseables/Alert";

export const BlogTable = ({ blogs }) => {
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
    <div className="overflow-x-auto bg-[#111213]">
      <table className="min-w-full bg-[#111213] border border-gray-700">
        {/* head */}
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-700 text-gray-100 md:text-xl">
              Blog Header
            </th>
            <th className="py-2 px-4 border-b border-gray-700 text-gray-100 md:text-xl">
              Blog Title
            </th>
            <th className="py-2 px-4 border-b border-gray-700 text-gray-100 md:text-xl">
              Date Created
            </th>
            <th className="py-2 px-4 border-b border-gray-700 text-gray-100 md:text-xl">
              View Blog
            </th>
            <th className="py-2 px-4 border-b border-gray-700 text-gray-100 md:text-xl">
              Share Blog
            </th>
          </tr>
        </thead>
        {/* body */}
        <tbody>
          {blogs?.map((blog, idx) => (
            <tr key={blog.title + idx} className="hover:bg-gray-900">
              {/* header */}
              <td className="py-2 px-4 border-b border-gray-700 text-gray-100 md:text-xl">
                {blog.img && (
                  <img className="w-24 mx- my-8" src={blog.img} alt="" />
                )}
              </td>
              {/* title */}
              <td className="py-2 px-4 border-b border-gray-700 text-center text-gray-100 md:text-xl">
                {blog.title.slice(0, 50)}...
              </td>
              {/* date */}
              <td className="py-2 px-4 border-b border-gray-700 text-center text-gray-100 md:text-xl">
                {new Date(blog.createdAt).toLocaleDateString()}
              </td>
              {/* action btns */}
              <td className="py-2 px-4 border-b border-gray-700 text-center">
                <Link to={`/blogs/${blog._id}`}>
                  <button className="border px-3 py-1 md:text-xl rounded-md text-gray-100  border-gray-800 transition-colors duration-300 hover:bg-gray-900 hover:text-white">
                    view
                  </button>
                </Link>
              </td>
           

              <td className="py-2 px-4 border-b border-gray-700 text-center">
                <button
                  onClick={handleCopyLink}
                  type="button"
                  className="border px-3 py-1 md:text-xl text-gray-100 rounded-md border-gray-800 transition-colors duration-300 hover:bg-gray-900 hover:text-white"
                >
                  copy link
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isCopiedMessage && (
                <FixedAlert success message={"Copied Link"} />
              )}
    </div>
  );
};
