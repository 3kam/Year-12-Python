PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE CHECK (email LIKE '%@%'),
  password_hash TEXT NOT NULL,
  display_name TEXT,
  height_cm REAL,
  weight_kg REAL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS workout_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS exercises (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER,
  name TEXT NOT NULL UNIQUE,
  equipment TEXT,
  difficulty TEXT CHECK(difficulty IN ('easy','medium','hard')),
  description TEXT,
  FOREIGN KEY(category_id) REFERENCES workout_categories(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS workouts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER,
  creator_user_id INTEGER,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  is_template INTEGER DEFAULT 1 CHECK(is_template IN (0,1)),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(category_id) REFERENCES workout_categories(id) ON DELETE SET NULL,
  FOREIGN KEY(creator_user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS workout_exercises (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  workout_id INTEGER NOT NULL,
  exercise_id INTEGER NOT NULL,
  position INTEGER DEFAULT 0,
  sets INTEGER DEFAULT 3 CHECK(sets >= 0),
  reps INTEGER DEFAULT 8 CHECK(reps >= 0),
  suggested_weight REAL,
  rest_seconds INTEGER DEFAULT 60 CHECK(rest_seconds >= 0),
  FOREIGN KEY(workout_id) REFERENCES workouts(id) ON DELETE CASCADE,
  FOREIGN KEY(exercise_id) REFERENCES exercises(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  workout_id INTEGER,
  started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  duration_minutes INTEGER,
  notes TEXT,
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY(workout_id) REFERENCES workouts(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id INTEGER,
  user_id INTEGER NOT NULL,
  exercise_id INTEGER NOT NULL,
  weight REAL CHECK(weight >= 0),
  reps INTEGER CHECK(reps >= 0),
  sets INTEGER CHECK(sets >= 0),
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(session_id) REFERENCES sessions(id) ON DELETE SET NULL,
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY(exercise_id) REFERENCES exercises(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS schedule (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  workout_id INTEGER NOT NULL,
  day_of_week TEXT CHECK(day_of_week IN ('Mon','Tue','Wed','Thu','Fri','Sat','Sun')),
  date_override DATE,
  repeat_type TEXT DEFAULT 'none' CHECK(repeat_type IN ('none','weekly','biweekly','monthly')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY(workout_id) REFERENCES workouts(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_exercises_category ON exercises(category_id);
CREATE INDEX IF NOT EXISTS idx_workouts_category ON workouts(category_id);
CREATE INDEX IF NOT EXISTS idx_workoutex_workout ON workout_exercises(workout_id);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_user ON progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_exercise ON progress(exercise_id);
CREATE INDEX IF NOT EXISTS idx_schedule_user ON schedule(user_id);

INSERT OR IGNORE INTO workout_categories (name) VALUES
('Chest'),('Back'),('Legs'),('Shoulders'),('Biceps'),('Triceps'),('Core'),('Cardio'),('Full Body');

INSERT OR IGNORE INTO exercises (category_id, name, equipment, difficulty, description) VALUES
((SELECT id FROM workout_categories WHERE name='Chest'),'Bench Press','Barbell','medium','Barbell flat bench press.'),
((SELECT id FROM workout_categories WHERE name='Chest'),'Incline Dumbbell Press','Dumbbells','medium','Incline bench dumbbell press.'),
((SELECT id FROM workout_categories WHERE name='Chest'),'Chest Fly','Dumbbells','easy','Dumbbell fly.'),
((SELECT id FROM workout_categories WHERE name='Chest'),'Push Ups','Bodyweight','easy','Standard push ups.'),
((SELECT id FROM workout_categories WHERE name='Back'),'Lat Pulldown','Machine','medium','Lat pulldown for lats.'),
((SELECT id FROM workout_categories WHERE name='Back'),'Seated Row','Machine','medium','Seated cable row.'),
((SELECT id FROM workout_categories WHERE name='Back'),'Bent Over Row','Barbell','hard','Barbell bent-over row.'),
((SELECT id FROM workout_categories WHERE name='Back'),'Back Extension','Bodyweight/Machine','easy','Lower back extension.'),
((SELECT id FROM workout_categories WHERE name='Legs'),'Squat','Barbell','hard','Back squat.'),
((SELECT id FROM workout_categories WHERE name='Legs'),'Leg Press','Machine','medium','Leg press machine.'),
((SELECT id FROM workout_categories WHERE name='Legs'),'Hamstring Curl','Machine','easy','Seated or lying hamstring curl.'),
((SELECT id FROM workout_categories WHERE name='Legs'),'Calf Raise','Machine/Bodyweight','easy','Calf raises.'),
((SELECT id FROM workout_categories WHERE name='Shoulders'),'Shoulder Press','Dumbbells/Barbell','medium','Overhead press.'),
((SELECT id FROM workout_categories WHERE name='Shoulders'),'Lateral Raise','Dumbbells','easy','Side delt isolation.'),
((SELECT id FROM workout_categories WHERE name='Biceps'),'Bicep Curl','Barbell/Dumbbell','easy','Standard bicep curl.'),
((SELECT id FROM workout_categories WHERE name='Biceps'),'Hammer Curl','Dumbbells','easy','Hammer grip curl.'),
((SELECT id FROM workout_categories WHERE name='Triceps'),'Tricep Pushdown','Cable','easy','Cable pushdown.'),
((SELECT id FROM workout_categories WHERE name='Core'),'Plank','Bodyweight','easy','Core stabilization exercise.'),
((SELECT id FROM workout_categories WHERE name='Cardio'),'Treadmill Run','Machine','easy','Treadmill steady state run.'),
((SELECT id FROM workout_categories WHERE name='Full Body'),'Burpees','Bodyweight','hard','Full body conditioning exercise.');

INSERT OR IGNORE INTO workouts (category_id, creator_user_id, name, description, is_template) VALUES
((SELECT id FROM workout_categories WHERE name='Chest'), NULL, 'Push Day - Chest Focus', 'Upper body push workout', 1),
((SELECT id FROM workout_categories WHERE name='Back'), NULL, 'Pull Day - Back Focus', 'Upper body pull workout', 1),
((SELECT id FROM workout_categories WHERE name='Legs'), NULL, 'Leg Day - Strength', 'Lower body strength workout', 1),
((SELECT id FROM workout_categories WHERE name='Full Body'), NULL, 'Full Body HIIT', 'High-intensity full-body circuit', 1);

INSERT OR IGNORE INTO users (username, email, password_hash, display_name) VALUES
('testuser','test@example.com','$2b$12$samplehash','Test User');
