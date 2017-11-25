'use strict';

import PropTypes from 'prop-types';

import relayTypes from './../index';

describe('index', () => {
  it('# RelayTypes', () => {
    expect(
      relayTypes({
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

  it('# RelayTypes add hasNextPage', () => {
    expect(
      relayTypes({
        test: PropTypes.string.isRequired
      }, {
        hasNextPage: PropTypes.bool.isRequired
      }).toString()
    ).toBe(
      PropTypes.shape({
        edges: PropTypes.arrayOf(
          PropTypes.shape({
            node: PropTypes.shape({
              test: PropTypes.string.isRequired
            }).isRequired
          })
        ).isRequired,
        pageInfo: PropTypes.shape({
          hasNextPage: PropTypes.bool.isRequired
        }).isRequired
      }).toString()
    );
  });
});
