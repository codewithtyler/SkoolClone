// Leaderboard card component for displaying user rankings
import React from 'react';
import { Trophy, Crown, Medal, Award } from 'lucide-react';

interface LeaderboardUser {
  id: string;
  username: string;
  full_name: string;
  avatar_url?: string;
  level: number;
  points: number;
  rank: number;
}

interface LeaderboardCardProps {
  user: LeaderboardUser;
}

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ user }) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-300" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <Trophy className="w-6 h-6 text-gray-500" />;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30';
      case 2:
        return 'from-gray-400/20 to-gray-500/20 border-gray-400/30';
      case 3:
        return 'from-amber-600/20 to-amber-700/20 border-amber-600/30';
      default:
        return 'from-gray-700/20 to-gray-800/20 border-gray-600/30';
    }
  };

  return (
    <div className={`bg-gradient-to-r ${getRankBg(user.rank)} rounded-xl p-6 border backdrop-blur-sm`}>
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="relative">
            {user.avatar_url ? (
              <img
                src={user.avatar_url}
                alt={user.full_name}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">
                  {user.full_name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div className="absolute -top-2 -right-2 bg-gray-900 rounded-full p-1">
              {getRankIcon(user.rank)}
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-2xl font-bold text-white">#{user.rank}</span>
            <div>
              <h3 className="text-lg font-semibold text-white truncate">
                {user.full_name}
              </h3>
              <p className="text-gray-400 text-sm">@{user.username}</p>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-2xl font-bold text-white">
            {user.points.toLocaleString()}
          </div>
          <div className="text-sm text-gray-400">points</div>
          <div className="text-sm text-indigo-400 font-medium">
            Level {user.level}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardCard;