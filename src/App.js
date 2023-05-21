import Register from "./components/authentication-components/Register";
import Login from "./components/authentication-components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Rooms from "./components/room-components/Rooms";
import Users from "./components/user-components/Users";
import Bookings from "./components/booking-components/Bookings";
import Contact from "./components/Contact";
import BookingHistory from "./components/booking-components/BookingHistory";
import { useEffect } from "react";

function App() {
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (
      userId === "null" &&
      (window.location.pathname === "/accounts" ||
        window.location.pathname === "/bookings" ||
        window.location.pathname === "/my-bookings")
    ) {
      alert("Please log in to access this page.");
      window.location.href = "/";
    }
  }, [userId]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/accounts" element={<Users />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my-bookings" element={<BookingHistory />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
