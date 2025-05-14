import { Navigate, Outlet } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const RoleBasedAccess = ({ allowedRoles }) => {
  const auth = useAuthUser();

  if (!auth || !allowedRoles.includes(auth.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default RoleBasedAccess;
