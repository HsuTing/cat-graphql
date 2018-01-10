// @flow
'use strict';

import PropTypes from 'prop-types';

export default (
  node: {[string]: mixed},
  pageInfo: boolean
): PropTypes.shape => PropTypes.shape({
  edges: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape(node)
    }),
  ).isRequired,
  ...(!pageInfo ? {} : {
    pageInfo: PropTypes.shape(pageInfo).isRequired
  })
});
