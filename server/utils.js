export const sanitiseFilename = (filename) => {
  let splitName = filename.split('.');
  const ext = splitName.pop();
  return splitName.join('-').concat(`.${ext}`);
}
