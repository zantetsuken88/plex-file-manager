import React, { useRef, useState } from 'react';
import ProgressBar from '../filebrowser/ProgressBar';
import DirectoryBreadcrumb from '../filebrowser/DirectoryBreadcrumb';
import './fileuploader.scss';
import folderIcon from '../assets/open-folder.png';
import upload from '../assets/upload-to-cloud.png';
import bullet from '../assets/round-small-edit.svg';
import smile from '../assets/sun-small.svg';
import FilesLabel from '../assets/FilesLabel';
import NewDirectoryModal from "./NewDirectoryModal";

export default function FileUploader({ handleSubmit, currentDir, handleUpload, progress, onProgressChange, uploadResponse, handNewDir }) {
  const file = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalClass, setModalClass] = useState('');

  handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    const uploadFiles = new FormData();
    const fileList = file.current['files'];
    const fileData = {};
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      fileData[file.name] = file.size;
    }
    uploadFiles.append('fileList', JSON.stringify(fileData));
    for (let i = 0; i < fileList.length; i++) {
      const f = fileList[i];
      const name = f.name.split('.')[0];
      uploadFiles.append(name, f, f.name);
    }
    handleUpload(uploadFiles)
      .then(() => {
        setIsUploading(false);
        setSelectedFiles([]);
      }
    );
  }

  const handleNewFolder = () => {
    setShowModal(true);
  }

  const handleCloseModal = async () => {
    setModalClass('fullscreen-modal-closing');
    const timeout = await setTimeout(() => {
      setShowModal(false);
      setModalClass('');
      clearTimeout(timeout);
    }, 500);
  }

  const sanitisedDirectory = (dir) => {
   if (dir === '/') {
     return 'Plex Home';
   } else {
     const dirs = dir.split("/");
     return dirs[dirs.length - 2];
   }
  }

  const updateDropZoneContents = (e) => {
    onProgressChange(0);
    let fileNames = [];
    const fileList = e.target.files;
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const size = file.size
      fileNames.push({ name: file.name, size: sanitiseBytes(size) });
    }
    setSelectedFiles(fileNames);
  }

  const sanitiseBytes = (bytes) => {
    let fileSize;
    const sizeInMB = Math.round(bytes / Math.pow(10, 6));

    if (sizeInMB >= 1000) {
      fileSize = (sizeInMB / 1000 ).toFixed(2) + 'GB';
    } else if (sizeInMB < 1) {
      fileSize = (bytes / 1000).toFixed(0) + 'KB';
    } else {
      fileSize = sizeInMB + 'MB';
    }
    return fileSize;
  };

  const FilesSelected = () => selectedFiles.length > 0
  ? selectedFiles.map((file, i) =>
    <div className='filename-container' key={`${file}-${i}`}>
      <img src={bullet} alt='bullet'/>
      <p className='file-names'>{file.name}</p>
      <p className='file-sizes'>{file.size}</p>
    </div>)
  : <div className='empty-state'>
      <img src={smile} alt='smile'/>
      <p>Please Select Some Files!</p>
  </div>;

  return (
    <form className='uploader-container' onSubmit={e => handleSubmit(e)}>
      <div className='directory-information'>
        <DirectoryBreadcrumb dir={sanitisedDirectory(currentDir)} icon={folderIcon} navTo={() => null}/>
      </div>
      <div className='dropzone'>
        <label className='file-input-label'>
          <input id='file-input-hidden' ref={file} type='file' formEncType='multipart/form-data' multiple onChange={updateDropZoneContents} />
          <img src={upload} alt='upload'/>
        </label>
      </div>
      <fieldset className='selection-details'>
        <legend>
          <FilesLabel/>
        </legend>
        <div>
          <FilesSelected/>
        </div>
      </fieldset>
      <div className='uploader-container-buttons'>
        <button type='submit'>Submit</button>
        <button type='button' onClick={() => handleNewFolder()}>New Folder</button>
      </div>
      { showModal && <NewDirectoryModal handleNewDir={dir => handNewDir(dir)} classes={modalClass} onCancelModal={() => handleCloseModal()}/> }
      <ProgressBar progress={progress} isUploading={isUploading} uploadResponse={uploadResponse}/>
    </form>
  )
}
