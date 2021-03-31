import React, { useState, useEffect, useCallback } from 'react';
import './App.scss';
import FileBrowser from './filebrowser/FileBrowser';
import Logo from './assets/logo.jsx';
import FileUploader from './fileuploader/FileUploader';
import { getDirectoryContents, uploadFiles } from './api/FileManagement';

function App() {
  const [ currentDir, setCurrentDir ] = useState('/');
  const [fileList, updateFileList] = useState([]);
  const [progress, setProgress] = useState(0);
  const [postRes, updatePostRes] = useState('');

  const getFiles = useCallback(
    () => {
      getDirectoryContents(currentDir)
        .then(files => updateFileList(files));
      }, [ currentDir ]
  );

  useEffect(() => {
    getFiles();
  }, [ currentDir, getFiles ]);

  const uploadSelectedFiles = async (files) => {
    await uploadFiles(files, currentDir, progressEvent =>
      setProgress(Math.round((100 * progressEvent.loaded) / progressEvent.total)))
      .then(response => {
        updatePostRes(response.data);
        getFiles();
      }).catch(err => {
        console.log(err);
      });
  }
    return (
    <main className="app">
      <header className='header'>
        <div className='logo'>
          <Logo id={'logo'}/>
        </div>
        <FileUploader
          currentDir={ currentDir }
          handleUpload={files => uploadSelectedFiles(files)}
          progress={progress}
          uploadResponse={postRes}
          onProgressChange={progress => setProgress(progress)}
        />
      </header>
      <FileBrowser currentDir={ currentDir } fileList={fileList} onDirChange={dir => setCurrentDir(dir)}/>
    </main>
  );
}

export default App;
