import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfUse from "./TermsOfUse";
import "./styles.css";

const path = window.location.pathname.replace(/\/$/, "") || "/";
const page = path === "/privacy" ? <PrivacyPolicy /> : path === "/terms" ? <TermsOfUse /> : <App />;

if (path === "/privacy") document.title = "Privacy policy — Ecloria";
if (path === "/terms") document.title = "Terms of use — Ecloria";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {page}
  </StrictMode>,
);
