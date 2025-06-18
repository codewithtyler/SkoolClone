// Courses page displaying all available courses with filtering
import React, { useState } from 'react';
import { Search, Plus, Filter, BookOpen, Clock, DollarSign, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import { Course } from '../types';

const Courses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data - replace with real data from Supabase
  const mockCourses: Course[] = [
    {
      id: '1',
      title: 'Advanced React Patterns',
      description: 'Learn advanced React patterns including compound components, render props, custom hooks, and performance optimization techniques.',
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
      description: 'Master the fundamentals of system design for scalable applications. Learn about load balancing, caching, databases, and more.',
      thumbnail_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400',
      community_id: '2',
      instructor_id: '1',
      price: 49.99,
      is_free: false,
      required_level: 1,
      duration_minutes: 240,
      created_at: '2024-01-10T10:00:00Z',
      updated_at: '2024-01-10T10:00:00Z'
    },
    {
      id: '3',
      title: 'Machine Learning Essentials',
      description: 'Introduction to machine learning concepts, algorithms, and practical applications using Python and popular ML libraries.',
      thumbnail_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
      community_id: '3',
      instructor_id: '1',
      price: 0,
      is_free: false,
      required_level: 3,
      duration_minutes: 320,
      created_at: '2024-01-08T10:00:00Z',
      updated_at: '2024-01-08T10:00:00Z'
    },
    {
      id: '4',
      title: 'Web3 Development Bootcamp',
      description: 'Learn blockchain development, smart contracts, DApps, and the fundamentals of Web3 technologies.',
      thumbnail_url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400',
      community_id: '4',
      instructor_id: '1',
      price: 99.99,
      is_free: false,
      required_level: 2,
      duration_minutes: 480,
      created_at: '2024-01-05T10:00:00Z',
      updated_at: '2024-01-05T10:00:00Z'
    },
    {
      id: '5',
      title: 'UI/UX Design Principles',
      description: 'Learn the fundamentals of user interface and user experience design. Create beautiful and functional digital products.',
      thumbnail_url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
      community_id: '5',
      instructor_id: '1',
      price: 0,
      is_free: false,
      required_level: 5,
      duration_minutes: 200,
      created_at: '2024-01-03T10:00:00Z',
      updated_at: '2024-01-03T10:00:00Z'
    },
    {
      id: '6',
      title: 'Mobile App Development',
      description: 'Build cross-platform mobile applications using React Native. Learn navigation, state management, and deployment.',
      thumbnail_url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400',
      community_id: '6',
      instructor_id: '1',
      price: 79.99,
      is_free: false,
      required_level: 1,
      duration_minutes: 360,
      created_at: '2024-01-01T10:00:00Z',
      updated_at: '2024-01-01T10:00:00Z'
    }
  ];

  const filters = [
    { id: 'all', name: 'All Courses', icon: BookOpen },
    { id: 'free', name: 'Free', icon: Trophy },
    { id: 'paid', name: 'Paid', icon: DollarSign },
    { id: 'level-locked', name: 'Level Locked', icon: Trophy }
  ];

  const getFilteredCourses = () => {
    let filtered = mockCourses.filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (selectedFilter) {
      case 'free':
        return filtered.filter(course => course.is_free);
      case 'paid':
        return filtered.filter(course => !course.is_free && course.price > 0);
      case 'level-locked':
        return filtered.filter(course => !course.is_free && course.required_level > 1);
      default:
        return filtered;
    }
  };

  const filteredCourses = getFilteredCourses();

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Courses</h1>
            <p className="text-gray-400">
              Expand your skills with our comprehensive course library
            </p>
          </div>
          <Link
            to="/courses/create"
            className="mt-4 sm:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Create Course</span>
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-2 overflow-x-auto">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  selectedFilter === filter.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <filter.icon className="w-4 h-4" />
                <span>{filter.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{mockCourses.length}</p>
                <p className="text-gray-400">Total Courses</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {mockCourses.filter(c => c.is_free).length}
                </p>
                <p className="text-gray-400">Free Courses</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {Math.round(mockCourses.reduce((acc, course) => acc + course.duration_minutes, 0) / 60)}h
                </p>
                <p className="text-gray-400">Total Content</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {mockCourses.filter(c => !c.is_free && c.price > 0).length}
                </p>
                <p className="text-gray-400">Premium Courses</p>
              </div>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No courses found</h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search terms or create a new course.
            </p>
            <Link
              to="/courses/create"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Create Course</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;