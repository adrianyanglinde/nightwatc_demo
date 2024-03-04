const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('CtxBridge', {
  execNightwatch: (command) => ipcRenderer.invoke('exec-nightwatch', command)
})

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
  replaceText(`os`, process.platform);
})