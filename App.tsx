
import React, { useState } from 'react';
import Header from './components/Header';
import ScriptInputForm from './components/ScriptInputForm';
import StoryboardDisplay from './components/StoryboardDisplay';
import Loader from './components/Loader';
import { generateShotList, generateStoryboardImage, generateSoundSuggestion } from './services/geminiService';
import type { Storyboard, Shot } from './types';

const App: React.FC = () => {
  const [storyboards, setStoryboards] = useState<Storyboard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleGenerateStoryboards = async (script: string) => {
    setIsLoading(true);
    setError(null);
    setStoryboards([]);

    try {
      setLoadingMessage('Analyzing your script and generating shot list...');
      const shots: Shot[] = await generateShotList(script);
      if (!shots || shots.length === 0) {
        throw new Error("The AI couldn't generate a shot list from your script. Please try rephrasing it.");
      }

      setLoadingMessage(`Creating ${shots.length} storyboards... (this can take a moment)`);
      
      const storyboardPromises = shots.map(async (shot) => {
        const [imageUrl, soundSuggestion] = await Promise.all([
          generateStoryboardImage(shot),
          generateSoundSuggestion(shot),
        ]);
        return { ...shot, imageUrl, soundSuggestion };
      });

      const generatedStoryboards = await Promise.all(storyboardPromises);
      
      setStoryboards(generatedStoryboards);

    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to generate storyboards. ${errorMessage}`);
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ScriptInputForm onSubmit={handleGenerateStoryboards} isLoading={isLoading} />
        
        {isLoading && <Loader message={loadingMessage} />}
        
        {error && (
          <div className="mt-8 text-center bg-red-900/50 border border-red-700 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-red-400">Error</h3>
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {!isLoading && storyboards.length > 0 && (
          <StoryboardDisplay storyboards={storyboards} />
        )}

        {!isLoading && storyboards.length === 0 && !error && (
          <div className="text-center mt-16 text-gray-500">
            <p className="text-lg">Your generated storyboard will appear here.</p>
            <p>Enter a script above to get started.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
