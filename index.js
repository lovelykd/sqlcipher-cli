#!/usr/bin/env node

const program =  require('commander');
const version = require('./package.json').version;

program.version(version)
  .usage('sqlcipher-cli -d yourdatabase.db -s yoursecretkey')
  .requiredOption('-d, --database <database>', 'database file')
  .requiredOption('-s, --secret <secret>', 'secret key of sqlcipher')
  .parse(process.argv);
