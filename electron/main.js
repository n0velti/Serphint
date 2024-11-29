const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process')
const fetch = require('node-fetch');

let pythonProcess
let win

if (process.env.NODE_ENV !== 'production') {
    try {
      require('electron-reloader')(module);
      require('electron-reload')(__dirname, {
        electron: require('electron')  // Changed this line
      });
    } catch {}
  }


function createWindow() {
  win = new BrowserWindow({
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

pythonProcess = spawn('python3', ['./python/app.py'])


pythonProcess.stdout.on('data', (data) => {
  console.log(`Python output: ${data}`);
});

pythonProcess.stderr.on('data', (data) => {
  console.log(`Python error: ${data}`);
});

ipcMain.on('add-number', async (event, number) => {
  console.log('Sending to Flask:', { number });
  
  try {
    const response = await fetch('http://localhost:3000/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ number: parseInt(number) }) // Ensure number is an integer
    });

    console.log('Response status:', response.status);

    // Check if the response is OK (status code 200)
    if (!response.ok) {
      console.error(`Flask responded with error: ${response.status} ${response.statusText}`);
      return;  // Exit early if there is an error
    }

    const text = await response.text();
    console.log('Raw response:', text);

    // Only parse the response if it's not empty
    if (text) {
      const data = JSON.parse(text);
      console.log('Parsed data:', data);
      win.webContents.send('result', data.result);
    } else {
      console.error('Received empty response from Flask');
    }

  } catch (error) {
    console.error('Full error:', error);
  }
});




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

