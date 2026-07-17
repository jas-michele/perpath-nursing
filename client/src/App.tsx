import { BrowserRouter, Routes, Route,  } from "react-router-dom";

import Login from "./pages/Login";
import GetStarted from "./pages/GetStarted";
import AICoach from "./pages/AICoach";
import FutureDashboard from "./pages/FutureDashboard";
import LearnersDashboard from "./pages/LearnersDashboard";
import LearningHub from "./pages/LearningHub";

function App() {
 

  return (
    <BrowserRouter>

      {/* <nav className="app-nav">
        <Link to="/" className="nav-logo">
          🏠
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>

          {token ? (
            <>
              <Link to="/ai-coach">AI Coach</Link>
              <Link to="/dashboard">Roadmap</Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/get-started">Get Started</Link>
            </>
          )}
        </div>
      </nav> */}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/ai-coach" element={<AICoach />} />
        <Route path="/dashboard" element={<FutureDashboard />} />
        <Route path="/learners-dashboard" element={<LearnersDashboard />} />
        <Route path="/learner-hub" element={<LearningHub />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;