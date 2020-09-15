import React from 'react';
import PropTypes from 'prop-types';

import { Mutation } from '@/components/Mutation';

export const ArticleMutations = ({ text, variables, ...mutationsProps }) => (
  <Mutation {...mutationsProps}>
    {({ mutation }) => (
      <a href="" onClick={() => mutation({ variables })}>
        {text}
      </a>
    )}
  </Mutation>
);

ArticleMutations.propTypes = {
  text: PropTypes.string.isRequired,
  variables: PropTypes.arrayOf(PropTypes.string).isRequired
};
