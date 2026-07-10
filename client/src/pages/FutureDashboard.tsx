import { useEffect, useState } from "react";

import ProgressSidebar from "../components/sidebar/ProgressSidebar";
import FutureVisualization from "../components/FutureVisualization/FutureVisualization";
import CurrentMilestone from "../components/sidebar/CurrentMilestone";
import BottomStatusBar from "../components/dashboard/BottomStatusBar";

import { getRoadmap } from "../services/roadmapService";
import { getCurrentUser } from "../services/authService";

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