require('dotenv').config();
const { app, BrowserWindow, Menu, ipcMain, dialog, protocol } = require('electron');
const fs = require('fs');
const fsp = require('fs').promises;
const csv = require('csv-parser');

let mainWindow;

const configPath = `${__dirname}/../build/config.json`;
const preloadPath = `${__dirname}/../build/preload.js`;
const iconPath = `${__dirname}/../build/favicon.ico`;
const indexPath = `${__dirname}/../build/index.html`;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    show: false,
    icon: iconPath,
    webPreferences: {
      preload: preloadPath,
    },
  });

  Menu.setApplicationMenu(null);

  const appURL = app.isPackaged
    ? `file://${indexPath}`
    : 'http://localhost:3000';

  mainWindow.loadURL(appURL);

  mainWindow.once('ready-to-show', () => mainWindow.show());

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }
};

function setupLocalFilesNormalizerProxy() {
  protocol.registerHttpProtocol(
    'file',
    (request, callback) => {
      const url = request.url.substr(8);
      callback({ path: `${__dirname}/${url}` });
    },
    (error) => {
      if (error) console.error('Failed to register protocol');
    }
  );
}

app.whenReady().then(() => {
  createWindow();
  setupLocalFilesNormalizerProxy();

  ipcMain.handle('api-get', async (event, { url }) => {
    const jsonData = await fsp.readFile(configPath, 'utf8');
    const envConfig = JSON.parse(jsonData);
    const apiUsername = envConfig.API_USERNAME;
    const apiAuthorizationToken = envConfig.API_AUTHORIZATION_TOKEN;
    const base64Credentials = Buffer.from(`${apiUsername}:${apiAuthorizationToken}`).toString('base64');
    const authHeader = `Basic ${base64Credentials}`;
    const config = { headers: { Authorization: authHeader } };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      console.log(response);
      console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
  });

  ipcMain.handle('loadFile', async () => {
    return dialog
      .showOpenDialog({ properties: ['openFile'] })
      .then((result) => {
        return result.filePaths[0].toString();
      })
      .catch((err) => console.log(err));
  });

  ipcMain.handle('readHeader', async (event, filePath) => {
    function getFields(filePath) {
      return new Promise((resolve) => {
        let results = [];
        fs.createReadStream(filePath)
          .pipe(csv())
          .on('headers', (headers) => {
            results = [...headers];
            console.log('Results: ', results);
            resolve(results);
          });
      });
    }
    return await getFields(filePath);
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
});

const allowedNavigationDestinations = 'https://my-electron-app.com';
app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
 
    if (!allowedNavigationDestinations.includes(parsedUrl.origin)) {
      event.preventDefault();
    }
  });
});
