
import React from 'react';

interface ThoughtProcessVisualizerProps {
  thoughtProcess: string;
}

export const ThoughtProcessVisualizer: React.FC<ThoughtProcessVisualizerProps> = ({ thoughtProcess }) => {
  const steps = thoughtProcess.split(';').filter(s => s.trim() !== '');

  return (
    <div className="px-4 py-2 bg-gray-800/50 border-y border-indigo-800">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-2 md:gap-4 flex-wrap">
            <span className="text-sm font-semibold text-purple-300">Psyche:</span>
            {steps.map((step, index) => (
                <React.Fragment key={index}>
                    <div className="text-xs font-mono px-2 py-1 bg-indigo-700 rounded-md shadow-md animate-fade-in-up" style={{animationDelay: `${index * 100}ms`}}>
                        {step}
                    </div>
                    {index < steps.length - 1 && <div className="text-purple-400 text-sm animate-pulse" style={{animationDelay: `${index * 100 + 50}ms`}}>→</div>}
                </React.Fragment>
            ))}
        </div>
        <style>{`
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.3s ease-out forwards;
            opacity: 0;
          }
        `}</style>
    </div>
  );
};
