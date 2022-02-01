import { hash } from "bcrypt";
import { BaseUser, User } from "../models";
import { dbUtils } from "../utils";
import db from "../db";

export const findByEmail = async (email: string) => {
  const query = 'SELECT * FROM users WHERE email = $1;';

  try {
    const { rows } = await db.query(query, [email]);
    console.log(`rows: ${rows.length}`);
    if (rows.length) {
      return dbUtils.toCamelCase(rows)[0];
    }

    return null;
  }
  catch (err) {
    console.log('Error: ', err);
    return null;
  }
}

export const create = async (newUser: BaseUser): Promise<User> => {
  const { email, password } = newUser;

  debugger

  const user = await findByEmail(email);

  if (user === null) {
    const hashedPassword = await hash(password, 10);
    const query = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *;';
    const { rows } = await db.query(query, [email, hashedPassword]);

    return dbUtils.toCamelCase(rows)[0];
  }
  else {
    // TODO: handle this case
    throw new Error('User already exists.');
  }
};
