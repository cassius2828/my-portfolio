const NotFound404 = ({
  text = "No content was found. Please navigate to another route.",
}) => {
  return (
    <div className="mt-20">
      <h1 className="flex flex-col relative h-screen leading-[5rem] md:leading-normal z-20 text-5xl md:text-7xl text-gray-100 w-3/4 text-center left-1/2 -translate-x-1/2">
        <span className="mb-12">404 -- Not Found</span>{" "}
        <span className="font-serif">{text}</span>
      </h1>
      <div className="h-screen w-screen flex justify-center items-center text-8xl text-gray-100 fixed"></div>
    </div>
  );
};
export default NotFound404;
