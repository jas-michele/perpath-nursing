import { useState, useEffect } from "react";
import { startConversation, sendMessage } from "../services/aiCoachService";
import "./AICoach.css";
import { data } from "react-router-dom";



function AICoach() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { sender: "ai" | "user"; text: string}[]
  >([]);

 
  useEffect(() => {

    console.log("Starting conversation...")
    const loadConversation = async () => {
      try {
        const data = await startConversation();

        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: data.message,
          },
        ]);
      } catch (error) {
        console.error(error)
      }
    }

    loadConversation();
  }, []);

  const handleContinue = async () => {
    if (!input.trim()) return;

    const userInput = input;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userInput,
      },
    ]); 

    setInput("");

    try {
      const data = await sendMessage(userInput);

      if (data.completed) {
        console.log("Profile complete");
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: data.message,
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div className="ai-coach-page">
      <div className="command-header">
        <div>
          <p className="system-label">Career Catalyst AI</p>
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
        
            </div>

        
          </div>

          <div className="progress-track">
            <div
              className="progress-glow"
            
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
                if (e.key === "Enter") {
                  handleContinue();
                }
              }}
             
            />

            <button onClick={handleContinue}>
              Continue
              </button>
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