import { MultipleBlogsFull } from "./MultBlogFull";
import { BlogTable } from "./BlogTable";
import { useEffect, useState } from "react";
import { getAllBlogs } from "../../service/blogsService";
import { useAuthContext } from "../../context/auth/useAuthContext";
import { useGlobalContext } from "../../context/useGlobalContext";
import LoaderX from "../Reuseables/LoaderX";
const DisplayBlogs = () => {
  const [display, setDisplay] = useState("full");
  const [blogs, setBlogs] = useState([]);
  const { dispatch, isLoading, scrollToTop } = useGlobalContext();
  const { user } = useAuthContext();

  const handleDisplayChange = (e) => {
    setDisplay(e.target.value);
  };
  ///////////////////////////////
  // Fetch Current User Blogs
  ///////////////////////////////
  const fetchBlogs = async () => {
    if (!user) return [];
    dispatch({ type: "startLoading" });

    try {
      const data = await getAllBlogs();
      setBlogs(data);
    } catch (err) {
      console.error(err);
    } finally {
      dispatch({ type: "stopLoading" });
    }
  };

  // fetch blogs on render
  useEffect(() => {
    fetchBlogs();
    scrollToTop();
  }, []);
  return (
    <>
      {/* overlay bg */}
      <div className="fixed top-0 left-0 h-full w-full -z-10 bg-neutral-950"></div>

      <h1 className="text-gray-100 text-6xl text-center pt-12 mt-52 md:mt-80 mb-24">
        My Blogs
      </h1>
      <div className="flex flex-col items-center gap-12 my-12">
        <div className="flex gap-4 items-center">
          <label className="text-gray-100" htmlFor="blog-display">
            Display blogs
          </label>
          {/* select | display blogs style */}
          <select
            className="text-gray-800 px-4 py-2 rounded-sm"
            name="blog-display"
            id="blog-display"
            value={display}
            onChange={handleDisplayChange}
          >
            <option value="full">Full</option>
            <option value="list">List</option>
          </select>
        </div>

        {display === "full" ? (
          <ul
            className={` grid grid-cols-1  lg:grid-cols-3
         gap-12 w-full lg:w-[80vw] mx-auto`}
          >
            {isLoading ? (
              <LoaderX />
            ) : (
              <>
                {blogs?.map((blog, idx) => (
                  <li key={blog.title + idx}>
                    <MultipleBlogsFull
                      id={blog.owner._id}
                      path={`/blogs/${blog._id}`}
                      title={blog.title}
                      img={blog.img}
                      content={blog.content}
                      name={blog.owner.username}
                      profileImg={blog.owner.profileImg}
                      createdAt={blog.createdAt}
                    />
                  </li>
                ))}
              </>
            )}
          </ul>
        ) : (
          <BlogTable blogs={blogs} />
        )}
      </div>
    </>
  );
};
export default DisplayBlogs;
