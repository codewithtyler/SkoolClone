// Main navigation component with user profile and notifications
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Search, Menu, X, User, Settings, LogOut, BookOpen, Users, Trophy } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">LearnHub</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search communities, courses, discussions..."
                className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Navigation Links - Desktop */}
                <div className="hidden md:flex items-center space-x-6">
                  <Link to="/communities" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>Communities</span>
                  </Link>
                  <Link to="/courses" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1">
                    <BookOpen className="w-4 h-4" />
                    <span>Courses</span>
                  </Link>
                  <Link to="/leaderboard" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1">
                    <Trophy className="w-4 h-4" />
                    <span>Leaderboard</span>
                  </Link>
                </div>

                {/* Notifications */}
                <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                  <Bell className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
                </button>

                {/* User Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user.full_name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-white text-sm font-medium">{user.full_name}</p>
                      <p className="text-gray-400 text-xs">Level {user.level} • {user.points} pts</p>
                    </div>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-1">
                      <Link
                        to="/profile"
                        className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </Link>
                      <hr className="border-gray-700 my-1" />
                      <button
                        onClick={handleSignOut}
                        className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
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
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-800 py-4">
            <div className="space-y-4">
              {/* Search Bar - Mobile */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {user && (
                <div className="space-y-2">
                  <Link
                    to="/communities"
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Users className="w-5 h-5" />
                    <span>Communities</span>
                  </Link>
                  <Link
                    to="/courses"
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <BookOpen className="w-5 h-5" />
                    <span>Courses</span>
                  </Link>
                  <Link
                    to="/leaderboard"
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Trophy className="w-5 h-5" />
                    <span>Leaderboard</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;