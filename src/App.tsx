import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import ProfileLayout from "./layouts/ProfileLayout";

import Home from "./pages/Home";
import Shops from "./pages/Shops";
import Payment from "./pages/Payment";
import Delivery from "./pages/Delivery";
import Service from "./pages/Service";
import Contacts from "./pages/Contacts";
import About from "./pages/About";
import SignIn from "./pages/SignIn";

import PrivateRoute from "./components/PrivateRoute";
import Customer from "./pages/profile/Customer";
import MyOrders from "./pages/profile/MyOrders";
import MyReviews from "./pages/profile/MyReviews";
import Favorites from "./pages/profile/Favorites";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="shops" element={<Shops />} />
        <Route path="payment" element={<Payment />} />
        <Route path="delivery" element={<Delivery />} />
        <Route path="service" element={<Service />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="about" element={<About />} />
        <Route path="signin" element={<SignIn />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="profile" element={<ProfileLayout />}>
          <Route path="customer" element={<Customer />} />
          <Route path="myorders" element={<MyOrders />} />
          <Route path="myreviews" element={<MyReviews />} />
          <Route path="favorites" element={<Favorites />} />
        </Route>
      </Route>

      {/* 404 ? */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
