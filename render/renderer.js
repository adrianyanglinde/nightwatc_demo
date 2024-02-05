
const path = require(path);
const runCommandButton = document.getElementById('runCommandButton');

runCommandButton.addEventListener('click', async () => {
  const path1 = path.join(__dirname, './test/uniLogin.js');
  const command = `npx nightwatch ${path1} --env=firefox,chrome --reuse-browse`;
  const command2 = 'npx nightwatch --help';
  window.electronAPI.execCommand(command);
  
});


// const testButton = document.getElementById('testButton');

// testButton.addEventListener('click', async () => {
//   const command = 'node -v';
//   const { stdout, stderr } = await window.electronAPI.execCommand(command);
//   console.log('stdout:', stdout);
//   console.log('stderr:', stderr);
// });

