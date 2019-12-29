const fs = require('fs');
const parseYaml = require('./parse-yaml');

let lastTimeMs;

function watch(e, filename) {
  const { mtime, mtimeMs } = fs.statSync('./src/' + filename);

  // Prevent parsing twince per event
  if (lastTimeMs === mtimeMs) {
    return;
  }

  lastTimeMs = mtimeMs;

  console.log(
    `📝  writing >> .vscode/settings.json @ ${mtime.toLocaleString()}`
  );

  const theme = parseYaml();

  const settings = {
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
