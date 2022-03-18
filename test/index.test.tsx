import React from 'react';
import * as ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import { Default as Thing } from '../stories/Thing.stories';

describe('Thing', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Thing />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('display default message', () => {
    const { getByText } = render(<Thing />);
    expect(getByText('the snozzberries taste like snozzberries')).toBeTruthy();
  });

  it('display injected text', () => {
    const { getByText } = render(<Thing>Test</Thing>);

    expect(expect(getByText('Test'))).toBeTruthy();
  });
});
