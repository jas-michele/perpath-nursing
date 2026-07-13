import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { generateFlashcards, getFlashcards } from "../services/flashcardService";
import { getCurrentUser } from "../services/authService";
import "./LearningHub.css";



function LearningHub() {
    const navigate = useNavigate();

    const [user, setUser] = useState<any>(null);
    const [activeTab, setActiveTab] = useState("flashcards");
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(2);
    const [showAnswer, setShowAnswer] = useState(true);
    const [bookmarked, setBookmarked] = useState(false);
    const [fileName, setFileName] = useState("React Hooks.pdf");
    const [flashcardSet, setFlashcardSet] = useState(null);
    const [lessonText, setLessonText] = useState("");
    const flashcards = flashcardSet?.cards || [];


    const handleGenerate = async () => {
        if (!lessonText.trim()) return;

        try {
            const data = await generateFlashcards(lessonText);

            setFlashcardSet(data.flashcards);
            setCurrentCardIndex(0);
            setSelectedAnswer(null);
            setShowAnswer(false);


            console.log("Generate hit");
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

 

    const learnerName = user?.firstName || "Learner";

  const currentCard = flashcards[currentCardIndex];

const correctIndex = currentCard
    ? currentCard?.choices.indexOf(currentCard?.correctAnswer)
    : -1;

const correctLetter =
    correctIndex >= 0
        ? String.fromCharCode(65 + correctIndex)
        : "";



    useEffect(() => {
        const loadUser = async () => {
            try {
                const currentUser = await getCurrentUser(); // or getMe()
                setUser(currentUser);
            } catch (error) {
                console.error(error);
            }
        };

        loadUser();
    }, []);

    const selectedLetter =
        selectedAnswer !== null
            ? String.fromCharCode(65 + selectedAnswer)
            : "";
  const answerIsCorrect =
    currentCard &&
    selectedAnswer !== null &&
    currentCard?.choices[selectedAnswer] ===
        currentCard?.correctAnswer;

    const resetFlashcard = () => {
        setSelectedAnswer(null);
        setShowAnswer(false);
    };

    const handleNextCard = () => {
        setCurrentCardIndex((previousIndex) =>
            previousIndex === flashcards.length - 1
                ? 0
                : previousIndex + 1
        );

        resetFlashcard();
    };

    const handlePreviousCard = () => {
        setCurrentCardIndex((previousIndex) =>
            previousIndex === 0
                ? flashcards.length - 1
                : previousIndex - 1
        );

        resetFlashcard();
    };

    const handleShuffle = () => {
        let randomIndex = Math.floor(
            Math.random() * flashcards.length
        );

        if (
            flashcards.length > 1 &&
            randomIndex === currentCardIndex
        ) {
            randomIndex =
                (randomIndex + 1) % flashcards.length;
        }

        setCurrentCardIndex(randomIndex);
        resetFlashcard();
    };

    const handleAnswerSelection = (index) => {
        setSelectedAnswer(index);
        setShowAnswer(true);
    };



    return (
        <div className="learners-dashboard learning-hub-dashboard">
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
                    <button
                        className="nav-button"
                        type="button"
                        onClick={() => navigate("/learners-dashboard")}
                    >
                        <span>⌂</span>
                        Dashboard
                    </button>

                    <button
                        className="nav-button"
                        type="button"
                        onClick={() => navigate("/ai-coach")}
                    >
                        <span>◉</span>
                        AI Coach
                    </button>

                    <button
                        className="nav-button"
                        type="button"
                        onClick={() => navigate("/career-quest")}
                    >
                        <span>♧</span>
                        Career Quest
                    </button>

                    <button
                        className="nav-button active"
                        type="button"
                        onClick={() => navigate("/learning-hub")}
                    >
                        <span>▤</span>
                        Learning Hub
                    </button>

                    <button
                        className="nav-button"
                        type="button"
                        onClick={() => navigate("/opportunities")}
                    >
                        <span>▣</span>
                        Opportunities
                    </button>

                    <button
                        className="nav-button"
                        type="button"
                        onClick={() => navigate("/mentors")}
                    >
                        <span>♙</span>
                        Mentors
                    </button>

                    <button
                        className="nav-button"
                        type="button"
                        onClick={() => navigate("/portfolio")}
                    >
                        <span>◫</span>
                        Portfolio
                    </button>

                    <button
                        className="nav-button"
                        type="button"
                        onClick={() => navigate("/settings")}
                    >
                        <span>⚙</span>
                        Settings
                    </button>
                </nav>

                <div className="sidebar-profile">
                    <div className="profile-top">
                        <div className="sidebar-avatar">
                            {learnerName.charAt(0)}
                        </div>

                        <div>
                            <strong>{learnerName}</strong>
                            <span>Software Developer</span>
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

            <main className="dashboard-main learning-hub-main">
                <header className="dashboard-header learning-hub-header">
                    <div>
                        <p className="header-eyebrow">
                            LEARNING HUB
                        </p>

                        <h1>
                            Learning Hub <span>📖</span>
                        </h1>

                        <p className="header-subtitle">
                            Upload a lesson or notes and Career Catalyst AI
                            will turn it into flashcards and quizzes.
                        </p>
                    </div>

                    <div className="header-actions">
                        <div className="online-status">
                            <span />
                            AI Online
                        </div>

                        <button
                            className="header-icon-button learning-notification"
                            type="button"
                            aria-label="Notifications"
                        >
                            ♢
                            <small>2</small>
                        </button>

                        <button
                            className="header-icon-button"
                            type="button"
                            aria-label="Profile"
                        >
                            T
                        </button>
                    </div>
                </header>

                <div className="learning-hub-layout">
                    <div className="learning-hub-content">
                        <section className="dashboard-card learning-process-card">
                            <div className="learning-process-step learning-upload-step">
                                <textarea
                                    className="lesson-input"
                                    value={lessonText}
                                    onChange={(e) => setLessonText(e.target.value)}
                                    placeholder="Paste your lesson markdown or notes here..."
                                    rows={10}
                                />

                                <button
                                    className="learning-primary-button"
                                    type="button"
                                    onClick={handleGenerate}
                                >
                                    ✨ Generate Study Session
                                </button>

                                <span className="learning-step-number green-step">
                                    1
                                </span>

                                <span className="learning-step-text">
                                    <strong>Upload Lesson</strong>
                                    <small>PDF, DOCX, or TXT</small>
                                </span>
                            </div>

                            <span className="learning-process-line" />

                            <div className="learning-process-step">
                                <span className="learning-step-number blue-step">
                                    2
                                </span>

                                <span className="learning-step-text">
                                    <strong>AI Processing</strong>
                                    <small>
                                        Extracting and understanding
                                    </small>
                                </span>
                            </div>

                            <span className="learning-process-line" />

                            <div className="learning-process-step">
                                <span className="learning-step-number purple-step">
                                    3
                                </span>

                                <span className="learning-step-text">
                                    <strong>
                                        Generate Study Material
                                    </strong>
                                    <small>Flashcards and quiz</small>
                                </span>
                            </div>

                            <span className="learning-process-line" />

                            <div className="learning-process-step">
                                <span className="learning-step-number green-step">
                                    4
                                </span>

                                <span className="learning-step-text">
                                    <strong>Start Learning</strong>
                                    <small>Study and master</small>
                                </span>
                            </div>
                        </section>

                       

                        <section className="dashboard-card learning-study-card">
                            <div className="learning-study-header">
                                <div className="learning-tabs">
                                    <button
                                        className={
                                            activeTab === "flashcards"
                                                ? "active"
                                                : ""
                                        }
                                        type="button"
                                        onClick={() =>
                                            setActiveTab("flashcards")
                                        }
                                    >
                                        ▤ Flashcards
                                    </button>

                                    <button
                                        className={
                                            activeTab === "quiz"
                                                ? "active"
                                                : ""
                                        }
                                        type="button"
                                        onClick={() =>
                                            setActiveTab("quiz")
                                        }
                                    >
                                        ▦ Quiz
                                    </button>
                                </div>

                                <div className="learning-pagination">
                                    <strong>
                                        {currentCardIndex + 1} /{" "}
                                        {flashcards.length}
                                    </strong>

                                    <button
                                        type="button"
                                        onClick={handlePreviousCard}
                                        aria-label="Previous card"
                                    >
                                        ‹
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleNextCard}
                                        aria-label="Next card"
                                    >
                                        ›
                                    </button>
                                </div>
                            </div>

                            {activeTab === "flashcards" && currentCard ? (
                                <>
                                    <div className="learning-flashcard-grid">
                                        <article className="learning-flashcard">
                                            <div className="learning-card-heading">
                                                <p className="learning-card-label">
                                                    QUESTION
                                                </p>

                                                <button
                                                    className={`learning-bookmark ${bookmarked
                                                        ? "bookmarked"
                                                        : ""
                                                        }`}
                                                    type="button"
                                                    onClick={() =>
                                                        setBookmarked(
                                                            (previous) => !previous
                                                        )
                                                    }
                                                    aria-label="Bookmark question"
                                                >
                                                    {bookmarked ? "★" : "☆"}
                                                </button>
                                            </div>

                                            <h2>{currentCard?.question}</h2>

                                            <div className="learning-answer-list">
                                                {currentCard.choices.map(
                                                    (option, index) => {
                                                        const letter =
                                                            String.fromCharCode(
                                                                65 + index
                                                            );

                                                        const optionIsSelected =
                                                            selectedAnswer === index;

                                                        const optionIsCorrect =
                                                            showAnswer &&
                                                            option ===
                                                            currentCard?.correctAnswer;

                                                        const optionIsIncorrect =
                                                            showAnswer &&
                                                            optionIsSelected &&
                                                            index !==
                                                            currentCard?.correctAnswer;

                                                        return (
                                                            <button
                                                                key={option}
                                                                className={[
                                                                    "learning-answer-option",
                                                                    optionIsSelected
                                                                        ? "selected"
                                                                        : "",
                                                                    optionIsCorrect
                                                                        ? "correct"
                                                                        : "",
                                                                    optionIsIncorrect
                                                                        ? "incorrect"
                                                                        : "",
                                                                ]
                                                                    .filter(Boolean)
                                                                    .join(" ")}
                                                                type="button"
                                                                onClick={() =>
                                                                    handleAnswerSelection(
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                <span>{letter}</span>
                                                                {option}
                                                            </button>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </article>

                                        <button
                                            className="learning-flip-button"
                                            type="button"
                                            onClick={() =>
                                                setShowAnswer(
                                                    (previous) => !previous
                                                )
                                            }
                                            aria-label="Reveal answer"
                                        >
                                            ⟳
                                        </button>

                                        <article className="learning-flashcard learning-answer-card">
                                            <div className="learning-card-heading">
                                                <p className="learning-card-label">
                                                    ANSWER
                                                </p>

                                                <div className="learning-answer-top">
                                                    {selectedAnswer !== null && (
                                                        <strong
                                                            className={
                                                                answerIsCorrect
                                                                    ? "correct-message"
                                                                    : "incorrect-message"
                                                            }
                                                        >
                                                            {answerIsCorrect
                                                                ? "Correct!"
                                                                : "Try Again"}
                                                        </strong>
                                                    )}

                                                    <button
                                                        className={`learning-bookmark ${bookmarked
                                                            ? "bookmarked"
                                                            : ""
                                                            }`}
                                                        type="button"
                                                        onClick={() =>
                                                            setBookmarked(
                                                                (previous) => !previous
                                                            )
                                                        }
                                                        aria-label="Bookmark answer"
                                                    >
                                                        {bookmarked ? "★" : "☆"}
                                                    </button>
                                                </div>
                                            </div>

                                            {showAnswer ? (
                                                <>
                                                    <h2>
                                                        The correct answer is{" "}
                                                        <span className="correct-letter">
                                                            {correctLetter}
                                                        </span>
                                                    </h2>

                                                    {selectedAnswer !== null &&
                                                        !answerIsCorrect && (
                                                            <p className="selected-answer-text">
                                                                You selected{" "}
                                                                {selectedLetter}.
                                                            </p>
                                                        )}

                                                    <p>
                                                        {currentCard.explanation}
                                                    </p>

                                                    <h3>Explanation</h3>

                                                    <p>
                                                        Review the concept and connect
                                                        it to a practical example before
                                                        moving to the next card.
                                                    </p>
                                                </>
                                            ) : (
                                                <div className="learning-hidden-answer">
                                                    <span>?</span>
                                                    <h2>Answer hidden</h2>
                                                    <p>
                                                        Choose an answer or press the
                                                        center button to reveal it.
                                                    </p>
                                                </div>
                                            )}
                                        </article>
                                    </div>

                                    <div className="learning-control-buttons">
                                        <button
                                            className="learning-primary-button"
                                            type="button"
                                            onClick={handleNextCard}
                                        >
                                            → Next Card
                                        </button>

                                        <button
                                            type="button"
                                            onClick={handlePreviousCard}
                                        >
                                            ← Previous Card
                                        </button>

                                        <button
                                            type="button"
                                            onClick={handleShuffle}
                                        >
                                            ⤨ Shuffle
                                        </button>
                                    </div>

                                    <div className="learning-difficulty-grid">
                                        <button
                                            className="again"
                                            type="button"
                                            onClick={handleNextCard}
                                        >
                                            <strong>☆ Again</strong>
                                            <span>I did not know this</span>
                                        </button>

                                        <button
                                            className="hard"
                                            type="button"
                                            onClick={handleNextCard}
                                        >
                                            <strong>☹ Hard</strong>
                                            <span>Difficult to remember</span>
                                        </button>

                                        <button
                                            className="good"
                                            type="button"
                                            onClick={handleNextCard}
                                        >
                                            <strong>🙂 Good</strong>
                                            <span>Getting better</span>
                                        </button>

                                        <button
                                            className="easy"
                                            type="button"
                                            onClick={handleNextCard}
                                        >
                                            <strong>☆ Easy</strong>
                                            <span>That was easy.</span>
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="learning-quiz-panel">
                                    <div className="learning-quiz-icon">
                                        ▦
                                    </div>

                                    <p className="card-kicker">
                                        AI GENERATED QUIZ
                                    </p>

                                    <h2>Test Your Knowledge</h2>

                                    <p>
                                        Complete a quiz generated from the
                                        document you uploaded.
                                    </p>

                                    <button
                                        className="learning-primary-button"
                                        type="button"
                                    >
                                        Start Quiz
                                    </button>
                                </div>
                            )}
                        </section>

                        <section className="learning-summary-grid">
                            <article className="dashboard-card learning-summary-card">
                                <h2>Study Progress</h2>

                                <div className="learning-progress-content">
                                    <div className="learning-progress-ring">
                                        <div>
                                            <strong>47%</strong>
                                            <span>Complete</span>
                                        </div>
                                    </div>

                                    <div className="learning-progress-details">
                                        <p>
                                            <span>Cards Studied</span>
                                            <strong>7 / 15</strong>
                                        </p>

                                        <p>
                                            <span>Correct Answers</span>
                                            <strong>7</strong>
                                        </p>

                                        <p>
                                            <span>Current Streak</span>
                                            <strong>7 days 🔥</strong>
                                        </p>

                                        <p>
                                            <span>Time Spent</span>
                                            <strong>25m</strong>
                                        </p>
                                    </div>
                                </div>
                            </article>

                            <article className="dashboard-card learning-summary-card">
                                <h2>Study Streak</h2>

                                <div className="learning-streak">
                                    <span>🔥</span>

                                    <div>
                                        <strong>7</strong>
                                        <p>Days in a row</p>
                                    </div>
                                </div>

                                <small>
                                    Keep it up. Consistency is key.
                                </small>
                            </article>

                            <article className="dashboard-card learning-summary-card learning-tips">
                                <h2>Study Tips</h2>

                                <ul>
                                    <li>
                                        Review your flashcards daily for
                                        better retention.
                                    </li>

                                    <li>
                                        Focus on understanding instead of
                                        only memorizing.
                                    </li>

                                    <li>
                                        Use the quiz tab to test your
                                        knowledge.
                                    </li>
                                </ul>
                            </article>
                        </section>
                    </div>

                    <aside className="learning-right-column">
                        <article className="dashboard-card learning-side-card">
                            <h2>Today&apos;s Progress</h2>

                            <div className="learning-today-content">
                                <div className="learning-today-ring">
                                    <div>
                                        <strong>14</strong>
                                        <span>/ 24</span>
                                    </div>
                                </div>

                                <div className="learning-today-stats">
                                    <p>
                                        <span>Cards Studied</span>
                                        <strong>14</strong>
                                    </p>

                                    <p>
                                        <span>Correct</span>
                                        <strong className="green-text">
                                            11
                                        </strong>
                                    </p>

                                    <p>
                                        <span>Incorrect</span>
                                        <strong className="red-text">
                                            3
                                        </strong>
                                    </p>
                                </div>
                            </div>

                            <button type="button">
                                View Progress →
                            </button>
                        </article>

                        

               

                        <article className="dashboard-card learning-side-card">
                            <h2>Weekly Goal</h2>

                            <p className="learning-goal-description">
                                Study 100 cards this week
                            </p>

                            <div className="learning-topic-track">
                                <div style={{ width: "64%" }} />
                            </div>

                            <div className="learning-goal-row">
                                <span>64 / 100</span>
                                <strong>64%</strong>
                            </div>

                            <button type="button">
                                Edit Goal
                            </button>
                        </article>

                        <article className="dashboard-card learning-brain-card">
                            <div className="learning-brain-glow" />

                            <div className="learning-brain-illustration">
                                <span>🧠</span>
                            </div>
                        </article>
                    </aside>
                </div>
            </main>
        </div>
    );
}

export default LearningHub;