// Discussion card component for forum posts and discussions
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Heart, Pin, Clock } from 'lucide-react';
import { Discussion } from '../types';

interface DiscussionCardProps {
  discussion: Discussion;
  showCommunity?: boolean;
}

const DiscussionCard: React.FC<DiscussionCardProps> = ({ discussion, showCommunity = false }) => {
  const timeAgo = (date: string) => {
    const now = new Date();
    const past = new Date(date);
    const diffInMinutes = Math.floor((now.getTime() - past.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <Link
      to={`/discussions/${discussion.id}`}
      className="group bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-all duration-200 border border-gray-700 hover:border-indigo-500"
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">JD</span>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            {discussion.is_pinned && (
              <Pin className="w-4 h-4 text-yellow-400" />
            )}
            <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors truncate">
              {discussion.title}
            </h3>
          </div>

          <p className="text-gray-400 text-sm mb-4 line-clamp-3">
            {discussion.content}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-4 h-4" />
                <span>{discussion.reply_count} replies</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4" />
                <span>{discussion.like_count} likes</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{timeAgo(discussion.created_at)}</span>
              </div>
            </div>

            {showCommunity && (
              <span className="text-xs text-indigo-400 bg-indigo-400/10 px-2 py-1 rounded-full">
                Community Name
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DiscussionCard;