/* eslint-env jest */

import React from 'react';
import { cleanup } from 'react-testing-library';
import { range } from 'lodash';

import { renderWithTheme } from '../../util/test-utils';
import AnswerGroup from './AnswerGroup';

function buildOptions(numberOfOptions, optionIndexToDisable) {
  return range(0, numberOfOptions).map(idx => ({
    optionText: `Option ${idx}`,
    optionValue: idx,
    disabled: idx === optionIndexToDisable
  }));
}

beforeEach(cleanup);
