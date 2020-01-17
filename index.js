#!/usr/bin/env node

const program =  require('commander');
const version = require('./package.json').version;
const sqlite3 = require('@journeyapps/sqlcipher').verbose();
const path = require('path');
const readline = require('readline');

program.version(version)
  .usage('sqlcipher-cli -d yourdatabase.db -s yoursecretkey')
  .requiredOption('-d, --database <database>', 'database file')
  .requiredOption('-s, --secret <secret>', 'secret key of sqlcipher')
  .parse(process.argv);


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

r.on('line', (input) => {
  input = input.trim();
  if (input === 'quit') {
    r.close();
  }
  db.all(input, [], (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      console.log(rows);
    }
    r.prompt('>');
  })
})

r.on('close', () => {
  db.close();
  process.exit();
})