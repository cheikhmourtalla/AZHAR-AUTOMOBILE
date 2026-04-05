import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import Reservations from "./pages/Reservations";
import Contact from "./pages/Contact";
import { useReservations } from "./hooks/useReservations";

export default function App() {
  const { reservations, addReservation, deleteReservation } = useReservations();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        
        {/* Navbar toujours visible */}
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/cars"
            element={<Cars onAddReservation={addReservation} />}
          />

          <Route
            path="/reservations"
            element={
              <Reservations
                reservations={reservations}
                onDeleteReservation={deleteReservation}
              />
            }
          />

          <Route path="/contact" element={<Contact />} />
        </Routes>

        {/* Footer toujours visible */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}