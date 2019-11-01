import React from 'react';

import { ContentLayout } from './Layout';

const BaseLayout = (data) => (
  <ContentLayout useInfo={data || {}} />
);

export default BaseLayout;
