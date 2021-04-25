import React, { useRef } from 'react';
import './newdirectorymodal.scss';

export default function NewDirectoryModal({ classes, onCancelModal, handleNewDir }) {
  const dirName = useRef(null);

  const handleClick = () => {
    handleNewDir(dirName.current.value);
    onCancelModal();
  }

  return (
    <div className={`fullscreen-modal ${classes}`}>
      <div className='input-container'>
        <input ref={dirName} />
        <button type='button' onClick={() => onCancelModal()}>Cancel</button>
        <button type='button' onClick={() => handleClick()}>Submit</button>
      </div>
    </div>
  )
}
