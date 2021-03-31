import http from 'http';
import fs from 'fs';
import Busboy from 'busboy';
import { terminalColours } from './terminal-colours.js';
import pq from 'p-queue'
import 'dotenv/config.js';

const PQueue = pq.default
const filesDirPath = process.env.PLEX_MEDIA_HOME;
const port = process.env.PORT;
const textContent = { "Content-Type": "text/html", "Access-Control-Allow-Origin": "*" }
const filesContent = { "Content-Type": "multipart/form-data", "Access-Control-Allow-Origin": "*" }

const { reset, cyan, magenta, bgGreen, bgCyan } = terminalColours;

const printColour = (colour, text) => process.stdout.write(colour + text + reset + '\n');

const progressBar = (filename, progress, complete) => {
  const roundProgress = Math.round(progress);
  const completedBar = roundProgress > 0 ? ' '.repeat(roundProgress) : '';
  const emptyBar = ' '.repeat(100 - roundProgress);
  complete
  ? process.stdout.write(`\r[File: ${filename}... | ${bgGreen}${completedBar}${reset} | ${progress}% \u2705 \n`)
  : process.stdout.write(`\r[File: ${filename}... | ${bgCyan}${completedBar}${reset}${emptyBar} | ${progress}%`);
}

http.createServer((req, res) => {
  const workQueue = new PQueue({ concurrency: 1 });

  if (req.method === "GET") {
    const url = new URL(req.url, `http://${req.headers.host}`);

    const path = url.searchParams.get('cwd');
    res.writeHead(200, textContent);
    fs.readdir(filesDirPath + path, { withFileTypes: true } , (err, files) => {
      let contents = [];
      files.forEach(file => {
        contents.push({
          name: file.name,
          isDirectory: file.isDirectory() === true
        })
      })
      res.write(JSON.stringify(contents));
      res.end();
    })
  } else if (req.method === "OPTIONS") {
    res.writeHead(200, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Content-Disposition"
    });
    res.end();

  } else if (req.method === "POST") {
    let bytesReceived = 0;
    let totalBytes = 0;
    let incomingFiles;
    let busboy = new Busboy({ headers: req.headers });
    let filesUploaded = 0;

    busboy.on('file', async (fieldname, file, filename) => {
      const processFile = async () => {
        totalBytes = incomingFiles[filename];
        file.on('data', data => {
          bytesReceived += data.length;
          let progress = ((bytesReceived / totalBytes) * 100).toFixed(2);
          progressBar(filename, progress, false);
        });

        const fstream = fs.createWriteStream(filesDirPath + req.url + filename);
        file.pipe(fstream);

        file.on('error', err => console.log('error: ', err));

        return new Promise(resolve =>
          fstream.on('close', () => {
            bytesReceived = 0;
            process.stdout.clearLine();
            progressBar(filename, 100, true)
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
          res.writeHead(200, filesContent);
          res.end(`Successfully uploaded ${filesUploaded} files!`);
        })();
      });
    });

    req.pipe(busboy);
  }
}).listen(port);
console.log("Running server on port " + port);
console.log('Plex Home set to: ', process.env.PLEX_MEDIA_HOME)
