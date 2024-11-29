const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

if (process.env.NODE_ENV !== 'production') {
    try {
      require('electron-reloader')(module);
      require('electron-reload')(__dirname, {
        electron: require('electron')  // Changed this line
      });
    } catch {}
  }


function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 300,
    webPreferences: {
        nodeIntegration: false,  // Change to false
        contextIsolation: true,  // Change to true
        preload: path.join(__dirname, 'preload.js')
    },
    alwaysOnTop: true,
    frame: false,
    transparent: true,
    hasShadow: true
  });

  win.loadFile(path.join(__dirname, '../public/index.html'));
  win.setVisibleOnAllWorkspaces(true);
}

// Add these handlers here
ipcMain.on('close-window', () => app.quit());
ipcMain.on('minimize-window', () => BrowserWindow.getFocusedWindow().minimize());
ipcMain.on('maximize-window', () => {
  const win = BrowserWindow.getFocusedWindow();
  win.isMaximized() ? win.unmaximize() : win.maximize();
});

app.whenReady().then(() => {
    createWindow();
});

