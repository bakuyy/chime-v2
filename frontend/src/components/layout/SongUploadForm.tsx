import React, { useState, ChangeEvent } from "react";
import "../../styling/SongUploadForm.css";

import { FaArrowRightLong } from "react-icons/fa6";


interface SongFormData {
  songName: string;
  artistName: string;
  genre: string[];
  hashtags: string[];
  audioFile: File | null;
}

const SongUploadForm: React.FC = () => {

  const [formData, setFormData] = useState<SongFormData>({
    songName: "",
    artistName: "",
    genre: [],
    hashtags: [],
    audioFile: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    //handle comma-separated fields : genres and hashtags
    if (name === "genre" || name === "hashtags") {
      const newValue = value.split(",").map((item) => item.trim());
      // splits into arrays and removes whitespaces
      setFormData((prev) => ({ ...prev, [name]: newValue }));
      //updates formData w/new values of genre/hashtags
      // create a shallow copy of our object
      // prev = previous state of formData
      // { ...prev, [name]: newValue } creates new object where
      // ...prev spreads all properties of prev object into the new object
      // it copies all properties from previous formData state into new object, so all other fields stay the same
      // [name]:newValue sets property with key name to new value
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    
    // check if files is not null and has a length greater than 0
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, audioFile: files[0] }));
    }
  }
  
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formDataObj = new FormData()
    formDataObj.append('song_name', formData.songName)
    formDataObj.append('artist_name', formData.artistName)
    formDataObj.append('genre', JSON.stringify(formData.genre))  // genre and hashtags 
    formDataObj.append('hashtags', JSON.stringify(formData.hashtags))
    if (formData.audioFile) formDataObj.append('audio_file', formData.audioFile)

    try {
        const response = await fetch('http://127.0.0.1:8000/music-app/upload/', {
            method: 'POST',
            body: formDataObj,
          })
          if (response.ok) {
            // if successful, log data
            const data = await response.json();
            console.log('succesful upload:', data);
          } else {
            // H
            const errorData = await response.json();
            console.error('error uploading song:', errorData);
          }
        } catch (error) {
          console.error('error:', error);
        }

        setFormData({
            songName: "",
            artistName: "",
            genre: [],
            hashtags: [],
            audioFile: null,
          });
        
      }
  
      return (
        <div className="form-container">
          <form className="upload-form" onSubmit={handleSubmit}>
            <h1>Upload Song</h1>
            <div className="form-group">
              <input
                type="text"
                id="songName"
                name="songName"
                value={formData.songName}
                onChange={handleChange}
                placeholder="Song name"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                id="artistName"
                name="artistName"
                value={formData.artistName}
                onChange={handleChange}
                placeholder="Artist(s) name"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                id="genre"
                name="genre"
                value={formData.genre.join(", ")}
                onChange={handleChange}
                placeholder="Genre(s)"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                id="hashtags"
                name="hashtags"
                value={formData.hashtags.join(", ")}
                onChange={handleChange}
                placeholder="Hashtag(s)"
              />
            </div>
            <div className="form-group">
              <label htmlFor="audioFile" className="file-label">
                Choose Audio File
              </label>
              <input
                type="file"
                id="audioFile"
                name="audioFile"
                onChange={handleFileChange}
                accept="audio/*"
                required
              />
            </div>
            <button type="submit" className="submit-btn">

            <FaArrowRightLong/>
            </button>
          </form>
        </div>
      );
    };
    
    export default SongUploadForm