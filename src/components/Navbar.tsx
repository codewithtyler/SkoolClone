// Main navigation component with user profile and notifications
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-900 border-b border-gray-800 shadow-md sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center h-14 space-x-2 justify-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">LearnHub</span>
          </Link>
          <div className="hidden md:flex max-w-md w-full mx-2">
            <div className="relative w-full">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
              <input
                type="text"
                placeholder="Search communities, courses"
                className="w-full bg-gray-800 text-white pl-7 pr-2 py-0.5 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm h-8"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
