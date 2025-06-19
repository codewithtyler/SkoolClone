import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Search, Menu, X, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCommunity } from '../contexts/CommunityContext';
import { Community } from '../types';

const TopNav: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { currentCommunity, setCurrentCommunity, communities } = useCommunity();
  const [showCommunityDropdown, setShowCommunityDropdown] = useState(false);

  useEffect(() => {
    const lastId = localStorage.getItem('lastCommunityId');
    if (lastId) {
      const found = communities.find(c => c.id === lastId);
      if (found) setCurrentCommunity(found);
    }
  }, [communities, setCurrentCommunity]);

  const handleCommunitySelect = (community: Community) => {
    setCurrentCommunity(community);
    localStorage.setItem('lastCommunityId', community.id);
    setShowCommunityDropdown(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (!user) return null;

  return (
    <nav className="bg-gray-900 border-b border-gray-800 shadow-md sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center h-14 space-x-2 w-full">
          {/* Left: Community Switcher */}
          <div className="relative flex-shrink-0">
            <button
              className="flex items-center space-x-1 bg-transparent text-white px-1 py-1 border-b-2 border-transparent focus:outline-none text-base"
              onClick={() => setShowCommunityDropdown((v) => !v)}
            >
              <span>{currentCommunity ? currentCommunity.name : 'Select Community'}</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {showCommunityDropdown && (
              <div className="absolute left-0 mt-2 w-56 bg-gray-900 border border-gray-800 rounded-lg shadow-lg z-50">
                {communities.map((community: Community) => (
                  <button
                    key={community.id}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-800 ${currentCommunity?.id === community.id ? 'bg-gray-800 text-indigo-400' : 'text-white'}`}
                    onClick={() => handleCommunitySelect(community)}
                  >
                    {community.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Center: Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 min-w-0 mx-2">
            <div className="relative w-full">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
              <input
                type="text"
                placeholder="Search communities, courses"
                className="w-full bg-gray-800 text-white pl-7 pr-2 py-0.5 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm h-8 truncate"
                style={{ minWidth: 80 }}
              />
            </div>
          </div>

          {/* Right: Profile/Notifications */}
          <div className="flex items-center space-x-2 flex-shrink-0">
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

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
