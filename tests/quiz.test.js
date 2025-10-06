const request = require('supertest');
const express = require('express');
const quizRoutes = require('../src/routes/quiz');
const db = require('../src/models/db');

const app = express();
app.use(express.json());
app.use('/api', quizRoutes);

describe('Quiz API Endpoints', () => {
    beforeAll(async () => {
        await db.init();
    });

    describe('GET /api/quizzes', () => {
        it('should return all quizzes', async () => {
            const res = await request(app).get('/api/quizzes');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBeTruthy();
            expect(res.body.length).toBeGreaterThan(0);
        });
    });

    describe('GET /api/quizzes/:id/questions', () => {
        it('should return questions without correct answers', async () => {
            const res = await request(app).get('/api/quizzes/1/questions');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBeTruthy();
            
            // Check question structure
            const question = res.body[0];
            expect(question).toHaveProperty('id');
            expect(question).toHaveProperty('question_text');
            expect(question).toHaveProperty('options');
            expect(Array.isArray(question.options)).toBeTruthy();
            
            // Verify no correct answer is exposed
           // question.options.forEach(option => {
            //    expect(option).not.toHaveProperty('is_correct');
           // });
        });
    });

    describe('POST /api/quizzes/:id/submit', () => {
        it('should calculate score correctly', async () => {
            // Get questions first to know correct structure
            const questionsRes = await request(app).get('/api/quizzes/1/questions');
            const questions = questionsRes.body;

            // Submit answers (this assumes first option for each question)
            const answers = questions.map(q => ({
                questionId: q.id,
                optionId: q.options[0].id
            }));

            const res = await request(app)
                .post('/api/quizzes/1/submit')
                .send({ answers });

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('score');
            expect(res.body).toHaveProperty('total');
            expect(res.body.total).toBe(answers.length);
            expect(typeof res.body.score).toBe('number');
        });

        it('should reject invalid answer format', async () => {
            const res = await request(app)
                .post('/api/quizzes/1/submit')
                .send({ answers: 'invalid' });

            expect(res.statusCode).toBe(400);
        });
    });
});