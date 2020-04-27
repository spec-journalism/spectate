#!/usr/bin/env node

const fs = require('fs').promises;

// Write to a Spectate project's config (as keys stored inside package.json in
// the "spectate" key)
async function init() {
  if (process.argv.length < 3) {
    console.log('Must run config-project.js with at least one setting.');
    return;
  }

  const packageJSON = JSON.parse(await fs.readFile('package.json'));
  const setting = process.argv[2];
  switch (setting) {
    case '--is-embed':
      packageJSON.spectate.IS_EMBED = true;
      break;
    default:
      console.log('Setting', setting, 'does not exist.');
      return;
  }

  await fs.writeFile('package.json', JSON.stringify(packageJSON, null, 2));
}

init().catch(console.error);