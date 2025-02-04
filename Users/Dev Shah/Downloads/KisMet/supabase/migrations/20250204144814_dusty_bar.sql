/*
  # Dating App Schema Setup

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, matches auth.users.id)
      - `name` (text)
      - `bio` (text)
      - `birth_date` (date)
      - `gender` (text)
      - `location` (point)
      - `interests` (text array)
      - `photos` (text array, URLs)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `swipes`
      - `id` (uuid, primary key)
      - `swiper_id` (uuid, references profiles.id)
      - `swiped_id` (uuid, references profiles.id)
      - `liked` (boolean)
      - `created_at` (timestamp)
    
    - `matches`
      - `id` (uuid, primary key)
      - `user1_id` (uuid, references profiles.id)
      - `user2_id` (uuid, references profiles.id)
      - `created_at` (timestamp)
    
    - `messages`
      - `id` (uuid, primary key)
      - `match_id` (uuid, references matches.id)
      - `sender_id` (uuid, references profiles.id)
      - `content` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Enable PostGIS for location-based queries
CREATE EXTENSION IF NOT EXISTS postgis;

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  name text NOT NULL,
  bio text,
  birth_date date NOT NULL,
  gender text NOT NULL,
  location geography(point),
  interests text[] DEFAULT '{}',
  photos text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Swipes table
CREATE TABLE IF NOT EXISTS swipes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  swiper_id uuid REFERENCES profiles(id) NOT NULL,
  swiped_id uuid REFERENCES profiles(id) NOT NULL,
  liked boolean NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(swiper_id, swiped_id)
);

-- Matches table (created when both users like each other)
CREATE TABLE IF NOT EXISTS matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user1_id uuid REFERENCES profiles(id) NOT NULL,
  user2_id uuid REFERENCES profiles(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user1_id, user2_id)
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id uuid REFERENCES matches(id) NOT NULL,
  sender_id uuid REFERENCES profiles(id) NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE swipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can view potential matches"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    id != auth.uid() AND
    id NOT IN (
      SELECT swiped_id 
      FROM swipes 
      WHERE swiper_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Policies for swipes
CREATE POLICY "Users can create their own swipes"
  ON swipes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = swiper_id);

CREATE POLICY "Users can view their own swipes"
  ON swipes FOR SELECT
  TO authenticated
  USING (auth.uid() = swiper_id);

-- Policies for matches
CREATE POLICY "Users can view their own matches"
  ON matches FOR SELECT
  TO authenticated
  USING (auth.uid() = user1_id OR auth.uid() = user2_id);

-- Policies for messages
CREATE POLICY "Users can insert messages in their matches"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM matches
      WHERE id = match_id
      AND (user1_id = auth.uid() OR user2_id = auth.uid())
    )
  );

CREATE POLICY "Users can view messages in their matches"
  ON messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM matches
      WHERE id = match_id
      AND (user1_id = auth.uid() OR user2_id = auth.uid())
    )
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to update updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();