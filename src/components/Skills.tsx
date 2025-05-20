import React from 'react';

const Skills: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Skills Manager</h1>
      <p className="text-lg mb-8">This feature is coming soon.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div 
            key={i}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-800 flex flex-col"
          >
            <div className="w-12 h-12 rounded-lg bg-dusty-rose/20 flex items-center justify-center mb-4">
              <span className="text-xl">{['🔍', '📝', '📊', '🌐', '📅', '🧩'][i % 6]}</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Placeholder Skill {i + 1}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex-1">
              This is a placeholder for an upcoming skill. Skills will extend Lyra's functionality.
            </p>
            <button className="text-sm text-dusty-rose hover:text-coral mt-auto">Coming Soon</button>
          </div>
        ))}
      </div>
      
      <div className="mt-12 p-6 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center">
        <h3 className="text-lg font-medium mb-2">Custom Skills</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          You'll be able to create custom skills to extend Lyra's functionality.
        </p>
        <button className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg">
          Coming Soon
        </button>
      </div>
    </div>
  );
};

export default Skills;
