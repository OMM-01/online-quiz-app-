const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const sampleQuizzes = require('./sampleData');

const dbPath = path.join(__dirname, '../../quiz.db');
const db = new sqlite3.Database(dbPath);

async function loadSampleData() {
    for (const quiz of sampleQuizzes) {
        // Insert quiz
        const quizResult = await new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO quizzes (title) VALUES (?)',
                [quiz.title],
                function(err) {
                    if (err) reject(err);
                    else resolve(this.lastID);
                }
            );
        });

        // Insert questions and options
        for (const question of quiz.questions) {
            const questionResult = await new Promise((resolve, reject) => {
                db.run(
                    'INSERT INTO questions (quiz_id, question_text) VALUES (?, ?)',
                    [quizResult, question.text],
                    function(err) {
                        if (err) reject(err);
                        else resolve(this.lastID);
                    }
                );
            });

            // Insert options
            const optionPromises = question.options.map(option => {
                return new Promise((resolve, reject) => {
                    db.run(
                        'INSERT INTO options (question_id, option_text, is_correct) VALUES (?, ?, ?)',
                        [questionResult, option.text, option.correct ? 1 : 0],
                        (err) => {
                            if (err) reject(err);
                            else resolve();
                        }
                    );
                });
            });

            await Promise.all(optionPromises);
        }
    }
}

function init() {
    return new Promise((resolve, reject) => {
        console.log('Starting database initialization...');
        db.serialize(() => {
            try {
                // Drop existing tables if they exist
                console.log('Dropping existing tables...');
                db.run('DROP TABLE IF EXISTS options');
                db.run('DROP TABLE IF EXISTS questions');
                db.run('DROP TABLE IF EXISTS quizzes');

                // Create tables
                console.log('Creating new tables...');
                db.run(`CREATE TABLE IF NOT EXISTS quizzes (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT NOT NULL,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )`);

                db.run(`CREATE TABLE IF NOT EXISTS questions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    quiz_id INTEGER,
                    question_text TEXT NOT NULL,
                    FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
                )`);

                db.run(`CREATE TABLE IF NOT EXISTS options (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    question_id INTEGER,
                    option_text TEXT NOT NULL,
                    is_correct BOOLEAN NOT NULL DEFAULT 0,
                    FOREIGN KEY (question_id) REFERENCES questions(id)
                )`);

                // Load sample data
                console.log('Loading sample data...');
                loadSampleData()
                    .then(() => {
                        console.log('Sample data loaded successfully');
                        resolve();
                    })
                    .catch(err => {
                        console.error('Error loading sample data:', err);
                        reject(err);
                    });
            } catch (err) {
                console.error('Error during database initialization:', err);
                reject(err);
            }
        });
    });
}

module.exports = {
    init,
    db,
    getQuizzes: () => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM quizzes", [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    },
    getQuizQuestions: (quizId) => {
        return new Promise((resolve, reject) => {
            db.all(
                `SELECT 
                    q.id, 
                    q.question_text, 
                    json_group_array(
                        json_object(
                            'id', o.id,
                            'text', o.option_text,
                            'is_correct', o.is_correct
                        )
                    ) as options
                FROM questions q
                LEFT JOIN options o ON o.question_id = q.id
                WHERE q.quiz_id = ?
                GROUP BY q.id, q.question_text
                ORDER BY q.id`,
                [quizId],
                (err, rows) => {
                    if (err) reject(err);
                    else {
                        rows.forEach(row => {
                            try {
                                row.options = JSON.parse(row.options);
                                // Filter out any null options that might come from the LEFT JOIN
                                row.options = row.options.filter(opt => opt.id != null);
                            } catch (e) {
                                console.error('Error parsing options for question:', row.id, e);
                                row.options = [];
                            }
                        });
                        resolve(rows);
                    }
                }
            );
        });
    },
    checkAnswers: (answers) => {
        return new Promise((resolve, reject) => {
            const promises = answers.map(answer => {
                return new Promise((resolve, reject) => {
                    if (!answer.optionId || !answer.questionId) {
                        resolve(false);
                        return;
                    }
                    db.get(
                        "SELECT is_correct FROM options WHERE id = ? AND question_id = ?",
                        [answer.optionId, answer.questionId],
                        (err, row) => {
                            if (err) reject(err);
                            else resolve(row?.is_correct === 1);
                        }
                    );
                });
            });

            Promise.all(promises)
                .then(results => {
                    const score = results.filter(Boolean).length;
                    resolve({
                        score,
                        total: answers.length,
                        correct: results
                    });
                })
                .catch(reject);
        });
    }
};