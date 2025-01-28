// React and Hooks
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
// Services
import {
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

  const quillRef = useRef(null); // Ref for the Quill editor
  const fileInputRef = useRef(null); // Ref for the hidden file input

  // Handle file selection and image upload
  const handleImageUpload = async (file) => {
    // Example: Replace this with your backend upload logic
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const { url } = await response.json(); // URL of the uploaded image
        const quill = quillRef.current.getEditor(); // Access Quill editor instance
        const range = quill.getSelection(); // Get current cursor position
        quill.insertEmbed(range.index, "image", url); // Insert the uploaded image URL
      } else {
        console.error("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // Listen for changes in the hidden file input
  useEffect(() => {
    const input = fileInputRef.current;

    const handleChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        handleImageUpload(file);
      }
    };

    if (input) {
      input.addEventListener("change", handleChange);
    }

    return () => {
      if (input) {
        input.removeEventListener("change", handleChange);
      }
    };
  }, []);

  ///////////////////////////
  // Handle Submit
  ///////////////////////////
  const handleSubmit = async (e) => {
    e.preventDefault();
    // edit existing form
    if (img === null && blogId) {
      const formData = {
        title,
        content: editorState,
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
      dataToSendToServer.append("content", editorState);
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
      dataToSendToServer.append("content", editorState);
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
    function extractImgTags(htmlString) {
      const imgTags = htmlString.match(/<img[^>]*\/>/g); // Regular expression to match <img ... />
      return imgTags || []; // Return an array of <img> tags, or an empty array if none are found
    }
    console.log(extractImgTags(editorState));
    console.log(extractImgTags(editorState));
  }, [editorState]);

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
