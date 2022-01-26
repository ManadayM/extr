/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {

  pgm.sql(`
    CREATE TABLE expenses (
      id SERIAL PRIMARY KEY,
      amount REAL CHECK(amount > 0),
      category_id INTEGER REFERENCES categories(id) ON DELETE RESTRICT,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

exports.down = pgm => {

  pgm.sql(`
    DROP TABLE expenses;
  `)
};
