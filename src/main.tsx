import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </React.StrictMode>
  );
} else {
  throw new Error("Root element not found");
}
