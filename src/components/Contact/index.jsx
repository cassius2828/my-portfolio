// src/components/Contact.jsx
import axios from "axios";
import { useState } from "react";
const initialFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
  affiliation: "",
  connection: "recruiter",
};
const url = `http://localhost:3000/contact/contact-form-submission`;
const Contact = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(url, formData);

      if (response.status === 200) {
        setMessage("Email successfully sent to cassius.reynolds.dev@gmail.com");
        setError("");
        setFormData(initialFormData);
        setTimeout(() => {
          setMessage("");
        }, 3000);
      } else {
        setMessage("");
        setError("Failed to send email.");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    } catch (err) {
      setMessage("");

      if (err.response) {
        // Server responded with a status other than 200 range
        setError(
          `Error: ${err.response.data.error || "Unknown error occurred."}`
        );
      } else if (err.request) {
        setError("Error: No response from the server.");
      } else {
        setError(`Error: ${err.message}`);
      }
    }
  };

  const handleInputUpdate = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <section id="contact" className="h-screen bg-gray-700 relative">
      <div className="absolute h-full w-full bg-[#080404]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>
      <div className="relative">
        <h2 className="text-4xl md:text-5xl font-bold pt-20 text-center text-gray-100">
          Contact Me Today
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center   py-10 gap-12">
          {/* contact info */}
          <div className="rounded-md bg-gray-800 w-full md:w-auto p-8 h-[35rem] text-gray-100 shadow-lg flex items-center gap-4">
            <div className="w-1/2 md:w-full h-full flex flex-col justify-center gap-12">
              <p className="mb-4 text-xl md:text-2xl">
                <span className="text-2xl md:text-3xl font-semibold">
                  Cell:
                </span>{" "}
                (707) 724-1815
              </p>
              <p className="mb-4">
                <span className="text-2xl md:text-3xl font-semibold">
                  Email:
                </span>{" "}
                <a
                  href="mailto:cassius.reynolds.dev@gmail.com"
                  className="text-blue-400 hover:underline text-xl md:text-2xl"
                >
                  cassius.reynolds.dev@gmail.com
                </a>
              </p>
              <p className="mb-4">
                <span className="text-2xl md:text-3xl font-semibold">
                  LinkedIn:
                </span>{" "}
                <a
                  href=""
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 hover:underline text-xl md:text-2xl"
                >
                  Cassius Reynolds
                </a>
              </p>
              <p>
                <span className="text-2xl md:text-3xl font-semibold">
                  GitHub:
                </span>{" "}
                <a
                  href="https://github.com/cassius2828"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 hover:underline text-xl md:text-2xl"
                >
                  github/cassius2828
                </a>
              </p>
            </div>
            <div className="w-1/2 md:w-full">
              <img
                className="w-80 mt-5"
                src="https://cdn.prod.website-files.com/5fd2ba952bcd68835f2c8254/654553fedbede7976b97eaf5_Professional-5.remini-enhanced.webp"
                alt=""
              />
            </div>
          </div>
          {/* form */}
          <form className="mt-4 w-full max-w-lg min-h-[35rem] bg-gray-800 p-8 rounded-md shadow-lg">
            {message && <span className="text-green-500">{message}</span>}
            {error && <span className="text-red-500">{error}</span>}
            <div className="mb-4">
              <label className="block text-gray-200 mb-2 md:text-xl">
                Name
              </label>
              <input
                onChange={handleInputUpdate}
                value={formData.name}
                type="text"
                name="name"
                className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-200 mb-2 md:text-xl">
                Email
              </label>
              <input
                value={formData.email}
                onChange={handleInputUpdate}
                type="email"
                name="email"
                className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-200 mb-2 md:text-xl">
                Subject
              </label>
              <input
                onChange={handleInputUpdate}
                value={formData.subject}
                type="text"
                name="subject"
                className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
              ></input>
            </div>
            <div className="mb-4">
              <label className="block text-gray-200 mb-2 md:text-xl">
                Company / Affiliation
              </label>
              <input
                onChange={handleInputUpdate}
                value={formData.affiliation}
                type="text"
                name="affiliation"
                className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-200 mb-2 md:text-xl">
                Message
              </label>
              <textarea
                name="message"
                onChange={handleInputUpdate}
                value={formData.message}
                className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-200 mb-2 md:text-xl">
                Your Role or Connection
              </label>
              <select
                onChange={handleInputUpdate}
                value={formData.connection}
                name="connection"
                className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white md:text-xl"
              >
                <option value="recruiter">recruiter</option>
                <option value="freelance client">freelance client</option>
                <option value="collaborative developer">
                  collaborative developer
                </option>
                <option value="other">other</option>
              </select>
            </div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors md:text-xl"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
