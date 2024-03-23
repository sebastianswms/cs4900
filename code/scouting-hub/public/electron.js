require("dotenv").config();
const { app, BrowserWindow, Menu, ipcMain, dialog } = require("electron");
const path = require("node:path");
const fs = require("fs");
const fsp = require("fs").promises;
const csv = require("csv-parser");

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
};

app.whenReady().then(() => {
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

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
