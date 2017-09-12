#!/usr/bin/env node
'use strict';

import process from 'process';

import core from './core/buildGraphql';

core(process.argv)
  .catch(err => {
    throw new Error(err);
  });
