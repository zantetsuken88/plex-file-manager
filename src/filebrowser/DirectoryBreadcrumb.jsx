import React from 'react';
import './directorybreadcrumb.scss';

export default function DirectoryBreadcrumb ({ icon, dir, navTo }) {

  return <div className='directory' onClick={() => navTo(dir)}>
    <img src={icon} alt='/'/>
    <p>{dir}</p>
  </div>
}