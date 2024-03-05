import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRouter = ({ children }) => {
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);

  useEffect(() => {
    if (status === "not-authenticated") {
      navigate("/login");
    }
  }, [status, navigate]);

  return children;
};

export default ProtectedRouter;
