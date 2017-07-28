'use strict';

import PropTypes from 'prop-types';

export default node => PropTypes.shape({
  edges: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape(node).isRequired
    })
  ).isRequired
});
