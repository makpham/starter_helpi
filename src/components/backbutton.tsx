import { Button } from "react-bootstrap";
import "./backbutton.css";
import { useNavigate } from "react-router-dom";

interface props {
  page: string;
}

function BackButton(prop: props) {
  const navigate = useNavigate();
  const setPage = (path: string) => {
    navigate(path);
  };
  return (
    <Button
      id="back-button"
      className="Merienda"
      onClick={() => setPage(prop.page)}
    >
      &lt;
    </Button>
  );
}

export default BackButton;
