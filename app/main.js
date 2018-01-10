const {app, BrowserWindow, dialog, ipcMain, ipcRenderer} = require('electron');
const path = require('path');
const url = require('url');

let win;

function createWindow () {
  
	// 创建浏览器窗口。
  win = new BrowserWindow({
    width: 800, 
    height: 600, 
    frame: false, 
    resizable: false,
    show: true,
    center: true,
    movable: true,
    fullscreen: false,
    icon: null,
    transparent: false,
    titleBarStyle: 'default',
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      preload: path.join(__dirname, 'expose-window-apis.js'),   //在渲染进程加载之前加载
    }
  });

  // const childWin = new BrowserWindow({parent: win, modal: true, show: false});
  // childWin.loadURL('https://github.com')
  // childWin.once('ready-to-show', () => {
  //   childWin.show()
  // })
  
  // 然后加载应用的 index.html。
  // win.loadURL(url.format({
  //   pathname: path.join(__dirname, 'index.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }));
  //console.log(process.env);
  win.loadURL('http://localhost:8008/');

	// 打开开发者工具。
  win.webContents.openDevTools();

  //注册来自渲染进程的消息监听
  //同步
  ipcMain.on('asynchronous-message', (event, arg) => {
    console.log(arg)  // prints "ping"
    app.quit()
    event.sender.send('asynchronous-reply', 'pong')
  });

  //异步
  ipcMain.on('synchronous-message', (event, arg) => {
    console.log(arg)  // prints "ping"
    event.returnValue = 'pong'
  });
          
  // 当 window 被关闭，这个事件会被触发。
  win.on('closed', () => {
    win = null;
  });

  //渲染进程第一次完成绘制时，会发出 ready-to-show 事件。
  win.once('ready-to-show', () => {
    win.show();
  });
}

app.on('ready', createWindow);

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
	if (win === null) {
    createWindow();
  }
})
