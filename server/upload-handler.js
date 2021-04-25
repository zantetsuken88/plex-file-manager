import Busboy from "busboy";
import { sanitiseFilename, printColour } from "./utils.js";
import { progressBar } from "./progress-bar.js";
import fs from "fs";
import readline from "readline";
import { terminalColours } from './terminal-colours.js';
import pq from 'p-queue';
const PQueue = pq.default

export const handleUpload = (req, res, cwd, filesDirPath) => {
  const headers = { "Content-Type": "multipart/form-data", "Access-Control-Allow-Origin": "*" }
  const workQueue = new PQueue({ concurrency: 1 });
  let bytesReceived = 0;
  let totalBytes = 0;
  let incomingFiles;
  let busboy = new Busboy({ headers: req.headers });
  let filesUploaded = 0;

  const { cyan, magenta } = terminalColours;

  busboy.on('file', async (fieldname, file, filename) => {
    const isTty = process.stdout.isTTY;
    const sanitisedFilename = sanitiseFilename(filename);
    !isTty && printColour(cyan, `Currently receiving file: [${sanitisedFilename}]. Please wait...`)
    const processFile = async () => {
      totalBytes = incomingFiles[filename];
      file.on('data', data => {
        bytesReceived += data.length;
        let progress = ((bytesReceived / totalBytes) * 100).toFixed(2);
        isTty && progressBar(sanitisedFilename, progress, false);
      });

      const fstream = fs.createWriteStream(filesDirPath + cwd + sanitisedFilename);
      file.pipe(fstream);

      file.on('error', err => console.log('error: ', err));

      return new Promise(resolve =>
        fstream.on('close', () => {
          bytesReceived = 0;
          readline.clearLine(process.stdout, 0);
          readline.cursorTo(process.stdout, 0, null);
          progressBar(sanitisedFilename, 100, true)
          resolve(filename);
          filesUploaded ++;
        })
      );
    }

    await workQueue.add(async () => {
      await processFile();
    });
  });

  busboy.on('field', (fieldname, val) => {
    workQueue.add(async () => {
      await (async () => {
        if (fieldname === 'fileList') {
          incomingFiles = JSON.parse(val);
          printColour(magenta, 'Incoming File List received. Expected files:');
          console.log(incomingFiles);
        }
      })();
    });
  })

  busboy.on('finish', () => {
    workQueue.add(async () => {
      await (async () => {
        printColour(cyan, 'Files Uploaded Successfully!');
        res.writeHead(200, headers);
        res.end(`Successfully uploaded ${filesUploaded} files!`);
      })();
    });
  });

  req.pipe(busboy);
}
