

const runCommandButton = document.getElementById('runCommandButton');

 
runCommandButton.addEventListener('click', async () => {
 // window.electronAPI.execCommand("npm run nightwatch -- ./nightwatch/webgame/uniLogin.js ./nightwatch/webgame/uniReg.js --env=chrome,firefox --reuse-browse");
  window.electronAPI.execCommand(" --env=chrome --reuse-browse");
});


