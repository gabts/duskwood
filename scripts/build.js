const fs = require('fs');
const parseYaml = require('./parse-yaml');

const theme = parseYaml();

// Ensure theme directory exists
if (!fs.existsSync('./theme')) {
  fs.mkdirSync('./theme');
}

// Write theme Json distribution file.
fs.writeFileSync(
  './theme/duskwood.json',
  `${JSON.stringify(theme, null, 2)}\n`
);
