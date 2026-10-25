
import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Building2,
  LayoutDashboard,
  House,
  TrendingUp,
  Newspaper,
  Menu,
  X,
  ArrowUpRight,
} from 'lucide-react';
import './Navbar.css';

const navigationLinks = [
  {
    label: 'Overview',
    path: '/',
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: 'Price Prediction',
    path: '/predict',
    icon: House,
  },
  {
    label: 'Forecasting',
    path: '/forecast',
    icon: TrendingUp,
  },
  {
    label: 'Market Insights',
    path: '/insights',
    icon: Newspaper,
  },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="navbar-container">
        {/* Brand */}
        <Link
          to="/"
          className="navbar-brand"
          aria-label="EstateIQ home"
          onClick={closeMenu}
        >
          <span className="brand-icon">
            <Building2 size={25} strokeWidth={2.1} />
          </span>

          <span className="brand-copy">
            <span className="brand-name">
              Estate<span>IQ</span>
            </span>

            <span className="brand-tagline">
              REAL ESTATE INTELLIGENCE
            </span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav
          className="desktop-navigation"
          aria-label="Main navigation"
        >
          {navigationLinks.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `navbar-link${isActive ? ' active' : ''}`
                }
              >
                <Icon size={17} strokeWidth={1.9} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Right-side action */}
        <div className="navbar-actions">
          <Link
            to="/predict"
            className="navbar-cta"
            onClick={closeMenu}
          >
            <span>Predict Price</span>
            <ArrowUpRight size={17} />
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div
        id="mobile-navigation"
        className={`mobile-navigation${menuOpen ? ' is-open' : ''}`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          {navigationLinks.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `mobile-nav-link${isActive ? ' active' : ''}`
                }
              >
                <span className="mobile-nav-link-label">
                  <Icon size={19} strokeWidth={1.9} />
                  <span>{item.label}</span>
                </span>

                <ArrowUpRight size={16} className="mobile-nav-arrow" />
              </NavLink>
            );
          })}

          <div className="mobile-navigation-footer">
            <span className="mobile-status-dot" />
            <span>Intelligent property insights</span>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
