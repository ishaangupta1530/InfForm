import React, { useState } from 'react';
import './App.css'; // Import updated CSS
import Home from './pages/home';
import { storage } from './firebase.config';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Search from './Search'; // Import the Search component

function AppContainer() {
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadMessage, setUploadMessage] = useState('');

  const upload = () => {
    if (image == null) {
      setUploadMessage('No file selected.');
      return;
    }

    const imageref = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytes(imageref, image);

    uploadTask.then(snapshot => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setUploadProgress(progress);
      return getDownloadURL(snapshot.ref);
    }).then(url => {
      setUploadMessage(`File uploaded successfully: ${url}`);
      setUploadProgress(0);
    }).catch(error => {
      setUploadMessage(`Upload failed: ${error.message}`);
    });
  };

  return (
    <div className="App">
      <Home />
      <br />
      <input 
        type="file" 
        onChange={(e) => setImage(e.target.files[0])} 
      />
      <button onClick={upload}>Upload</button>
      {uploadProgress > 0 && (
        <div className="progress-bar">
          <div 
            className="progress-bar-inner" 
            style={{ width: `${uploadProgress}%` }}
          >
            {Math.round(uploadProgress)}%
          </div>
        </div>
      )}
      {uploadMessage && <p>{uploadMessage}</p>}
      <br />
      <Search /> {/* Integrate the Search component */}
    </div>
  );
}

export default AppContainer;
