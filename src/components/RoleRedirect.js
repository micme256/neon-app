import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { Navigate } from "react-router-dom";

export const RoleRedirect = () => {
  const auth = useAuthUser;
  if (!auth()) return <Navigate to="/userlogin" />;

  const role = auth().role;
  return role === "user" ? (
    <Navigate to="/" />
  ) : (
    <Navigate to="/admin-dashboard" />
  );
};
