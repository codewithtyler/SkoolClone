// Home/Landing page component showcasing the platform
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Trophy, ArrowRight, Star, Play, MessageCircle, Target } from 'lucide-react';
import { useCommunity } from '../contexts/CommunityContext';

const Home: React.FC = () => {
  const { currentCommunity } = useCommunity();

  const features = [
    {
      icon: Users,
      title: 'Community First',
      description: 'Connect with learners and experts in vibrant communities built around shared interests.'
    },
    {
      icon: BookOpen,
      title: 'Interactive Courses',
      description: 'Learn through engaging courses with multimedia content, quizzes, and hands-on projects.'
    },
    {
      icon: Trophy,
      title: 'Gamified Learning',
      description: 'Earn points, unlock achievements, and climb leaderboards as you progress through your journey.'
    },
    {
      icon: MessageCircle,
      title: 'Real-time Discussions',
      description: 'Participate in live discussions, ask questions, and share knowledge with the community.'
    },
    {
      icon: Play,
      title: 'Live Sessions',
      description: 'Join live webinars, masterclasses, and interactive sessions with industry experts.'
    },
    {
      icon: Target,
      title: 'Personalized Learning',
      description: 'Get tailored course recommendations based on your interests and learning progress.'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Learners' },
    { number: '1,200+', label: 'Expert Instructors' },
    { number: '5,000+', label: 'Courses Available' },
    { number: '98%', label: 'Satisfaction Rate' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Developer',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      content: 'LearnHub transformed my career. The community aspect makes learning collaborative and fun!'
    },
    {
      name: 'Alex Chen',
      role: 'Data Scientist',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      content: 'The gamification keeps me motivated. I love competing on the leaderboards and earning badges!'
    },
    {
      name: 'Maria Rodriguez',
      role: 'UX Designer',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      content: 'Best online learning platform I\'ve used. The live sessions and community support are amazing.'
    }
  ];

  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920')] bg-cover bg-center opacity-10"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-indigo-600/20 backdrop-blur-sm border border-indigo-500/30 rounded-full px-4 py-2 mb-8">
              <span className="text-indigo-300 text-sm font-medium">Welcome to {currentCommunity ? currentCommunity.name : 'the Community'}!</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
              {currentCommunity ? currentCommunity.name : 'Learn Together'}
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              {currentCommunity ? currentCommunity.description : 'Join thousands of learners in our vibrant communities. Master new skills through interactive courses, live sessions, and collaborative learning experiences.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/register"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Start Learning</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/communities"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105"
            >
              Explore Communities
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-indigo-400 mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose LearnHub?</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Experience learning like never before with our innovative platform that puts community at the center
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-indigo-500/50 transition-all duration-200 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-400">Get started in just a few simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Join Communities</h3>
              <p className="text-gray-400">
                Browse and join communities that match your interests and learning goals
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Learn & Engage</h3>
              <p className="text-gray-400">
                Take courses, participate in discussions, and attend live sessions
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Level Up</h3>
              <p className="text-gray-400">
                Earn points, unlock achievements, and advance your skills
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Community Says</h2>
            <p className="text-xl text-gray-400">Join thousands of satisfied learners</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl p-8 border border-gray-700"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-12">
            <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl text-indigo-100 mb-8">
              Join our community of learners and unlock your potential today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center space-x-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/courses"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Browse Courses
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
