'use strict';

export default (
  data = {},
  excludesFields = []
) => {
  Object.keys(data).forEach(name => {
    const {fields, type: tableType} = data[name];

    if(tableType === 'enum') {
      data[name].values = fields.split(/ /)
        .filter(d => d !== '');

      delete data[name].fields;
      delete data[name].type;
      return;
    }

    data[name].fields = fields.replace(/\(.*\)/g, '') // remove args
      .replace(/: /g, ':')
      .split(/ /)
      .reduce((fieldsObj, fieldStr) => {
        const [fieldName, fieldValue] = fieldStr.split(/:/g);

        if(fieldName && !['clientMutationId'].includes(fieldName)) {
          const value = fieldValue || 'enum';
          const type = value.replace(/!|\[|\]/g, '');
          const obj = {
            name,
            field: fieldName
          };

          if(excludesFields.includes(type))
            return fieldsObj;

          if(data[type])
            data[type]['__parent__'].push(obj);
          else if(!excludesFields.includes(type))
            data[type] = {__parent__: [obj]};

          fieldsObj[fieldName] = {
            notNull: (/!/g).test(value),
            type
          };
        }

        return fieldsObj;
      }, {});

    delete data[name].type;
  });
};
