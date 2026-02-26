import { Link } from "react-router-dom";
import bgImage from "../assets/turf background.jpg"
import "../styles/Landing.css";

function Landing() {
  return (
    <div className="landing">
        <h2 className="hero-logo">
          Turf<span>Book</span>
        </h2>

      {/* HERO SECTION */}
      <section
        className="hero"
        
        style={{
          backgroundImage: `url(${bgImage})`
        }} 
      >
        <div className="hero-overlay">
        
          <h1>
            Book Your Perfect <span>Game Slot</span> Instantly
          </h1>

          <p>
            Discover top-rated turfs, choose your time, and play without hassle.
            Football, Cricket, Night Matches — all in one platform.
          </p>

          <div className="hero-buttons">
            <Link to="/home" className="btn-primary">
              Explore Turfs
            </Link>
            <Link to="/login" className="btn-secondary">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features">
        <h2>Why Choose TurfBook?</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <h3>⚡ Instant Booking</h3>
            <p>
              Real-time availability. No waiting. Confirm your slot in seconds.
            </p>
          </div>

          <div className="feature-card">
            <h3>💳 Secure Payments</h3>
            <p>
              Safe and reliable booking system with secure authentication.
            </p>
          </div>

          <div className="feature-card">
            <h3>🌙 Night Matches</h3>
            <p>
              Premium floodlit turfs for evening and night gameplay.
            </p>
          </div>

          <div className="feature-card">
            <h3>📍 Best Locations</h3>
            <p>
              Find turfs near you with verified ratings and reviews.
            </p>
          </div>

        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta">
        <h2>Ready to Play?</h2>
        <p>Join thousands of players booking their favorite turf today.</p>
        <Link to="/register" className="btn-primary">
          Create Free Account
        </Link>
      </section>

    </div>
  );
}

export default Landing;
