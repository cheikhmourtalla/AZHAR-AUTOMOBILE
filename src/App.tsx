import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import Reservations from "./pages/Reservations";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import { useReservations } from "./hooks/useReservations";

export default function App() {
  const { reservations, addReservation, deleteReservation } = useReservations();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        
        {/* ✅ Navbar seulement si connecté */}
        {user && <Navbar />}

        <Routes>
          {/* ✅ Login */}
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />

          {/* ✅ Pages protégées */}
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />

          <Route
            path="/cars"
            element={
              user ? (
                <Cars onAddReservation={addReservation} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/reservations"
            element={
              user ? (
                <Reservations
                  reservations={reservations}
                  onDeleteReservation={deleteReservation}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/contact"
            element={user ? <Contact /> : <Navigate to="/login" />}
          />
        </Routes>

        {/* ✅ Footer seulement si connecté */}
        {user && <Footer />}
      </div>
    </BrowserRouter>
  );
}