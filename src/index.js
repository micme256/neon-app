import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";
import App from "./App";

const store = createStore({
  authName: "_auth",
  authType: "localStorage",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "http:",
});
const container = document.getElementById("app");
const root = createRoot(container);
root.render(
  <AuthProvider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
);
