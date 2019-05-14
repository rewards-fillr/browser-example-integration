const {app, BrowserWindow, session} = require('electron')
const path = require('path');
const fs = require('fs');

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  })

  mainWindow.loadURL('https://www.fillr.com/demo')

  mainWindow.on('closed', function () {
    mainWindow = null
  })

  mainWindow.webContents.once('did-navigate', () => {
    const widgetString = fs.readFileSync(path.join(__dirname, 'fillr.js'), "utf8");
    mainWindow.webContents.executeJavaScript(widgetString)
  });
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})
