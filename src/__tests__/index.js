'use strict';

import PropTypes from 'prop-types';

import RelayTypes from './../index';

describe('index', () => {
  it('# RelayTypes', () => {
    expect(
      RelayTypes({
        test: PropTypes.string.isRequired
      }).toString()
    ).toBe(
      PropTypes.shape({
        edges: PropTypes.arrayOf(
          PropTypes.shape({
            node: PropTypes.shape({
              test: PropTypes.string.isRequired
            }).isRequired
          })
        ).isRequired
      }).toString()
    );
  });
});
