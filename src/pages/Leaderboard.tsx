// Leaderboard page displaying user rankings and achievements
import React, { useState } from 'react';
import { Trophy, Medal, Award, Crown, TrendingUp, Calendar, Filter } from 'lucide-react';
import LeaderboardCard from '../components/LeaderboardCard';

interface LeaderboardUser {
  id: string;
  username: string;
  full_name: string;
  avatar_url?: string;
  level: number;
  points: number;
  rank: number;
}

const Leaderboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('all-time');

  // Mock data - replace with real data from Supabase
  const mockUsers: LeaderboardUser[] = [
    {
      id: '1',
      username: 'sarah_dev',
      full_name: 'Sarah Johnson',
      avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      level: 12,
      points: 15420,
      rank: 1
    },
    {
      id: '2',
      username: 'alex_code',
      full_name: 'Alex Chen',
      level: 11,
      points: 14890,
      rank: 2
    },
    {
      id: '3',
      username: 'mike_design',
      full_name: 'Mike Rodriguez',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      level: 10,
      points: 13750,
      rank: 3
    },
    {
      id: '4',
      username: 'emma_ui',
      full_name: 'Emma Wilson',
      avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      level: 9,
      points: 12340,
      rank: 4
    },
    {
      id: '5',
      username: 'david_backend',
      full_name: 'David Kim',
      level: 9,
      points: 11980,
      rank: 5
    },
    {
      id: '6',
      username: 'lisa_data',
      full_name: 'Lisa Thompson',
      avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      level: 8,
      points: 10560,
      rank: 6
    },
    {
      id: '7',
      username: 'james_mobile',
      full_name: 'James Anderson',
      level: 8,
      points: 9870,
      rank: 7
    },
    {
      id: '8',
      username: 'rachel_product',
      full_name: 'Rachel Davis',
      avatar_url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150',
      level: 7,
      points: 8990,
      rank: 8
    },
    {
      id: '9',
      username: 'tom_security',
      full_name: 'Tom Miller',
      level: 7,
      points: 8450,
      rank: 9
    },
    {
      id: '10',
      username: 'anna_devops',
      full_name: 'Anna Garcia',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      level: 6,
      points: 7820,
      rank: 10
    }
  ];

  const periods = [
    { id: 'all-time', name: 'All Time', icon: Trophy },
    { id: 'monthly', name: 'This Month', icon: Calendar },
    { id: 'weekly', name: 'This Week', icon: TrendingUp }
  ];

  const topThree = mockUsers.slice(0, 3);
  const restOfUsers = mockUsers.slice(3);

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">🏆 Leaderboard</h1>
          <p className="text-gray-400 text-lg">
            See how you rank among our learning community
          </p>
        </div>

        {/* Period Filter */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          {periods.map((period) => (
            <button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                selectedPeriod === period.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <period.icon className="w-5 h-5" />
              <span>{period.name}</span>
            </button>
          ))}
        </div>

        {/* Top 3 Podium */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Second Place */}
            {topThree[1] && (
              <div className="order-1 md:order-1">
                <div className="bg-gradient-to-br from-gray-400/20 to-gray-500/20 rounded-2xl p-6 border border-gray-400/30 text-center backdrop-blur-sm">
                  <div className="relative inline-block mb-4">
                    {topThree[1].avatar_url ? (
                      <img
                        src={topThree[1].avatar_url}
                        alt={topThree[1].full_name}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">
                          {topThree[1].full_name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="absolute -top-3 -right-3 bg-gray-900 rounded-full p-2">
                      <Medal className="w-6 h-6 text-gray-300" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{topThree[1].full_name}</h3>
                  <p className="text-gray-400 text-sm mb-2">@{topThree[1].username}</p>
                  <div className="text-2xl font-bold text-white mb-1">
                    {topThree[1].points.toLocaleString()}
                  </div>
                  <div className="text-gray-400 text-sm mb-2">points</div>
                  <div className="text-indigo-400 font-medium">Level {topThree[1].level}</div>
                </div>
              </div>
            )}

            {/* First Place */}
            {topThree[0] && (
              <div className="order-2 md:order-2 transform md:scale-110">
                <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-2xl p-6 border border-yellow-500/30 text-center backdrop-blur-sm">
                  <div className="relative inline-block mb-4">
                    {topThree[0].avatar_url ? (
                      <img
                        src={topThree[0].avatar_url}
                        alt={topThree[0].full_name}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">
                          {topThree[0].full_name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="absolute -top-4 -right-4 bg-gray-900 rounded-full p-2">
                      <Crown className="w-8 h-8 text-yellow-400" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{topThree[0].full_name}</h3>
                  <p className="text-gray-400 text-sm mb-2">@{topThree[0].username}</p>
                  <div className="text-3xl font-bold text-white mb-1">
                    {topThree[0].points.toLocaleString()}
                  </div>
                  <div className="text-gray-400 text-sm mb-2">points</div>
                  <div className="text-indigo-400 font-medium">Level {topThree[0].level}</div>
                </div>
              </div>
            )}

            {/* Third Place */}
            {topThree[2] && (
              <div className="order-3 md:order-3">
                <div className="bg-gradient-to-br from-amber-600/20 to-amber-700/20 rounded-2xl p-6 border border-amber-600/30 text-center backdrop-blur-sm">
                  <div className="relative inline-block mb-4">
                    {topThree[2].avatar_url ? (
                      <img
                        src={topThree[2].avatar_url}
                        alt={topThree[2].full_name}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">
                          {topThree[2].full_name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="absolute -top-3 -right-3 bg-gray-900 rounded-full p-2">
                      <Award className="w-6 h-6 text-amber-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{topThree[2].full_name}</h3>
                  <p className="text-gray-400 text-sm mb-2">@{topThree[2].username}</p>
                  <div className="text-2xl font-bold text-white mb-1">
                    {topThree[2].points.toLocaleString()}
                  </div>
                  <div className="text-gray-400 text-sm mb-2">points</div>
                  <div className="text-indigo-400 font-medium">Level {topThree[2].level}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Rest of Leaderboard */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Complete Rankings</h2>
          {restOfUsers.map((user) => (
            <LeaderboardCard key={user.id} user={user} />
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Total Learners</h3>
            <p className="text-3xl font-bold text-indigo-400">{mockUsers.length.toLocaleString()}</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Points Earned</h3>
            <p className="text-3xl font-bold text-green-400">
              {mockUsers.reduce((acc, user) => acc + user.points, 0).toLocaleString()}
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Average Level</h3>
            <p className="text-3xl font-bold text-purple-400">
              {Math.round(mockUsers.reduce((acc, user) => acc + user.level, 0) / mockUsers.length)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;