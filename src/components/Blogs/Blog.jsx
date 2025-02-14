// React and Hooks
import { useEffect, useState } from "react";
// Context
import { useAuthContext } from "../../context/auth/useAuthContext";
import { useGlobalContext } from "../../context/useGlobalContext";
// Utilities
import DOMPurify from "dompurify";
// Routing
import { useParams, useNavigate, Link } from "react-router-dom";
// Services
import { getBlog } from "../../service/blogsService";
// Components
import LoaderX from "../Reuseables/LoaderX";
import { FixedAlert } from "../Reuseables/Alert";
import NotFound404 from "../Reuseables/NotFound404";

const Blog = ({ propsBlogId }) => {
  // Auth context
  const { user } = useAuthContext();
  // Global context
  const {
    blogs,
    setShowBlog,
    showBlog,
    dispatch,
    fetchBlogs,
    blogIdArray,
    isLoading,
    scrollToTop,
  } = useGlobalContext();
  // Hooks
  const navigate = useNavigate();
  const { blogId } = useParams();
  // state
  const [isCopiedMessage, setIsCopiedMessage] = useState("");
  const [currentBlogIdx, setCurrentBlogIdx] = useState(
    blogIdArray.indexOf(blogId)
  );

  // Handle Blog Navigation
  const handleBlogNavigation = async (direction) => {
    if (direction === "next") {
      if (currentBlogIdx < blogs.length - 1) {
        // Go forward one blog
        navigate(`/blogs/${blogs[currentBlogIdx + 1]._id}`);
      } else {
        // Circle back to the first blog
        navigate(`/blogs/${blogs[0]._id}`);
      }
    } else {
      if (currentBlogIdx === 0) {
        // Go to the last blog
        navigate(`/blogs/${blogs[blogs.length - 1]._id}`);
      } else {
        // Go back one blog
        navigate(`/blogs/${blogs[currentBlogIdx - 1]._id}`);
      }
    }
  };

  // Handle Copy Link
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

  // keeps currentBlogIdx in sync with displayed blog
  useEffect(() => {
    setCurrentBlogIdx(blogIdArray.indexOf(blogId));
  }, [blogId]);

  // Fetch Blog
  useEffect(() => {
    const fetchBlog = async () => {
      dispatch({ type: "startLoading" });
      try {
        const blogData = await getBlog(blogId); // Fetch the blog
        setShowBlog(blogData);
      } catch (error) {
        console.error("Error fetching the blog:", error);
      } finally {
        dispatch({ type: "stopLoading" });
      }
    };
    fetchBlog();
  }, [blogId, propsBlogId]);

  // Scroll to Top on ID Change
  useEffect(() => {
    scrollToTop();
    if (blogs.length === 0) {
      fetchBlogs();
    }
  }, [blogId]);

  if (!showBlog?._id) return <NotFound404 />;
  if (isLoading) return <LoaderX />;

  return (
    <>
      {/* Blog Owner Info */}
      <div className="flex items-center gap-4 w-8/12 relative z-10 mx-auto text-gray-100 mt-20">
        <Link
          className="flex items-center gap-4"
          to={`/blogs/${showBlog?._id}/manage`}
        >
          <img
            className="rounded-full view-blog-img"
            src={showBlog?.owner?.profileImg}
            alt={showBlog?.owner?.username}
          />
          <span className="text-2xl">{showBlog.owner?.displayName}</span>
        </Link>
      </div>

      {/* Blog Container */}
      <div className="blog-container relative p-5 ql-snow ql-editor w-full max-w-[90rem] mx-auto mb-24">
        {user?._id.toString() === import.meta.env.VITE_REACT_APP_ADMIN_ID && (
          <Link
            style={{ textDecoration: "none", color: "#fff" }}
            className=" text-gray-100 text-6xl relative -top-12 cursor-pointer"
            to={`/blogs/${showBlog?._id}/edit`}
          >
            ...
          </Link>
        )}

        {/* Blog Info */}
        <div className="flex gap-4 relative">
          <h2 className="text-5xl text-center text-gray-100">
            {showBlog.title}
          </h2>
          <span className="text-xl absolute right-0 -top-12 text-gray-100">
            {new Date(showBlog.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Blog Image */}
        {showBlog.img && (
          <img className="w-full my-8" src={showBlog.img} alt="" />
        )}

        {/* Blog Content */}
        <div
          className="preview bg-gray-100 p-4 ql-editor"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(showBlog.content),
          }}
        ></div>

        {/* Share Section */}
        <div
          onClick={handleCopyLink}
          className="border border-gray-700 w-48 my-12 mx-auto text-gray-100 text-xl p-3 text-center rounded-md hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
        >
          Copy Link
        </div>

        {isCopiedMessage && <FixedAlert success message={"Copied Link"} />}

        {/* Blog Navigation */}
        <div className="blog-navigation flex items-center justify-between">
          <button
            onClick={() => handleBlogNavigation("prev")}
            type="button"
            className="text-xl md:text-3xl bg-gray-700 text-gray-100 px-4 py-2 rounded-md focus:outline-none hover:bg-gray-600 transition-colors duration-200"
          >
            Previous Blog
          </button>
          <span className="absolute left-1/2 -translate-x-1/2 text-gray-100">
            {blogs.findIndex((blog) => blog._id === blogId) + 1} /{" "}
            {blogs.length}
          </span>
          <button
            onClick={() => handleBlogNavigation("next")}
            type="button"
            className="text-xl md:text-3xl bg-gray-700 text-gray-100 px-4 py-2 rounded-md focus:outline-none hover:bg-gray-600 transition-colors duration-200"
          >
            Next Blog
          </button>
          {user?._id == import.meta.env.VITE_REACT_APP_ADMIN_ID && (
            <Link
              className="relative z-50 p-5 bg-red-400 text-white"
              to={`/blogs/${blogId}/edit`}
            >
              edit
            </Link>
          )}
        </div>
        <Link
          style={{ color: "#fff" }}
          to={`/blogs`}
          className="flex justify-center mt-12 text-xl hover:underline cursor-pointer"
        >
          view all blogs
        </Link>
      </div>
    </>
  );
};

export default Blog;
