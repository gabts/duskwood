const fs = require('fs');
const build = require('./build');
const parseYaml = require('./parse-yaml');

// Ensure theme exists
if (!fs.existsSync('./theme')) {
  build();
}

let lastTimeMs;

function watch(e, filename) {
  const { mtime, mtimeMs } = fs.statSync('./src/' + filename);

  // Prevent parsing twince per event
  if (lastTimeMs === mtimeMs) {
    return;
  }

  lastTimeMs = mtimeMs;

  console.log(`📝  >> .vscode/settings.json @ ${mtime.toLocaleString()}`);

  const theme = parseYaml();

  const settings = {
    'workbench.colorTheme': 'Duskwood',
    'workbench.colorCustomizations': theme.colors
  };

  // Ensure .vscode directory exists
  if (!fs.existsSync('./.vscode')) {
    fs.mkdirSync('./.vscode');
  }

  // Write theme Json distribution file.
  fs.writeFileSync(
    './.vscode/settings.json',
    `${JSON.stringify(settings, null, 2)}\n`
  );
}

fs.watch('./src', watch);
