const { app, BrowserWindow, BrowserView, ipcMain } = require('electron/main')
const log = require('electron-log/main')
const path = require('node:path')
const { exec ,fork} = require('child_process');
const _ = require('lodash');

try {
  require('electron-reloader')(module);
} catch { }

app.setAppLogsPath();

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
  // const view = new BrowserView()
  // win.setBrowserView(view)
  // view.setBounds({ x: 0, y: 300, width: 1600, height: 800 })
  // view.webContents.loadFile(path.join(__dirname, './tests_output/nightwatch-html-report/index.html'))
}


const testPathConfig = {
  login : path.join(app.getAppPath(),'./nightwatch/webgame/uniLogin.js'),
  reg : path.join(app.getAppPath(),'./nightwatch/webgame/uniReg.js')
};

const handleExecNightwatch = (event, params) => {
  const  { 
    games , 
    tests = _.keys(testPathConfig),
    browsers = ['chrome','firefox','edge'].splice(0,1) 
  } = params;
  const modulePath = path.join(app.getAppPath(),'./node_modules/nightwatch/bin/runner.js');
  const testPaths = _.values(_.pick(testPathConfig, tests));
  const options = {
    cwd: path.join(app.getAppPath())
  };
  try {
    const child = fork(modulePath,[...testPaths,`--env=${browsers.join()}`,"--reuse-browse"],options);
    child.on('message', message => {
      console.log('父进程接收到消息:', message);
  });
  } catch (error) {
    log.error(`fork error: ${error}`);
  }
  // const cmd = `node ${modulePath} ${filePath.login} --env=firefox --reuse-browse`;
  // exec(cmd,options,(error, stdout, stderr) => {
  //   if (error) {
  //     log.error(`exec error: ${error}`);
  //     return;
  //   }
  //   log.debug(`stdout: ${stdout}`);
  //   log.debug(`stderr: ${stderr}`);
  // });
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  
  createWindow()

  ipcMain.handle('exec-nightwatch', handleExecNightwatch)
  
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

