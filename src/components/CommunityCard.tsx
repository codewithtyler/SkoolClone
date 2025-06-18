// Community card component for displaying community information
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Lock, Star } from 'lucide-react';
import { Community } from '../types';

interface CommunityCardProps {
  community: Community;
}

const CommunityCard: React.FC<CommunityCardProps> = ({ community }) => {
  return (
    <Link
      to={`/communities/${community.id}`}
      className="group bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-all duration-200 border border-gray-700 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20"
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          {community.image_url ? (
            <img
              src={community.image_url}
              alt={community.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
          ) : (
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">
                {community.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors truncate">
              {community.name}
            </h3>
            {community.is_private && (
              <Lock className="w-4 h-4 text-gray-400" />
            )}
          </div>

          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
            {community.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{community.member_count} members</span>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-400">4.8</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">
            Created {new Date(community.created_at).toLocaleDateString()}
          </span>
          <span className="text-indigo-400 font-medium group-hover:text-indigo-300">
            Join Community →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CommunityCard;