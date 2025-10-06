// Enhanced State Management
const state = {
    currentQuiz: null,
    questions: [],
    currentQuestionIndex: 0,
    answers: new Map(), // Using Map for better performance
    timeLeft: 0,
    timerInterval: null,
    quizHistory: [], // Track quiz attempt history
    loading: false, // Loading state
    error: null // Error state
};

// State Update Function
function updateState(updates) {
    Object.entries(updates).forEach(([key, value]) => {
        state[key] = value;
    });
    renderUI(); // Update UI whenever state changes
}

// UI Rendering based on state
function renderUI() {
    // Update loading state
    document.body.classList.toggle('loading', state.loading);
    
    // Show error if exists
    if (state.error) {
        alert(state.error);
        updateState({ error: null });
    }
    
    // Update question display if in quiz
    if (state.currentQuiz && state.questions.length > 0) {
        displayQuestion();
        updateProgress();
        updateNavButtons();
    }
}

// Celebration effects
function celebrate(score, total) {
    const percentage = (score / total) * 100;
    
    const message = percentage === 100 ? '🎉 Perfect Score! 🎉' :
                    percentage >= 80 ? '🌟 Great Job! 🌟' :
                    percentage >= 60 ? '👍 Well Done! 👍' :
                    '💪 Keep Practicing! 💪';

    // Animate the score display
    elements.percentage.textContent = '0';
    let currentScore = 0;
    const targetScore = Math.round(percentage);
    const duration = 2000; // 2 seconds
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    const increment = targetScore / steps;

    const animation = setInterval(() => {
        currentScore = Math.min(currentScore + increment, targetScore);
        elements.percentage.textContent = Math.round(currentScore);
        
        if (currentScore >= targetScore) {
            clearInterval(animation);
            // Add the celebration message
            const messageEl = document.createElement('div');
            messageEl.className = 'celebration-message';
            messageEl.textContent = message;
            elements.resultsBreakdown.insertBefore(messageEl, elements.resultsBreakdown.firstChild);
        }
    }, interval);
}

// DOM Elements
const screens = {
    welcome: document.getElementById('welcome-screen'),
    quiz: document.getElementById('quiz-screen'),
    results: document.getElementById('results-screen')
};

const elements = {
    quizList: document.getElementById('quiz-list'),
    quizTitle: document.getElementById('quiz-title'),
    questionText: document.getElementById('question-text'),
    optionsList: document.getElementById('options-list'),
    prevBtn: document.getElementById('prev-btn'),
    nextBtn: document.getElementById('next-btn'),
    submitBtn: document.getElementById('submit-btn'),
    progressFill: document.getElementById('progress-fill'),
    questionNumber: document.getElementById('question-number'),
    timeLeft: document.getElementById('time-left'),
    score: document.getElementById('score'),
    total: document.getElementById('total'),
    percentage: document.getElementById('percentage'),
    resultsBreakdown: document.getElementById('results-breakdown'),
    restartBtn: document.getElementById('restart-btn')
};

// API Functions
async function fetchQuizzes() {
    const response = await fetch('/api/quizzes');
    return await response.json();
}

async function fetchQuizQuestions(quizId) {
    const response = await fetch(`/api/quizzes/${quizId}/questions`);
    return await response.json();
}

async function submitQuiz(quizId, answers) {
    const response = await fetch(`/api/quizzes/${quizId}/submit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ answers })
    });
    return await response.json();
}

// UI Functions
function showScreen(screenName) {
    Object.keys(screens).forEach(name => {
        screens[name].classList.toggle('hidden', name !== screenName);
    });
}

function updateProgress() {
    const progress = ((state.currentQuestionIndex + 1) / state.questions.length) * 100;
    elements.progressFill.style.width = `${progress}%`;
    elements.questionNumber.textContent = 
        `Question ${state.currentQuestionIndex + 1} of ${state.questions.length}`;
}

function updateNavButtons() {
    elements.prevBtn.disabled = state.currentQuestionIndex === 0;
    elements.nextBtn.textContent = 
        state.currentQuestionIndex === state.questions.length - 1 ? 'Finish' : 'Next';
    elements.submitBtn.classList.toggle('hidden', 
        state.currentQuestionIndex !== state.questions.length - 1);
}

function displayQuestion() {
    const question = state.questions[state.currentQuestionIndex];
    if (!question) return;

    // Update question text with animation
    elements.questionText.style.opacity = '0';
    setTimeout(() => {
        elements.questionText.textContent = question.question_text;
        elements.questionText.style.opacity = '1';
    }, 150);
    
    // Generate options with better accessibility and keyboard navigation
    elements.optionsList.innerHTML = question.options
        .map((option, index) => `
            <div class="option ${state.answers.get(question.id) === option.id ? 'selected' : ''}"
                 data-option-id="${option.id}"
                 tabindex="0"
                 role="button"
                 aria-label="Option ${index + 1}: ${option.text}"
                 aria-selected="${state.answers.get(question.id) === option.id}">
                <span class="option-number">${index + 1}.</span>
                <span class="option-text">${option.text}</span>
            </div>
        `).join('');

    // Update progress indicators
    updateProgress();
    updateNavButtons();

    // Update question title
    elements.quizTitle.textContent = `Question ${state.currentQuestionIndex + 1}`;
}

function startTimer(minutes = 10) {
    state.timeLeft = minutes * 60;
    clearInterval(state.timerInterval);
    
    state.timerInterval = setInterval(() => {
        state.timeLeft--;
        const minutes = Math.floor(state.timeLeft / 60);
        const seconds = state.timeLeft % 60;
        elements.timeLeft.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        if (state.timeLeft <= 0) {
            clearInterval(state.timerInterval);
            handleQuizSubmission();
        }
    }, 1000);
}

// Event Handlers
async function handleQuizStart(quizId) {
    try {
        updateState({ loading: true, error: null });
        const questions = await fetchQuizQuestions(quizId);
        
        updateState({
            currentQuiz: quizId,
            questions,
            currentQuestionIndex: 0,
            answers: new Map(),
            loading: false
        });
        
        showScreen('quiz');
        startTimer();
    } catch (error) {
        updateState({
            loading: false,
            error: 'Failed to load quiz questions. Please try again.'
        });
        console.error('Failed to start quiz:', error);
    }
}

function handleOptionClick(e) {
    const option = e.target.closest('.option');
    if (!option) return;

    const question = state.questions[state.currentQuestionIndex];
    const optionId = parseInt(option.dataset.optionId);

    // Update answers in state
    const newAnswers = new Map(state.answers);
    newAnswers.set(question.id, optionId);

    // Animate option selection
    const previousSelected = elements.optionsList.querySelector('.option.selected');
    if (previousSelected) {
        previousSelected.classList.remove('selected');
    }
    option.classList.add('selected');

    // Update state with new answer
    updateState({ answers: newAnswers });
    
    // Just update the display without auto-advancing
    displayQuestion();
}

function handleNavigation(direction) {
    const newIndex = state.currentQuestionIndex + direction;
    if (newIndex >= 0 && newIndex < state.questions.length) {
        state.currentQuestionIndex = newIndex;
        displayQuestion();
    }
}

async function handleQuizSubmission() {
    try {
        updateState({ loading: true, error: null });
        clearInterval(state.timerInterval);
        
        const answersArray = Array.from(state.answers, ([questionId, optionId]) => ({
            questionId: parseInt(questionId),
            optionId
        }));

        // Validate if all questions are answered
        if (answersArray.length !== state.questions.length) {
            throw new Error('Please answer all questions before submitting.');
        }

        const results = await submitQuiz(state.currentQuiz, answersArray);
        
        // Update quiz history
        const quizHistory = [...state.quizHistory];
        quizHistory.push({
            quizId: state.currentQuiz,
            score: results.score,
            total: results.total,
            timestamp: new Date()
        });

        updateState({
            loading: false,
            quizHistory
        });

        // Update results display
        elements.score.textContent = results.score;
        elements.total.textContent = results.total;
        showScreen('results');
        celebrate(results.score, results.total);

        // Show detailed results with question review
        const resultsHTML = results.correct.map((isCorrect, index) => {
            const question = state.questions[index];
            const selectedOption = state.answers.get(question.id);
            const correctOption = question.options.find(opt => opt.is_correct);

            return `
                <div class="question-result ${isCorrect ? 'correct' : 'incorrect'}">
                    <h4>Question ${index + 1}</h4>
                    <p class="question-text">${question.question_text}</p>
                    <p>Your answer: ${question.options.find(opt => opt.id === selectedOption)?.text}</p>
                    ${!isCorrect ? `<p class="correct-answer">Correct answer: ${correctOption?.text}</p>` : ''}
                    <p class="result-icon">${isCorrect ? '✅ Correct' : '❌ Incorrect'}</p>
                </div>
            `;
        }).join('');

        elements.resultsBreakdown.innerHTML = `<div class="results-details">${resultsHTML}</div>`;
    } catch (error) {
        updateState({
            loading: false,
            error: error.message || 'Failed to submit quiz. Please try again.'
        });
        console.error('Failed to submit quiz:', error);
    }
}

// Initialize App
async function initializeApp() {
    try {
        const quizzes = await fetchQuizzes();
        elements.quizList.innerHTML = quizzes
            .map(quiz => `
                <div class="quiz-item" data-quiz-id="${quiz.id}">
                    <h3>${quiz.title}</h3>
                    <p>Click to start</p>
                </div>
            `).join('');
    } catch (error) {
        console.error('Failed to load quizzes:', error);
        elements.quizList.innerHTML = '<p>Failed to load quizzes. Please refresh the page.</p>';
    }
}



// Event Listeners
elements.quizList.addEventListener('click', e => {
    const quizItem = e.target.closest('.quiz-item');
    if (quizItem) {
        handleQuizStart(parseInt(quizItem.dataset.quizId));
    }
});

elements.optionsList.addEventListener('click', handleOptionClick);
elements.prevBtn.addEventListener('click', () => handleNavigation(-1));
elements.nextBtn.addEventListener('click', () => handleNavigation(1));
elements.submitBtn.addEventListener('click', handleQuizSubmission);
elements.restartBtn.addEventListener('click', () => {
    showScreen('welcome');
    clearInterval(state.timerInterval);
});

// Start the app
initializeApp();