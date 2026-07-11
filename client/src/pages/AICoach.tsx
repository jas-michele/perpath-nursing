import { useState, useEffect, useRef } from "react";
import { startConversation, sendMessage, generateRoadmap } from "../services/aiCoachService";
import { Link, useNavigate } from "react-router-dom";
import speechRecognitionService from "../services/speechRecognitionService";
import textToSpeechService from "../services/textToSpeechService";
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

  const navigate = useNavigate();

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [isListening, setIsListening] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);


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

        textToSpeechService.speak(data.message);

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

 const handleVoiceInput = async () => {
    try {
        const transcript =
            await speechRecognitionService.startListening();

        setInput(transcript);

    } catch (error) {
        console.error(error);
    }
};

  const handleContinue = async (voiceInput?: string) => {
  const userInput = (voiceInput ?? input).trim();

  if (!userInput || isSubmitting) return;

  setIsSubmitting(true);

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

    console.log("AI response:", data);

    setCurrentQuestion((prev) => prev + 1);

    if (data.completed) {
      setUiState("upload");

      const completionMessage =
        "Congratulations! Your career profile is complete. Upload your curriculum or rubric so I can generate your personalized roadmap.";

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: completionMessage,
        },
      ]);

      textToSpeechService.speak(completionMessage);
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        sender: "ai",
        text: data.message,
      },
    ]);

    textToSpeechService.speak(data.message);
  } catch (error) {
    console.error(error);
  } finally {
    setIsSubmitting(false);
  }
};

const handleGenerateRoadmap = async (file?: File) => {
  try {
    setUploading(true);
    setUiState("generating");

    await generateRoadmap(file);

    setMessages((prev) => [
      ...prev,
      {
        sender: "ai",
        text: "✅ Your personalized roadmap has been generated successfully!",
      },
    ]);

    navigate("/dashboard");
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

                  <h3>Generate Your Career Roadmap</h3>

                  <p>
                    Upload your curriculum for the most personalized roadmap,
                    or generate one using your AI profile.
                  </p>

                  <label
                    className={`upload-button ${uploading ? "disabled" : ""}`}
                  >
                    📄 Generate with Curriculum

                    <input
                      type="file"
                      accept=".pdf,.md"
                      hidden
                      onChange={async (e) => {
                        if (!e.target.files?.length) return;

                        const file = e.target.files[0];

                        setSelectedFile(file);

                        await handleGenerateRoadmap(file);
                      }}
                    />
                  </label>

                  {selectedFile && (
                    <span className="file-name">
                      {selectedFile.name}
                    </span>
                  )}

                  <div className="upload-divider">
                    OR
                  </div>

                  <button
                    className="generate-profile-button"
                    disabled={uploading}
                    onClick={() => handleGenerateRoadmap()}
                  >
                    ✨ Generate from AI Profile
                  </button>

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
                className={`message ${message.sender === "ai"
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

              <button
                type="button"
                onClick={handleVoiceInput}
              >
                🎤
              </button>

              <button onClick={() => handleContinue()}>
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

export default AICoach;