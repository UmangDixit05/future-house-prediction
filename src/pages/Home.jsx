
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Building2,
  CheckCircle2,
  ChevronRight,
  Compass,
  House,
  MapPin,
  Newspaper,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Link } from 'react-router-dom';
import './Home.css';

const marketTrend = [
  { month: 'Jan', price: 7200 },
  { month: 'Feb', price: 7350 },
  { month: 'Mar', price: 7280 },
  { month: 'Apr', price: 7590 },
  { month: 'May', price: 7740 },
  { month: 'Jun', price: 7680 },
  { month: 'Jul', price: 7970 },
  { month: 'Aug', price: 8120 },
  { month: 'Sep', price: 8050 },
  { month: 'Oct', price: 8390 },
  { month: 'Nov', price: 8540 },
  { month: 'Dec', price: 8780 },
];

const localities = [
  {
    name: 'Hinjewadi',
    subtitle: 'IT & technology hub',
    description:
      'A major employment destination with residential communities and technology parks.',
    price: 'Data pending',
    icon: Building2,
    className: 'locality-blue',
  },
  {
    name: 'Baner',
    subtitle: 'Lifestyle & connectivity',
    description:
      'A popular residential destination with commercial spaces and lifestyle amenities.',
    price: 'Data pending',
    icon: Compass,
    className: 'locality-violet',
  },
  {
    name: 'Kharadi',
    subtitle: 'Business & residential growth',
    description:
      'A prominent eastern Pune destination with offices and expanding residential areas.',
    price: 'Data pending',
    icon: TrendingUp,
    className: 'locality-teal',
  },
];

const features = [
  {
    number: '01',
    icon: House,
    title: 'AI Price Prediction',
    description:
      'Estimate property values using location, area, configuration, and other property attributes.',
    link: '/predict',
    linkText: 'Predict a property price',
  },
  {
    number: '02',
    icon: TrendingUp,
    title: 'Future Price Forecasting',
    description:
      'Explore historical pricing patterns and model-based projections for future market trends.',
    link: '/forecast',
    linkText: 'Explore price forecasts',
  },
  {
    number: '03',
    icon: BrainCircuit,
    title: 'Explainable AI',
    description:
      'Understand which property characteristics influence an estimate and how they affect it.',
    link: '/predict',
    linkText: 'Explore predictions',
  },
  {
    number: '04',
    icon: Newspaper,
    title: 'News & Sentiment',
    description:
      'Bring together locality news and public discussion to add context to property decisions.',
    link: '/insights',
    linkText: 'Explore market insights',
  },
];

function PriceTooltip({ active, payload, label }) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="chart-tooltip">
      <span className="chart-tooltip-month">{label}</span>
      <strong>
        ₹{payload[0].value.toLocaleString('en-IN')}
        <span className="chart-tooltip-unit"> / sq. ft.</span>
      </strong>
      <span className="chart-tooltip-note">Illustrative sample data</span>
    </div>
  );
}

function Home() {
  return (
    <div className="home-page">
      {/* Hero section */}
      <section className="home-hero">
        <div className="hero-decoration hero-decoration-one" />
        <div className="hero-decoration hero-decoration-two" />

        <div className="page-container hero-layout">
          <div className="hero-content">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-icon">
                <Sparkles size={15} />
              </span>
              INTELLIGENCE FOR BETTER PROPERTY DECISIONS
            </div>

            <h1 className="hero-title">
              Your next property decision,
              <span> backed by intelligence.</span>
            </h1>

            <p className="hero-description">
              Discover property value estimates, explore future price
              trends, and understand the signals shaping Pune&apos;s
              real estate market.
            </p>

            <div className="hero-actions">
              <Link to="/predict" className="btn hero-primary-btn">
                Predict Property Price
                <ArrowRight size={18} />
              </Link>

              <Link to="/forecast" className="hero-secondary-btn">
                Explore Forecasts
                <ArrowUpRight size={17} />
              </Link>
            </div>

            <div className="hero-trust-row">
              <span className="trust-icon">
                <ShieldCheck size={17} />
              </span>
              <span>Data-informed insights</span>
              <span className="trust-divider" />
              <span>Explainable predictions</span>
            </div>
          </div>

          {/* Hero analytics preview */}
          <div className="hero-visual">
            <div className="hero-image-frame">
              <img
                className="hero-property-image"
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1100&q=85"
                alt="Contemporary residential property with modern architecture"
              />

              <div className="hero-image-shade" />

              <div className="hero-image-label">
                <span className="hero-image-label-icon">
                  <MapPin size={15} />
                </span>
                <span>
                  <strong>Pune, Maharashtra</strong>
                  <small>Real estate intelligence</small>
                </span>
              </div>
            </div>

            <div className="floating-insight-card">
              <div className="floating-card-top">
                <span className="floating-card-icon">
                  <TrendingUp size={18} />
                </span>
                <span className="floating-card-label">
                  Market trend preview
                </span>
                <span className="sample-tag">DEMO</span>
              </div>

              <div className="floating-card-value">Explore the trend</div>

              <div className="floating-card-bottom">
                <span>Illustrative data</span>
                <ArrowUpRight size={16} />
              </div>
            </div>

            <div className="hero-visual-note">
              <span className="visual-note-dot" />
              Built for smarter property research
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="home-stats-section">
        <div className="page-container">
          <div className="stats-heading-row">
            <div>
              <span className="section-kicker">MARKET AT A GLANCE</span>
              <h2 className="stats-heading">Your property research, simplified.</h2>
            </div>

            <span className="demo-indicator">
              <span />
              Preview dashboard
            </span>
          </div>

          <div className="stats-grid">
            <article className="stat-card">
              <div className="stat-card-top">
                <span className="stat-icon stat-icon-blue">
                  <House size={20} />
                </span>
                <span className="stat-label">Property valuation</span>
              </div>
              <div className="stat-value">AI-powered</div>
              <p className="stat-description">
                Estimate a property&apos;s value from its details.
              </p>
              <Link to="/predict" className="stat-link">
                Try prediction <ArrowRight size={15} />
              </Link>
            </article>

            <article className="stat-card">
              <div className="stat-card-top">
                <span className="stat-icon stat-icon-green">
                  <TrendingUp size={20} />
                </span>
                <span className="stat-label">Future outlook</span>
              </div>
              <div className="stat-value">Forecasts</div>
              <p className="stat-description">
                Explore model-generated future price trends.
              </p>
              <Link to="/forecast" className="stat-link">
                View forecasts <ArrowRight size={15} />
              </Link>
            </article>

            <article className="stat-card">
              <div className="stat-card-top">
                <span className="stat-icon stat-icon-violet">
                  <BrainCircuit size={20} />
                </span>
                <span className="stat-label">Explainable AI</span>
              </div>
              <div className="stat-value">Understand why</div>
              <p className="stat-description">
                Explore the factors behind model predictions.
              </p>
              <Link to="/predict" className="stat-link">
                Learn more <ArrowRight size={15} />
              </Link>
            </article>

            <article className="stat-card">
              <div className="stat-card-top">
                <span className="stat-icon stat-icon-orange">
                  <Newspaper size={20} />
                </span>
                <span className="stat-label">Market context</span>
              </div>
              <div className="stat-value">Local insights</div>
              <p className="stat-description">
                Explore news and sentiment around localities.
              </p>
              <Link to="/insights" className="stat-link">
                Explore insights <ArrowRight size={15} />
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* Market trend chart */}
      <section className="home-market-section">
        <div className="page-container market-layout">
          <div className="market-copy">
            <span className="section-kicker">UNDERSTAND THE MARKET</span>

            <h2>
              See the bigger picture behind property prices.
            </h2>

            <p>
              Historical trends can provide useful context for property
              research. Our platform will bring past prices, future
              projections, and locality signals into one place.
            </p>

            <div className="market-benefit-list">
              <div>
                <CheckCircle2 size={18} />
                <span>Explore historical price patterns</span>
              </div>
              <div>
                <CheckCircle2 size={18} />
                <span>Compare locality-level trends</span>
              </div>
              <div>
                <CheckCircle2 size={18} />
                <span>Review future model projections</span>
              </div>
            </div>

            <Link to="/forecast" className="btn market-cta">
              Explore forecasting
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="market-chart-card">
            <div className="market-chart-header">
              <div>
                <span className="chart-overline">PRICE TREND EXPLORER</span>
                <h3>Illustrative price movement</h3>
                <p>Sample values · Not live market data</p>
              </div>

              <span className="chart-header-icon">
                <TrendingUp size={20} />
              </span>
            </div>

            <div className="chart-legend">
              <span className="chart-legend-dot" />
              Sample price
              <span className="chart-unit">₹ / sq. ft.</span>
            </div>

            <div
              className="market-chart"
              role="img"
              aria-label="Illustrative monthly property price trend chart"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={marketTrend}
                  margin={{ top: 12, right: 8, left: -14, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="marketAreaGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#315efb"
                        stopOpacity={0.2}
                      />
                      <stop
                        offset="95%"
                        stopColor="#315efb"
                        stopOpacity={0.01}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    stroke="#edf0f6"
                    strokeDasharray="4 5"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#8590a5', fontSize: 11 }}
                    tickMargin={12}
                  />

                  <YAxis
                    domain={['dataMin - 300', 'dataMax + 300']}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#8590a5', fontSize: 11 }}
                    tickFormatter={(value) =>
                      `₹${(value / 1000).toFixed(1)}k`
                    }
                    width={52}
                  />

                  <Tooltip
                    content={<PriceTooltip />}
                    cursor={{
                      stroke: '#b6c5ff',
                      strokeDasharray: '4 4',
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#315efb"
                    strokeWidth={2.8}
                    fill="url(#marketAreaGradient)"
                    activeDot={{
                      r: 5,
                      fill: '#315efb',
                      stroke: '#ffffff',
                      strokeWidth: 3,
                    }}
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-disclaimer">
              <span className="chart-disclaimer-icon">
                <Sparkles size={15} />
              </span>
              Demonstration visualization. Real historical data and
              forecast outputs will be integrated later.
            </div>
          </div>
        </div>
      </section>

      {/* Locality explorer */}
      <section className="home-localities-section">
        <div className="page-container">
          <div className="section-title-row">
            <div>
              <span className="section-kicker">EXPLORE PUNE</span>
              <h2>Discover localities that matter.</h2>
              <p>
                Explore some of Pune&apos;s prominent residential and
                commercial destinations.
              </p>
            </div>

            <Link to="/insights" className="section-text-link">
              Explore insights <ArrowRight size={17} />
            </Link>
          </div>

          <div className="localities-grid">
            {localities.map((locality) => {
              const Icon = locality.icon;

              return (
                <article
                  className="locality-card"
                  key={locality.name}
                >
                  <div
                    className={`locality-card-visual ${locality.className}`}
                  >
                    <span className="locality-visual-icon">
                      <Icon size={27} strokeWidth={1.8} />
                    </span>

                    <span className="locality-map-label">
                      <MapPin size={13} />
                      Pune, Maharashtra
                    </span>

                    <div className="locality-visual-decoration" />
                    <div className="locality-visual-decoration second" />
                  </div>

                  <div className="locality-card-body">
                    <span className="locality-subtitle">
                      {locality.subtitle}
                    </span>

                    <h3>{locality.name}</h3>

                    <p>{locality.description}</p>

                    <div className="locality-card-footer">
                      <span className="locality-price-label">
                        Property price data
                      </span>

                      <span className="locality-data-pending">
                        {locality.price}
                      </span>
                    </div>

                    <Link
                      to="/insights"
                      className="locality-link"
                      aria-label={`Explore ${locality.name} market insights`}
                    >
                      Explore locality
                      <ChevronRight size={17} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="locality-disclaimer">
            Localities are shown for demonstration purposes. Verified
            locality prices and comparisons will be added when the
            project's data source is integrated.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="home-features-section">
        <div className="page-container">
          <div className="features-intro">
            <span className="section-kicker">ONE PLATFORM, MORE CLARITY</span>
            <h2>More than just a price estimate.</h2>
            <p>
              Bring predictive models, market context, and transparent
              explanations together to support more informed property research.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article className="feature-card" key={feature.number}>
                  <div className="feature-card-top">
                    <span className="feature-icon">
                      <Icon size={22} strokeWidth={1.8} />
                    </span>
                    <span className="feature-number">{feature.number}</span>
                  </div>

                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>

                  <Link to={feature.link} className="feature-link">
                    {feature.linkText}
                    <ArrowRight size={16} />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="home-cta-section">
        <div className="page-container">
          <div className="home-cta-panel">
            <div className="cta-decoration cta-decoration-one" />
            <div className="cta-decoration cta-decoration-two" />

            <div className="cta-content">
              <span className="cta-eyebrow">
                <Sparkles size={15} />
                MAKE YOUR NEXT MOVE INFORMED
              </span>

              <h2>
                Ready to explore your
                <span> property's potential?</span>
              </h2>

              <p>
                Start with a property estimate and discover a more
                informed approach to real estate research.
              </p>

              <Link to="/predict" className="btn cta-button">
                Start a price prediction
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="cta-art" aria-hidden="true">
              <div className="cta-art-circle">
                <Building2 size={72} strokeWidth={1.15} />
              </div>
              <span className="cta-art-spark cta-art-spark-one">
                <Sparkles size={21} />
              </span>
              <span className="cta-art-spark cta-art-spark-two">
                <TrendingUp size={23} />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="page-container footer-main">
          <Link to="/" className="footer-brand">
            <span className="footer-brand-icon">
              <Building2 size={21} />
            </span>
            <span>
              Estate<span>IQ</span>
            </span>
          </Link>

          <p className="footer-description">
            Real estate intelligence for more informed property decisions.
          </p>

          <div className="footer-links">
            <Link to="/predict">Price prediction</Link>
            <Link to="/forecast">Forecasting</Link>
            <Link to="/insights">Market insights</Link>
          </div>
        </div>

        <div className="page-container footer-bottom">
          <span>
            © {new Date().getFullYear()} EstateIQ. Academic project
            prototype.
          </span>

          <span className="footer-demo-note">
            <span />
            Demo experience
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Home;
