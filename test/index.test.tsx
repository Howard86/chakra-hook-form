import React from 'react';

import { render } from '@testing-library/react';
import { Default as Thing } from '../stories/Thing.stories';

describe('Thing', () => {
  it('display default message', () => {
    const { getByText } = render(<Thing />);
    expect(getByText('the snozzberries taste like snozzberries')).toBeVisible();
  });

  it('display injected text', () => {
    const { getByText } = render(<Thing>Test</Thing>);

    expect(getByText('Test')).toBeVisible();
  });
});
