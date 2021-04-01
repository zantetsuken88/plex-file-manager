import { terminalColours } from './terminal-colours.js';
import * as readline from 'readline';

const { reset, bgGreen, bgCyan } = terminalColours;

export const progressBar = (filename, progress, complete) => {
  const roundProgress = Math.round(progress);
  const completedBar = roundProgress > 0 ? ' '.repeat(roundProgress) : '';
  const emptyBar = ' '.repeat(100 - roundProgress);
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0, null);
  complete
    ? writeComplete(filename, completedBar, progress)
    : writeProgress(filename, completedBar, emptyBar, progress);
}

const writeProgress = (filename, completedBar, emptyBar, progress) => {
  process.stdout.write(`[File: ${filename}... | ${bgCyan}${completedBar}${reset}${emptyBar} | ${progress}%`);
}

const writeComplete = (filename, completedBar, progress) => {
  process.stdout.write(`[File: ${filename}... | ${bgGreen}${completedBar}${reset} | ${progress}% \u2705 \n`)
}
