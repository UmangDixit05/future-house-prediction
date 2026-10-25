
import { useState } from "react";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  IndianRupee,
  MapPin,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { predictPropertyPrice } from "../services/predictionService";
import "./Prediction.css";

const initialForm = {
  locality: "Hinjewadi",
  propertyType: "Apartment",
  area: "1000",
  bhk: "2",
  propertyAge: "5",
  furnishing: "Semi",
};

const localities = [
  "Hinjewadi",
  "Wakad",
  "Baner",
  "Balewadi",
  "Kharadi",
  "Viman Nagar",
  "Hadapsar",
  "Pimpri-Chinchwad",
  "Kothrud",
  "Magarpatta",
];

function formatPrice(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function Prediction() {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const prediction = await predictPropertyPrice(form);
      setResult(prediction);
    } catch (err) {
      setError(err.message || "Unable to estimate this property.");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setForm(initialForm);
    setResult(null);
    setError("");
  }

  return (
    <main className="prediction-page">
      <section className="prediction-hero">
        <div className="prediction-hero-copy">
          <span className="prediction-eyebrow">
            <Sparkles size={15} />
            PROPERTY INTELLIGENCE
          </span>

          <h1>
            Discover what your
            <span> property could be worth.</span>
          </h1>

          <p>
            Explore an estimated property value across Pune using your
            property's details. Real model predictions will be connected
            when the project API is ready.
          </p>

          <div className="prediction-trust">
            <span><MapPin size={16} /> Pune-wide coverage</span>
            <span><Building2 size={16} /> Multiple property types</span>
          </div>
        </div>

        <div className="prediction-hero-art" aria-hidden="true">
          <div className="prediction-art-circle" />
          <div className="prediction-art-card">
            <div className="prediction-art-icon">
              <Building2 size={27} />
            </div>
            <span>Real estate estimate</span>
            <strong>Made for Pune</strong>
            <div className="prediction-art-line" />
            <div className="prediction-art-bars">
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      </section>

      <section className="prediction-workspace">
        <div className="prediction-form-card">
          <div className="prediction-section-heading">
            <div className="prediction-heading-icon">
              <Building2 size={20} />
            </div>
            <div>
              <h2>Property details</h2>
              <p>Tell us about the property you want to evaluate.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="prediction-form-grid">
              <label className="prediction-field">
                Pune locality
                <select
                  name="locality"
                  value={form.locality}
                  onChange={handleChange}
                >
                  {localities.map((locality) => (
                    <option key={locality} value={locality}>
                      {locality}
                    </option>
                  ))}
                </select>
              </label>

              <label className="prediction-field">
                Property type
                <select
                  name="propertyType"
                  value={form.propertyType}
                  onChange={handleChange}
                >
                  <option>Apartment</option>
                  <option>Villa</option>
                  <option>Independent House</option>
                </select>
              </label>

              <label className="prediction-field">
                Built-up area (sq. ft.)
                <input
                  name="area"
                  type="number"
                  min="200"
                  max="20000"
                  required
                  value={form.area}
                  onChange={handleChange}
                  placeholder="e.g. 1000"
                />
              </label>

              <label className="prediction-field">
                Bedrooms (BHK)
                <select
                  name="bhk"
                  value={form.bhk}
                  onChange={handleChange}
                >
                  <option value="1">1 BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4">4 BHK</option>
                  <option value="5">5 BHK</option>
                  <option value="6">6+ BHK</option>
                </select>
              </label>

              <label className="prediction-field">
                Property age
                <select
                  name="propertyAge"
                  value={form.propertyAge}
                  onChange={handleChange}
                >
                  <option value="0">New construction</option>
                  <option value="5">1–5 years</option>
                  <option value="10">6–10 years</option>
                  <option value="15">11–20 years</option>
                  <option value="25">20+ years</option>
                </select>
              </label>

              <label className="prediction-field">
                Furnishing
                <select
                  name="furnishing"
                  value={form.furnishing}
                  onChange={handleChange}
                >
                  <option value="Unfurnished">Unfurnished</option>
                  <option value="Semi">Semi-furnished</option>
                  <option value="Furnished">Fully furnished</option>
                </select>
              </label>
            </div>

            {error && (
              <p className="prediction-error" role="alert">
                {error}
              </p>
            )}

            <div className="prediction-form-actions">
              <button
                className="prediction-submit"
                type="submit"
                disabled={loading}
              >
                {loading ? "Calculating..." : "Estimate property value"}
                {!loading && <ArrowRight size={18} />}
              </button>

              <button
                className="prediction-reset"
                type="button"
                onClick={handleReset}
              >
                <RotateCcw size={16} />
                Reset
              </button>
            </div>
          </form>
        </div>

        <aside className="prediction-result-card" aria-live="polite">
          <div className="prediction-result-top">
            <div className="prediction-result-icon">
              <IndianRupee size={22} />
            </div>
            <span className="prediction-demo-tag">DEMO MODE</span>
          </div>

          <p className="prediction-result-label">Estimated property value</p>

          {result ? (
            <>
              <h2 className="prediction-result-price">
                {formatPrice(result.estimatedPrice)}
              </h2>

              <p className="prediction-result-location">
                <MapPin size={15} />
                {form.locality}, Pune
              </p>

              <div className="prediction-result-divider" />

              <div className="prediction-metric">
                <span>Estimated rate per sq. ft.</span>
                <strong>{formatPrice(result.pricePerSqFt)}</strong>
              </div>

              <div className="prediction-range">
                <span>Illustrative price range</span>
                <strong>
                  {formatPrice(result.lowerPrice)} –{" "}
                  {formatPrice(result.upperPrice)}
                </strong>
              </div>

              <p className="prediction-result-note">
                <CheckCircle2 size={15} />
                Your property details have been processed.
              </p>
            </>
          ) : (
            <div className="prediction-empty">
              <div className="prediction-empty-icon">
                <IndianRupee size={28} />
              </div>
              <h3>Your estimate will appear here</h3>
              <p>
                Enter the property details and select “Estimate property
                value” to see an illustrative result.
              </p>
            </div>
          )}

          <div className="prediction-demo-disclaimer">
            <strong>Important</strong>
            <p>
              Demo estimates only. These values are generated from
              illustrative assumptions, not live Pune market data or a
              trained prediction model.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
