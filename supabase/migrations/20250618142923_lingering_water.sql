/*
  # Initial Schema Setup for LearnHub LMS

  1. New Tables
    - `users` - Extended user profiles with gamification
    - `communities` - Learning communities and groups
    - `courses` - Course information and metadata
    - `lessons` - Individual lessons within courses
    - `discussions` - Community discussions and forums
    - `discussion_replies` - Replies to discussions
    - `user_communities` - Many-to-many relationship for community memberships
    - `user_courses` - Many-to-many relationship for course enrollments
    - `user_progress` - Track user progress through courses
    - `badges` - Achievement badges system
    - `user_badges` - Many-to-many relationship for user achievements
    - `live_sessions` - Live webinars and sessions
    - `session_attendees` - Track session attendance

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Ensure proper access control based on user roles
*/

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  username text UNIQUE NOT NULL,
  full_name text NOT NULL,
  avatar_url text,
  role text NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'educator', 'admin')),
  level integer NOT NULL DEFAULT 1,
  points integer NOT NULL DEFAULT 0,
  bio text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Communities table
CREATE TABLE IF NOT EXISTS communities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  image_url text,
  is_private boolean DEFAULT false,
  member_count integer DEFAULT 0,
  created_by uuid REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  thumbnail_url text,
  community_id uuid REFERENCES communities(id) ON DELETE CASCADE,
  instructor_id uuid REFERENCES users(id) ON DELETE CASCADE,
  price decimal(10,2) DEFAULT 0,
  is_free boolean DEFAULT true,
  required_level integer DEFAULT 1,
  duration_minutes integer DEFAULT  0,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Lessons table
CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  content text,
  video_url text,
  duration_minutes integer DEFAULT 0,
  order_index integer NOT NULL,
  is_free boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Discussions table
CREATE TABLE IF NOT EXISTS discussions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  community_id uuid REFERENCES communities(id) ON DELETE CASCADE,
  author_id uuid REFERENCES users(id) ON DELETE CASCADE,
  is_pinned boolean DEFAULT false,
  reply_count integer DEFAULT 0,
  like_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Discussion replies table
CREATE TABLE IF NOT EXISTS discussion_replies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  discussion_id uuid REFERENCES discussions(id) ON DELETE CASCADE,
  author_id uuid REFERENCES users(id) ON DELETE CASCADE,
  content text NOT NULL,
  parent_reply_id uuid REFERENCES discussion_replies(id) ON DELETE CASCADE,
  like_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User communities junction table
CREATE TABLE IF NOT EXISTS user_communities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  community_id uuid REFERENCES communities(id) ON DELETE CASCADE,
  role text DEFAULT 'member' CHECK (role IN ('member', 'moderator', 'admin')),
  joined_at timestamptz DEFAULT now(),
  UNIQUE(user_id, community_id)
);

-- User courses junction table
CREATE TABLE IF NOT EXISTS user_courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  enrolled_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  progress_percentage integer DEFAULT 0,
  UNIQUE(user_id, course_id)
);

-- User progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  lesson_id uuid REFERENCES lessons(id) ON DELETE CASCADE,
  completed boolean DEFAULT false,
  completed_at timestamptz,
  time_spent_minutes integer DEFAULT 0,
  UNIQUE(user_id, lesson_id)
);

-- Badges table
CREATE TABLE IF NOT EXISTS badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  icon_url text,
  points_required integer DEFAULT 0,
  badge_type text DEFAULT 'achievement' CHECK (badge_type IN ('achievement', 'milestone', 'special')),
  created_at timestamptz DEFAULT now()
);

-- User badges junction table
CREATE TABLE IF NOT EXISTS user_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  badge_id uuid REFERENCES badges(id) ON DELETE CASCADE,
  earned_at timestamptz DEFAULT now(),
  UNIQUE(user_id, badge_id)
);

-- Live sessions table
CREATE TABLE IF NOT EXISTS live_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  community_id uuid REFERENCES communities(id) ON DELETE CASCADE,
  instructor_id uuid REFERENCES users(id) ON DELETE CASCADE,
  scheduled_at timestamptz NOT NULL,
  duration_minutes integer DEFAULT 60,
  meeting_url text,
  recording_url text,
  max_attendees integer,
  is_recorded boolean DEFAULT false,
  status text DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'live', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Session attendees table
CREATE TABLE IF NOT EXISTS session_attendees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES live_sessions(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  registered_at timestamptz DEFAULT now(),
  attended boolean DEFAULT false,
  UNIQUE(session_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE communities ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE discussion_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_communities ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_attendees ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users policies
CREATE POLICY "Users can read all profiles" ON users FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Communities policies
CREATE POLICY "Anyone can read public communities" ON communities FOR SELECT TO authenticated USING (NOT is_private OR id IN (SELECT community_id FROM user_communities WHERE user_id = auth.uid()));
CREATE POLICY "Community creators can update their communities" ON communities FOR UPDATE TO authenticated USING (created_by = auth.uid());
CREATE POLICY "Authenticated users can create communities" ON communities FOR INSERT TO authenticated WITH CHECK (created_by = auth.uid());

-- Courses policies
CREATE POLICY "Anyone can read published courses" ON courses FOR SELECT TO authenticated USING (is_published = true);
CREATE POLICY "Instructors can manage their courses" ON courses FOR ALL TO authenticated USING (instructor_id = auth.uid());

-- Lessons policies
CREATE POLICY "Anyone can read lessons of published courses" ON lessons FOR SELECT TO authenticated USING (
  course_id IN (SELECT id FROM courses WHERE is_published = true)
);
CREATE POLICY "Course instructors can manage lessons" ON lessons FOR ALL TO authenticated USING (
  course_id IN (SELECT id FROM courses WHERE instructor_id = auth.uid())
);

-- Discussions policies
CREATE POLICY "Community members can read discussions" ON discussions FOR SELECT TO authenticated USING (
  community_id IN (SELECT community_id FROM user_communities WHERE user_id = auth.uid())
);
CREATE POLICY "Community members can create discussions" ON discussions FOR INSERT TO authenticated WITH CHECK (
  community_id IN (SELECT community_id FROM user_communities WHERE user_id = auth.uid()) AND author_id = auth.uid()
);
CREATE POLICY "Authors can update their discussions" ON discussions FOR UPDATE TO authenticated USING (author_id = auth.uid());

-- Discussion replies policies
CREATE POLICY "Community members can read replies" ON discussion_replies FOR SELECT TO authenticated USING (
  discussion_id IN (
    SELECT id FROM discussions WHERE community_id IN (
      SELECT community_id FROM user_communities WHERE user_id = auth.uid()
    )
  )
);
CREATE POLICY "Community members can create replies" ON discussion_replies FOR INSERT TO authenticated WITH CHECK (
  discussion_id IN (
    SELECT id FROM discussions WHERE community_id IN (
      SELECT community_id FROM user_communities WHERE user_id = auth.uid()
    )
  ) AND author_id = auth.uid()
);

-- User communities policies
CREATE POLICY "Users can read their community memberships" ON user_communities FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can join communities" ON user_communities FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can leave communities" ON user_communities FOR DELETE TO authenticated USING (user_id = auth.uid());

-- User courses policies
CREATE POLICY "Users can read their course enrollments" ON user_courses FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can enroll in courses" ON user_courses FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

-- User progress policies
CREATE POLICY "Users can read their own progress" ON user_progress FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can update their own progress" ON user_progress FOR ALL TO authenticated USING (user_id = auth.uid());

-- Badges policies
CREATE POLICY "Anyone can read badges" ON badges FOR SELECT TO authenticated USING (true);

-- User badges policies
CREATE POLICY "Users can read their own badges" ON user_badges FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "System can award badges" ON user_badges FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

-- Live sessions policies
CREATE POLICY "Community members can read sessions" ON live_sessions FOR SELECT TO authenticated USING (
  community_id IN (SELECT community_id FROM user_communities WHERE user_id = auth.uid())
);
CREATE POLICY "Instructors can manage their sessions" ON live_sessions FOR ALL TO authenticated USING (instructor_id = auth.uid());

-- Session attendees policies
CREATE POLICY "Users can read their session registrations" ON session_attendees FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can register for sessions" ON session_attendees FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_level ON users(level);
CREATE INDEX IF NOT EXISTS idx_users_points ON users(points);
CREATE INDEX IF NOT EXISTS idx_communities_created_by ON communities(created_by);
CREATE INDEX IF NOT EXISTS idx_courses_community_id ON courses(community_id);
CREATE INDEX IF NOT EXISTS idx_courses_instructor_id ON courses(instructor_id);
CREATE INDEX IF NOT EXISTS idx_lessons_course_id ON lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_discussions_community_id ON discussions(community_id);
CREATE INDEX IF NOT EXISTS idx_discussions_author_id ON discussions(author_id);
CREATE INDEX IF NOT EXISTS idx_user_communities_user_id ON user_communities(user_id);
CREATE INDEX IF NOT EXISTS idx_user_communities_community_id ON user_communities(community_id);
CREATE INDEX IF NOT EXISTS idx_user_courses_user_id ON user_courses(user_id);
CREATE INDEX IF NOT EXISTS idx_user_courses_course_id ON user_courses(course_id);