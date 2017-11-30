'use strict';

import PropTypes from 'prop-types';

export default (node, pageInfo) => PropTypes.shape({
  edges: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape(node)
    }),
  ).isRequired,
  ...(!pageInfo ? {} : {
    pageInfo: PropTypes.shape(pageInfo).isRequired
  })
});
