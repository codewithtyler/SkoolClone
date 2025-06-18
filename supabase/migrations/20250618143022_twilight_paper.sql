/*
  # Sample Data for LearnHub LMS

  1. Sample Data
    - Insert sample badges for gamification
    - Insert sample communities
    - Insert sample courses and lessons
    - Insert sample discussions

  This migration provides initial data to demonstrate the platform functionality.
*/

-- Insert sample badges
INSERT INTO badges (name, description, icon_url, points_required, badge_type) VALUES
('First Steps', 'Complete your first lesson', 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=100', 10, 'milestone'),
('Community Builder', 'Join your first community', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=100', 5, 'achievement'),
('Course Completer', 'Complete your first course', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=100', 100, 'milestone'),
('Discussion Starter', 'Start your first discussion', 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100', 25, 'achievement'),
('Knowledge Seeker', 'Earn 500 points', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', 500, 'milestone'),
('Expert Learner', 'Reach Level 5', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100', 1000, 'milestone'),
('Community Leader', 'Create a community', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100', 50, 'achievement'),
('Master Teacher', 'Create your first course', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100', 200, 'achievement');

-- Note: Sample communities, courses, and other data would be inserted here
-- but since we don't have actual user IDs yet, we'll leave this for the application
-- to populate with real data when users start using the platform.

-- Create a function to update user points and level
CREATE OR REPLACE FUNCTION update_user_level()
RETURNS TRIGGER AS $$
BEGIN
  -- Update user level based on points
  UPDATE users 
  SET level = CASE 
    WHEN NEW.points >= 10000 THEN 10
    WHEN NEW.points >= 5000 THEN 9
    WHEN NEW.points >= 2500 THEN 8
    WHEN NEW.points >= 1500 THEN 7
    WHEN NEW.points >= 1000 THEN 6
    WHEN NEW.points >= 600 THEN 5
    WHEN NEW.points >= 350 THEN 4
    WHEN NEW.points >= 150 THEN 3
    WHEN NEW.points >= 50 THEN 2
    ELSE 1
  END
  WHERE id = NEW.id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update user level when points change
CREATE TRIGGER trigger_update_user_level
  AFTER UPDATE OF points ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_user_level();

-- Create a function to update community member count
CREATE OR REPLACE FUNCTION update_community_member_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE communities 
    SET member_count = member_count + 1 
    WHERE id = NEW.community_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE communities 
    SET member_count = member_count - 1 
    WHERE id = OLD.community_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update community member count
CREATE TRIGGER trigger_update_community_member_count
  AFTER INSERT OR DELETE ON user_communities
  FOR EACH ROW
  EXECUTE FUNCTION update_community_member_count();

-- Create a function to update discussion reply count
CREATE OR REPLACE FUNCTION update_discussion_reply_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE discussions 
    SET reply_count = reply_count + 1 
    WHERE id = NEW.discussion_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE discussions 
    SET reply_count = reply_count - 1 
    WHERE id = OLD.discussion_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update discussion reply count
CREATE TRIGGER trigger_update_discussion_reply_count
  AFTER INSERT OR DELETE ON discussion_replies
  FOR EACH ROW
  EXECUTE FUNCTION update_discussion_reply_count();