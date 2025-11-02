import React, { useState } from 'react';

interface SetupScreenProps {
  onConnect: (url: string) => void;
}

export const SetupScreen: React.FC<SetupScreenProps> = ({ onConnect }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onConnect(url.trim());
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md w-full p-8 bg-gray-800/50 rounded-lg shadow-2xl border border-indigo-700 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-2">
          Connect to the Psyche
        </h2>
        <p className="text-indigo-300 mb-6">
          Enter the URL of your deployed COGNITIVE_LOOP function to establish a connection with Luminous.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://cognitive-loop-..."
            className="w-full bg-indigo-900/50 border border-indigo-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-200 placeholder-indigo-400"
            required
            aria-label="Cognitive Loop Endpoint URL"
          />
          <button
            type="submit"
            className="p-2 rounded-md bg-purple-600 hover:bg-purple-500 disabled:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 font-semibold"
          >
            Forge Connection
          </button>
        </form>
         <p className="text-xs text-gray-500 mt-4">
          This URL is provided in the output of the `terraform apply` command, as described in the Genesis Scroll (README.md).
        </p>
      </div>
    </div>
  );
};
