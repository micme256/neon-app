import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { Link } from "react-router-dom";

const Nav = () => {
  const auth = useAuthUser();
  const admin = auth.role !== "user";
  return (
    <>
      <nav className="nav-container">
        <ul>
          <li>
            <Link to="/">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>home-account</title>
                <path d="M12,3L2,12H5V20H19V12H22L12,3M12,8.75A2.25,2.25 0 0,1 14.25,11A2.25,2.25 0 0,1 12,13.25A2.25,2.25 0 0,1 9.75,11A2.25,2.25 0 0,1 12,8.75M12,15C13.5,15 16.5,15.75 16.5,17.25V18H7.5V17.25C7.5,15.75 10.5,15 12,15Z" />
              </svg>
              <h1>Home</h1>
            </Link>
          </li>
          <li>
            <Link to="/loans">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>cash-100</title>
                <path d="M2,5H22V20H2V5M20,18V7H4V18H20M17,8A2,2 0 0,0 19,10V15A2,2 0 0,0 17,17H7A2,2 0 0,0 5,15V10A2,2 0 0,0 7,8H17M17,13V12C17,10.9 16.33,10 15.5,10C14.67,10 14,10.9 14,12V13C14,14.1 14.67,15 15.5,15C16.33,15 17,14.1 17,13M15.5,11A0.5,0.5 0 0,1 16,11.5V13.5A0.5,0.5 0 0,1 15.5,14A0.5,0.5 0 0,1 15,13.5V11.5A0.5,0.5 0 0,1 15.5,11M13,13V12C13,10.9 12.33,10 11.5,10C10.67,10 10,10.9 10,12V13C10,14.1 10.67,15 11.5,15C12.33,15 13,14.1 13,13M11.5,11A0.5,0.5 0 0,1 12,11.5V13.5A0.5,0.5 0 0,1 11.5,14A0.5,0.5 0 0,1 11,13.5V11.5A0.5,0.5 0 0,1 11.5,11M8,15H9V10H8L7,10.5V11.5L8,11V15Z" />
              </svg>
              <h1>Loans</h1>
            </Link>
          </li>
          <li>
            <Link to="/more">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>more</title>
                <path d="M19,13.5A1.5,1.5 0 0,1 17.5,12A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 20.5,12A1.5,1.5 0 0,1 19,13.5M14,13.5A1.5,1.5 0 0,1 12.5,12A1.5,1.5 0 0,1 14,10.5A1.5,1.5 0 0,1 15.5,12A1.5,1.5 0 0,1 14,13.5M9,13.5A1.5,1.5 0 0,1 7.5,12A1.5,1.5 0 0,1 9,10.5A1.5,1.5 0 0,1 10.5,12A1.5,1.5 0 0,1 9,13.5M22,3H7C6.31,3 5.77,3.35 5.41,3.88L0,12L5.41,20.11C5.77,20.64 6.37,21 7.06,21H22A2,2 0 0,0 24,19V5C24,3.89 23.1,3 22,3Z" />
              </svg>
              <h1>More</h1>
            </Link>
          </li>
          {admin && (
            <li>
              <Link to="/admin-dashboard">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <title>view-dashboard</title>
                  <path d="M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z" />
                </svg>
                <h1>Admin</h1>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Nav;
