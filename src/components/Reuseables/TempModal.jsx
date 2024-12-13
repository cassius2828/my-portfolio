const TempModal = ({ setShowGuestModal }) => {
  return (
    <div className="bg-black/30 h-screen w-screen fixed top-0 left-0 z-50 flex justify-center items-center ">
      <div className="w-10/12 max-w-[50rem] mx-auto max-h-96 bg-gray-100 text-gray-900 p-6 rounded-lg shadow-lg relative fadeIn">
        <h2 className="text-xl font-bold mb-4 text-center">
          Guest Login Information
        </h2>
        <p className="mb-4 text-gray-700">
          All projects that have a user as an option can use the following login
          to bypass registration:
        </p>
        <div className="bg-gray-200 p-4 rounded-md mb-4">
          <p>
            <span className="font-semibold">Username:</span> Guest
          </p>
          <p>
            <span className="font-semibold">Password:</span> 123
          </p>
        </div>
        <p className="text-gray-700">
          Having a user is optional, but will lead to the full experience of
          said apps.
        </p>
        <div className="flex justify-between items-center">
          <p className="text-gray-700">
            Thank you for looking at my portfolio and enjoy the projects!
          </p>

          <button
            onClick={() => setShowGuestModal(false)}
            className="bg-red-500 rounded-md text-gray-100 py-2 px-4 mt-4"
          >
            Close
          </button>
        </div>
        <button
          onClick={() => setShowGuestModal(false)}
          className="absolute top-1 right-3 text-xl"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default TempModal;
