/*
  # SkillPath AI Database Schema

  ## Overview
  Creates the complete database structure for SkillPath AI application including
  user profiles, learning roadmaps, and progress tracking.

  ## New Tables
  
  ### 1. profiles
  Extended user profile information beyond auth.users
  - `id` (uuid, primary key) - Links to auth.users
  - `full_name` (text) - User's full name
  - `education_level` (text) - Current education level
  - `branch` (text) - Study branch (ECE, CSE, etc.)
  - `created_at` (timestamptz) - Profile creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. roadmaps
  Stores AI-generated learning roadmaps
  - `id` (uuid, primary key) - Unique roadmap identifier
  - `user_id` (uuid, foreign key) - Owner of the roadmap
  - `title` (text) - Roadmap title/target role
  - `target_role` (text) - Target job role or exam
  - `current_skill_level` (text) - Starting skill level
  - `time_per_day` (integer) - Available hours per day
  - `total_duration_weeks` (integer) - Total roadmap duration
  - `roadmap_data` (jsonb) - Complete roadmap structure with phases, topics, resources
  - `is_active` (boolean) - Whether this is the user's active roadmap
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 3. progress_tracking
  Tracks user progress through roadmap phases and checkpoints
  - `id` (uuid, primary key) - Unique progress entry
  - `user_id` (uuid, foreign key) - User identifier
  - `roadmap_id` (uuid, foreign key) - Associated roadmap
  - `phase_index` (integer) - Which phase in the roadmap
  - `checkpoint_index` (integer) - Which checkpoint within phase
  - `completed` (boolean) - Completion status
  - `completed_at` (timestamptz) - When it was completed
  - `notes` (text) - User notes about this checkpoint
  - `created_at` (timestamptz) - Creation timestamp

  ## Security
  - Enable RLS on all tables
  - Users can only access their own data
  - Authenticated users only
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text DEFAULT '',
  education_level text DEFAULT '',
  branch text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create roadmaps table
CREATE TABLE IF NOT EXISTS roadmaps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  target_role text NOT NULL,
  current_skill_level text NOT NULL,
  time_per_day integer DEFAULT 2,
  total_duration_weeks integer DEFAULT 12,
  roadmap_data jsonb NOT NULL DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE roadmaps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own roadmaps"
  ON roadmaps FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own roadmaps"
  ON roadmaps FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own roadmaps"
  ON roadmaps FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own roadmaps"
  ON roadmaps FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create progress_tracking table
CREATE TABLE IF NOT EXISTS progress_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  roadmap_id uuid NOT NULL REFERENCES roadmaps(id) ON DELETE CASCADE,
  phase_index integer NOT NULL,
  checkpoint_index integer NOT NULL,
  completed boolean DEFAULT false,
  completed_at timestamptz,
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  UNIQUE(roadmap_id, phase_index, checkpoint_index)
);

ALTER TABLE progress_tracking ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress"
  ON progress_tracking FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON progress_tracking FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON progress_tracking FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own progress"
  ON progress_tracking FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_roadmaps_user_id ON roadmaps(user_id);
CREATE INDEX IF NOT EXISTS idx_roadmaps_is_active ON roadmaps(is_active);
CREATE INDEX IF NOT EXISTS idx_progress_tracking_user_id ON progress_tracking(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_tracking_roadmap_id ON progress_tracking(roadmap_id);
