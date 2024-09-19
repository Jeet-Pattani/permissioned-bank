const { exec } = require('child_process');

// Function to run a command and log the output
function runCommand(command, name) {
  console.log(`Starting ${name}...`);
  const process = exec(command);

  process.stdout.on('data', (data) => {
    console.log(`[${name}] ${data}`);
  });

  process.stderr.on('data', (data) => {
    console.error(`[${name} Error] ${data}`);
  });

  process.on('close', (code) => {
    console.log(`${name} process exited with code ${code}`);
  });
}

// Commands to run
const bankManagerCommand = 'node BankManager-module/interact-endpoints';
const adminModuleCommand = 'node admin-module/server';

// Run both commands
runCommand(bankManagerCommand, 'BankManager Module');
runCommand(adminModuleCommand, 'Admin Module');
