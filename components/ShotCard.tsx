
import React from 'react';
import type { Storyboard } from '../types';
import CameraIcon from './icons/CameraIcon';
import LightbulbIcon from './icons/LightbulbIcon';
import MoodIcon from './icons/MoodIcon';
import SoundIcon from './icons/SoundIcon';

interface ShotCardProps {
  storyboard: Storyboard;
}

const ShotCard: React.FC<ShotCardProps> = ({ storyboard }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-2xl border border-gray-700 transition-transform duration-300 hover:scale-105 hover:border-amber-500">
      <div className="relative">
        <img src={storyboard.imageUrl} alt={storyboard.description} className="w-full h-auto aspect-video object-cover" />
        <div className="absolute top-2 left-2 bg-black/70 text-white font-bold px-3 py-1 rounded-full text-sm">
          SHOT #{storyboard.shotNumber}
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-300 italic mb-4">"{storyboard.description}"</p>
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3">
            <CameraIcon className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <span className="font-semibold text-gray-400">Camera:</span>
            <span className="text-gray-200">{storyboard.cameraAngle}</span>
          </div>
          <div className="flex items-center gap-3">
            <LightbulbIcon className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <span className="font-semibold text-gray-400">Lighting:</span>
            <span className="text-gray-200">{storyboard.lighting}</span>
          </div>
          <div className="flex items-center gap-3">
            <MoodIcon className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <span className="font-semibold text-gray-400">Mood:</span>
            <span className="text-gray-200">{storyboard.mood}</span>
          </div>
          <div className="flex items-start gap-3 pt-2 border-t border-gray-700/50">
            <SoundIcon className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <span className="font-semibold text-gray-400">Sound:</span>
            <span className="text-gray-200 italic">{storyboard.soundSuggestion}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShotCard;
