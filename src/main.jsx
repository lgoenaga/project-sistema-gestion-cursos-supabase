import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

if (
  window.location.pathname === "/project-sistema-gestion-cursos-supabase/"
  && !window.location.hash
) {
  window.location.replace(
    "/project-sistema-gestion-cursos-supabase/#/"
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);