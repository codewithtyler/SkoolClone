import React from 'react';
import { Link, Outlet, useParams, useLocation } from 'react-router-dom';
import { useCommunity } from '../contexts/CommunityContext';
import TopNav from '../components/TopNav';

const tabs = [
  { label: 'Community', path: '' },
  { label: 'Classroom', path: 'classroom' },
  { label: 'Calendar', path: 'calendar' },
  { label: 'Members', path: 'members' },
  { label: 'Leaderboard', path: 'leaderboard' },
  { label: 'About', path: 'about' },
];

const CommunityLayout: React.FC = () => {
  const { slug } = useParams();
  const { currentCommunity, setCurrentCommunity, communities } = useCommunity();
  const location = useLocation();

  // Set current community based on slug in URL
  React.useEffect(() => {
    if (
      slug &&
      (!currentCommunity || currentCommunity.slug !== slug)
    ) {
      const found = communities.find(c => c.slug === slug);
      if (found && (!currentCommunity || currentCommunity.id !== found.id)) {
        setCurrentCommunity(found);
      }
    }
    // Only depend on slug and communities
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, communities]);

  // Determine active tab
  const activeTab = tabs.find(tab => {
    if (tab.path === '') {
      // Community tab is active if path is exactly /:slug
      return location.pathname === `/${slug}`;
    }
    return location.pathname.startsWith(`/${slug}/${tab.path}`);
  })?.path;

  if (!currentCommunity) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">No community found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        {/* Always show TopNav at the top */}
        <TopNav />
        {/* Community Subnav */}
        <div className="bg-gray-900 sticky top-16 z-40">
          {/* Subnav */}
          <div className="flex space-x-6">
            {tabs.map(tab => (
              <Link
                key={tab.path}
                to={`/${slug}${tab.path ? `/${tab.path}` : ''}`}
                className={`relative px-1 pb-2 font-medium transition-colors
                  ${activeTab === tab.path
                    ? 'text-white after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-1 after:bg-white after:rounded-full after:content-[""]'
                    : 'text-gray-400 hover:text-white'}
                `}
              >
                {tab.label}
              </Link>
            ))}
          </div>
        </div>
        {/* Full-width border flush under tabs */}
        <div className="border-b border-gray-800 w-screen relative left-1/2 -translate-x-1/2"></div>

        {/* Centered Page Content */}
        <div className="w-full">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityLayout;
