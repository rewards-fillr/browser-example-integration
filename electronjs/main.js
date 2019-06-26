const {app, BrowserWindow} = require('electron')
const path = require('path');

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1500,
    height: 1000,
    webPreferences: {
      // We highly recommend the integration with `BrowserView` instead of `webview` because of the following issues
      // https://github.com/electron/electron/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+webview
      // `BrowserView`is meant to be an alternative to the webview tag
      webviewTag: true,
      nodeIntegration: false,
      nodeIntegrationInSubFrames: true,
      // This is only for using `BrowserWindow` instead of webview
      // preload: path.join(__dirname, 'fillr.js'),
      contextIsolation: false,
      webSecurity: false,
      allowRunningInsecureContent: true,
    }
  })
  
  // mainWindow.loadURL('https://www.google.com')
  mainWindow.loadURL(`file://${__dirname}/index.html`)

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
