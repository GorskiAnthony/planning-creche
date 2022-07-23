import React from "react";
import ReactDOM from "react-dom/client";
import App from "@pages/App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "@context/AuthContextProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </BrowserRouter>
);
