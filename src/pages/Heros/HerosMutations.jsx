import React from 'react';

import { MutationComponent } from '@/components/Mutation';

export const HerosMutations = ({ text, variables, ...mutationsProps }) => (
  <MutationComponent {...mutationsProps}>
    {(mutation) => (
      <a href="" onClick={() => mutation({ variables })}>
        {text}
      </a>
    )}
  </MutationComponent>
);
