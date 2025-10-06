#  Online Quiz Application

A professional full-stack interactive quiz application built with Node.js, Express, SQLite, and modern vanilla JavaScript.

## 🚀 Quick Start

### Prerequisites
- Node.js 14.x or higher
- npm (Node Package Manager)

### Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone <your-repo-url>
   cd online-quiz-app
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Initialize Database with Sample Data**:
   ```bash
   node src/models/sampleData.js
   ```

4. **Start the Application**:
   ```bash
   npm start
   ```
   
   For development mode with auto-reload:
   ```bash
   npm run dev
   ```

5. **Open Your Browser**:
   Navigate to `http://localhost:3000`

## 🎯 Features

### ✨ User Interface
- **Modern Design**: Professional gradient backgrounds with glassmorphism effects
- **Fully Responsive**: Seamlessly works on desktop, tablet, and mobile devices
- **Smooth Animations**: Beautiful fade-in, slide-in, and confetti effects
- **Interactive Elements**: Engaging hover effects and micro-interactions
- **Dark Mode Friendly**: Contemporary color palette optimized for visibility

### 🎮 Quiz Experience
- **Smart Timer System**: 10-minute countdown with visual urgency indicators (changes color at 1 minute)
- **Progress Tracking**: Real-time visual progress bar and question counter
- **Navigation Controls**: Next/Previous buttons with smooth transitions
- **Answer Validation**: Prevents submission without selecting an answer
- **Auto-Submit**: Automatic submission when timer expires

### 📊 Results & Analytics
- **Performance Feedback**: Encouraging messages based on score percentage
  - 🎉 Excellent (80-100%): "Outstanding! You're a quiz master!"
  - 👍 Good (60-79%): "Great job! Keep it up!"
  - 📚 Needs Improvement (0-59%): "Keep practicing, you'll get better!"
- **Detailed Breakdown**: Question-by-question analysis with correct answers highlighted
- **Score Summary**: Clear display of correct vs total questions with percentage
- **Visual Indicators**: Color-coded ✓ (correct) and ✗ (incorrect) answers
- **Confetti Celebration**: 🎉 Animation for excellent performance (80%+)

### 🛠️ Technical Features
- **RESTful API**: Clean, well-documented API endpoints
- **Robust Validation**: Backend validation for question types and answer correctness
- **Error Handling**: Graceful error messages and user-friendly fallbacks
- **Loading States**: Professional loading spinners during API calls
- **Type Safety**: Support for single-choice and multiple-choice questions
- **Test Coverage**: Comprehensive Jest unit tests for critical logic

## 📁 Project Structure

```
online-quiz-app/
├── node_modules/              # Dependencies (auto-generated)
├── public/                    # Static frontend files
│   ├── index.html            # Main HTML structure
│   └── styles.css            # Professional CSS styling
├── src/                      # Backend source code
│   ├── models/               # Database layer
│   │   ├── db.js            # Database configuration & queries
│   │   └── sampleData.js    # Sample quiz data initialization
│   ├── routes/              # API routes
│   │   └── quiz.js          # Quiz-related endpoints
│   └── index.js             # Express server entry point
├── tests/                   # Test files
│   └── quiz.test.js        # API and scoring tests
├── package.json            # Project dependencies and scripts
├── package-lock.json       # Locked dependency versions
├── quiz.db                 # SQLite database (auto-generated)
└── README.md              # This file
```

## 🧪 Sample Data

The application comes pre-loaded with **"JavaScript Fundamentals"** quiz containing 5 questions:

1. **DOM Fundamentals** - Understanding Document Object Model (Single Choice)
2. **Data Types** - JavaScript primitive and reference types (Multiple Choice)
3. **Variable Declaration** - const, let, and var keywords (Single Choice)
4. **Array Methods** - Common array manipulation methods (Multiple Choice)
5. **Type Coercion** - Understanding typeof operator behavior (Single Choice)

## 🔧 API Endpoints

### Quiz Management
```http
GET    /api/quizzes                    # Get all available quizzes
POST   /api/quizzes                    # Create a new quiz
GET    /api/quizzes/:id                # Get specific quiz details
```

### Question Management
```http
POST   /api/quizzes/:id/questions      # Add a question to a quiz
GET    /api/quizzes/:id/questions      # Get all questions (without correct answers)
```

### Quiz Submission
```http
POST   /api/quizzes/:id/submit         # Submit answers and get results
```

## 🧪 Testing

### Run All Tests
```bash
npm test
```

### Run Tests with Coverage
```bash
npm test -- --coverage
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Test Coverage Includes:
- ✅ API endpoint functionality
- ✅ Quiz creation and retrieval
- ✅ Question validation (single/multiple choice rules)
- ✅ Answer submission and scoring logic
- ✅ Edge cases (invalid data, missing fields)
- ✅ Error handling scenarios
- ✅ Single-choice: exactly 1 correct answer required
- ✅ Multiple-choice: at least 1 correct answer required
- ✅ Text-based questions: 300 character limit

## 🎨 Design Choices & Assumptions

### Technology Stack

1. **Backend: Node.js + Express**
   - Industry-standard web framework
   - Excellent middleware ecosystem
   - Perfect for RESTful APIs
   - Non-blocking I/O for better performance

2. **Database: SQLite**
   - Zero-configuration setup
   - File-based, no separate database server needed
   - Ideal for development and small-to-medium applications
   - Easy to backup (just copy quiz.db file)
   - Version control friendly

3. **Frontend: Vanilla JavaScript**
   - Demonstrates core JavaScript proficiency
   - No framework overhead or build process
   - Lightweight and fast loading
   - Modern ES6+ features (async/await, arrow functions, template literals)
   - Native DOM manipulation

4. **Testing: Jest + Supertest**
   - Industry-standard testing framework
   - Excellent async/await support
   - Built-in code coverage reporting
   - Great mocking capabilities

### Architecture Decisions

1. **MVC-like Pattern**
   - **Models** (`src/models/`): Database operations and data layer
   - **Routes** (`src/routes/`): API endpoint definitions
   - **Views** (`public/`): Frontend presentation layer
   - Clear separation of concerns for maintainability

2. **Validation Strategy**
   - Server-side validation for all inputs
   - Question type validation (single, multiple, text)
   - Text questions limited to 300 characters
   - Single-choice enforces exactly 1 correct answer
   - Multiple-choice requires at least 1 correct answer
   - Answer format validation before scoring

3. **Security Considerations**
   - ✅ Correct answers NEVER sent to frontend
   - ✅ All scoring done server-side
   - ✅ Input validation on all endpoints
   - ✅ CORS enabled for API access
   - ✅ SQL injection prevention (parameterized queries)
   - ✅ Error messages don't expose sensitive data

4. **User Experience Design**
   - Progressive question navigation
   - Clear progress indicators (X of Y questions)
   - Timer with visual feedback (color changes)
   - Responsive design (mobile-first approach)
   - Loading states for all async operations
   - Smooth animations and transitions
   - Accessibility considerations (semantic HTML, ARIA labels)

### Assumptions Made

1. **Quiz Duration**: Default 10 minutes (600 seconds) per quiz
2. **Question Points**: All questions worth 1 point by default
3. **Single Session**: No user authentication (can be added later)
4. **No Question Randomization**: Questions shown in sequential order
5. **Auto-Submit**: Quiz automatically submits when timer expires
6. **Unlimited Attempts**: Users can retake quizzes as many times as needed
7. **Client-Side Timer**: Timer runs on client (can be synced with server for security)
8. **No Image Support**: Text-only questions and options (images can be added)


Then reinitialize the database:
```bash
rm quiz.db
node src/models/sampleData.js
```

## 🐛 Troubleshooting

### Database Issues

**Problem**: "Database file not found" or "Table doesn't exist"

**Solution**:
```bash
# Delete existing database
rm quiz.db

# Reinitialize with sample data
node src/models/sampleData.js
```

### Port Already in Use

**Problem**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solution 1** - Kill the process using the port:
```bash
# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Mac/Linux
lsof -ti:3000 | xargs kill -9
```

**Solution 2** - Change the port in `src/index.js`:
```javascript
const PORT = process.env.PORT || 3001; // Change to 3001
```

### npm install Fails

**Problem**: Dependencies won't install

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Frontend Not Loading

**Problem**: Blank page or "Cannot GET /"

**Solution**:
1. Ensure server is running (`npm start`)
2. Check console for errors (F12 in browser)
3. Verify `public/` folder exists with index.html
4. Check server logs for any error messages
5. Clear browser cache (Ctrl+F5 or Cmd+Shift+R)
6. Try accessing directly: `http://localhost:3000/index.html`

### Tests Failing

**Problem**: Jest tests are failing

**Solution**:
```bash
# Make sure database is initialized
node src/models/sampleData.js

# Clear Jest cache
npm test -- --clearCache

# Run tests again
npm test
```


**Note**: The application uses modern JavaScript features (ES6+). Internet Explorer is not supported.



## 📄 License

This project is licensed under the MIT License:

---


## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines
- Write clean, readable code
- Add comments for complex logic
- Write tests for new features
- Update README if needed
- Follow existing code style
- Test thoroughly before submitting

## 📧 Contact & Support

For questions, issues, or suggestions:
- 📧 Email: omkar.b.dubal@gmail.com
- 🐛 Issues: Open an issue on GitHub
- 💬 Discussions: Use GitHub Discussions tab

## 🙏 Acknowledgments

- Inspired by modern quiz platforms like Kahoot and Quizlet
- UI design inspired by glassmorphism trends
- Icons and animations using CSS-only techniques
- Testing practices from Jest documentation

---

**Built with ❤️ using Node.js, Express, SQLite, and Vanilla JavaScript**

**Enjoy building amazing quizzes! 🎉**

---
