const path = require('path');

let config = {
  fsRoot: path.resolve('/Users/leestewart/Downloads/'),
  rootName: 'PontyPlex Library',
  port: process.env.PORT || '3020',
  host: process.env.HOST || 'localhost'
};
let fileManager = require('@opuscapita/filemanager-server');
fileManager.server.run(config);