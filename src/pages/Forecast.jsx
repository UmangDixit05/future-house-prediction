
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  Clock3,
  MapPin,
  RefreshCw,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  forecastLocalities,
  forecastPeriods,
  getForecastData,
  getLocalityComparison,
} from "../services/forecastService";
import "./Forecast.css";

function formatRupees(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatCompactRupees(value) {
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(2)}L`;
  }

  if (value >= 1000) {
    return `₹${(value / 1000).toFixed(1)}k`;
  }

  return `₹${value}`;
}

function formatPercent(value) {
  return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) {
    return null;
  }

  const visiblePoints = payload.filter(
    (item) => item.value !== null && item.value !== undefined
  );

  if (!visiblePoints.length) {
    return null;
  }

  return (
    <div className="forecast-tooltip">
      <span className="forecast-tooltip-month">{label}</span>

      {visiblePoints.map((item) => (
        <div className="forecast-tooltip-row" key={item.dataKey}>
          <span
            className={`forecast-tooltip-dot forecast-tooltip-dot-${item.dataKey}`}
          />
          <span>{item.name}</span>
          <strong>{formatRupees(item.value)} / sq. ft.</strong>
        </div>
      ))}
    </div>
  );
}

function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  variant = "blue",
}) {
  return (
    <article className={`forecast-metric-card forecast-metric-${variant}`}>
      <div className="forecast-metric-top">
        <span>{title}</span>
        <div className="forecast-metric-icon">
          <Icon size={19} />
        </div>
      </div>

      <strong className="forecast-metric-value">{value}</strong>
      <p>{description}</p>
    </article>
  );
}

export default function Forecast() {
  const [locality, setLocality] = useState("Hinjewadi");
  const [period, setPeriod] = useState(6);
  const [forecast, setForecast] = useState(null);
  const [comparisons, setComparisons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadForecast() {
      setLoading(true);
      setError("");

      try {
        const [forecastResult, comparisonResult] = await Promise.all([
          getForecastData(locality, period),
          getLocalityComparison(),
        ]);

        if (!cancelled) {
          setForecast(forecastResult);
          setComparisons(comparisonResult);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Unable to load forecast data.");
          setForecast(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadForecast();

    return () => {
      cancelled = true;
    };
  }, [locality, period, retryCount]);

  const chartData = forecast?.chartData ?? [];
  const currentPoint = chartData[5];

  return (
    <main className="forecast-page">
      <section className="forecast-hero">
        <div className="forecast-hero-copy">
          <span className="forecast-eyebrow">
            <Sparkles size={15} />
            REAL ESTATE INTELLIGENCE
          </span>

          <h1>
            See where Pune&apos;s
            <span> property market could go.</span>
          </h1>

          <p>
            Explore illustrative property-price trends and future scenarios
            across Pune. Compare localities and forecast periods in one
            interactive dashboard.
          </p>

          <div className="forecast-hero-points">
            <span><Activity size={16} /> Historical trends</span>
            <span><TrendingUp size={16} /> Future scenarios</span>
            <span><MapPin size={16} /> Pune-wide insights</span>
          </div>
        </div>

        <div className="forecast-hero-visual" aria-hidden="true">
          <div className="forecast-visual-orbit forecast-orbit-one" />
          <div className="forecast-visual-orbit forecast-orbit-two" />

          <div className="forecast-visual-card">
            <div className="forecast-visual-card-top">
              <div className="forecast-visual-icon">
                <TrendingUp size={22} />
              </div>
              <span>Market outlook</span>
            </div>

            <strong>Future possibilities</strong>

            <div className="forecast-visual-chart">
              <span className="forecast-visual-bar-one" />
              <span className="forecast-visual-bar-two" />
              <span className="forecast-visual-bar-three" />
              <span className="forecast-visual-bar-four" />
              <span className="forecast-visual-bar-five" />
              <span className="forecast-visual-bar-six" />
              <span className="forecast-visual-bar-seven" />
              <span className="forecast-visual-bar-eight" />
            </div>

            <div className="forecast-visual-footer">
              <span>Past trends</span>
              <span>Future scenarios</span>
            </div>
          </div>
        </div>
      </section>

      <section className="forecast-controls">
        <div className="forecast-control-intro">
          <div className="forecast-control-icon">
            <BarChart3 size={20} />
          </div>

          <div>
            <h2>Market forecast explorer</h2>
            <p>Choose an area and a forecast period.</p>
          </div>
        </div>

        <div className="forecast-control-fields">
          <label className="forecast-select-field">
            <span><MapPin size={14} /> Pune locality</span>
            <select
              value={locality}
              onChange={(event) => setLocality(event.target.value)}
            >
              {forecastLocalities.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </label>

          <label className="forecast-select-field">
            <span><CalendarDays size={14} /> Forecast period</span>
            <select
              value={period}
              onChange={(event) => setPeriod(Number(event.target.value))}
            >
              {forecastPeriods.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      {error && (
        <div className="forecast-error" role="alert">
          <p>{error}</p>
          <button
            type="button"
            onClick={() => setRetryCount((count) => count + 1)}
          >
            <RefreshCw size={15} /> Retry
          </button>
        </div>
      )}

      {loading ? (
        <section className="forecast-loading" aria-live="polite">
          <div className="forecast-loading-spinner" />
          <strong>Preparing your market outlook...</strong>
          <p>Loading the selected locality and forecast period.</p>
        </section>
      ) : forecast ? (
        <>
          <div className="forecast-context-row">
            <div>
              <span className="forecast-context-label">
                CURRENT SELECTION
              </span>
              <h2>{forecast.locality}, Pune</h2>
            </div>

            <span className="forecast-demo-badge">
              <span />
              Illustrative demo data
            </span>
          </div>

          <section className="forecast-metrics-grid">
            <MetricCard
              title="Illustrative current rate"
              value={formatRupees(forecast.currentRate)}
              description="Per square foot"
              icon={MapPin}
              variant="blue"
            />

            <MetricCard
              title={`Projected rate · ${period} months`}
              value={formatRupees(forecast.projectedRate)}
              description="Demo projection per sq. ft."
              icon={TrendingUp}
              variant="purple"
            />

            <MetricCard
              title="Illustrative change"
              value={formatPercent(forecast.projectedChangePercent)}
              description={`${formatRupees(Math.abs(forecast.projectedChange))} per sq. ft.`}
              icon={
                forecast.projectedChange >= 0
                  ? ArrowUpRight
                  : ArrowDownRight
              }
              variant="green"
            />

            <MetricCard
              title="Assumed annual growth"
              value={formatPercent(forecast.annualGrowth)}
              description="Demo assumption, not a measured statistic"
              icon={Activity}
              variant="amber"
            />
          </section>

          <section className="forecast-chart-card">
            <div className="forecast-chart-header">
              <div>
                <span className="forecast-section-eyebrow">
                  <TrendingUp size={14} />
                  PRICE TREND ANALYSIS
                </span>

                <h2>Historical trend &amp; future scenario</h2>
                <p>
                  Illustrative rate per square foot for {forecast.locality}.
                </p>
              </div>

              <div className="forecast-chart-period">
                <Clock3 size={15} />
                {period === 12 ? "12-month outlook" : `${period}-month outlook`}
              </div>
            </div>

            <div className="forecast-chart-legend">
              <span><i className="legend-history" /> Historical demo</span>
              <span><i className="legend-projection" /> Projected demo</span>
            </div>

            <div className="forecast-chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 12, right: 12, left: 6, bottom: 4 }}
                >
                  <CartesianGrid
                    stroke="#edf0f6"
                    strokeDasharray="4 5"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="month"
                    tick={{ fill: "#8792a6", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    tickMargin={12}
                    minTickGap={12}
                  />

                  <YAxis
                    tickFormatter={formatCompactRupees}
                    tick={{ fill: "#8792a6", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    width={67}
                    domain={["auto", "auto"]}
                  />

                  <Tooltip content={<ChartTooltip />} />

                  <Legend content={() => null} />

                  {currentPoint && (
                    <ReferenceLine
                      x={currentPoint.month}
                      stroke="#c4cce0"
                      strokeDasharray="4 5"
                    />
                  )}

                  <Line
                    type="monotone"
                    dataKey="historicalPrice"
                    name="Historical demo"
                    stroke="#315efb"
                    strokeWidth={3}
                    dot={{ r: 3, fill: "#315efb", strokeWidth: 0 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                    connectNulls={false}
                  />

                  <Line
                    type="monotone"
                    dataKey="forecastPrice"
                    name="Projected demo"
                    stroke="#8b72e8"
                    strokeWidth={3}
                    strokeDasharray="7 5"
                    dot={{ r: 3, fill: "#8b72e8", strokeWidth: 0 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                    connectNulls={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="forecast-chart-note">
              <Sparkles size={16} />
              <p>
                The projected line is generated from a fixed demo growth
                assumption. It is not a market forecast produced by the
                project&apos;s trained ML model.
              </p>
            </div>
          </section>

          <section className="forecast-comparison-section">
            <div className="forecast-comparison-heading">
              <span className="forecast-section-eyebrow">
                <MapPin size={14} /> PUNE LOCALITY EXPLORER
              </span>

              <h2>Compare areas across Pune</h2>
              <p>
                Review illustrative rates and assumed annual growth values
                used in this demo.
              </p>
            </div>

            <div className="forecast-table-wrap">
              <table className="forecast-table">
                <thead>
                  <tr>
                    <th>Locality</th>
                    <th>Demo rate / sq. ft.</th>
                    <th>Assumed annual growth</th>
                    <th>View forecast</th>
                  </tr>
                </thead>

                <tbody>
                  {comparisons.map((item, index) => (
                    <tr
                      key={item.locality}
                      className={
                        item.locality === locality
                          ? "forecast-selected-row"
                          : ""
                      }
                    >
                      <td>
                        <div className="forecast-locality-cell">
                          <span className="forecast-locality-rank">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <div>
                            <strong>{item.locality}</strong>
                            {item.locality === locality && (
                              <span className="forecast-current-tag">
                                Selected
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="forecast-table-price">
                        {formatRupees(item.currentRate)}
                      </td>

                      <td>
                        <span className="forecast-growth-pill">
                          <ArrowUpRight size={14} />
                          {formatPercent(item.annualGrowth)}
                        </span>
                      </td>

                      <td>
                        <button
                          className="forecast-view-button"
                          type="button"
                          onClick={() => {
                            setLocality(item.locality);
                            window.scrollTo({
                              top: 0,
                              behavior: "smooth",
                            });
                          }}
                          aria-label={`View forecast for ${item.locality}`}
                        >
                          Explore <ArrowRight size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="forecast-table-disclaimer">
              Locality rates and growth figures are illustrative placeholders.
              They should not be used for property purchasing or investment
              decisions.
            </p>
          </section>
        </>
      ) : null}

      <section className="forecast-bottom-cta">
        <div className="forecast-cta-icon">
          <Sparkles size={23} />
        </div>

        <div className="forecast-cta-copy">
          <h2>Forecasting is just one piece of the picture.</h2>
          <p>
            Combine price estimates, market context, and explainable AI
            insights as EstateIQ develops.
          </p>
        </div>

        <Link to="/predict" className="forecast-cta-link">
          Predict a price <ArrowRight size={17} />
        </Link>
      </section>
    </main>
  ); 
}
