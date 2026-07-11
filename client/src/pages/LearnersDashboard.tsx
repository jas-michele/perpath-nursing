import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../services/authService";
import { getRoadmap, completeMilestone } from "../services/roadmapService";
import { useNavigate } from "react-router-dom";
import "./LearnerDashboard.css";

const roadmap = [
    {
        id: 1,
        icon: "⚑",
        title: "Start",
        status: "Complete",
        type: "complete",
    },
    {
        id: 2,
        icon: "JS",
        title: "JavaScript",
        status: "Complete",
        type: "complete",
    },
    {
        id: 3,
        icon: "⚛",
        title: "React",
        status: "Complete",
        type: "complete",
    },
    {
        id: 4,
        icon: "EX",
        title: "Express",
        status: "In Progress",
        type: "active",
    },
    {
        id: 5,
        icon: "⬡",
        title: "Node.js",
        status: "Locked",
        type: "locked",
    },
    {
        id: 6,
        icon: "▣",
        title: "Portfolio",
        status: "Locked",
        type: "locked",
    },
    {
        id: 7,
        icon: "♙",
        title: "Interview",
        status: "Locked",
        type: "locked",
    },
    {
        id: 8,
        icon: "🚀",
        title: "Offer",
        status: "Locked",
        type: "locked",
    },
];

const opportunities = [
    {
        id: 1,
        logo: "G",
        company: "Google",
        role: "Junior Software Engineer",
        match: 94,
    },
    {
        id: 2,
        logo: "M",
        company: "Microsoft",
        role: "Software Engineer I",
        match: 91,
    },
    {
        id: 3,
        logo: "D",
        company: "Delta",
        role: "Associate Developer",
        match: 89,
    },
    {
        id: 4,
        logo: "N",
        company: "NCR",
        role: "Frontend Developer",
        match: 87,
    },
];

const mentors = [
    {
        id: 1,
        initials: "AM",
        name: "Alicia Morgan",
        role: "Senior Software Engineer",
        specialty: "React Expert",
        rating: "4.9",
    },
    {
        id: 2,
        initials: "DC",
        name: "Devin Carter",
        role: "Engineering Manager",
        specialty: "Node.js Expert",
        rating: "4.8",
    },
    {
        id: 3,
        initials: "PS",
        name: "Priya Shah",
        role: "Full-Stack Engineer",
        specialty: "API Specialist",
        rating: "4.9",
    },
];

const resources = [
    {
        id: 1,
        icon: "⚛",
        title: "React Docs",
        description: "Official documentation",
        action: "Continue",
    },
    {
        id: 2,
        icon: "MDN",
        title: "MDN Web Docs",
        description: "Web development resources",
        action: "Explore",
    },
    {
        id: 3,
        icon: "⌁",
        title: "FreeCodeCamp",
        description: "Hands-on projects",
        action: "Start",
    },
];

const achievements = [
    {
        id: 1,
        icon: "⚡",
        title: "First API",
        subtitle: "Built",
        type: "gold",
    },
    {
        id: 2,
        icon: "🔥",
        title: "7-Day",
        subtitle: "Streak",
        type: "purple",
    },
    {
        id: 3,
        icon: "▣",
        title: "Portfolio",
        subtitle: "Published",
        type: "blue",
    },
    {
        id: 4,
        icon: "♙",
        title: "Interview",
        subtitle: "Ready",
        type: "green",
    },
];

const tasks = [
    "Finish Express Routing",
    "Watch Node.js Video",
    "Complete Quiz",
    "Submit Project",
    "Review Notes",
];



const progressPoints = [15, 28, 36, 49, 31, 58, 42, 29, 53, 77, 81, 88, 100];

function ProgressRing({ value }) {
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return (
        <div className="career-ring">
            <svg viewBox="0 0 130 130" aria-label={`${value}% career readiness`}>
                <circle className="ring-background" cx="65" cy="65" r={radius} />

                <circle
                    className="ring-progress"
                    cx="65"
                    cy="65"
                    r={radius}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                />
            </svg>

            <div className="ring-content">
                <strong>{value}%</strong>
                <span>Career Ready</span>
            </div>
        </div>
    );
}

function WeeklyChart() {
    const width = 600;
    const height = 165;
    const padding = 15;

    const pointString = progressPoints
        .map((value, index) => {
            const x =
                padding +
                (index / (progressPoints.length - 1)) * (width - padding * 2);

            const y =
                height - padding - (value / 100) * (height - padding * 2);

            return `${x},${y}`;
        })
        .join(" ");

    return (
        <div className="chart-wrapper">
            <svg
                className="weekly-chart"
                viewBox={`0 0 ${width} ${height}`}
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient id="chartArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8e4dff" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#10e7ff" stopOpacity="0" />
                    </linearGradient>

                    <linearGradient id="chartLine" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#10e7ff" />
                        <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                </defs>

                {[30, 70, 110, 150].map((y) => (
                    <line
                        key={y}
                        x1="0"
                        x2={width}
                        y1={y}
                        y2={y}
                        className="chart-grid-line"
                    />
                ))}

                <polygon
                    points={`15,150 ${pointString} 585,150`}
                    fill="url(#chartArea)"
                />

                <polyline
                    points={pointString}
                    fill="none"
                    stroke="url(#chartLine)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {progressPoints.map((value, index) => {
                    const x =
                        padding +
                        (index / (progressPoints.length - 1)) * (width - padding * 2);

                    const y =
                        height - padding - (value / 100) * (height - padding * 2);

                    return (
                        <circle
                            key={`${x}-${y}`}
                            cx={x}
                            cy={y}
                            r="4"
                            className="chart-point"
                        />
                    );
                })}
            </svg>

            <div className="chart-days">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
            </div>
        </div>
    );
}

function LearnersDashboard() {
    console.log("LearnersDashboard mounted");

    const [user, setUser] = useState<any>(null);
    const [userRoadmap, setUserRoadmap] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const learnerName = user?.firstName ?? "Learner";

    console.log("USER STATE:", user);
    console.log("ROADMAP STATE:", userRoadmap);

    const loadDashboard = async () => {
        console.log("loadDashboard called");

        try {
            const userData = await getCurrentUser();
            console.log("User Data:", userData);

            const roadmapData = await getRoadmap();
            console.log("Roadmap Data:", roadmapData);

            setUser(userData);
            setUserRoadmap(roadmapData);
        } catch (error) {
            console.error("Dashboard load failed:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("useEffect fired");
        loadDashboard();
    }, []);

    console.log("Dashboard rendered");

    if (loading) {
        return <div>Loading...</div>;
    }


    const currentMilestone =
        userRoadmap?.milestones?.find(
            (milestone: any) => !milestone.completed
        ) ?? userRoadmap?.milestones?.[0];

    const completedMilestones =
        userRoadmap?.milestones?.filter(
            (milestone: any) => milestone.completed
        ).length ?? 0;

    const totalMilestones =
        userRoadmap?.milestones?.length ?? 1;

    const readinessPercent = Math.round(
        (completedMilestones / totalMilestones) * 100
    );



    return (
        <div className="learners-dashboard">
            <div className="dashboard-stars" />
            <div className="dashboard-grid" />
            <div className="purple-nebula" />
            <div className="blue-nebula" />

            <aside className="dashboard-sidebar">
                <div className="sidebar-brand">
                    <div className="brand-mark">CC</div>

                    <div>
                        <strong>Career Catalyst</strong>
                        <span>AI</span>
                    </div>
                </div>

                <nav className="sidebar-navigation">
                    <button className="nav-button active" type="button">
                        <span>⌂</span>
                        Dashboard
                    </button>

                    <button className="nav-button" type="button">
                        <span>◉</span>
                        AI Coach
                    </button>

                    <button className="nav-button" type="button">
                        <span>♧</span>
                        Career Quest
                    </button>

                    <button className="nav-button" type="button">
                        <span>▤</span>
                        Learning Hub
                    </button>

                    <button className="nav-button" type="button">
                        <span>▣</span>
                        Opportunities
                    </button>

                    <button className="nav-button" type="button">
                        <span>♙</span>
                        Mentors
                    </button>

                    <button className="nav-button" type="button">
                        <span>◫</span>
                        Portfolio
                    </button>

                    <button className="nav-button" type="button">
                        <span>⚙</span>
                        Settings
                    </button>
                </nav>

                <div className="sidebar-profile">
                    <div className="profile-top">
                        <div className="sidebar-avatar">T</div>

                        <div>
                            <strong>{learnerName}</strong>
                            <span>{userRoadmap?.careerGoal}</span>
                            <small>Level 12</small>
                        </div>
                    </div>

                    <div className="xp-row">
                        <span>2,450 XP</span>
                        <strong>68%</strong>
                    </div>

                    <div className="xp-track">
                        <div className="xp-fill" />
                    </div>
                </div>
            </aside>

            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div>
                        <p className="header-eyebrow">CAREER CATALYST AI</p>
                        <h1>
                            Welcome back, {learnerName}! <span>👋</span>
                        </h1>
                        <p className="header-subtitle">
                            Keep building your future. You are on the right path.
                        </p>
                    </div>

                    <div className="header-actions">
                        <div className="online-status">
                            <span />
                            AI Online
                        </div>

                        <button className="header-icon-button" type="button">
                            ◌
                        </button>
                    </div>
                </header>

                <section className="dashboard-top-grid">
                    <article className="dashboard-card readiness-card">
                        <h2>Career Readiness</h2>
                        <ProgressRing value={readinessPercent} />
                    </article>

                    <article className="dashboard-card metric-card">
                        <h2>Current Goal</h2>

                        <div className="metric-icon">◎</div>
                        <strong>Software Engineer</strong>

                        <button type="button">View Goal</button>
                    </article>

                    <article className="dashboard-card metric-card">
                        <h2>Learning Streak</h2>

                        <div className="metric-icon fire">🔥</div>
                        <strong className="large-number">7</strong>
                        <span>Days in a row</span>
                    </article>

                    <article className="dashboard-card metric-card">
                        <h2>XP Earned</h2>

                        <div className="metric-icon">☆</div>
                        <strong className="large-number">2,450</strong>
                        <span>XP Points</span>
                    </article>

                    <article className="dashboard-card metric-card">
                        <h2>Time Learned</h2>

                        <div className="metric-icon">◷</div>
                        <strong className="large-number">24h</strong>
                        <span>This month</span>
                    </article>

                    <article className="dashboard-card milestone-card">
                        <div className="card-title-row">
                            <div>
                                <p className="card-kicker">CURRENT MILESTONE</p>
                                <h2>{currentMilestone?.title}</h2>
                            </div>

                            <span className="milestone-percent">42%</span>
                        </div>

                        <div className="milestone-progress-track">
                            <div className="milestone-progress-fill" />
                        </div>

                        <div className="milestone-details">
                            <div>
                                <span>☆ XP Earned</span>
                                <strong>+650 XP</strong>
                            </div>

                            <div>
                                <span>◷ Time Remaining</span>
                                <strong>3h 20m</strong>
                            </div>
                        </div>

                        <p className="skills-label">Skills you will learn</p>

                        <div className="skill-pills">
                            <span>Express.js</span>
                            <span>APIs</span>
                            <span>Routing</span>
                            <span>Middleware</span>
                        </div>

                        <button className="resume-button" type="button">
                            Resume Learning
                        </button>
                    </article>
                </section>

                <section className="dashboard-card roadmap-section">
                    <div className="section-title-row">
                        <div>
                            <p className="card-kicker">AI CAREER ROADMAP</p>
                            <h2>Your Path to {userRoadmap?.careerGoal}</h2>
                        </div>

                        <span className="roadmap-summary">
                            {completedMilestones} of {totalMilestones}
                        </span>
                    </div>

                    <div className="roadmap-wrapper">
                        {userRoadmap?.milestones.map((item, index) => (
                            <React.Fragment key={item.id}>
                                <div
                                    className={`roadmap-item ${item.completed ? "complete" : "active"
                                        }`}
                                >
                                    <div className="roadmap-node">
                                        {index + 1}
                                    </div>
                                    <strong>{item.title}</strong>
                                    <span>
                                        {item.completed ? "Completed" : "In Progress"}
                                    </span>
                                </div>

                                {index < (userRoadmap?.milestones?.length) - 1 && (
                                    <div
                                        className={`roadmap-line ${index < 3 ? "line-complete" : ""
                                            }`}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    <button
                        className="view-roadmap-btn"
                        onClick={() => navigate("/dashboard")}
                    >
                        View Interactive Roadmap →
                    </button>

                </section>

                <section className="dashboard-middle-grid">
                    <article className="dashboard-card mentors-section">
                        <div className="section-title-row">
                            <div>
                                <p className="card-kicker">RECOMMENDED MENTORS</p>
                                <h2>Connect With Industry Experts</h2>
                            </div>

                            <button className="text-button" type="button">
                                View all
                            </button>
                        </div>

                        <div className="mentor-grid">
                            {mentors.map((mentor) => (
                                <div className="mentor-card" key={mentor.id}>
                                    <div className="mentor-avatar">{mentor.initials}</div>

                                    <div className="mentor-information">
                                        <strong>{mentor.name}</strong>
                                        <span>{mentor.role}</span>

                                        <div className="mentor-rating">
                                            <span>★ {mentor.rating}</span>
                                            <small>{mentor.specialty}</small>
                                        </div>
                                    </div>

                                    <button type="button">Connect</button>
                                </div>
                            ))}
                        </div>
                    </article>

                    <article className="dashboard-card resources-section">
                        <div className="section-title-row">
                            <div>
                                <p className="card-kicker">LEARNING RESOURCES</p>
                                <h2>Recommended for You</h2>
                            </div>
                        </div>

                        <div className="resource-list">
                            {userRoadmap?.resources.map((resource: any) => (
                                <button
                                    key={resource._id}
                                    className="resource-card"
                                    type="button"
                                    onClick={() => window.open(resource.url, "_blank")}
                                >
                                    <span className="resource-icon">📚</span>

                                    <span className="resource-information">
                                        <strong>{resource.title}</strong>
                                    </span>

                                    <span className="resource-action">
                                        →
                                    </span>
                                </button>
                            ))}
                        </div>
                    </article>

                    <article className="dashboard-card opportunities-section">
                        <div className="section-title-row">
                            <div>
                                <p className="card-kicker">FUTURE OPPORTUNITIES</p>
                                <h2>Employer Matches</h2>
                            </div>
                        </div>

                        <div className="opportunity-list">
                            {opportunities.map((opportunity) => (
                                <div className="opportunity-card" key={opportunity.id}>
                                    <div className="company-logo">{opportunity.logo}</div>

                                    <div className="company-information">
                                        <strong>{opportunity.company}</strong>
                                        <span>{opportunity.role}</span>
                                    </div>

                                    <strong className="match-score">
                                        {opportunity.match}% Match
                                    </strong>

                                    <button type="button">Apply Now</button>
                                </div>
                            ))}
                        </div>
                    </article>
                </section>

                <section className="dashboard-card ai-recommendation">
                    <div className="ai-recommendation-orb">
                        <div className="orb-core">AI</div>
                    </div>

                    <div>
                        <p className="card-kicker">AI RECOMMENDATION</p>
                        <h2>
                            {userRoadmap?.summary}
                        </h2>
                    </div>

                    <button type="button">View Learning Plan</button>
                </section>

                <section className="dashboard-bottom-grid">
                    <article className="dashboard-card achievements-section">
                        <div className="section-title-row">
                            <div>
                                <p className="card-kicker">ACHIEVEMENTS</p>
                                <h2>Your Latest Wins</h2>
                            </div>
                        </div>

                        <div className="achievement-grid">
                            {achievements.map((achievement) => (
                                <div className="achievement-item" key={achievement.id}>
                                    <div
                                        className={`achievement-badge ${achievement.type}`}
                                    >
                                        {achievement.icon}
                                    </div>

                                    <strong>{achievement.title}</strong>
                                    <span>{achievement.subtitle}</span>
                                </div>
                            ))}
                        </div>
                    </article>

                    <article className="dashboard-card tasks-section">
                        <div className="section-title-row">
                            <div>
                                <p className="card-kicker">UPCOMING TASKS</p>
                                <h2>Keep Your Momentum</h2>
                            </div>

                            <span className="task-count">5 tasks</span>
                        </div>

                        <div className="task-list">
                            {tasks.map((task) => (
                                <label className="task-item" key={task}>
                                    <input type="checkbox" />
                                    <span className="custom-checkbox">✓</span>
                                    <span>{task}</span>
                                </label>
                            ))}
                        </div>
                    </article>

                    <article className="dashboard-card weekly-section">
                        <div className="section-title-row">
                            <div>
                                <p className="card-kicker">WEEKLY PROGRESS</p>
                                <h2>Learning Activity</h2>
                            </div>

                            <strong className="weekly-change">+18%</strong>
                        </div>

                        <WeeklyChart />
                    </article>
                </section>
            </main>
        </div>
    );
}

export default LearnersDashboard;