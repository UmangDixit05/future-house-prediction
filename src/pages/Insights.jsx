
import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  Building2,
  Clock3,
  MapPin,
  MessageCircle,
  Newspaper,
  RefreshCw,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Link } from "react-router-dom";
import { getMarketInsights } from "../services/insightsService";
import "./Insights.css";

const SENTIMENT_COLORS = ["#19a779", "#94a3b8", "#ef6b73"];

function formatRupees(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatCompactRupees(value) {
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}k`;
  return `₹${value}`;
}

function SentimentBadge({ sentiment }) {
  return (
    <span
      className={`insight-sentiment insight-sentiment-${sentiment.toLowerCase()}`}
    >
      <span />
      {sentiment}
    </span>
  );
}

function InsightsTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="insights-tooltip">
      <strong>{label}</strong>

      {payload.map((item) => (
        <div className="insights-tooltip-row" key={item.dataKey}>
          <span>{item.name}</span>
          <strong>
            {item.dataKey === "residential"
              ? `${formatRupees(item.value)} / sq. ft.`
              : item.value}
          </strong>
        </div>
      ))}
    </div>
  );
}

export default function Insights() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sentimentFilter, setSentimentFilter] = useState("All");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadInsights() {
      setLoading(true);
      setError("");

      try {
        const result = await getMarketInsights();

        if (!cancelled) {
          setData(result);
        }
      } catch {
        if (!cancelled) {
          setError(
            "Market insights could not be loaded. Please try again."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadInsights();

    return () => {
      cancelled = true;
    };
  }, [retryCount]);

  const filteredLocalities = useMemo(() => {
    if (!data) return [];

    return data.localityMarketData.filter((item) =>
      item.locality.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const filteredNews = useMemo(() => {
    if (!data) return [];

    return data.newsData.filter(
      (item) =>
        sentimentFilter === "All" ||
        item.sentiment === sentimentFilter
    );
  }, [data, sentimentFilter]);

  const averageRate = data?.localityMarketData.length
    ? data.localityMarketData.reduce(
        (sum, item) => sum + item.rate,
        0
      ) / data.localityMarketData.length
    : 0;

  const averageGrowth = data?.localityMarketData.length
    ? data.localityMarketData.reduce(
        (sum, item) => sum + item.change,
        0
      ) / data.localityMarketData.length
    : 0;

  return (
    <main className="insights-page">
      {/* Hero section */}
      <section className="insights-hero">
        <div className="insights-hero-copy">
          <span className="insights-eyebrow">
            <Sparkles size={15} />
            ESTATEIQ MARKET INTELLIGENCE
          </span>

          <h1>
            Understand the market.
            <span>Look beyond the numbers.</span>
          </h1>

          <p>
            Explore Pune locality trends, market sentiment, and real
            estate news in one place. Use these insights as context,
            not as a guarantee of future prices.
          </p>

          <div className="insights-hero-tags">
            <span>
              <TrendingUp size={15} />
              Market trends
            </span>
            <span>
              <MessageCircle size={15} />
              Public sentiment
            </span>
            <span>
              <Newspaper size={15} />
              News context
            </span>
          </div>
        </div>

        <div className="insights-hero-art" aria-hidden="true">
          <div className="insights-art-circle insights-art-circle-one" />
          <div className="insights-art-circle insights-art-circle-two" />

          <div className="insights-art-card">
            <div className="insights-art-card-top">
              <span className="insights-art-icon">
                <Activity size={21} />
              </span>
              <span>Market signals</span>
              <span className="insights-art-live-dot" />
            </div>

            <div className="insights-art-number">Pune</div>
            <div className="insights-art-caption">
              Citywide market overview
            </div>

            <div className="insights-art-bars">
              {[36, 52, 44, 68, 57, 78, 64, 91, 74, 100].map(
                (height, index) => (
                  <span
                    key={index}
                    className={`insights-art-bar-${index + 1}`}
                  />
                )
              )}
            </div>

            <div className="insights-art-footer">
              <span>Trends</span>
              <span>Sentiment</span>
              <span>News</span>
            </div>
          </div>
        </div>
      </section>

      {/* Demo data disclaimer */}
      <div className="insights-demo-notice">
        <span className="insights-notice-icon">
          <Activity size={17} />
        </span>

        <p>
          <strong>Demo dashboard:</strong> all rates, chart values,
          news summaries, and sentiment counts on this page are
          illustrative placeholders, not live market data.
        </p>
      </div>

      {/* Error state */}
      {error && (
        <div className="insights-error" role="alert">
          <p>{error}</p>

          <button
            type="button"
            onClick={() => setRetryCount((count) => count + 1)}
          >
            <RefreshCw size={15} />
            Retry
          </button>
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <section className="insights-loading" aria-live="polite">
          <div className="insights-spinner" />
          <strong>Preparing market insights...</strong>
          <p>Loading the demo dashboard.</p>
        </section>
      ) : data ? (
        <>
          {/* Overview metrics */}
          <section className="insights-metrics-grid">
            <article className="insights-metric-card">
              <div className="insights-metric-heading">
                <span>Average listed demo rate</span>
                <span className="insights-metric-icon blue">
                  <Building2 size={19} />
                </span>
              </div>

              <strong>{formatRupees(averageRate)}</strong>
              <p>Per sq. ft. across demo localities</p>
            </article>

            <article className="insights-metric-card">
              <div className="insights-metric-heading">
                <span>Average assumed growth</span>
                <span className="insights-metric-icon purple">
                  <TrendingUp size={19} />
                </span>
              </div>

              <strong>{averageGrowth.toFixed(1)}%</strong>
              <p>Illustrative annual growth assumption</p>
            </article>

            <article className="insights-metric-card">
              <div className="insights-metric-heading">
                <span>Localities included</span>
                <span className="insights-metric-icon green">
                  <MapPin size={19} />
                </span>
              </div>

              <strong>{data.localityMarketData.length}</strong>
              <p>Selected Pune areas in this demo</p>
            </article>

            <article className="insights-metric-card">
              <div className="insights-metric-heading">
                <span>Insight sources planned</span>
                <span className="insights-metric-icon amber">
                  <BrainCircuit size={19} />
                </span>
              </div>

              <strong>3</strong>
              <p>Market data, news, and public discussions</p>
            </article>
          </section>

          {/* Market trend and sentiment charts */}
          <section className="insights-main-grid">
            <article className="insights-panel insights-trend-panel">
              <div className="insights-panel-heading">
                <div>
                  <span className="insights-section-label">
                    <TrendingUp size={14} />
                    MARKET MOVEMENT
                  </span>

                  <h2>Illustrative price trend</h2>
                  <p>
                    Demo average rate per sq. ft. over six months.
                  </p>
                </div>

                <span className="insights-panel-icon">
                  <BarChart3 size={20} />
                </span>
              </div>

              <div className="insights-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={data.marketTrendData}
                    margin={{
                      top: 10,
                      right: 12,
                      left: 4,
                      bottom: 4,
                    }}
                  >
                    <CartesianGrid
                      stroke="#edf0f6"
                      strokeDasharray="4 5"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#8792a6", fontSize: 12 }}
                      tickMargin={10}
                    />

                    <YAxis
                      tickFormatter={formatCompactRupees}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#8792a6", fontSize: 11 }}
                      width={64}
                    />

                    <Tooltip content={<InsightsTooltip />} />

                    <Line
                      type="monotone"
                      dataKey="residential"
                      name="Demo rate"
                      stroke="#315efb"
                      strokeWidth={3}
                      dot={{
                        r: 4,
                        fill: "#315efb",
                        strokeWidth: 0,
                      }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <p className="insights-chart-footnote">
                <Clock3 size={14} />
                Demo timeline only. Replace with verified historical data.
              </p>
            </article>

            <article className="insights-panel insights-sentiment-panel">
              <div className="insights-panel-heading">
                <div>
                  <span className="insights-section-label">
                    <MessageCircle size={14} />
                    PUBLIC SENTIMENT
                  </span>

                  <h2>Sentiment snapshot</h2>
                  <p>
                    Illustrative distribution of public discussion tone.
                  </p>
                </div>
              </div>

              <div className="insights-sentiment-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.sentimentData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={65}
                      outerRadius={91}
                      paddingAngle={4}
                      stroke="none"
                    >
                      {data.sentimentData.map((entry, index) => (
                        <Cell
                          key={entry.name}
                          fill={
                            SENTIMENT_COLORS[
                              index % SENTIMENT_COLORS.length
                            ]
                          }
                        />
                      ))}
                    </Pie>

                    <Tooltip
                      formatter={(value) => [
                        `${value}%`,
                        "Demo share",
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>

                <div className="insights-donut-center">
                  <strong>Demo</strong>
                  <span>sentiment</span>
                </div>
              </div>

              <div className="insights-sentiment-legend">
                {data.sentimentData.map((item, index) => (
                  <div key={item.name}>
                    <span className="insights-legend-label">
                      <i className={`insights-legend-color-${index}`} />
                      {item.name}
                    </span>
                    <strong>{item.value}%</strong>
                  </div>
                ))}
              </div>

              <p className="insights-small-disclaimer">
                Not generated from live Reddit posts or a trained
                sentiment model.
              </p>
            </article>
          </section>

          {/* Locality comparison */}
          <section className="insights-panel insights-locality-panel">
            <div className="insights-panel-heading insights-locality-heading">
              <div>
                <span className="insights-section-label">
                  <MapPin size={14} />
                  PUNE LOCALITY EXPLORER
                </span>

                <h2>Compare localities</h2>
                <p>
                  Search demo rates and assumed growth across selected areas.
                </p>
              </div>

              <label className="insights-search">
                <Search size={17} />

                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search locality..."
                  aria-label="Search Pune localities"
                />
              </label>
            </div>

            <div className="insights-locality-chart">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={filteredLocalities}
                  margin={{
                    top: 8,
                    right: 8,
                    left: 2,
                    bottom: 35,
                  }}
                >
                  <CartesianGrid
                    stroke="#edf0f6"
                    strokeDasharray="4 5"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="locality"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#8792a6", fontSize: 11 }}
                    angle={-25}
                    textAnchor="end"
                    interval={0}
                  />

                  <YAxis
                    tickFormatter={formatCompactRupees}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#8792a6", fontSize: 11 }}
                    width={58}
                  />

                  <Tooltip
                    formatter={(value) => [
                      formatRupees(value),
                      "Demo rate per sq. ft.",
                    ]}
                  />

                  <Bar
                    dataKey="rate"
                    name="Demo rate"
                    fill="#5475f6"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={34}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="insights-table-wrap">
              <table className="insights-table">
                <thead>
                  <tr>
                    <th>Locality</th>
                    <th>Demo rate / sq. ft.</th>
                    <th>Assumed annual growth</th>
                    <th>Demo sentiment</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredLocalities.map((item) => (
                    <tr key={item.locality}>
                      <td>
                        <strong>{item.locality}</strong>
                      </td>

                      <td className="insights-rate-cell">
                        {formatRupees(item.rate)}
                      </td>

                      <td>
                        <span className="insights-growth">
                          <ArrowUpRight size={14} />
                          {item.change.toFixed(1)}%
                        </span>
                      </td>

                      <td>
                        <SentimentBadge sentiment={item.sentiment} />
                      </td>

                      <td>
                        <Link
                          to={`/predict?locality=${encodeURIComponent(
                            item.locality
                          )}`}
                          className="insights-table-link"
                        >
                          Explore <ArrowRight size={14} />
                        </Link>
                      </td>
                    </tr>
                  ))}

                  {filteredLocalities.length === 0 && (
                    <tr>
                      <td colSpan="5" className="insights-empty">
                        No localities match your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <p className="insights-disclaimer">
              Rates, growth values, and sentiment labels are illustrative
              placeholders, not verified market statistics or investment
              advice.
            </p>
          </section>

          {/* News and community discussion */}
          <section className="insights-content-grid">
            <article className="insights-panel insights-news-panel">
              <div className="insights-panel-heading">
                <div>
                  <span className="insights-section-label">
                    <Newspaper size={14} />
                    NEWS &amp; MARKET CONTEXT
                  </span>

                  <h2>Market briefing</h2>
                  <p>
                    Example summaries of themes to track in Pune.
                  </p>
                </div>
              </div>

              <div className="insights-filter-row">
                {["All", "Positive", "Neutral", "Negative"].map(
                  (filter) => (
                    <button
                      type="button"
                      key={filter}
                      className={
                        sentimentFilter === filter ? "active" : ""
                      }
                      onClick={() => setSentimentFilter(filter)}
                    >
                      {filter}
                    </button>
                  )
                )}
              </div>

              <div className="insights-news-list">
                {filteredNews.map((item) => (
                  <article className="insights-news-item" key={item.id}>
                    <div className="insights-news-icon">
                      <Newspaper size={18} />
                    </div>

                    <div className="insights-news-copy">
                      <div className="insights-news-meta">
                        <span>{item.category}</span>
                        <span>{item.time}</span>
                      </div>

                      <h3>{item.title}</h3>
                      <p>{item.summary}</p>

                      <div className="insights-news-bottom">
                        <span>{item.source}</span>
                        <SentimentBadge sentiment={item.sentiment} />
                      </div>
                    </div>
                  </article>
                ))}

                {filteredNews.length === 0 && (
                  <p className="insights-empty-news">
                    No demo summaries match this filter.
                  </p>
                )}
              </div>
            </article>

            <article className="insights-panel insights-discussion-panel">
              <div className="insights-panel-heading">
                <div>
                  <span className="insights-section-label">
                    <MessageCircle size={14} />
                    COMMUNITY PULSE
                  </span>

                  <h2>Topics people may discuss</h2>
                  <p>
                    Example themes for future Reddit analysis.
                  </p>
                </div>
              </div>

              <div className="insights-discussion-list">
                {data.discussionData.map((item, index) => (
                  <article
                    className="insights-discussion-item"
                    key={item.id}
                  >
                    <div className="insights-discussion-number">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="insights-discussion-copy">
                      <div className="insights-discussion-top">
                        <h3>{item.topic}</h3>
                        <SentimentBadge sentiment={item.sentiment} />
                      </div>

                      <p>{item.summary}</p>

                      <span className="insights-mention-count">
                        {item.mentions} illustrative mentions
                      </span>
                    </div>
                  </article>
                ))}
              </div>

              <div className="insights-ai-note">
                <span>
                  <BrainCircuit size={18} />
                </span>

                <p>
                  <strong>Planned AI capability</strong>
                  The integrated system can classify sentiment from
                  collected public discussions and summarize recurring
                  locality themes.
                </p>
              </div>
            </article>
          </section>

          {/* Prediction page call to action */}
          <section className="insights-bottom-cta">
            <div className="insights-cta-icon">
              <Sparkles size={22} />
            </div>

            <div>
              <h2>Ready to explore a property estimate?</h2>
              <p>
                Use the prediction page to try the current illustrative
                estimator.
              </p>
            </div>

            <Link to="/predict" className="insights-cta-link">
              Predict a price <ArrowRight size={16} />
            </Link>
          </section>
        </>
      ) : null}
    </main>
  );
}
