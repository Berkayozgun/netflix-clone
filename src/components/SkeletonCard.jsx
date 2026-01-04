import React from 'react';

const SkeletonCard = ({ isLargeRow }) => {
    return (
        <div
            className={`relative flex-shrink-0 animate-pulse bg-gray-800 rounded-lg overflow-hidden ${isLargeRow ? 'w-56 h-80' : 'w-48 h-64'
                } mr-4`}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-shimmer" style={{ backgroundSize: '200% 100%' }}></div>
        </div>
    );
};

export default SkeletonCard;
