import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import Reservations from "./pages/Reservations";
import Contact from "./pages/Contact";
import ReservationPage from "./pages/ReservationPage";
import AuthModal from "./components/AuthModal";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { useReservations } from "./hooks/useReservations";

function AppContent() {
  const { isAuthenticated, reservations: _ } = { isAuthenticated: false, reservations: [] };
  const auth = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { reservations, addReservation, deleteReservation } = useReservations(auth.isAuthenticated);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar
          reservationCount={reservations.length}
          user={auth.user}
          onLoginClick={() => setAuthModalOpen(true)}
          onLogout={auth.logout}
        />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/cars"
              element={
                <Cars
                  onAddReservation={addReservation}
                  onLoginRequired={() => setAuthModalOpen(true)}
                  isAuthenticated={auth.isAuthenticated}
                />
              }
            />
            <Route
              path="/reservations"
              element={
                <Reservations
                  reservations={reservations}
                  onDeleteReservation={deleteReservation}
                  isAuthenticated={auth.isAuthenticated}
                  onLoginRequired={() => setAuthModalOpen(true)}
                />
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/reserver/:carId"
              element={
                <ReservationPage
                  onAddReservation={addReservation}
                  isAuthenticated={auth.isAuthenticated}
                  onLoginRequired={() => setAuthModalOpen(true)}
                />
              }
            />
          </Routes>
        </main>

        <Footer />

        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
        />
      </div>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}