import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          <h2>Career Catalyst AI</h2>
          <span>Powered by Per Scholas</span>
        </div>

        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Roadmap</a>
          <a href="#">Mentors</a>
          <a href="#">Employers</a>
          <a href="#">About</a>
        </div>

        <div className="auth-buttons">
          <button className="login-btn">Sign In</button>

          <Link to="/get-started" className="register-btn">
            Get Started
          </Link>
        </div>
      </nav>

      <div className="announcement-bar">
        Empowering Per Scholas learners, alumni, and aspiring technologists to
        transform career goals into meaningful careers through AI guidance,
        mentorship, and employer connections.
      </div>

      <section className="hero">
        <div className="hero-text">
          <p className="tagline">AI-Powered Career Gateway</p>

          <h1>Illuminate Your Future</h1>

          <p>
            Discover your personalized career journey with AI-powered coaching,
            industry mentors, employer partnerships, and an intelligent roadmap
            designed to help you land your dream technology career.
          </p>

          <div className="hero-buttons">
            <Link to="/get-started" className="primary-btn">
              Start Your Journey
            </Link>

            <button className="secondary-btn">Watch Demo</button>
          </div>
        </div>

        <div className="hero-card">
          <h3>Career Snapshot</h3>

          <div className="progress">
            <div className="progress-fill"></div>
          </div>

          <p className="readiness">Career Readiness: 78%</p>

          <hr />

          <h4>Next Milestone</h4>
          <p>Meet with an Industry Mentor</p>

          <hr />

          <h4>Recommended Employer</h4>
          <p>CGI Consulting</p>

          <hr />

          <h4>Achievement</h4>
          <p>🏆 Tech Futures Explorer</p>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;