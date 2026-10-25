
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Prediction from "./pages/Prediction";
import Forecast from "./pages/Forecast";
import ComingSoon from "./pages/ComingSoon";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predict" element={<Prediction />} />
        <Route path="/forecast" element={<Forecast />} />
        <Route
          path="/insights"
          element={
            <ComingSoon
              title="Market Insights"
              description="Explore Pune real estate news, locality sentiment, and market intelligence."
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
