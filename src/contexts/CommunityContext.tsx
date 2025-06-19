import React, { createContext, useContext, useState } from 'react';
import { Community } from '../types';

interface CommunityContextType {
  currentCommunity: Community | null;
  setCurrentCommunity: (community: Community) => void;
  communities: Community[];
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

// Mock communities for now
const mockCommunities: Community[] = [
  {
    id: '1',
    slug: 'react-developers',
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
    slug: 'system-design-masters',
    name: 'System Design Masters',
    description: 'Learn and discuss system design patterns, scalability, and architecture best practices.',
    image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400',
    is_private: true,
    member_count: 892,
    created_by: '1',
    created_at: '2024-01-02T10:00:00Z',
    updated_at: '2024-01-02T10:00:00Z'
  }
];

export const CommunityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentCommunity, _setCurrentCommunity] = useState<Community | null>(null);
  const [communities] = useState<Community[]>(mockCommunities);

  React.useEffect(() => {
    const lastSlug = localStorage.getItem('lastCommunitySlug');
    if (lastSlug) {
      const found = mockCommunities.find(c => c.slug === lastSlug);
      if (found) {
        _setCurrentCommunity(found);
        return;
      }
    }
    _setCurrentCommunity(mockCommunities[0]);
  }, []);

  const setCurrentCommunity = (community: Community) => {
    _setCurrentCommunity(community);
    localStorage.setItem('lastCommunitySlug', community.slug);
  };

  return (
    <CommunityContext.Provider value={{ currentCommunity, setCurrentCommunity, communities }}>
      {children}
    </CommunityContext.Provider>
  );
};

export const useCommunity = () => {
  const context = useContext(CommunityContext);
  if (context === undefined) {
    throw new Error('useCommunity must be used within a CommunityProvider');
  }
  return context;
};
