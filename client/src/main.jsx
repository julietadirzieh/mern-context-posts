import React from "react";
import ReactDOM from "react-dom/client";
import "./input.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthProvider from "./context/authContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
