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
    const response = await ipcRenderer.invoke("readFileHeaders", filePath);
    return response;
  },

  readRows: async (filePath) => {
    const response = await ipcRenderer.invoke("readFileRows", filePath);
    return response;
  },
});

contextBridge.exposeInMainWorld("envConfig", {
  readConfig: async () => {
    const response = await ipcRenderer.invoke("readConfig");
    return response;
  },

  writeConfig: async (jsonData) => {
    const response = await ipcRenderer.invoke("writeConfig", jsonData);
    return response;
  },
});

contextBridge.exposeInMainWorld("database", {
  insertMatch: async (match) => {
    const response = await ipcRenderer.invoke("insertMatch", match);
    return response;
  },
  upsertOne: async (tableName, element) => {
    const response = await ipcRenderer.invoke("upsertOne", tableName, element);
    return response;
  },
  findAllDistinct: async (tableName, keyName) => {
    const response = await ipcRenderer.invoke(
      "findAllDistinct",
      tableName,
      keyName
    );
    return response;
  },
  findByObject: async (tableName, object) => {
    const response = await ipcRenderer.invoke(
      "findByObject",
      tableName,
      object
    );
    return response;
  },
  readAllRows: async (tableName) => {
    try {
      const results = await ipcRenderer.invoke("readAllRows", tableName);
      return results;
    } catch (err) {
      console.error("Error in renderer:", err);
      throw err; // Re-throw error for handling in the component
    }
  },
  saveLayout: async (layout) => {
    const response = await ipcRenderer.invoke("saveLayout", layout);
    return response;
  },
});
