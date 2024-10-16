import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ManageProjects = () => {
  const { projectId } = useParams();
  useEffect(() => {
    if (projectId) {
      // run this function
    }
  }, []);
  const h1Text = projectId ? "Edit Project" : "Add a Project";
  return (
    <section
      id="add-project"
      className="min-h-screen  flex flex-col items-center justify-start mt-32"
    >
      <h1 className="text-3xl md:text-5xl mb-12">{h1Text}</h1>
      <form className="mt-4 w-full max-w-lg min-h-[35rem] bg-gray-800 p-8 rounded-md shadow-lg">
        <div className="mb-4">
          <label className="block text-gray-200 mb-2">Title</label>
          <input
            name="title"
            type="text"
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-200 mb-2">Image URL</label>
          <input
            name="img"
            type="file"
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-200 mb-2">Description</label>
          <textarea
            name="description"
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            rows="4"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-200 mb-2">
            Technologies (comma separated)
          </label>
          <input
            name="technologies"
            type="text"
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-200 mb-2">Production Link</label>
          <input
            name="prodLink"
            type="text"
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-200 mb-2">GitHub Link</label>
          <input
            name="githubLink"
            type="text"
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
        >
          {projectId ? "Update Project" : "Add Project"}
        </button>
      </form>
    </section>
  );
};
export default ManageProjects;
