import { terminalColours } from './terminal-colours.js';

export const sanitiseFilename = (filename) => {
  const { cyan } = terminalColours;
  try {
    printColour(cyan, `trying to sanitise ${filename}`);
    let splitName = filename.split('.');
    const ext = splitName.pop();
    printColour(cyan, `extension is ${ext}`);
    let sanitised = splitName.length > 1 ? splitName.join(' ') : splitName.toString();
    sanitised = sanitised.length > 40 ? sanitised.substring(0, 40) : sanitised;
    printColour(cyan, `sanitised filename is "${sanitised}" of type [${typeof sanitised}]`);
    return sanitised.concat(`.${ext}`);
  } catch (err) {
    console.error(`encountered error sanitising filename. filename: ${filename}`);
  }
}

export const printColour = (colour, text) => process.stdout.write(colour + text + terminalColours.reset + '\n');

