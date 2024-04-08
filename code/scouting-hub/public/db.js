const sqlite3 = require("sqlite3").verbose();
const schemas = require("./dbSchema");

function generateRandomNumber() {
  const chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  let result = "";
  for (let i = 0; i < 16; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }

  return result;
}

class Database {
  constructor(dbFile) {
    this.db = new sqlite3.Database(dbFile, (err) => {
      if (err) {
        console.error("Error connecting to database:", err.message);
      } else {
        console.log("Connected to database");
        this.createTables();
      }
    });
  }

  createTables() {
    schemas.forEach((schema) => {
      const createTableQuery = `CREATE TABLE IF NOT EXISTS ${schema.tableName} (`;
      const columns = schema.columns.map((col) => `${col.name} ${col.type}`);
      const query = `${createTableQuery}${columns.join(",")}${
        schema.constraints
      })`;
      this.db.run(query, (err) => {
        if (err) {
          console.error("Error creating table:", schema.tableName, err.message);
        } else {
          console.log(`Table created: ${schema.tableName}`);
        }
      });
    });
  }

  upsertLayout(layout, callback) {
    const keys = Object.keys(layout);
    const values = Object.values(layout);
    const layoutID = generateRandomNumber();
    values[0] = layoutID;
    const names = keys.join(",");
    const placeholders = keys.map((_) => "?").join(",");
    const insertQuery = `INSERT OR REPLACE INTO layouts (${names}) VALUES (${placeholders}) RETURNING id`;
    this.db.run(insertQuery, values, function (err) {
      if (err) {
        callback(err, -1);
      }
      callback(undefined, layoutID);
    });
  }

  insertMatch(match, callback) {
    const keys = Object.keys(match);
    const names = keys.join(",");
    const placeholders = keys.map((_) => "?").join(",");
    const insertQuery = `INSERT INTO matches (${names}) VALUES (${placeholders})`;
    this.db.run(insertQuery, Object.values(match), callback);
  }

  upsertOne(tableName, element, callback) {
    const keys = Object.keys(element);
    const names = keys.join(",");
    const placeholders = keys.map((_) => "?").join(",");
    const insertQuery = `INSERT OR REPLACE INTO ${tableName} (${names}) VALUES (${placeholders}) RETURNING id`;
    this.db.run(insertQuery, Object.values(element), function (err) {
      if (err) {
        callback(err, -1);
      }
      callback(undefined, this.lastID);
    });
  }

  async findAllDistinct(tableName, keyName, callback) {
    const results = await new Promise((resolve, reject) => {
      this.db.all(
        `SELECT DISTINCT ${keyName} FROM ${tableName}`,
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows.map((row) => row[keyName]));
          }
        }
      );
    });
    callback(undefined, results);
  }

  async findByObject(tableName, object, callback) {
    const keys = Object.keys(object);
    // const placeholders = keys.map(() => "?");
    const query = `SELECT * FROM ${tableName} WHERE ${keys.join(
      " = ? AND "
    )} = ?`;
    const values = keys.map((key) => object[key]);
    const results = await new Promise((resolve, reject) => {
      this.db.get(query, values, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
    callback(undefined, results);
  }

  readAllRows(tableName, callback) {
    const query = `SELECT * FROM ${tableName}`;
    this.db.all(query, callback);
  }
}

module.exports = new Database("database.sqlite3");
