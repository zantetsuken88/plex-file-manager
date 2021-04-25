import http from 'http';
import fs from 'fs';
import 'dotenv/config.js';
import { handleUpload } from './upload-handler.js';
import { printColour } from "./utils.js";
import { terminalColours } from './terminal-colours.js';

const filesDirPath = process.env.PLEX_MEDIA_HOME;
const port = process.env.SERVER_PORT;
const textContent = { "Content-Type": "text/html", "Access-Control-Allow-Origin": "*" }
const { cyan, green, red } = terminalColours;

http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const cwd = decodeURI(url.searchParams.get('cwd'));

  if (url.pathname === '/upload') {
    if (req.method === "OPTIONS") {
      res.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Content-Disposition"
      });
      res.end();
    } else {
      handleUpload(req, res, cwd, filesDirPath);
    }
  } else if (url.pathname === '/new-dir') {
    try {
      const dir = url.searchParams.get('dir');
      const directoryPath = filesDirPath + cwd + dir;
      printColour(cyan, `Received request to create directory: ${dir}`);
      fs.mkdir(directoryPath, { recursive: true }, err => {
        if (err) {
          console.error('there was an error creating directory: ');
          res.writeHead(500, 'there was an error creating directory: ' + err.message, textContent);
          res.end();
          throw err;
        } else {
          printColour(green, `New directory [${dir}] successfully created!`);
          res.writeHead(200, textContent);
          res.end(`Created new directory at ${directoryPath}!`);
        }
      });
    } catch (e) {
      printColour(red, 'Oh no! Looks like the developer has no idea what he is doing and an error has occurred!: ', e);
      throw e;
    }
  } else if (req.method === "GET") {
    res.writeHead(200, textContent);
    fs.readdir(filesDirPath + cwd, { withFileTypes: true } , (err, files) => {
      let contents = [];
      files.forEach(file => {
        !file.name.startsWith('.') && contents.push({
          name: file.name,
          isDirectory: file.isDirectory() === true
        })
      })
      res.write(JSON.stringify(contents));
      res.end();
    })
  }
}).listen(port);
console.log("Running server on port " + port);
console.log('Plex Home set to: ', process.env.PLEX_MEDIA_HOME);
