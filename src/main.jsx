import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { router } from "./router";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import SmoothScroll from "./components/ui/SmoothScroll";

import "./../public/css/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider>
      <ThemeProvider>
        <SmoothScroll>
          <RouterProvider router={router} />
        </SmoothScroll>
      </ThemeProvider>
    </LanguageProvider>
  </React.StrictMode>
);