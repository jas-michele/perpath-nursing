import { useState } from "react";
import "./AICoach.css";

const questions = [
  "What training provider are you currently attending?",
  "Which campus or cohort are you part of?",
  "What program are you enrolled in?",
  "What career role are you aiming for?",
  "How many hours per week can you study?",
  "What technical skills do you already have?",
  "What projects have you built so far?",
  "What type of mentor or employer support do you need most?",
];

function AICoach() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Welcome, future technologist. I am PerPath AI. I will ask a few questions to build your personalized career roadmap.",
    },
    {
      sender: "ai",
      text: questions[0],
    },
  ]);

  const handleContinue = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    const nextQuestionIndex = currentQuestion + 1;

    if (nextQuestionIndex < questions.length) {
      setMessages([
        ...messages,
        userMessage,
        {
          sender: "ai",
          text: questions[nextQuestionIndex],
        },
      ]);
      setCurrentQuestion(nextQuestionIndex);
      setInput("");
    } else {
      setMessages([
        ...messages,
        userMessage,
        {
          sender: "ai",
          text: "Profile complete. Your personalized career roadmap is ready to generate.",
        },
      ]);
      setInput("");
    }
  };

  const progress = Math.round(((currentQuestion + 1) / questions.length) * 100);

  return (
    <div className="ai-coach-page">
      <div className="command-header">
        <div>
          <p className="system-label">PerPath AI</p>
          <h1>Command Center</h1>
        </div>

        <div className="online-status">
          <span></span>
          AI Online
        </div>
      </div>

      <main className="command-grid">
        <section className="ai-screen">
          <div className="screen-frame">
            <div className="scan-line"></div>

            <div className="ai-avatar">
              <div className="avatar-ring">
                <div className="avatar-face">
                  <div className="eyes">
                    <span></span>
                    <span></span>
                  </div>
                  <div className="mouth"></div>
                </div>
              </div>
            </div>

            <p className="ai-title">PERPATH AI MENTOR</p>
            <p className="ai-subtitle">
              Building your personalized career roadmap...
            </p>
          </div>
        </section>

        <section className="chat-panel">
          <div className="chat-header">
            <div>
              <p>Onboarding Sequence</p>
              <h2>Question {Math.min(currentQuestion + 1, questions.length)} of {questions.length}</h2>
            </div>

            <div className="progress-badge">{progress}%</div>
          </div>

          <div className="progress-track">
            <div
              className="progress-glow"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.sender === "ai" ? "ai-message" : "user-message"}`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="chat-input-area">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your answer..."
              onKeyDown={(e) => {
                if (e.key === "Enter") handleContinue();
              }}
            />

            <button onClick={handleContinue}>Continue</button>
          </div>
        </section>

        <aside className="profile-status">
          <h3>Career Profile</h3>

          <div className="status-item complete">✓ Account Created</div>
          <div className={currentQuestion >= 1 ? "status-item complete" : "status-item"}>
            {currentQuestion >= 1 ? "✓" : "○"} Education
          </div>
          <div className={currentQuestion >= 3 ? "status-item complete" : "status-item"}>
            {currentQuestion >= 3 ? "✓" : "○"} Career Goal
          </div>
          <div className={currentQuestion >= 5 ? "status-item complete" : "status-item"}>
            {currentQuestion >= 5 ? "✓" : "○"} Skills
          </div>
          <div className={currentQuestion >= 7 ? "status-item complete" : "status-item"}>
            {currentQuestion >= 7 ? "✓" : "○"} Mentor Match
          </div>

          <div className="mission-card">
            <p>Mission</p>
            <h4>Build a personalized roadmap from learner to career-ready technologist.</h4>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default AICoach;