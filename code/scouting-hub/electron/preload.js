const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  get: async (url, config) => {
    const response = await ipcRenderer.invoke("api-get", { url, config });
    return response;
  },
});
