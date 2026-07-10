import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import GetStarted from "./pages/GetStarted";
import AICoach from "./pages/AICoach";
import FutureDashboard from "./pages/FutureDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/ai-coach" element={<AICoach />} />
        <Route path="/dashboard" element={<FutureDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

