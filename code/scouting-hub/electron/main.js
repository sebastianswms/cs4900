require("dotenv").config();
const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("node:path");
const isDev = require("electron-is-dev");

const createWindow = () => {
  let window = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    backgroundColor: "white",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  Menu.setApplicationMenu(null);

  window.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  // Open the DevTools.
  if (isDev) {
    window.webContents.openDevTools();
  }

  window.once("ready-to-show", () => window.show());

  window.on("closed", () => {
    window = null;
  });
};

app.whenReady().then(() => {
  ipcMain.handle("api-get", async (event, { url }) => {
    const apiUsername = process.env.API_USERNAME;
    const apiPassword = process.env.API_PASSWORD;
    const base64Credentials = btoa(`${apiUsername}:${apiPassword}`);
    const authHeader = `Basic ${base64Credentials}`;
    const config = { headers: { Authorization: authHeader } };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
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
