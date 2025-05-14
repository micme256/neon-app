import { NavLink } from "react-router-dom";

const AdminNav = () => {
  return (
    <nav className="nav-container">
      <ul>
        <li>
          <NavLink to="/admin-dashboard" end>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin-loans" end>
            Loans
          </NavLink>
        </li>
        <li>
          <NavLink to="/transactions" end>
            Transactions
          </NavLink>
        </li>
        <li>
          <NavLink to="/" end>
            My Account
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
