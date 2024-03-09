const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  get: async (url, config) => {
    const response = await ipcRenderer.invoke("api-get", { url, config });
    return response;
  },
});

contextBridge.exposeInMainWorld("csv", {
  loadFile: async () => {
    const response = await ipcRenderer.invoke("loadFile");
    return response;
  },

  readHeader: async (filePath) => {
    const response = await ipcRenderer.invoke("readHeader", filePath);
    return response;
  },
});
