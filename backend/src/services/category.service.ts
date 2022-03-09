import { ICategory } from '@models';
import { dbUtils } from '@utils';
import db from '@db';

export const findAll = async (): Promise<ICategory[]> => {
  const query = `
    SELECT id, name, icon FROM categories ORDER BY name ASC;
  `;

  const { rows } = await db.query(query);
  return dbUtils.toCamelCase(rows);
};
