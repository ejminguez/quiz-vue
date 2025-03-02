-- Create USER table
CREATE TABLE "USER" (
    user_id VARCHAR(36) PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email_address VARCHAR(100) NOT NULL UNIQUE,
    is_authorized BOOLEAN NOT NULL DEFAULT FALSE,
    password_hash VARCHAR(255) NOT NULL
);

-- Create QUIZ table
CREATE TABLE "QUIZ" (
    quiz_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    created_by VARCHAR(36) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_timed BOOLEAN NOT NULL DEFAULT FALSE,
    time_limit INTEGER,
    randomize_questions BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (created_by) REFERENCES "USER"(user_id) ON DELETE CASCADE
);

-- Create QUESTION table
CREATE TABLE "QUESTION" (
    question_id SERIAL PRIMARY KEY,
    question_text TEXT NOT NULL,
    quiz_id INTEGER NOT NULL,
    FOREIGN KEY (quiz_id) REFERENCES "QUIZ"(quiz_id) ON DELETE CASCADE
);

-- Create CHOICE table
CREATE TABLE "CHOICE" (
    choice_id SERIAL PRIMARY KEY,
    question_id INTEGER NOT NULL,
    choice_text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (question_id) REFERENCES "QUESTION"(question_id) ON DELETE CASCADE
);

-- Create QUIZ_ATTEMPT table
CREATE TABLE "QUIZ_ATTEMPT" (
    attempt_id SERIAL PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    quiz_id INTEGER NOT NULL,
    start_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP,
    total_score INTEGER DEFAULT 0,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES "USER"(user_id) ON DELETE CASCADE,
    FOREIGN KEY (quiz_id) REFERENCES "QUIZ"(quiz_id) ON DELETE CASCADE
);

-- Create QUESTION_RESPONSE table
CREATE TABLE "QUESTION_RESPONSE" (
    response_id SERIAL PRIMARY KEY,
    attempt_id INTEGER NOT NULL,
    question_id INTEGER NOT NULL,
    selected_choice_id INTEGER,
    score INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (attempt_id) REFERENCES "QUIZ_ATTEMPT"(attempt_id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES "QUESTION"(question_id) ON DELETE CASCADE,
    FOREIGN KEY (selected_choice_id) REFERENCES "CHOICE"(choice_id) ON DELETE SET NULL
);

-- Create indexes for better query performance
CREATE INDEX idx_quiz_created_by ON "QUIZ"(created_by);
CREATE INDEX idx_question_quiz_id ON "QUESTION"(quiz_id);
CREATE INDEX idx_choice_question_id ON "CHOICE"(question_id);
CREATE INDEX idx_quiz_attempt_user_id ON "QUIZ_ATTEMPT"(user_id);
CREATE INDEX idx_quiz_attempt_quiz_id ON "QUIZ_ATTEMPT"(quiz_id);
CREATE INDEX idx_question_response_attempt_id ON "QUESTION_RESPONSE"(attempt_id);
CREATE INDEX idx_question_response_question_id ON "QUESTION_RESPONSE"(question_id);