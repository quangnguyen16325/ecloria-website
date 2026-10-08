import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import PrivacyPolicy from "./PrivacyPolicy";
import "./styles.css";

const page = window.location.pathname === "/privacy" ? <PrivacyPolicy /> : <App />;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {page}
  </StrictMode>,
);
