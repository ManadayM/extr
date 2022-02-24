/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
    ALTER TABLE EXPENSES
    ADD COLUMN
      details VARCHAR(150);
  `)
};

exports.down = pgm => {

  pgm.sql(`
    ALTER TABLE EXPENSES
    DROP COLUMN details;
  `)
};
