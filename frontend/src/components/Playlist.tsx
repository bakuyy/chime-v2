import React from 'react';

interface PlaylistProps {
  name: string;
  songs: string[];
}

const Playlist: React.FC<PlaylistProps> = ({ name, songs }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{name}</h3>
      <div className="space-y-2">
        {songs.map((song, index) => (
          <div key={index} className="text-sm text-gray-700 py-2 px-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            {song}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlist; 