// Communities page displaying all available communities
import React, { useState } from 'react';
import { Search, Plus, Filter, TrendingUp, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import CommunityCard from '../components/CommunityCard';
import { Community } from '../types';

const Communities: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data - replace with real data from Supabase
  const mockCommunities: Community[] = [
    {
      id: '1',
      name: 'React Developers',
      description: 'A community for React developers to share knowledge, ask questions, and collaborate on projects.',
      image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
      is_private: false,
      member_count: 1247,
      created_by: '1',
      created_at: '2024-01-01T10:00:00Z',
      updated_at: '2024-01-01T10:00:00Z'
    },
    {
      id: '2',
      name: 'System Design Masters',
      description: 'Learn and discuss system design patterns, scalability, and architecture best practices.',
      image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400',
      is_private: true,
      member_count: 892,
      created_by: '1',
      created_at: '2024-01-02T10:00:00Z',
      updated_at: '2024-01-02T10:00:00Z'
    },
    {
      id: '3',
      name: 'AI & Machine Learning',
      description: 'Explore the latest in artificial intelligence and machine learning technologies.',
      image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
      is_private: false,
      member_count: 2156,
      created_by: '1',
      created_at: '2024-01-03T10:00:00Z',
      updated_at: '2024-01-03T10:00:00Z'
    },
    {
      id: '4',
      name: 'Web3 Builders',
      description: 'Building the decentralized web together. Blockchain, DeFi, NFTs, and more.',
      image_url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400',
      is_private: false,
      member_count: 634,
      created_by: '1',
      created_at: '2024-01-04T10:00:00Z',
      updated_at: '2024-01-04T10:00:00Z'
    },
    {
      id: '5',
      name: 'Design Systems',
      description: 'Creating consistent and scalable design systems for modern applications.',
      image_url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
      is_private: false,
      member_count: 478,
      created_by: '1',
      created_at: '2024-01-05T10:00:00Z',
      updated_at: '2024-01-05T10:00:00Z'
    },
    {
      id: '6',
      name: 'Mobile Development',
      description: 'iOS, Android, React Native, Flutter - all things mobile development.',
      image_url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400',
      is_private: false,
      member_count: 1089,
      created_by: '1',
      created_at: '2024-01-06T10:00:00Z',
      updated_at: '2024-01-06T10:00:00Z'
    }
  ];

  const filters = [
    { id: 'all', name: 'All Communities', icon: Users },
    { id: 'trending', name: 'Trending', icon: TrendingUp },
    { id: 'popular', name: 'Most Popular', icon: Star },
    { id: 'new', name: 'Newest', icon: Plus }
  ];

  const filteredCommunities = mockCommunities.filter(community =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    community.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Communities</h1>
            <p className="text-gray-400">
              Join communities of learners and experts in various fields
            </p>
          </div>
          <Link
            to="/communities/create"
            className="mt-4 sm:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Create Community</span>
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search communities..."
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{mockCommunities.length}</p>
                <p className="text-gray-400">Total Communities</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {mockCommunities.reduce((acc, community) => acc + community.member_count, 0).toLocaleString()}
                </p>
                <p className="text-gray-400">Total Members</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">4.8</p>
                <p className="text-gray-400">Average Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommunities.map((community) => (
            <CommunityCard key={community.id} community={community} />
          ))}
        </div>

        {/* Empty State */}
        {filteredCommunities.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No communities found</h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search terms or create a new community.
            </p>
            <Link
              to="/communities/create"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Create Community</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Communities;