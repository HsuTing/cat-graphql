'use strict';

const should = require('should');
const PropTypes = require('prop-types');

const index = require('./../lib/index');

describe('index', () => {
  it('# default', () => {
    (index.default({
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
