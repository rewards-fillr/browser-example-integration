const {app, BrowserWindow} = require('electron')
const path = require('path');

let mainWindow

function createWindow () {
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
  })

  mainWindow.loadURL('https://www.fillr.com/demo')

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
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})
