import Home from "./pages/Home";
import Loans from "./pages/Loans";
import More from "./pages/More";
import { Routes, Route, Navigate } from "react-router-dom";
import UserLogin from "./pages/UserLogin";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import { MemberProvider } from "./components/MemberContext";
import { Outlet } from "react-router-dom";
import RoleBasedAccess from "./components/RoleBasedAccess";
import { GenelDataProvider } from "./components/admin-pages-comps/GeneralDataContext";
import Dashboard from "./pages/adimin-pages/Dashboard";
import { RoleRedirect } from "./components/RoleRedirect";
import LoansAdmin from "./pages/adimin-pages/LoansAdmin";
import Transactions from "./pages/adimin-pages/Transactions";
import DataFeedback from "./components/admin-pages-comps/DataFeedback";
import TransEditing from "./pages/adimin-pages/TransEditing";
import LoanClearing from "./pages/adimin-pages/LoanClearing";

function App() {
  return (
    <Routes>
      <Route path="/userlogin" element={<UserLogin />} />

      <Route element={<AuthOutlet fallbackPath="/userlogin" />}>
        {/* Member routes */}
        <Route
          element={
            <MemberProvider>
              <Outlet />
            </MemberProvider>
          }
        >
          <Route
            element={
              <RoleBasedAccess allowedRoles={["admin", "editor", "user"]} />
            }
          >
            <Route index element={<Home />} />
            <Route path="loans" element={<Loans />} />
            <Route path="more" element={<More />} />
          </Route>
        </Route>

        {/* Admin routes */}
        <Route
          element={
            <GenelDataProvider>
              <Outlet />
            </GenelDataProvider>
          }
        >
          <Route
            element={<RoleBasedAccess allowedRoles={["admin", "editor"]} />}
          >
            <Route path="admin-dashboard" element={<Dashboard />} />
            <Route path="admin-loans" element={<LoansAdmin />} />
            <Route path="transactions" element={<Transactions />} />
          </Route>
          <Route element={<RoleBasedAccess allowedRoles={["editor"]} />}>
            <Route path="data-feedback" element={<DataFeedback />} />
            <Route path="loan-clearing" element={<LoanClearing />} />
            <Route path="trans-edit" element={<TransEditing />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<RoleRedirect />} />
    </Routes>
  );
}

export default App;
