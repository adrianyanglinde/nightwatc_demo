const { app, BrowserWindow, BrowserView, ipcMain } = require('electron/main')
const log = require('electron-log/main')
const path = require('node:path')
const util = require('util');
// const exec = util.promisify(require('child_process').exec);
const { exec } = require('child_process');

try {
  require('electron-reloader')(module);
} catch { }


// Create the browser window.
const createWindow = () => {
  const win = new BrowserWindow({
    width: 1600,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, './render/preload.js'),
      // nodeIntegration: true,
      // contextIsolation: false
    }
  })

  win.loadFile('index.html')
  win.webContents.openDevTools()

  const view = new BrowserView()
  win.setBrowserView(view)
  view.setBounds({ x: 0, y: 300, width: 1600, height: 800 })
  view.webContents.loadFile('tests_output/nightwatch-html-report/index.html')
}

const handleExecCommand = (event, command) => {
  log.debug('handleExecCommand');
  const path2 = path.join(app.getAppPath(), './nightwatch/webgame/uniLogin.js');
  const cmd = `npx nightwatch ${path2} --env=chrome --reuse-browse`;
  const cmd2 = `npm run nightwatch`;
  exec(cmd2, (error, stdout, stderr) => {
    if (error) {
      log.error(`exec error: ${error}`);
      return;
    }
    log.debug(`stdout: ${stdout}`);
    log.debug(`stderr: ${stderr}`);
  });
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  ipcMain.handle('exec-command', handleExecCommand)

  createWindow()

  app.on('activate', () => {
    // 在 macOS 系统内, 如果没有已开启的应用窗口
    // 点击托盘图标时通常会重新创建一个新窗口
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态, 
// 直到用户使用 Cmd + Q 明确退出
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

