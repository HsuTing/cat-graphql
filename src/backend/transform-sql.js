'use strict';

export default data => {
  const output = {};

  Object.keys(data).forEach(name => {
    output[name] = `CREATE TABLE ${name} (${
      Object.keys(data[name]).map(field => {
        const {type, allowNull, unique, primaryKey, foreign, check} = data[name][field];
        let query = type;

        if(!allowNull)
          query += ' NOT NULL';

        if(unique)
          query += ' UNIQUE';

        if(primaryKey)
          query += ' PRIMARY KEY';

        if(foreign)
          query += ` FOREIGN KEY REFERENCES ${foreign}(id)`;

        if(check)
          query += ` CHECK (${check.replace(/\[name\]/g, field)})`;

        return `${field} ${query}`;
      }).join(', ')
    })`;
  });

  return output;
};
