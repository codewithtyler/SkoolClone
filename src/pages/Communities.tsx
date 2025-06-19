// Communities page displaying all available communities
import React from 'react';
import { useParams } from 'react-router-dom';
import { useCommunity } from '../contexts/CommunityContext';

const CommunityTab: React.FC = () => {
  const { slug } = useParams();
  const { currentCommunity } = useCommunity();

  if (!currentCommunity || currentCommunity.slug !== slug) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">No community selected.</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">{currentCommunity.name}</h1>
      <p className="text-gray-400">{currentCommunity.description}</p>
      {/* Add thread posting and feed here if desired */}
    </div>
  );
};

export default CommunityTab;
