
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import ComingSoon from './pages/ComingSoon.jsx';
import Prediction from "./pages/Prediction";

import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/predict" element={<Prediction />} />
          
          <Route
            path="/forecast"
            element={
              <ComingSoon
                title="Future Price Forecasting"
                description="Explore historical market trends and future property price estimates."
                number="02"
              />
            }
          />

          <Route
            path="/insights"
            element={
              <ComingSoon
                title="Real Estate Market Insights"
                description="Explore locality news, public sentiment, and property market intelligence."
                number="03"
              />
            }
          />

          <Route
            path="*"
            element={
              <ComingSoon
                title="Page Not Found"
                description="The page you're looking for doesn't exist yet."
                number="404"
              />
            }
          />

          
        </Routes>
      </main>
    </div>
  );
}

export default App;
