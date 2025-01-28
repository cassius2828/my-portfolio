import { MultipleBlogsFull } from "./MultBlogFull";
import { BlogTable } from "./BlogTable";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/useGlobalContext";
import LoaderX from "../Reuseables/LoaderX";
const DisplayBlogs = () => {
  const [display, setDisplay] = useState("full");
  const { isLoading, scrollToTop, blogs, fetchBlogs } = useGlobalContext();

  const handleDisplayChange = (e) => {
    setDisplay(e.target.value);
  };
  ///////////////////////////////
  // Fetch Current User Blogs
  ///////////////////////////////

  // fetch blogs on render
  useEffect(() => {
    fetchBlogs();
    scrollToTop();
  }, []);

  if (blogs?.length === 0) {
    return (
      <h1 className="text-gray-100 text-6xl text-center pt-12 mt-52 md:mt-80 mb-24 min-h-screen">
        {" "}
        No Blogs Found
      </h1>
    );
  }

  return (
    <>
      {/* overlay bg */}
      <div className="fixed top-0 left-0 h-full w-full -z-10 bg-neutral-950 "></div>

      <h1 className="text-gray-100 text-6xl text-center pt-12 mt-24 md:mt-40 mb-24">
        My Blogs
      </h1>
      <div className="flex flex-col items-center gap-12 my-12 min-h-screen ">
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
            className={` grid grid-cols-1 lg:grid-cols-2  xxl:grid-cols-3
         gap-12 w-full lg:w-[80vw] mx-auto`}
          >
            {isLoading ? (
              <LoaderX />
            ) : (
              <>
                {blogs?.map((blog, idx) => (
                  <li key={blog.title + idx}>
                    <MultipleBlogsFull
                      id={blog._id}
                      path={`/blogs/${blog._id}`}
                      title={blog.title}
                      img={blog.img}
                      content={blog.content}
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
