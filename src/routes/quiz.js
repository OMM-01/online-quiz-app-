const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Get all quizzes
router.get('/quizzes', async (req, res) => {
    try {
        const quizzes = await db.getQuizzes();
        res.json(quizzes);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch quizzes' });
    }
});

// Get questions for a specific quiz (without correct answers)
router.get('/quizzes/:id/questions', async (req, res) => {
    try {
        const questions = await db.getQuizQuestions(req.params.id);
        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch quiz questions' });
    }
});

// Submit quiz answers and get score
router.post('/quizzes/:id/submit', async (req, res) => {
    try {
        const answers = req.body.answers;
        
        if (!Array.isArray(answers) || !answers.length) {
            return res.status(400).json({ error: 'Invalid answers format' });
        }

        const result = await db.checkAnswers(answers);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: 'Failed to process quiz submission' });
    }
});

module.exports = router;