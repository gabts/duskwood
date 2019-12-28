const fs = require('fs');
const parseYaml = require('./parse-yaml');

let lastEventMS;

function watch(e, filename) {
  const eventMS = fs.statSync('./src/' + filename).mtime.getTime();

  // Prevent parsing twince per event
  if (lastEventMS === eventMS) {
    return;
  }

  lastEventMS = eventMS;

  console.log('📝  writing .vscode/settings.json');

  const theme = parseYaml();

  const settings = {
    'workbench.colorTheme': 'Duskwood',
    'workbench.colorCustomizations': theme.colors
  };

  // Write theme Json distribution file.
  fs.writeFileSync(
    './.vscode/settings.json',
    `${JSON.stringify(settings, null, 2)}\n`
  );
}

fs.watch('./src', watch);
