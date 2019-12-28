const fs = require('fs');
const parseYaml = require('./parse-yaml');

const theme = parseYaml();

// Write theme Json distribution file.
fs.writeFileSync(
  './theme/duskwood.json',
  `${JSON.stringify(theme, null, 2)}\n`
);
