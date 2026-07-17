import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import "./SignIn.css";

function SignIn() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", response.token);

      navigate("/dashboard");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-background-orb orb-one"></div>
      <div className="signin-background-orb orb-two"></div>
      <div className="signin-grid-overlay"></div>

      <header className="signin-header">
        <Link to="/" className="signin-brand">
          <div className="signin-brand-icon">C</div>

          <div>
            <h1>PERPATH AI</h1>
            <p>Powered by Per Scholas</p>
          </div>
        </Link>

        <Link to="/" className="signin-home-link">
          Back to Home
        </Link>
      </header>

      <main className="signin-main">
        <section className="signin-intro">
          <div className="signin-badge">
            <span className="badge-dot"></span>
            AI Career Command Center
          </div>

          <h2>
            Welcome back to your
            <span> career journey.</span>
          </h2>

          <p className="signin-intro-text">
            Sign in to continue building your roadmap, connecting with mentors,
            tracking your progress, and discovering career opportunities.
          </p>

          <div className="signin-feature-list">
            <div className="signin-feature">
              <div className="feature-icon">01</div>
              <div>
                <h3>Personalized Roadmap</h3>
                <p>Continue from your latest career milestone.</p>
              </div>
            </div>

            <div className="signin-feature">
              <div className="feature-icon">02</div>
              <div>
                <h3>AI Career Coaching</h3>
                <p>Receive guidance based on your goals and experience.</p>
              </div>
            </div>

            <div className="signin-feature">
              <div className="feature-icon">03</div>
              <div>
                <h3>Mentor Connections</h3>
                <p>Stay connected with professionals in your industry.</p>
              </div>
            </div>
          </div>

          <div className="signin-stat-row">
            <div>
              <strong>24/7</strong>
              <span>AI Guidance</span>
            </div>

            <div>
              <strong>100%</strong>
              <span>Career Focused</span>
            </div>

            <div>
              <strong>1 Goal</strong>
              <span>Your Success</span>
            </div>
          </div>
        </section>

        <section className="signin-card-wrapper">
          <div className="signin-card-glow"></div>

          <div className="signin-card">
            <div className="signin-card-top">
              <div className="signin-mini-logo">CC</div>

              <div>
                <p className="signin-eyebrow">Secure Access</p>
                <h2>Sign In</h2>
              </div>
            </div>

            <p className="signin-card-description">
              Enter your information to access your PerPath dashboard.
            </p>

            <form onSubmit={handleSubmit} className="signin-form">
              {error && (
                <div className="signin-error">
                  {error}
                </div>
              )}

              <div className="signin-form-group">
                <label htmlFor="email">Email Address</label>

                <div className="signin-input-wrapper">
                  <span className="signin-input-icon">@</span>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="signin-form-group">
                <label htmlFor="password">Password</label>

                <div className="signin-input-wrapper">
                  <span className="signin-input-icon">●</span>

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword((previous) => !previous)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="signin-options">
                <label className="remember-option">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <span>Remember me</span>
                </label>

                <button
                  type="button"
                  className="forgot-password-button"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="signin-submit-button"
                disabled={loading}
              >
                <span>
                  {loading
                    ? "Signing In..."
                    : "Enter Career Command Center"}
                </span>

                {!loading && (
                  <span className="signin-button-arrow">→</span>
                )}
              </button>
            </form>
            <div className="signin-divider">
              <span></span>
              <p>New to Per Path?</p>
              <span></span>
            </div>

            <Link to="/get-started" className="signin-create-account">
              Create Your Account
            </Link>

            <div className="signin-security-note">
              <span className="security-dot"></span>
              Your information is protected and securely managed.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SignIn;