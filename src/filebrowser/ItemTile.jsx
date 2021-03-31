import React from 'react';
import folderIcon from '../assets/open-folder.png';
import videoIcon from '../assets/video-file.png';
import goBackIcon from '../assets/go-back.png'
import drive from '../assets/drive.png';
import './itemtile.scss';

export default function ItemTile ({ isDirectory, filename, currentDir, onDirChange, isGoBack }) {
  const inRoot = currentDir === '/';
  const changeDir = () => {
    onDirChange(currentDir + filename + '/')
  }
  const tileClasses = () => {
    let classes = 'item-tile ';
    if (isDirectory) {
      classes = classes.concat('item-tile-clickable');
    } else if (isGoBack) {
      classes = classes.concat(inRoot ? 'item-tile-home' : 'item-tile-clickable');
    }
    return classes;
  }

  const getIcon = () => {
    let icon;
    let alt;
    if (isDirectory) {
      icon = folderIcon;
      alt = 'folder';
    } else if (isGoBack) {
      icon = inRoot ? drive : goBackIcon;
      alt = 'return';
    } else {
      icon = videoIcon;
      alt = 'file'
    }
    return <img src={icon} alt={alt}/>;
  }

  const getLabel = () => {
    let label;
    if (isGoBack) {
      label = inRoot ? 'Home' : 'Go Back';
    } else {
      label = filename;
    }
    return label;
  }

  return (
    <div className={tileClasses()} onClick={() => isDirectory || (isGoBack && !inRoot) ? changeDir() : null}>
      { getIcon() }
      <p>{ getLabel() }</p>
    </div>
  );
}