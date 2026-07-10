import { useState, useEffect, useRef } from "react";
import { startConversation, sendMessage, generateRoadmapWithRubric } from "../services/aiCoachService";
import "./AICoach.css";




function AICoach() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { sender: "ai" | "user"; text: string }[]
  >([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uiState, setUiState] = useState("interview");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

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

      setCurrentQuestion((prev) => prev + 1);

      if (data.completed) {

        setUiState("upload");

        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text:
              "🎉 Your career profile is complete! Upload your curriculum or rubric so I can generate your personalized roadmap.",
          },
        ]);

        return;
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
  const handleRubricUpload = async (file: File) => {
    try {
      setUploading(true);
      setUiState("generating");

      await generateRoadmapWithRubric(file);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "✅ Your personalized roadmap has been generated successfully!",
        },
      ]);

      // Next step we'll replace this with React Router
      // navigate("/dashboard");

    } catch (error) {
      console.error(error);

      setUiState("upload");

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ I couldn't generate your roadmap. Please try uploading the rubric again.",
        },
      ]);
    } finally {
      setUploading(false);
    }
  };


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

      {/* ================= LEFT PANEL ================= */}
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

      {/* ================= CENTER PANEL ================= */}
      <section className="chat-panel">

        <div className="chat-header">
          <div>
            <p>Onboarding Sequence</p>

            {uiState === "upload" && (
              <div className="upload-section">

                <label
                  className={`upload-button ${uploading ? "disabled" : ""}`}
                >
                  📄 Upload Rubric

                  <input
                    type="file"
                    accept=".pdf,.md"
                    hidden
                    onChange={async (e) => {
                      if (!e.target.files?.length) return;

                      const file = e.target.files[0];

                      setSelectedFile(file);

                      await handleRubricUpload(file);
                    }}
                  />
                </label>

                {selectedFile && (
                  <span className="file-name">
                    {selectedFile.name}
                  </span>
                )}

              </div>
            )}

          </div>
        </div>

        <div className="progress-track">
          <div className="progress-glow"></div>
        </div>

        <div className="messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.sender === "ai"
                  ? "ai-message"
                  : "user-message"
              }`}
            >
              {message.text}
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* ================= INTERVIEW ================= */}

        {uiState === "interview" && (
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
        )}

        {/* ================= GENERATING ================= */}

        {uiState === "generating" && (
          <div className="generating-panel">

            <h2>🧠 Future Visualization Engine</h2>

            <p>Analyzing learner profile...</p>
            <p>Reading curriculum...</p>
            <p>Building personalized roadmap...</p>

            <div className="spinner"></div>

          </div>
        )}

      </section>

      {/* ================= RIGHT PANEL ================= */}

      <aside className="profile-status">

        <h3>Career Profile</h3>

        <div className="status-item complete">
          ✓ Account Created
        </div>

        <div
          className={
            currentQuestion >= 1
              ? "status-item complete"
              : "status-item"
          }
        >
          {currentQuestion >= 1 ? "✓" : "○"} Education
        </div>

        <div
          className={
            currentQuestion >= 3
              ? "status-item complete"
              : "status-item"
          }
        >
          {currentQuestion >= 3 ? "✓" : "○"} Career Goal
        </div>

        <div
          className={
            currentQuestion >= 5
              ? "status-item complete"
              : "status-item"
          }
        >
          {currentQuestion >= 5 ? "✓" : "○"} Skills
        </div>

        <div
          className={
            currentQuestion >= 7
              ? "status-item complete"
              : "status-item"
          }
        >
          {currentQuestion >= 7 ? "✓" : "○"} Mentor Match
        </div>

        <div className="mission-card">
          <p>Mission</p>

          <h4>
            Build a personalized roadmap from learner to
            career-ready technologist.
          </h4>
        </div>

      </aside>

    </main>

  </div>
);
}

export default AICoach