import { hash } from 'bcrypt';

import { IBaseUser, IUser } from '@models';
import { dbUtils } from '@utils';
import db from '@db';

export const findByEmail = async (email: string): Promise<IUser | null> => {
  const query = 'SELECT * FROM users WHERE email = $1;';

  try {
    const { rows } = await db.query(query, [email]);
    if (rows.length) {
      return dbUtils.toCamelCase(rows)[0];
    }

    return null;
  }
  catch (err) {
    return null;
  }
}

export const create = async (newUser: IBaseUser): Promise<IUser> => {
  const { email, password } = newUser;
  const user = await findByEmail(email);

  console.log('user: ', user);

  if (user === null) {
    const hashedPassword = await hash(password, 10);
    console.log(hashedPassword);
    const query = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *;';
    const { rows } = await db.query(query, [email, hashedPassword]);
    console.log('rows: ', rows);

    return dbUtils.toCamelCase(rows)[0];
  }
  else {
    // TODO: handle this case
    throw new Error('User already exists.');
  }
};
