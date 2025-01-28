import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/auth/useAuthContext";
import { useGlobalContext } from "../../context/useGlobalContext";
import DOMPurify from "dompurify";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { getBlog } from "../../service/blogsService";
import LoaderX from "../Reuseables/LoaderX";
import EditOrDeleteModal from "../Modals/EditOrDelete";
import { FixedAlert } from "../Reuseables/Alert";
import NotFound404 from "../Reuseables/NotFound404";
const Blog = ({ propsBlogId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCopiedMessage, setIsCopiedMessage] = useState("");

  // Auth context
  const { user } = useAuthContext();
  const { blogs, setShowBlog, showBlog, dispatch, fetchBlogs } =
    useGlobalContext();

  // Global context
  const {
    isLoading,
    setIsLoading,
    scrollToTop,
  } = useGlobalContext();

  // Hooks
  const navigate = useNavigate();
  const { blogId } = useParams();
  const location = useLocation();

  // Variables
  const totalBlogsLength = blogs.length;
  const currentBlogIdx = blogs.indexOf(blogId);

  ///////////////////////////
  // Handle Blog Navigation
  ///////////////////////////
  const handleBlogNavigation = async (direction) => {
    if (direction === "next") {
      if (currentBlogIdx > 0) {
        // Go back one blog
        navigate(`/blogs/${blogs[currentBlogIdx - 1]._id}`);
      } else {
        // Circle back to the last blog
        navigate(`/blogs/${blogs[totalBlogsLength - 1]._id}`);
      }
    } else {
      if (currentBlogIdx < totalBlogsLength - 1) {
        // Go forward one blog
        navigate(`/blogs/${blogs[currentBlogIdx + 1]._id}`);
      } else {
        // Go to the first blog
        navigate(`/blogs/${blogs[0]._id}`);
      }
    }
  };

  ///////////////////////////
  // Handle Toggle Modal
  ///////////////////////////
  const handleToggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  ///////////////////////////
  // Handle Copy Link
  ///////////////////////////
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

  ///////////////////////////
  // Fetch Blog
  ///////////////////////////
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

  ///////////////////////////
  // Scroll to Top on ID Change
  ///////////////////////////
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
      {/* Edit or Delete Modal */}
      <EditOrDeleteModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        subject={"blog"}
      />

      {/* Blog Owner Info */}
      <div className="flex items-center gap-4 w-8/12 relative z-10 mx-auto text-gray-100 mt-20">
        <Link
          className="flex items-center gap-4"
          to={`/profiles/${showBlog.owner?._id}`}
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
        {user?._id.toString() === showBlog.owner?._id && (
          <div
            onClick={handleToggleModal}
            className="text-right text-gray-100 text-6xl relative -top-12 cursor-pointer"
          >
            ...
          </div>
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
        <div className="share-container relative">
          <span className="text-2xl text-gray-100 absolute -top-16 left-1/2 -translate-x-1/2">
            Share this blog with others!
          </span>
        </div>

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
            {totalBlogsLength}
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
