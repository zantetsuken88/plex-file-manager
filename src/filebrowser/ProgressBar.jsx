import React from 'react';
import './progressbar.scss';

export default function ProgressBar ({ progress, isUploading, uploadResponse }) {
  const uploadingClass = isUploading && 'progress-bar-fill-uploading';

  return <div className='progress-bar-container'>
    <div className='progress-bar'>
      <div className={`progress-bar-fill ${uploadingClass}`} style={{ width: `${progress}%` }}/>
    </div>
    <p>{progress}%</p>
    { uploadResponse && <p>{uploadResponse}</p> }
  </div>;
}
