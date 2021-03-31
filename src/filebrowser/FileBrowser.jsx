import React from 'react';
import './filebrowser.scss';
import directorySeparator from '../assets/directory-separator.png';
import drive from '../assets/drive.png';
import DirectoryBreadcrumb from './DirectoryBreadcrumb';
import ItemTile from './ItemTile';

export default function FileManager({ fileList, onDirChange, currentDir }) {

  const previousDirectory = () => {
    const splitPath = currentDir.split('/');
    splitPath.splice(splitPath.length -2, 2);
    return splitPath.join('/');
  }

  const navToBreadcrumb = (dir) => {
    const splitPath = currentDir.split('/')
    const indexOfDir = splitPath.findIndex(value => value === dir);
    if (indexOfDir >= -1) {
      splitPath.splice(indexOfDir + 1, splitPath.length - indexOfDir);
    }
    const path = splitPath.join('/')
    onDirChange(path + '/');
  }

  return (
    <div className='browser-container'>
      <div className='directory-container'>
        <DirectoryBreadcrumb icon={drive} dir='Plex Home' navTo={dir => navToBreadcrumb(dir)}/>
        { currentDir.split('/').map((dir, i) =>
          dir !== ''
          && <DirectoryBreadcrumb icon={directorySeparator} dir={dir} key={`${dir}-${i}`} navTo={dir => navToBreadcrumb(dir)}/>
        )}
      </div>
      <div className='browser'>
        <ItemTile
          isGoBack
          filename='/'
          currentDir={currentDir}
          onDirChange={() => onDirChange(previousDirectory() + '/')}
          />
        { fileList.map((file, key) =>
          <ItemTile
            isDirectory={file.isDirectory}
            filename={file.name}
            currentDir={currentDir}
            onDirChange={dir => onDirChange(dir)} key={key}
          />
        )}
      </div>
    </div>
  )
}
