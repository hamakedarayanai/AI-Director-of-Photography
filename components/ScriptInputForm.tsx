
import React, { useState } from 'react';

interface ScriptInputFormProps {
  onSubmit: (script: string) => void;
  isLoading: boolean;
}

const ScriptInputForm: React.FC<ScriptInputFormProps> = ({ onSubmit, isLoading }) => {
  const [script, setScript] = useState<string>('');

  const defaultScript = "A detective walks into a dimly lit, smoky jazz club. The camera follows him as he scans the crowd, his eyes stopping on a mysterious woman in a red dress.";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (script.trim()) {
      onSubmit(script);
    }
  };

  const handleUseDefault = () => {
    setScript(defaultScript);
  }

  return (
    <section className="bg-gray-800/50 p-6 rounded-lg shadow-xl border border-gray-700">
      <form onSubmit={handleSubmit}>
        <label htmlFor="script-input" className="block text-lg font-semibold mb-2 text-gray-300">
          Enter Your Scene Script
        </label>
        <textarea
          id="script-input"
          value={script}
          onChange={(e) => setScript(e.target.value)}
          placeholder="e.g., A lone astronaut drifts in space, tethered to her silent ship..."
          className="w-full h-48 p-4 bg-gray-900 border border-gray-600 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-shadow duration-300 text-gray-200 resize-y"
          disabled={isLoading}
        />
        <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
          <button
            type="submit"
            disabled={isLoading || !script.trim()}
            className="w-full sm:w-auto px-8 py-3 bg-amber-600 text-white font-bold rounded-md hover:bg-amber-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {isLoading ? 'Generating...' : 'Create Storyboard'}
          </button>
           <button
            type="button"
            onClick={handleUseDefault}
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-3 bg-gray-700 text-gray-300 font-semibold rounded-md hover:bg-gray-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-300"
          >
            Use Example Script
          </button>
        </div>
      </form>
    </section>
  );
};

export default ScriptInputForm;
