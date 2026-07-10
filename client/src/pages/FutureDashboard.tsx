import ProgressSidebar from "../components/sidebar/ProgressSidebar";
import RoadmapMap from "../components/roadmap/RoadmapMap";
import CurrentMilestone from "../components/sidebar/CurrentMilestone";
import BottomStatusBar from "../components/dashboard/BottomStatusBar";

function FutureDashboard() {
    return (
        <div className="future-dashboard">

        <aside className="left-panel">
            <ProgressSidebar />
        </aside>

        <main className="center-panel">
            <RoadmapMap />
        </main>

        <aside className="right-panel">
            <CurrentMilestone />
        </aside>    

        </div>
    );
}

export default FutureDashboard;