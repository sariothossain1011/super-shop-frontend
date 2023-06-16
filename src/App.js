import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import NotFoundPage from "./pages/users/NotFoundPage";
import HomePage from "./pages/users/HomePage";
import RegistrationPage from "./pages/auth/RegistrationPage";
import LoginPage from "./pages/auth/LoginPage";
import MasterLayout from "./components/masterLayout/MasterLayout";
import ProductPage from "./pages/users/ProductPage";
import CartPage from "./pages/users/CartPage";
import OrderPage from "./pages/users/OrderPage";

const App = () => {

  return (
    <BrowserRouter>
      <Toaster />
      <MasterLayout/>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/order" element={<OrderPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
