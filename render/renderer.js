
const runCommandButton = document.getElementById('runCommandButton');

runCommandButton.addEventListener('click', async () => {
  const command = 'npx nightwatch ./test/uniLogin.js --env=chrome --reuse-browse';
  await window.electronAPI.execCommand(command);
  
});

