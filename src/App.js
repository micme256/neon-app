import Home from "./pages/Home";
import Loans from "./pages/Loans";
import More from "./pages/More";
import { Routes, Route, Navigate } from "react-router-dom";
import UserLogin from "./pages/UserLogin";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import { MemberProvider } from "./components/MemberContext";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/userlogin" element={<UserLogin />} />
      <Route element={<AuthOutlet fallbackPath="/userlogin" />}>
        <Route
          element={
            <MemberProvider>
              <Outlet />
            </MemberProvider>
          }
        >
          <Route index element={<Home />} />
          <Route path="loans" element={<Loans />} />
          <Route path="more" element={<More />} />
        </Route>
      </Route>
      <Route
        path="*"
        element={
          localStorage.getItem("_auth") ? (
            <Navigate to="/" />
          ) : (
            <Navigate to="/userlogin" />
          )
        }
      />
    </Routes>
  );
}

export default App;
