import React from 'react';
import { Helmet } from 'react-helmet';

export default function Meta({ title }) {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}
