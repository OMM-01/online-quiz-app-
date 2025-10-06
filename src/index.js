const express = require('express');
const path = require('path');
const db = require('./models/db');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Routes
const quizRoutes = require('./routes/quiz');
app.use('/api', quizRoutes);

// Serve the frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] ${req.method} ${req.url} - Error:`, err.message);
    res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;

// Initialize database before starting server
console.log('Initializing database...');
db.init()
    .then(() => {
        console.log('Database initialized successfully');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to initialize database:', err);
        console.error('Error details:', err.stack);
        process.exit(1);
    });