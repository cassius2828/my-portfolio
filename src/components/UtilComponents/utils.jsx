import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalContext } from "../../context/useGlobalContext";
import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";

export const FixedUtilComponents = () => {
  const { scrollToTop, setShowGuestModal } = useGlobalContext();

  return (
    <>
      <button onClick={scrollToTop} className="fixed right-7 bottom-7 z-50">
        <FontAwesomeIcon
          className="hover:text-blue-300 transition-colors"
          size="2xl"
          icon={faArrowCircleUp}
        />
      </button>
      <button
        onClick={() => setShowGuestModal(true)}
        className="fixed right-20 bottom-7 bg-gray-100 p-2 flex justify-center items-center text-gray-900 rounded-md z-50"
      >
        show guest login info
      </button>
    </>
  );
};
