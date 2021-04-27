import { terminalColours } from './terminal-colours.js';

export const sanitiseFilename = (filename) => {
  let splitName = filename.split('.');
  const ext = splitName.pop();
  let sanitised = splitName.length > 1 ? splitName.join(' ') : splitName.toString();
  sanitised = sanitised.length > 40 ? sanitised.substring(0, 40) : sanitised;
  return sanitised.concat(`.${ext}`);
}

export const printColour = (colour, text) => process.stdout.write(colour + text + terminalColours.reset + '\n');

