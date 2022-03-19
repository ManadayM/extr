const pg = require('pg');
const config = require('config');

const dbConfig = config.get('db');
console.log(dbConfig);


const pool = new pg.Pool({
  database: dbConfig.name,
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
});

pool.query(`
  INSERT INTO categories (name)
    VALUES
    ('Restaurant'),
    ('Bills'),
    ('Transportation'),
    ('Maintenance'),
    ('Home'),
    ('Grocery'),
    ('Vehicle'),
    ('Entertainment'),
    ('Shopping'),
    ('Clothing'),
    ('Insurance'),
    ('Tax'),
    ('Telephone'),
    ('Health'),
    ('Sport'),
    ('Baby'),
    ('Pet'),
    ('Beauty'),
    ('Electronics'),
    ('Snacks'),
    ('Fruits'),
    ('Vegetables'),
    ('Travel'),
    ('Education'),
    ('Book'),
    ('Stationery'),
    ('Office'),
    ('Gardening'),
    ('Fuel'),
    ('Gift'),
    ('Social'),
    ('Donation'),
    ('Cigarette'),
    ('Drinks'),
    ('Others');
`)
  .then(() => {
    console.log('Insert complete');
    pool.end();
  })
  .catch((err) => console.error(err.message));
