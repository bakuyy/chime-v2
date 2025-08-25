import React from 'react';

interface PlaylistProps {
  name: string;
  songs: string[];
}

const Playlist: React.FC<PlaylistProps> = ({ name, songs }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-pink-300/50 transition-all duration-300">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{name}</h3>
      <div className="space-y-2">
        {songs.map((song, index) => (
          <div key={index} className="text-sm text-gray-700 py-2 px-3 bg-gray-50/80 backdrop-blur-sm rounded-lg hover:bg-pink-50/50 transition-colors duration-200">
            {song}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlist; 