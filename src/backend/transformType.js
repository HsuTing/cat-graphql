'use strict';

export const getTypeConfig = (typeConfig, field) => {
  if(typeConfig instanceof Object) {
    field = {
      ...field,
      ...typeConfig
    };
  } else
    field.type = typeConfig;

  return field;
};

export default (data, typesConfig) => {
  Object.keys(typesConfig).forEach(typeName => {
    if(data[typeName]) {
      const {__parent__: parent, ...options} = data[typeName];
      const typeConfig = typesConfig[typeName];

      parent.forEach(({name, field}) => {
        data[name].fields[field] = getTypeConfig(
          typeof typeConfig === 'function' ? typeConfig(options) : typeConfig,
          data[name].fields[field]
        );
      });

      delete data[typeName];
    }
  });
};
