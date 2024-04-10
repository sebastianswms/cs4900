const {
  app,
  BrowserWindow,
  Menu,
  ipcMain,
  dialog,
  protocol,
} = require("electron");
const fs = require("fs");
const fsp = require("fs").promises;
const csv = require("csv-parser");
const db = require("./db");

let mainWindow;

// need a dev mode version of these variable to work without a full build
const configPath = app.isPackaged
  ? `${__dirname}/../build/config.json`
  : `${__dirname}/../public/config.json`;
const preloadPath = app.isPackaged
  ? `${__dirname}/../build/preload.js`
  : `${__dirname}/../public/preload.js`;

const iconPath = `${__dirname}/../build/favicon.ico`;
const indexPath = `${__dirname}/../build/index.html`;

function insertMatch(match) {
  db.insertMatch(match, (err) => {
    if (err) {
      console.error("Error inserting object:", err.message);
    } else {
      console.log("Object inserted successfully");
    }
  });
}

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
    : "http://localhost:3000";

  mainWindow.loadURL(appURL);

  mainWindow.once("ready-to-show", () => mainWindow.show());

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }
};

function setupLocalFilesNormalizerProxy() {
  protocol.registerHttpProtocol(
    "file",
    (request, callback) => {
      const url = request.url.substr(8);
      callback({ path: `${__dirname}/${url}` });
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
    const jsonData = await fsp.readFile(configPath, "utf8");
    const envConfig = JSON.parse(jsonData);
    const apiUsername = envConfig.API_USERNAME;
    const apiAuthorizationToken = envConfig.API_AUTHORIZATION_TOKEN;
    const base64Credentials = Buffer.from(
      `${apiUsername}:${apiAuthorizationToken}`
    ).toString("base64");
    const authHeader = `Basic ${base64Credentials}`;
    const config = { headers: { Authorization: authHeader } };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        return;
      } else {
        const data = await response.json();
        return data;
      }
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

  ipcMain.handle("readFileHeaders", async (event, filePath) => {
    function getFields(filePath) {
      return new Promise((resolve) => {
        let results = [];
        fs.createReadStream(filePath)
          .pipe(csv())
          .on("headers", (headers) => {
            results = [...headers];
            resolve(results);
          });
      });
    }
    return await getFields(filePath);
  });

  ipcMain.handle("readFileRows", async (event, filePath) => {
    function getRows(filePath) {
      return new Promise((resolve) => {
        let results = [];
        fs.createReadStream(filePath)
          .pipe(csv())
          .on("data", (data) => {
            results = [...results, data];
          })
          .on("end", () => {
            resolve(results);
          });
      });
    }
    return await getRows(filePath);
  });

  ipcMain.handle("readConfig", async (event) => {
    return await JSON.parse(fs.readFileSync(configPath, "utf8"));
  });

  ipcMain.handle("writeConfig", async (event, jsonData) => {
    return await fs.writeFileSync(configPath, JSON.stringify(jsonData), {
      encoding: "utf8",
      flag: "w",
    });
  });

  ipcMain.handle("saveLayout", async (event, layout) => {
    try {
      const results = await new Promise((resolve, reject) => {
        db.upsertLayout(layout, (err, id) => {
          if (err) {
            reject(err);
          } else {
            resolve(id);
          }
        });
      });
      return results;
    } catch (err) {
      console.error("Error reading database:", err);
      throw err;
    }
  });

  ipcMain.handle("insertMatch", (event, match) => {
    insertMatch(match);
  });

  ipcMain.handle("upsertOne", async (event, tableName, element) => {
    try {
      const results = await new Promise((resolve, reject) => {
        db.upsertOne(tableName, element, (err, rowID) => {
          if (err) {
            reject(err);
          } else {
            resolve(rowID);
          }
        });
      });
      return results;
    } catch (err) {
      console.error("Error [upsertOne] into database:", err);
      throw err;
    }
  });

  ipcMain.handle("findAllDistinct", async (event, tableName, keyName) => {
    try {
      const results = await new Promise((resolve, reject) => {
        db.findAllDistinct(tableName, keyName, (err, keys) => {
          if (err) {
            reject(err);
          } else {
            resolve(keys);
          }
        });
      });
      return results;
    } catch (err) {
      console.error("Error [findAllDistinct] into database:", err);
      throw err;
    }
  });

  ipcMain.handle("findByObject", async (event, tableName, object) => {
    try {
      const results = await new Promise((resolve, reject) => {
        db.findByObject(tableName, object, (err, keys) => {
          if (err) {
            reject(err);
          } else {
            resolve(keys);
          }
        });
      });
      return results;
    } catch (err) {
      console.error("Error [findByObject] into database:", err);
      throw err;
    }
  });

  ipcMain.handle("findAllByObject", async (event, tableName, object) => {
    try {
      const results = await new Promise((resolve, reject) => {
        db.findAllByObject(tableName, object, (err, keys) => {
          if (err) {
            reject(err);
          } else {
            resolve(keys);
          }
        });
      });
      return results;
    } catch (err) {
      console.error("Error [findAllByObject] into database:", err);
      throw err;
    }
  });

  ipcMain.handle("readAllRows", async (event, tableName) => {
    try {
      const results = await new Promise((resolve, reject) => {
        db.readAllRows(tableName, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
      return results;
    } catch (err) {
      console.error("Error reading database:", err);
      throw err;
    }
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
