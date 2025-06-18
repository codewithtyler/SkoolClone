// Type definitions for the LMS platform
export interface User {
  id: string;
  email: string;
  username: string;
  full_name: string;
  avatar_url?: string;
  role: 'admin' | 'educator' | 'student';
  level: number;
  points: number;
  created_at: string;
  updated_at: string;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  image_url?: string;
  is_private: boolean;
  member_count: number;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail_url?: string;
  community_id: string;
  instructor_id: string;
  price: number;
  is_free: boolean;
  required_level: number;
  duration_minutes: number;
  created_at: string;
  updated_at: string;
}

export interface Discussion {
  id: string;
  title: string;
  content: string;
  community_id: string;
  author_id: string;
  is_pinned: boolean;
  reply_count: number;
  like_count: number;
  created_at: string;
  updated_at: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon_url: string;
  points_required: number;
  created_at: string;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
}