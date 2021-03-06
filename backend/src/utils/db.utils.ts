export const toCamelCase = (rows: any) => {

  return rows.map((row: any) => {

    const replaced: Record<string, any> = {};

    for (const key in row) {
      const camelCase = key.replace(/([-_][a-z])/gi, ($1) =>
        $1.toUpperCase().replace('_', '')
      );

      replaced[camelCase] = row[key];
    }

    return replaced;
  });
}
