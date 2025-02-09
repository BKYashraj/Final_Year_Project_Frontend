// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Redux/store.js";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@material-tailwind/react";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
    <ThemeProvider>
      <App />
      <Toaster />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);
