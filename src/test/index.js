'use strict';

import should from 'should'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

import RelayTypes from './../index';

describe('index', () => {
  it('# RelayTypes', () => {
    (RelayTypes({
      test: PropTypes.string.isRequired
    })).should.be.eql(
      PropTypes.shape({
        edges: PropTypes.arrayOf(
          PropTypes.shape({
            node: PropTypes.shape({
              test: PropTypes.string.isRequired
            }).isRequired
          })
        ).isRequired
      })
    );
  });
});
