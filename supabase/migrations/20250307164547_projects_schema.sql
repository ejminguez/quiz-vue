-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create USER table
CREATE TABLE "USER" (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) NOT NULL UNIQUE,
    email_address VARCHAR(100) NOT NULL UNIQUE,
    is_authorized BOOLEAN NOT NULL DEFAULT FALSE,
    password_hash VARCHAR(255) NOT NULL
);

-- Create QUIZ table
CREATE TABLE "QUIZ" (
    quiz_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(100) NOT NULL,
    description TEXT,
    created_by UUID NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_timed BOOLEAN NOT NULL DEFAULT FALSE,
    time_limit INTEGER,
    randomize_questions BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (created_by) REFERENCES "USER"(user_id) ON DELETE CASCADE
);

-- Create QUESTION table
CREATE TABLE "QUESTION" (
    question_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_text TEXT NOT NULL,
    quiz_id UUID NOT NULL,
    FOREIGN KEY (quiz_id) REFERENCES "QUIZ"(quiz_id) ON DELETE CASCADE
);

-- Create CHOICE table
CREATE TABLE "CHOICE" (
    choice_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID NOT NULL,
    choice_text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (question_id) REFERENCES "QUESTION"(question_id) ON DELETE CASCADE
);

-- Create QUIZ_ATTEMPT table
CREATE TABLE "QUIZ_ATTEMPT" (
    attempt_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    quiz_id UUID NOT NULL,
    start_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP,
    total_score INTEGER DEFAULT 0,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES "USER"(user_id) ON DELETE CASCADE,
    FOREIGN KEY (quiz_id) REFERENCES "QUIZ"(quiz_id) ON DELETE CASCADE
);

-- Create QUESTION_RESPONSE table
CREATE TABLE "QUESTION_RESPONSE" (
    response_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    attempt_id UUID NOT NULL,
    question_id UUID NOT NULL,
    selected_choice_id UUID,
    score INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (attempt_id) REFERENCES "QUIZ_ATTEMPT"(attempt_id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES "QUESTION"(question_id) ON DELETE CASCADE,
    FOREIGN KEY (selected_choice_id) REFERENCES "CHOICE"(choice_id) ON DELETE SET NULL
);
