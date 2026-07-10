import { useEffect, useState } from "react";
import nebula from "../assets/space/nebula.png"

import ProgressSidebar from "../components/sidebar/ProgressSidebar";
import FutureVisualization from "../components/FutureVisualization/FutureVisualization";
import CurrentMilestone from "../components/sidebar/CurrentMilestone";
import BottomStatusBar from "../components/dashboard/BottomStatusBar";

import { getRoadmap } from "../services/roadmapService";
import { getCurrentUser } from "../services/authService";

// import aiCore from "../assets/space/ai-core.png";
import planet from "../assets/space/planet.png"
import moon from "../assets/space/moon.png";

import "../styles/FutureDashboard.css";

export default function FutureDashboard() {
  const [roadmap, setRoadmap] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function loadRoadmap() {
      try {
        const [roadmapData, userData] = await Promise.all([
          getRoadmap(),
          getCurrentUser(),
        ]);

        setRoadmap(roadmapData);
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    }

    loadRoadmap();
  }, []);

  if (!roadmap) {
    return <div>Loading Dashboard...</div>;
  }



  return (
    <div className="future-dashboard">

      <aside className="left-panel">
        <ProgressSidebar
          user={user}
          roadmap={roadmap}
        />
      </aside>

      <main className="center-panel">
        {/* <img
          src={planet}
          className="space-planet"
          alt=""
          aria-hidden="true"
        /> */}

        <img
          src={moon}
          className="space-moon"
          alt=""
          aria-hidden="true"
        />

        
          <FutureVisualization roadmap={roadmap} />
        
      </main>

      <aside className="right-panel">
        <CurrentMilestone roadmap={roadmap} />
      </aside>

      <footer className="bottom-panel">
        <BottomStatusBar />
      </footer>

    </div>
  );
}