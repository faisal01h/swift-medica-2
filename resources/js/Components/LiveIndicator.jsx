import React from 'react';

export default function LiveIndicator({ connected }) {
    return (
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white bg-opacity-50 backdrop-blur-md rounded-lg">
            <span className={`w-3 h-3 rounded-full ${connected ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`}></span>
            <span className="text-sm font-medium text-black">
                {connected ? 'LIVE' : 'OFFLINE'}
            </span>
        </div>
    );
}
