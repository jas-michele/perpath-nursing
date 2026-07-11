import { Link, useNavigate } from "react-router-dom";

import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          <h2>PERPATH AI</h2>
          <span>Powered by Per Scholas</span>
        </div>

        <div className="nav-links">
          <Link to="/" >Home</Link>
          <Link to="/dashboard">Roadmap</Link>
          <a href="#">Mentors</a>


        </div>

        <div className="auth-buttons">
          <Link to="/get-started" className="register-btn">
            Get Started
          </Link>

          <Link to="/login" className="login-btn">Sign In</Link>

          <button className="nav-link-button" onClick={handleLogout}>
            Logout
          </button>


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