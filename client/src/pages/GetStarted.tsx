import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./GetStarted.css";
import React from "react";
import { registerUser } from "../services/authService";

function GetStarted() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const navigate = useNavigate();

  const handleCreateAccount = async () => {
    try {
      const data = await registerUser(formData);

      localStorage.setItem("token", data.token);

      navigate("/ai-coach");

    } catch (error) {
      console.error(error)
    }
  }  
  return (
    <div className="get-started-page">
      <div className="get-started-left-panel">
        <p className="page-tag">PERPATH AI</p>

        <h1>Activate Your AI Mentor</h1>

        <p className="page-description">
          Create your account to unlock your personalized AI career roadmap,
          connect with mentors, and discover employer opportunities through
          Career Catalyst AI.
        </p>

        <div className="feature-list">
          <div className="feature-item">🧭 AI Career Roadmaps</div>
          <div className="feature-item">🤝 Mentor Matching</div>
          <div className="feature-item">💼 Employer Connections</div>
          <div className="feature-item">📊 Career Readiness Score</div>
        </div>
      </div>

      <div className="get-started-register-card">
        <h2>Create Your Account</h2>

        <label>First Name</label>
        <input type="text" 
        name="firstName"
        value={formData.firstName} 
        onChange={handleChange}
        />

        <label>Last Name</label>
        <input type="text" 
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        />

        <label>Email Address</label>
        <input 
        type="email" 
        name="email"
        value={formData.email}
        onChange={handleChange}
        />

        <label>Password</label>
        <input 
        type="password" 
        name="password"
        value={formData.password}
        onChange={handleChange}
        />

        <button
          type="button"
          className="create-account-btn"
          onClick={handleCreateAccount}
        >
          Create Account
        </button>

        <p className="signin-link">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>

        <p className="back-home">
          <Link to="/">← Back to Home</Link>
        </p>
      </div>
    </div>
  );
}

export default GetStarted;