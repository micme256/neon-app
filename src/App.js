import Home from "./components/Home";
import Loans from "./components/Loans";
import More from "./components/More";
import { Routes, Route, Navigate } from "react-router-dom";
import UserLogin from "./components/UserLogin";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";

function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthOutlet fallbackPath="/userlogin" />}>
          <Route path="/" element={<Home />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/more" element={<More />} />
        </Route>
        <Route path="/userlogin" element={<UserLogin />} />
        <Route
          path="*"
          element={
            localStorage.getItem("_auth") ? <Navigate to="/" /> : <UserLogin />
          }
        />
      </Routes>
    </>
  );
}

export default App;
