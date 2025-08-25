import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoAddCircleOutline, IoSaveOutline } from 'react-icons/io5';

interface Playlist {
  id: number;
  name: string;
  songs: string[];
}

const ProfileLayout: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([
    { id: 1, name: 'Favorites', songs: ['Song 1', 'Song 2', 'Song 3'] },
    { id: 2, name: 'Chill Vibes', songs: ['Song 4', 'Song 5'] },
    { id: 3, name: 'Workout Mix', songs: ['Song 6', 'Song 7', 'Song 8', 'Song 9'] }
  ]);
  const [editingPlaylist, setEditingPlaylist] = useState<number | null>(null);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddPlaylist = () => {
    if (newPlaylistName.trim()) {
      const newPlaylist: Playlist = {
        id: Date.now(),
        name: newPlaylistName.trim(),
        songs: []
      };
      setPlaylists([...playlists, newPlaylist]);
      setNewPlaylistName('');
      setShowAddForm(false);
    }
  };

  const handleEditPlaylist = (id: number) => {
    setEditingPlaylist(id);
    const playlist = playlists.find(p => p.id === id);
    if (playlist) {
      setNewPlaylistName(playlist.name);
    }
  };

  const handleSavePlaylist = (id: number) => {
    if (newPlaylistName.trim()) {
      setPlaylists(playlists.map(p => 
        p.id === id ? { ...p, name: newPlaylistName.trim() } : p
      ));
      setEditingPlaylist(null);
      setNewPlaylistName('');
    }
  };

  const handleDeletePlaylist = (id: number) => {
    setPlaylists(playlists.filter(p => p.id !== id));
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">My Playlists</h2>
        <motion.button
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          onClick={() => setShowAddForm(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <IoAddCircleOutline className="text-xl" />
          Add Playlist
        </motion.button>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.div
            className="mb-6 p-6 bg-gray-50 rounded-xl border border-gray-200"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex gap-4">
              <input
                type="text"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                placeholder="Enter playlist name"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <button
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all duration-200"
                onClick={handleAddPlaylist}
              >
                Create
              </button>
              <button
                className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-all duration-200"
                onClick={() => {
                  setShowAddForm(false);
                  setNewPlaylistName('');
                }}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlists.map((playlist) => (
          <motion.div
            key={playlist.id}
            className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
            whileHover={{ y: -5 }}
            layout
          >
            <div className="flex items-center justify-between mb-4">
              {editingPlaylist === playlist.id ? (
                <div className="flex gap-2 flex-1">
                  <input
                    type="text"
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-all duration-200"
                    onClick={() => handleSavePlaylist(playlist.id)}
                  >
                    <IoSaveOutline />
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-semibold text-gray-900">{playlist.name}</h3>
                  <div className="flex gap-2">
                    <button
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                      onClick={() => handleEditPlaylist(playlist.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                      onClick={() => handleDeletePlaylist(playlist.id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                {playlist.songs.length} song{playlist.songs.length !== 1 ? 's' : ''}
              </p>
              <div className="max-h-32 overflow-y-auto">
                {playlist.songs.map((song, index) => (
                  <div key={index} className="text-sm text-gray-700 py-1 px-2 bg-white rounded-lg">
                    {song}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProfileLayout;
