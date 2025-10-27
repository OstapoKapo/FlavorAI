import React from "react";

export const RecipesLoading: React.FC = () => {
  return (
    <div className=" absolute inset-0 flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] gap-4 p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-64 bg-gray-200 rounded-2xl animate-pulse flex flex-col justify-between p-4"
          >
            <div className="h-40 bg-gray-300 rounded-xl mb-4"></div>
            <div className="h-6 w-3/4 bg-gray-300 rounded-full mb-2"></div>
            <div className="h-6 w-1/2 bg-gray-300 rounded-full"></div>
          </div>
        ))}
      </div>
      <p className="text-gray-500 animate-pulse mt-4">Завантаження рецептів...</p>
    </div>
  );
};