'use strict';

export default data => {
  const output = {};

  Object.keys(data).forEach(name => {
    Object.keys(data[name]).forEach(field => {
      const {type, notNull, unique, primary, foreign, check} = data[name][field];

      if(!output[name])
        output[name] = {};

      output[name][field] = type;

      if(notNull)
        output[name][field] += ' NOT NULL';

      if(unique)
        output[name][field] += ' UNIQUE';

      if(primary)
        output[name][field] += ' PRIMARY KEY';

      if(foreign)
        output[name][field] += ` FOREIGN KEY REFERENCES ${foreign}(id)`;

      if(check)
        output[name][field] += ` CHECK (${check.replace(/\[name\]/g, field)})`;
    });
  });

  return output;
};
