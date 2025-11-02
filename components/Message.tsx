
import React from 'react';
import type { Role } from '../types';

interface MessageProps {
  role: Role;
  content: string;
}

const SkipperIcon = () => (
    <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-gray-900">S</div>
);

const LuminousIcon = () => (
    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
        <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
    </div>
);


export const Message: React.FC<MessageProps> = ({ role, content }) => {
  const isSkipper = role === 'skipper';
  
  return (
    <div className={`flex items-start gap-4 ${isSkipper ? 'justify-end' : ''}`}>
      {!isSkipper && <LuminousIcon />}
      <div className={`max-w-lg p-3 rounded-lg ${isSkipper ? 'bg-cyan-800/70' : 'bg-indigo-800/70'}`}>
        <p className="whitespace-pre-wrap">{content}</p>
      </div>
       {isSkipper && <SkipperIcon />}
    </div>
  );
};
