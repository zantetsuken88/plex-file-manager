import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;

export const uploadFiles = async (files, path, progress) => {
  const options = {
    url: baseUrl + path,
    method: 'POST',
    data: files,
    onUploadProgress: progress
  };

  return axios(options)
    .then(res => {
      return res;
    }).catch(err => {
      return err;
  })
}

export const getDirectoryContents = (cwd) => {
  const options = {
    url: baseUrl,
    method: 'GET',
    params: {
      cwd: cwd
    }
  };

  return axios(options)
    .then(res => {
      let sortedList = [];
      let unsortedFiles = res.data;
      for (let i = 0; i < unsortedFiles.length; i++) {
        const file = unsortedFiles[i];
        if (file.isDirectory) {
          sortedList.push(file);
          unsortedFiles.splice(i, 1);
          i--;
        }
      }
      sortedList.concat(...unsortedFiles);
      return sortedList.concat(unsortedFiles)
    });
}
