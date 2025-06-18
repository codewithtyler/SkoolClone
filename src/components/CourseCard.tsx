// Course card component for displaying course information
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Star, Lock, Trophy } from 'lucide-react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  showProgress?: boolean;
  progress?: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, showProgress = false, progress = 0 }) => {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getPriceDisplay = () => {
    if (course.is_free) return 'Free';
    if (course.price === 0 && course.required_level > 1) {
      return `Level ${course.required_level} Required`;
    }
    return `$${course.price}`;
  };

  const getPriceColor = () => {
    if (course.is_free) return 'text-green-400';
    if (course.price === 0 && course.required_level > 1) return 'text-purple-400';
    return 'text-yellow-400';
  };

  return (
    <Link
      to={`/courses/${course.id}`}
      className="group bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-750 transition-all duration-200 border border-gray-700 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20"
    >
      <div className="relative">
        {course.thumbnail_url ? (
          <img
            src={course.thumbnail_url}
            alt={course.title}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center">
            <div className="text-center">
              <Trophy className="w-12 h-12 text-white mx-auto mb-2" />
              <span className="text-white text-lg font-semibold">Course</span>
            </div>
          </div>
        )}

        {/* Price Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium bg-gray-900/80 backdrop-blur-sm ${getPriceColor()}`}>
            {getPriceDisplay()}
          </span>
        </div>

        {/* Level Requirement Badge */}
        {course.required_level > 1 && (
          <div className="absolute top-3 left-3">
            <div className="flex items-center space-x-1 px-2 py-1 rounded-full bg-purple-600/80 backdrop-blur-sm">
              <Lock className="w-3 h-3 text-white" />
              <span className="text-white text-xs font-medium">Lv {course.required_level}</span>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        {showProgress && (
          <div className="absolute bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-sm p-2">
            <div className="flex items-center justify-between text-xs text-white mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors mb-2 line-clamp-2">
          {course.title}
        </h3>

        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
          {course.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{formatDuration(course.duration_minutes)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>124 enrolled</span>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <span>4.9</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">
            Created {new Date(course.created_at).toLocaleDateString()}
          </span>
          <span className="text-indigo-400 font-medium group-hover:text-indigo-300">
            View Course →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;