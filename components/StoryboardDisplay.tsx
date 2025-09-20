
import React from 'react';
import ShotCard from './ShotCard';
import type { Storyboard } from '../types';

interface StoryboardDisplayProps {
  storyboards: Storyboard[];
}

const StoryboardDisplay: React.FC<StoryboardDisplayProps> = ({ storyboards }) => {
  return (
    <section className="mt-12">
      <h2 className="text-3xl font-bold mb-8 text-center tracking-wide text-amber-400">Generated Storyboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {storyboards.map((storyboard) => (
          <ShotCard key={storyboard.shotNumber} storyboard={storyboard} />
        ))}
      </div>
    </section>
  );
};

export default StoryboardDisplay;
