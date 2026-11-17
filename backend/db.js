const fs = require('fs'); /** serve para ler os arquivos no pc */
const path = require('path'); /** ajuda a montar o caminho */
const Database = require('better-sqlite3');

const db = new Database(path.join(__dirname, 'onchurch.db'));
db.exec(fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8'));

module.exports = db;