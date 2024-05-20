import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import RedirectModal from "./RedirectModal";
import { useState } from "react";
import "./ChangeQuestionType.css";

interface props {
  page: string;
  text: string;
  isQuestionAnswered: boolean;
}

function ChangeQuestionType(prop: props) {
  const navigate = useNavigate();

  // State to control the visibility of the RedirectModal
  const [showModal, setShowModal] = useState(false);

  const setPage = (path: string) => {
    if (prop.isQuestionAnswered) {
      setShowModal(true);
    } else {
      navigate(path);
    }
  };

  const handleConfirm = () => {
    setShowModal(false); // Hide the modal
    navigate(prop.page); // Navigate to the new page
  };

  const handleCancel = () => {
    setShowModal(false); // Hide the modal
  };

  return (
    <>
      <Button
        className="Merienda"
        id="change-type"
        onClick={() => setPage(prop.page)}
        title="Do detailed questionaire instead"
      >
        {prop.text}
      </Button>
      <RedirectModal
        show={showModal}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      />
    </>
  );
}

export default ChangeQuestionType;
