const {app, BrowserWindow} = require('electron');
const path = require('path');

let mainWindow;

app.on('window-all-closed', function() {
  app.quit();
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      nodeIntegrationInSubFrames: true,
      preload: path.join(__dirname, 'fillr.js'),
      contextIsolation: false,
      webSecurity: false,
      allowRunningInsecureContent: true,
    }
  });
  mainWindow.loadURL('file://' + __dirname + '/main.html');
  mainWindow.openDevTools();
  mainWindow.on('closed', function () {
    mainWindow = null
  })
  mainWindow.webContents.session.webRequest.onHeadersReceived(function(details, callback) {
    delete details.responseHeaders['content-security-policy']
    const response = {
      cancel: false,
      responseHeaders: details.responseHeaders
    }
    callback(response)
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})
