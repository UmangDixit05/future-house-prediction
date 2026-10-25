
import { ArrowLeft, ArrowRight, BrainCircuit, House } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import './ComingSoon.css';

function ComingSoon({ title, description, number = '01' }) {
  const navigate = useNavigate();

  return (
    <section className="coming-soon-page">
      <div className="page-container coming-soon-layout">
        <div className="coming-soon-content">
          <span className="coming-soon-eyebrow">
            <BrainCircuit size={16} />
            ESTATEIQ INTELLIGENCE
          </span>

          <span className="coming-soon-number">{number}</span>

          <h1>{title}</h1>

          <p className="coming-soon-description">{description}</p>

          <div className="coming-soon-notice">
            <span className="coming-soon-notice-icon">
              <House size={20} />
            </span>

            <span>
              <strong>We're building this experience.</strong>
              <small>
                This section will be developed as part of the project.
              </small>
            </span>
          </div>

          <div className="coming-soon-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={17} />
              Go back
            </button>

            <Link to="/" className="btn btn-primary">
              Back to overview
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>

        <div className="coming-soon-visual" aria-hidden="true">
          <div className="coming-soon-orbit orbit-one" />
          <div className="coming-soon-orbit orbit-two" />

          <div className="coming-soon-building-card">
            <div className="coming-soon-building-top">
              <span className="building-icon">
                <House size={23} />
              </span>
              <span className="building-demo-label">PREVIEW</span>
            </div>

            <div className="building-illustration">
              <div className="building building-one">
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="building building-two">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="building building-three">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="building-card-footer">
              <span>Real estate intelligence</span>
              <BrainCircuit size={18} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ComingSoon;
