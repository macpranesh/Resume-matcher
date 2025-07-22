import React from 'react';

interface SkillTagProps {
  skill: string;
  type: 'matched' | 'missing' | 'resume' | 'job';
}

export function SkillTag({ skill, type }: SkillTagProps) {
  const getStyles = () => {
    switch (type) {
      case 'matched':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'missing':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'resume':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'job':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getStyles()} m-1`}>
      {skill}
    </span>
  );
}