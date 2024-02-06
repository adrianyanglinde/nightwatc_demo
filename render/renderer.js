

const runCommandButton = document.getElementById('runCommandButton');

runCommandButton.addEventListener('click', async () => {
  
  
  const command2 = 'npx nightwatch --help';
  window.electronAPI.execCommand("");
  
});


// const testButton = document.getElementById('testButton');

// testButton.addEventListener('click', async () => {
//   const command = 'node -v';
//   const { stdout, stderr } = await window.electronAPI.execCommand(command);
//   console.log('stdout:', stdout);
//   console.log('stderr:', stderr);
// });

