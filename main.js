const { app, BrowserWindow,BrowserView, ipcMain } = require('electron/main')
const path = require('node:path')
const util = require('util');
const exec = util.promisify(require('child_process').exec);

try {
  require('electron-reloader')(module);
} catch { }


// Create the browser window.
const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 600,
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
  view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
  view.webContents.loadFile('tests_output\nightwatch-html-report\index.html')
}

const handleExecCommand = async (event, command) => {
  try {
    const { stdout, stderr } = await exec(command);
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
  } catch (e) {
    console.error(e);
  }
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

