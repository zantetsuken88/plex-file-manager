const FtpSrv = require('ftp-srv');
const ftpServer = new FtpSrv({
  url: 'ftp://192.168.1.70:21',
  pasv_url: 'ftp://192.168.1.70',
  pasv_min: 8400,
  pasv_max: 8500,
  greeting: 'You are connected to PontyPlex File Server!'
});

ftpServer.on('login', ({connection, username, password}, resolve, reject) => {
  connection.on('RETR', (error, filePath) => {
    if (error) {
      console.error(`FTP server error: could not retrieve file ${filePath} for download ${error}`);
    }
    console.info(`FTP server: download successfully retrieved - ${filePath}`);
  });
  connection.on('STOR', (error, filePath) => {
    if (error) {
      console.error(`FTP server error: could not receive file ${filePath} for upload ${error}`);
    }
    console.info(`FTP server: upload successfully received - ${filePath}`);
  });
  connection.on('RNTO', (error, filePath) => {
    if (error) {
      console.error(`FTP server error: could not rename file ${filePath}, error occurred: ${error}`);
    }
    console.info(`FTP server: file successfully renamed - ${filePath}`);
  });
  resolve({ root: '/Users/leestewart/Downloads'})
});

ftpServer.on('client-error', ({ context, error }) => {
  console.error(`FTP server error: error interfacing with client ${context} ${error} ${JSON.stringify(error)}`);
});

ftpServer.listen()
  .then(() => { console.log ( `Server running at ftp://192.168.1.70:21`) });