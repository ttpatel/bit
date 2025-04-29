const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  // Create a new window
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // Allows Node.js functionality in renderer
    },
  });

  // Load the React app
  win.loadURL("http://localhost:3000"); // React dev server (we'll run this later)
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
