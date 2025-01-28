// React and Hooks
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import Quill from "quill";
import ImageUploader from "quill-image-uploader";
import axios from "axios";
import "quill-image-uploader/dist/quill.imageUploader.min.css";

Quill.register("modules/imageUploader", ImageUploader);
// Services
import {
  BLOG_BASE_URL,
  createBlog,
  getBlog,
  updateBlogNoImg,
  updateBlogWithImg,
} from "../../service/blogsService";
// Utilities
// Context and Hooks
import { useGlobalContext } from "../../context/useGlobalContext";
import { useAuthContext } from "../../context/auth/useAuthContext";
// Components
import PromptSignIn from "../Reuseables/PromptSignIn";
import NotAuthorized from "../Reuseables/NotAuthorized";
import { getUser } from "../../service/authService";
// outside constants | rich text vars

const BlogManager = () => {
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["link", "image", "video"],
      ["clean"],

      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      [{ direction: "rtl" }],
    ],
    // imageUploader: {
    //   upload: (file) => {
    //     return new Promise(async (resolve, reject) => {
    //       try {
    //         const formData = new FormData();
    //         formData.append("file", file);

    //         const response = await axios.post("YOUR_BACKEND_UPLOAD_ENDPOINT", formData, {
    //           headers: {
    //             "Content-Type": "multipart/form-data",
    //           },
    //         });

    //         if (response.status === 200) {
    //           resolve(response.data.url); // Resolve with the uploaded image URL
    //         } else {
    //           reject("Image upload failed");
    //         }
    //       } catch (error) {
    //         reject(error.response?.data?.message || "An error occurred during image upload");
    //       }
    //     });
    //   },
    // },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "color",
    "background",
    "align",
    "direction",
  ];
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [imgPreview, setImgPreview] = useState("");
  const [editorState, setEditorState] = useState("");
  // context
  const { user } = useAuthContext();
  const { isLoading, dispatch } = useGlobalContext();
  // hooks
  const navigate = useNavigate();
  const { blogId } = useParams();

  async function processEditorContent(content) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const images = doc.querySelectorAll("img");

    const promises = Array.from(images).map(async (img) => {
      const src = img.getAttribute("src");
      if (src && src.startsWith("data:image")) {
        // Upload the base64 image to the server
        const formData = new FormData();
        formData.append("file", src);
        formData.append("title", title);

        try {
          const response = await axios.post(
            `${BLOG_BASE_URL}/editor-image-upload`,
            formData
          );
          const imageUrl = response.data.url;
          // Replace the base64 src with the uploaded URL
          img.setAttribute("src", imageUrl);
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    });

    return Promise.all(promises).then(() => {
      return doc.body.innerHTML; // Return the updated HTML content
    });
  }
  ///////////////////////////
  // Handle Submit
  ///////////////////////////
  const handleSubmit = async (e) => {
    e.preventDefault();
    // edit existing form

    // Usage before saving
    const processedContent = await processEditorContent(editorState);
    if (img === null && blogId) {
      const formData = {
        title,
        content: processedContent,
      };
      dispatch({ type: "startLoading" });
      try {
        await updateBlogNoImg(formData, blogId);
        navigate(`/blogs`);
      } catch (err) {
        console.error(err);
        console.log(`Could not update blog post | (no photo updates)`);
      } finally {
        dispatch({ type: "stopLoading" });
      }
    } else if (img && blogId) {
      const dataToSendToServer = new FormData();
      dataToSendToServer.append("img", img);
      dataToSendToServer.append("title", title);
      dataToSendToServer.append("content", processedContent);
      try {
        await updateBlogWithImg(dataToSendToServer, blogId);
        navigate(`/blogs`);
      } catch (err) {
        console.error(err);
        console.log(`Could not update blog post | (YES photo update)`);
      } finally {
        dispatch({ type: "stopLoading" });
      }
    } else {
      // create new form
      const dataToSendToServer = new FormData();
      dataToSendToServer.append("owner", user._id);
      dataToSendToServer.append("img", img);
      dataToSendToServer.append("title", title);
      dataToSendToServer.append("content", processedContent);
      try {
        await createBlog(dataToSendToServer);
        navigate(`/blogs`);
      } catch (err) {
        console.error(err);
        console.log(`Could not create blog post`);
      } finally {
        dispatch({ type: "stopLoading" });
      }
    }
  };

  ///////////////////////////
  // Hanlde File Change
  ///////////////////////////
  const handleFileChange = (e) => {
    const { target } = e;
    setImg(target.files[0]);
    setImgPreview(URL.createObjectURL(target.files[0]));
  };

  ///////////////////////////
  // Fetch Existing Blog
  ///////////////////////////
  useEffect(() => {
    if (blogId) {
      const fetchExistingBlog = async () => {
        try {
          const existingBlogData = await getBlog(blogId);
          setTitle(existingBlogData.title);
          setImg(null);
          setEditorState(existingBlogData.content);
        } catch (err) {
          console.error(err);
          console.log("Cannot find existing blog");
        }
      };
      fetchExistingBlog();
    }
  }, [blogId]);

  useEffect(() => {
    getUser();
  }, []);

  if (user?._id !== import.meta.env.VITE_REACT_APP_ADMIN_ID)
    return <NotAuthorized />;
  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4 max-w-[160rem] mx-auto pt-12 mt-52 md:mt-80">
      <div className="w-full min-h-[75svh] flex flex-col justify-between lg:w-1/2 bg-neutral-900 text-gray-300 rounded-lg shadow-md p-4">
        <div className=" ">
          {/* title */}
          <label className="text-4xl capitalize " htmlFor="title">
            blog title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            id="title"
            className="w-full  bg-[#111213] text-gray-300 rounded-lg shadow-md p-4 my-8"
            type="text"
          />
          {/* header */}
          <label className="text-4xl capitalize " htmlFor="img">
            header image
          </label>
          <input
            onChange={handleFileChange}
            name="img"
            id="img"
            className="w-full  bg-[#111213] text-gray-300 rounded-lg shadow-md p-4 my-8"
            type="file"
          />
          {/* content */}
          <label className="text-4xl capitalize">Blog content</label>
          <ReactQuill
            className="my-8"
            theme="snow"
            value={editorState}
            onChange={setEditorState}
            modules={modules}
            formats={formats}
          />{" "}
        </div>
        {/* create vs edit based on blogId param */}
        {blogId ? (
          <div className="w-full flex gap-4">
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="mt-4 w-full bg-gray-600 text-gray-200 px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
            >
              Cancel
            </button>{" "}
            <button
              onClick={(e) => {
                handleSubmit(e);
              }}
              className="mt-4 w-full bg-gray-600 text-gray-200 px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
            >
              Update
            </button>
          </div>
        ) : (
          <button
            onClick={(e) => {
              handleSubmit(e);
            }}
            className="mt-4 bg-gray-600 text-gray-200 px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
          >
            {isLoading ? "Submitting Blog..." : "Create Blog"}
          </button>
        )}
      </div>
      <div className="w-full min-h-[75svh] lg:w-1/2 bg-neutral-900 text-gray-300 rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold mb-2">Preview</h2>
        <div className="ql-snow">
          {/* header and date */}
          <div className="mt-12">
            <img
              className="max-w-96 mx-auto my-8 cursor-pointer"
              src={imgPreview}
              alt=""
            />
            <div className=" w-9/12 text-start ml-20 mt-12">
              <span className=" text-gray-100 text-xl ">
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                &mdash; Cassius Reynolds Tech Blogs
              </span>
            </div>
          </div>
          <div className="text-center w-full my-12">
            <span className="text-4xl ">{title}</span>
          </div>
          <div
            // must add ql-editor class to parent for the styles to properly load
            className="preview ql-editor bg-[#111213] p-4 rounded-lg"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(editorState, {
                ADD_ATTR: ["style", "class"],
              }),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default BlogManager;
