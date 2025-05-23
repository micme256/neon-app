import { NavLink } from "react-router-dom";

const AdminNav = () => {
  return (
    <nav className="nav-container">
      <ul>
        <li>
          <NavLink to="/admin-dashboard" end>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>view-dashboard</title>
              <path d="M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z" />
            </svg>
            <h1>Dash</h1>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin-loans" end>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>cash-multiple</title>
              <path d="M5,6H23V18H5V6M14,9A3,3 0 0,1 17,12A3,3 0 0,1 14,15A3,3 0 0,1 11,12A3,3 0 0,1 14,9M9,8A2,2 0 0,1 7,10V14A2,2 0 0,1 9,16H19A2,2 0 0,1 21,14V10A2,2 0 0,1 19,8H9M1,10H3V20H19V22H1V10Z" />
            </svg>
            <h1>Loans</h1>
          </NavLink>
        </li>
        <li>
          <NavLink to="/transactions" end>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>transfer</title>
              <path d="M8 4A2 2 0 0 0 6 6V10H8V6H16V9H13.5L17 12.5L20.5 9H18V6A2 2 0 0 0 16 4H8M3 12V14H11V12H3M3 15V17H11V15H3M13 15V17H21V15H13M3 18V20H11V18H3M13 18V20H21V18H13Z" />
            </svg>
            <h1>Transact</h1>
          </NavLink>
        </li>
        <li>
          <NavLink to="/" end>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>account-circle</title>
              <path d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" />
            </svg>
            <h1>Account</h1>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
