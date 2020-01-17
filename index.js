#!/usr/bin/env node

const program =  require('commander');
const version = require('./package.json').version;
const sqlite3 = require('@journeyapps/sqlcipher').verbose();
const readline = require('readline');

program.version(version)
  .usage('sqlcipher-cli -d test.db -s secretkey')
  .requiredOption('-d, --database <database>', 'database file')
  .requiredOption('-s, --secret <secret>', 'secret key for sqlcipher')
  .parse(process.argv);

var lines = [];

const db = new sqlite3.Database(program.database);
db.run('PRAGMA key = "' +  program.secret + '"');

const r = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

db.on('error', (e) => {
  console.log('Cannot open database file');
  process.exit();
});

db.on('open', () => {
  console.clear();
  console.log('Database connected');
  r.prompt('>');
})

r.on('line', (line) => {
  line = line.trim();
  if (line === 'quit' && lines.length == 0) {
    console.log('Bye');
    r.close();
  }
  lines.push(line);
  if (line.endsWith(';')) {
    // join the lines with space character as a query string and execute it
    db.all(lines.join(' '), [], (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        console.log(rows);
      }
      lines = []
      r.prompt('>');
    })
  } else {
    r.prompt('>');
  }
})

r.on('close', () => {
  db.close();
  process.exit();
})