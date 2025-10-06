const sampleQuizzes = [
    {
        title: "Web Development Basics",
        questions: [
            {
                text: "What does HTML stand for?",
                options: [
                    { text: "Hyper Text Markup Language", correct: true },
                    { text: "High Tech Modern Language", correct: false },
                    { text: "Hyper Transfer Markup Language", correct: false },
                    { text: "Home Tool Markup Language", correct: false }
                ]
            },
            {
                text: "Which CSS property is used for changing text color?",
                options: [
                    { text: "text-color", correct: false },
                    { text: "color", correct: true },
                    { text: "font-color", correct: false },
                    { text: "text-style", correct: false }
                ]
            },
            {
                text: "What is the correct HTML for creating a hyperlink?",
                options: [
                    { text: "<link>", correct: false },
                    { text: "<a>", correct: true },
                    { text: "<hyperlink>", correct: false },
                    { text: "<url>", correct: false }
                ]
            },
            {
                text: "Which JavaScript method removes the last element from an array?",
                options: [
                    { text: "pop()", correct: true },
                    { text: "remove()", correct: false },
                    { text: "delete()", correct: false },
                    { text: "slice()", correct: false }
                ]
            },
            {
                text: "What is the purpose of CSS media queries?",
                options: [
                    { text: "To style print layouts", correct: false },
                    { text: "To make websites responsive", correct: true },
                    { text: "To create animations", correct: false },
                    { text: "To validate forms", correct: false }
                ]
            }
        ]
    },
    {
        title: "JavaScript Fundamentals",
        questions: [
            {
                text: "What is the difference between == and === in JavaScript?",
                options: [
                    { text: "No difference", correct: false },
                    { text: "=== checks type and value", correct: true },
                    { text: "== is not valid JavaScript", correct: false },
                    { text: "=== is faster", correct: false }
                ]
            },
            {
                text: "What is closure in JavaScript?",
                options: [
                    { text: "A way to close browser window", correct: false },
                    { text: "A function with access to outer scope", correct: true },
                    { text: "End of file marker", correct: false },
                    { text: "A way to terminate loops", correct: false }
                ]
            },
            {
                text: "What is the purpose of 'use strict'?",
                options: [
                    { text: "Enforces stricter parsing and error handling", correct: true },
                    { text: "Makes code run faster", correct: false },
                    { text: "Reduces file size", correct: false },
                    { text: "Adds new features", correct: false }
                ]
            },
            {
                text: "Which method adds elements to the beginning of an array?",
                options: [
                    { text: "append()", correct: false },
                    { text: "unshift()", correct: true },
                    { text: "push()", correct: false },
                    { text: "addStart()", correct: false }
                ]
            },
            {
                text: "What is event bubbling?",
                options: [
                    { text: "A JavaScript error", correct: false },
                    { text: "Event propagation from child to parent", correct: true },
                    { text: "Creating multiple events", correct: false },
                    { text: "Preventing event handling", correct: false }
                ]
            }
        ]
    },
    {
        title: "Python Programming",
        questions: [
            {
                text: "What is Python's list comprehension used for?",
                options: [
                    { text: "Creating lists concisely", correct: true },
                    { text: "Sorting lists", correct: false },
                    { text: "Deleting lists", correct: false },
                    { text: "Merging lists", correct: false }
                ]
            },
            {
                text: "What does PEP 8 refer to?",
                options: [
                    { text: "Python's style guide", correct: true },
                    { text: "A Python library", correct: false },
                    { text: "Python version", correct: false },
                    { text: "Package manager", correct: false }
                ]
            },
            {
                text: "What is the difference between tuple and list in Python?",
                options: [
                    { text: "No difference", correct: false },
                    { text: "Tuples are immutable", correct: true },
                    { text: "Lists are faster", correct: false },
                    { text: "Tuples are newer", correct: false }
                ]
            },
            {
                text: "What is the purpose of __init__ method?",
                options: [
                    { text: "Initialize class attributes", correct: true },
                    { text: "Import modules", correct: false },
                    { text: "Create loops", correct: false },
                    { text: "Define functions", correct: false }
                ]
            },
            {
                text: "Which is the correct way to handle exceptions?",
                options: [
                    { text: "try-except", correct: true },
                    { text: "if-else", correct: false },
                    { text: "for-in", correct: false },
                    { text: "while-do", correct: false }
                ]
            }
        ]
    },
    {
        title: "Data Structures",
        questions: [
            {
                text: "What is the time complexity of binary search?",
                options: [
                    { text: "O(log n)", correct: true },
                    { text: "O(n)", correct: false },
                    { text: "O(n²)", correct: false },
                    { text: "O(1)", correct: false }
                ]
            },
            {
                text: "What is a stack data structure?",
                options: [
                    { text: "LIFO data structure", correct: true },
                    { text: "FIFO data structure", correct: false },
                    { text: "Random access structure", correct: false },
                    { text: "Sorted array", correct: false }
                ]
            },
            {
                text: "What is the main advantage of a hash table?",
                options: [
                    { text: "Fast access O(1)", correct: true },
                    { text: "Always sorted", correct: false },
                    { text: "Memory efficient", correct: false },
                    { text: "Easy to implement", correct: false }
                ]
            },
            {
                text: "What is a linked list?",
                options: [
                    { text: "Sequential collection of elements", correct: true },
                    { text: "Array of fixed size", correct: false },
                    { text: "Sorted array", correct: false },
                    { text: "Hash table type", correct: false }
                ]
            },
            {
                text: "What is the purpose of a binary tree?",
                options: [
                    { text: "Hierarchical data storage", correct: true },
                    { text: "Sorting only", correct: false },
                    { text: "Random access", correct: false },
                    { text: "Sequential storage", correct: false }
                ]
            }
        ]
    },
    {
        title: "Git Basics",
        questions: [
            {
                text: "What is Git?",
                options: [
                    { text: "Version control system", correct: true },
                    { text: "Programming language", correct: false },
                    { text: "Web browser", correct: false },
                    { text: "Database system", correct: false }
                ]
            },
            {
                text: "What does 'git pull' do?",
                options: [
                    { text: "Updates local repository", correct: true },
                    { text: "Creates new branch", correct: false },
                    { text: "Deletes repository", correct: false },
                    { text: "Shows commit history", correct: false }
                ]
            },
            {
                text: "What is a Git branch?",
                options: [
                    { text: "Separate line of development", correct: true },
                    { text: "File type", correct: false },
                    { text: "Commit message", correct: false },
                    { text: "Remote repository", correct: false }
                ]
            },
            {
                text: "What is the purpose of .gitignore?",
                options: [
                    { text: "Specify files to ignore", correct: true },
                    { text: "Store Git settings", correct: false },
                    { text: "Track changes", correct: false },
                    { text: "Merge branches", correct: false }
                ]
            },
            {
                text: "What is a merge conflict?",
                options: [
                    { text: "Competing changes to same code", correct: true },
                    { text: "Network error", correct: false },
                    { text: "Branch deletion", correct: false },
                    { text: "Missing commit", correct: false }
                ]
            }
        ]
    }
];

module.exports = sampleQuizzes;