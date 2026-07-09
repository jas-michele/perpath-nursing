import { Link } from "react-router-dom";
import "./GetStarted.css";

function GetStarted() {
  return (
    <div className="get-started-page">
      <div className="left-panel">
        <p className="page-tag">Career Catalyst AI</p>

        <h1>Start Your Tech Journey</h1>

        <p className="page-description">
          Create your account to unlock your personalized AI career roadmap,
          connect with mentors, and discover employer opportunities through
          Career Catalyst AI.
        </p>

        <div className="feature-list">
          <div className="feature-item">🚀 AI Career Roadmap</div>
          <div className="feature-item">🤝 Mentor Matching</div>
          <div className="feature-item">💼 Employer Connections</div>
          <div className="feature-item">📈 Career Readiness Score</div>
        </div>
      </div>

      <div className="register-card">
        <h2>Create Your Account</h2>

        <label>First Name</label>
        <input
          type="text"
          placeholder="Enter your first name"
        />

        <label>Last Name</label>
        <input
          type="text"
          placeholder="Enter your last name"
        />

        <label>Email Address</label>
        <input
          type="email"
          placeholder="Enter your email"
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Create a password"
        />

        <button className="create-account-btn">
          Create Account
        </button>

        <p className="signin-link">
          Already have an account?{" "}
          <Link to="/">Sign In</Link>
        </p>

        <p className="back-home">
          <Link to="/">← Back to Home</Link>
        </p>
      </div>
    </div>
  );
}

export default GetStarted;