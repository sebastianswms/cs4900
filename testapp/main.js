const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const axios = require('axios')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {

  ipcMain.handle('api-get', async (event, { url }) => {

    const apiUsername = process.env.API_USERNAME;
    const apiPassword = process.env.API_PASSWORD; 
    const base64Credentials = btoa(`${apiUsername}:${apiPassword}`); 
    const authHeader = `Basic ${base64Credentials}`;
    const config = { headers: { 'Authorization': authHeader }}

    try {
        response = await axios.get(url, config);
        return response.data;
    } catch (error) {
        throw error;
    }
  });


  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
