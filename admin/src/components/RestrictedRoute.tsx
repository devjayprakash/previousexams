import { notification } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RestrictedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      notification.info({
        message: "You need to login first",
        description: "You will be redirected to the login page",
      });
    }
  }, [navigate]);

  return <>{children}</>;
};

export default RestrictedRoute;
