require("dotenv").config();
const { app, BrowserWindow, Menu, ipcMain, dialog, protocol } = require("electron");
const path = require("path");
const fs = require("fs");
const fsp = require("fs").promises;
const csv = require("csv-parser");
const url = require("url");

let envConfig;
const configPath = path.join(__dirname, "config.json");

async function readConfigFile(configPath) {
  try {
    const jsonData = await fsp.readFile(configPath, "utf8");
    envConfig = JSON.parse(jsonData);
    console.log("JSON Data:", envConfig);
  } catch (error) {
    console.error("Error reading file:", error);
  }
}

const createWindow = () => {
  let window = new BrowserWindow({
    width: 1200,
    height: 700,
    show: false,
    backgroundColor: "white",
    icon: path.join(__dirname, "../public/favicon.ico"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  Menu.setApplicationMenu(null);

  window.loadURL(`file://${path.join(__dirname, "../build/index.html")}`);

  window.once("ready-to-show", () => window.show());

  window.on("closed", () => {
    window = null;
  });

  const appURL = app.isPackaged
    ? url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true,
      })
    : "http://localhost:3006";

  mainWindow.loadURL(appURL);

  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }
};

function setupLocalFilesNormalizerProxy() {
  protocol.registerHttpProtocol(
    "file",
    (request, callback) => {
      const url = request.url.substr(8);
      callback({ path: path.normalize(`${__dirname}/${url}`) });
    },
    (error) => {
      if (error) console.error("Failed to register protocol");
    }
  );
}

app.whenReady().then(() => {
  createWindow();
  setupLocalFilesNormalizerProxy();

  ipcMain.handle("api-get", async (event, { url }) => {
    await readConfigFile(configPath);
    const apiUsername = envConfig.API_USERNAME;
    const apiAuthorizationToken = envConfig.API_AUTHORIZATION_TOKEN;
    const base64Credentials = btoa(`${apiUsername}:${apiAuthorizationToken}`);
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

  ipcMain.handle("loadFile", async () => {
    return dialog
      .showOpenDialog({ properties: ["openFile"] })
      .then((result) => {
        //test to make sure you get a file back
        //result contains a flag to check if cancelled
        return result.filePaths[0].toString();
      })
      .catch((err) => console.log(err));
  });

  ipcMain.handle("readHeader", async (event, filePath) => {
    function getFields(filePath) {
      return new Promise((resolve) => {
        let results = [];
        fs.createReadStream(filePath)
          .pipe(csv())
          .on("headers", (headers) => {
            results = [...headers];
            console.log("I am actually getting results here: ", results);
            resolve(results);
          });
      });
    }
    return await getFields(filePath);
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
});

const allowedNavigationDestinations = "https://my-electron-app.com";
app.on("web-contents-created", (event, contents) => {
  contents.on("will-navigate", (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
 
    if (!allowedNavigationDestinations.includes(parsedUrl.origin)) {
      event.preventDefault();
    }
  });
});
