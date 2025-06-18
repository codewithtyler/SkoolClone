# LearnHub - Community-Focused Learning Management System

LearnHub is a modern, community-driven Learning Management System (LMS) built with React, TypeScript, and Supabase. It emphasizes collaborative learning through vibrant communities while providing comprehensive course management and gamification features.

## 🌟 Features

### Core Features
- **Community-First Approach**: Join and create learning communities around shared interests
- **Interactive Courses**: Comprehensive course creation and management with multimedia support
- **Gamification System**: Points, levels, badges, and leaderboards to motivate learners
- **Real-time Discussions**: Community forums with threaded discussions
- **Live Sessions**: Webinars and live learning sessions with recording capabilities
- **Progress Tracking**: Detailed analytics and progress monitoring
- **Mobile Responsive**: Optimized for all devices

### User Roles
- **Students**: Join communities, take courses, participate in discussions
- **Educators**: Create courses, manage content, host live sessions
- **Administrators**: Platform management and community oversight

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd learnhub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new Supabase project
   - Run the migration files in the `supabase/migrations` folder
   - Copy your Supabase URL and anon key

4. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🏗️ Architecture

### Frontend Stack
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Lucide React** - Icons

### Backend Stack
- **Supabase** - Backend as a Service
- **PostgreSQL** - Database
- **Row Level Security** - Data security
- **Real-time subscriptions** - Live updates

### Project Structure
```
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts (Auth, etc.)
├── pages/              # Page components
├── types/              # TypeScript type definitions
├── lib/                # Utility functions and configurations
└── App.tsx             # Main application component

supabase/
├── migrations/         # Database migration files
└── functions/          # Edge functions (if needed)

docs/                   # Documentation
```

## 📊 Database Schema

### Core Tables
- `users` - Extended user profiles with gamification data
- `communities` - Learning communities and groups
- `courses` - Course information and metadata
- `lessons` - Individual lessons within courses
- `discussions` - Community discussions and forums
- `user_progress` - Track learning progress
- `badges` - Achievement system
- `live_sessions` - Live webinars and sessions

### Key Relationships
- Users can join multiple communities
- Communities can have multiple courses
- Courses contain multiple lessons
- Users track progress through lessons
- Discussions belong to communities
- Badges are earned by users based on achievements

## 🎮 Gamification System

### Points System
- **Course Completion**: 100 points
- **Lesson Completion**: 10 points
- **Discussion Participation**: 5 points
- **Community Creation**: 50 points
- **Daily Login**: 2 points

### Level Progression
- Level 1: 0-49 points
- Level 2: 50-149 points
- Level 3: 150-349 points
- Level 4: 350-599 points
- Level 5: 600-999 points
- Level 6: 1000-1499 points
- Level 7: 1500-2499 points
- Level 8: 2500-4999 points
- Level 9: 5000-9999 points
- Level 10: 10000+ points

### Badge Categories
- **Milestones**: Level achievements, point thresholds
- **Achievements**: Specific actions (first course, community creation)
- **Special**: Time-limited or unique accomplishments

## 🔐 Security

### Authentication
- Supabase Auth with email/password
- Row Level Security (RLS) policies
- Role-based access control

### Data Protection
- All tables protected with RLS
- User data isolation
- Secure API endpoints
- Input validation and sanitization

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Environment Variables
Required environment variables for production:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 📱 Mobile Support

The application is fully responsive and optimized for:
- Mobile phones (320px+)
- Tablets (768px+)
- Desktop (1024px+)

Future mobile app development is planned using React Native.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation in the `docs/` folder
- Review the API documentation

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Core platform functionality
- ✅ Community features
- ✅ Course management
- ✅ Gamification system

### Phase 2 (Planned)
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Payment integration
- [ ] AI-powered recommendations
- [ ] Video streaming optimization
- [ ] Advanced assessment tools

### Phase 3 (Future)
- [ ] White-labeling options
- [ ] Enterprise features
- [ ] Advanced reporting
- [ ] Integration marketplace
- [ ] Multi-language support