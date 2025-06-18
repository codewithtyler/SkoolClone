// Main dashboard page displaying user overview and recent activity
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Trophy, 
  TrendingUp, 
  Calendar, 
  MessageCircle, 
  Play,
  Star,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import CourseCard from '../components/CourseCard';
import DiscussionCard from '../components/DiscussionCard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data - replace with real data from Supabase
  const mockCourses = [
    {
      id: '1',
      title: 'Advanced React Patterns',
      description: 'Learn advanced React patterns including compound components, render props, and custom hooks.',
      thumbnail_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
      community_id: '1',
      instructor_id: '1',
      price: 0,
      is_free: true,
      required_level: 1,
      duration_minutes: 180,
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      title: 'System Design Fundamentals',
      description: 'Master the fundamentals of system design for scalable applications.',
      thumbnail_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400',
      community_id: '1',
      instructor_id: '1',
      price: 0,
      is_free: false,
      required_level: 3,
      duration_minutes: 240,
      created_at: '2024-01-10T10:00:00Z',
      updated_at: '2024-01-10T10:00:00Z'
    }
  ];

  const mockDiscussions = [
    {
      id: '1',
      title: 'Best practices for React state management?',
      content: 'I\'m working on a large React application and struggling with state management. What are the current best practices?',
      community_id: '1',
      author_id: '1',
      is_pinned: false,
      reply_count: 12,
      like_count: 8,
      created_at: '2024-01-20T14:30:00Z',
      updated_at: '2024-01-20T14:30:00Z'
    },
    {
      id: '2',
      title: 'Weekly Challenge: Build a Component Library',
      content: 'This week\'s challenge is to build a reusable component library. Share your implementations!',
      community_id: '1',
      author_id: '1',
      is_pinned: true,
      reply_count: 24,
      like_count: 15,
      created_at: '2024-01-18T09:00:00Z',
      updated_at: '2024-01-18T09:00:00Z'
    }
  ];

  const stats = [
    { name: 'Courses Completed', value: '12', icon: BookOpen, color: 'text-blue-400' },
    { name: 'Communities Joined', value: '8', icon: Users, color: 'text-green-400' },
    { name: 'Current Rank', value: '#47', icon: Trophy, color: 'text-yellow-400' },
    { name: 'Total Points', value: user?.points.toLocaleString() || '0', icon: TrendingUp, color: 'text-purple-400' }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Welcome back, {user?.full_name}! 👋
                </h1>
                <p className="text-indigo-100 text-lg">
                  Ready to continue your learning journey?
                </p>
              </div>
              <div className="hidden md:block">
                <div className="text-right">
                  <div className="text-2xl font-bold">Level {user?.level}</div>
                  <div className="text-indigo-200">
                    {user?.points} points
                  </div>
                  <div className="w-32 bg-white/20 rounded-full h-2 mt-2">
                    <div className="bg-white rounded-full h-2 w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.name}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Learning */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Continue Learning</h2>
                <Link
                  to="/courses"
                  className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center space-x-1"
                >
                  <span>View All</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="space-y-6">
                {mockCourses.map((course) => (
                  <CourseCard 
                    key={course.id} 
                    course={course} 
                    showProgress={true} 
                    progress={Math.floor(Math.random() * 100)} 
                  />
                ))}
              </div>
            </section>

            {/* Recent Discussions */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Recent Discussions</h2>
                <Link
                  to="/discussions"
                  className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center space-x-1"
                >
                  <span>View All</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="space-y-4">
                {mockDiscussions.map((discussion) => (
                  <DiscussionCard key={discussion.id} discussion={discussion} />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/communities/create"
                  className="flex items-center space-x-3 p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-white"
                >
                  <Users className="w-5 h-5 text-indigo-400" />
                  <span>Create Community</span>
                </Link>
                <Link
                  to="/courses/create"
                  className="flex items-center space-x-3 p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-white"
                >
                  <BookOpen className="w-5 h-5 text-green-400" />
                  <span>Create Course</span>
                </Link>
                <Link
                  to="/discussions/create"
                  className="flex items-center space-x-3 p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-white"
                >
                  <MessageCircle className="w-5 h-5 text-purple-400" />
                  <span>Start Discussion</span>
                </Link>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Upcoming Events</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium">Live: React Masterclass</h4>
                    <p className="text-gray-400 text-sm">Today, 3:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium">Community Meetup</h4>
                    <p className="text-gray-400 text-sm">Tomorrow, 7:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievement Preview */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Achievements</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Course Completed</p>
                    <p className="text-gray-400 text-sm">Earned 100 points</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Level Up!</p>
                    <p className="text-gray-400 text-sm">Reached Level {user?.level}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;