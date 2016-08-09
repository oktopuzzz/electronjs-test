var electron = require('electron');
var path = require('path');

var app = electron.app,
    BrowserWindow = electron.BrowserWindow,
    dialog = electron.dialog;

require('electron-debug')({enabled: true});

var mainWindow = null;


console.log(process.versions.node);
console.log(process.versions.chrome);
console.log(process.versions.electron);


function exit() {
    //if (app.listeners('window-all-closed').length == 1) { app.quit(); }
    app.quit();
}


app.on('window-all-closed', exit);
app.on('ready', makeWindow);

process.on('exit', function(code) {
    process.stdout.write('Exited ' + (undefined === code ? 'normally' : 'with code ' + code) + '\n');
});

process.on('uncaughtException', error => {
  if (error.stack) {
    console.error('Gis-Oshi error:', error.stack);
  }
  dialog.showErrorBox('Ошибка', error.name + ': ' + error.message);

  if (!mainWindow) {
    process.exit(1);
  }
});

function makeWindow() {
  process.stdout.write('creating main window...\n');

  var windowOpts = {
    show: false,
    width: 1000,
    height: 800,
    title: 'Electron'
  };


  mainWindow = new BrowserWindow(windowOpts);


  var entryBasePath = ('file://' + path.resolve(path.join(__dirname, '..', 'renderer', 'index.html')));
  mainWindow.loadURL(entryBasePath);

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
    /*if (process.env.NODE_ENV === 'development') {
      mainWindow.show();
    }
    else {
      mainWindow.maximize();
    }*/
    
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.openDevTools();
  }

  mainWindow.setMenu(null);
}