import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import StepList from './StepList';

describe('StepList component', () => {
  const contentList = ['Lorem ipsum', 'Dolor sit amet'];

  it('should render the passed title correctly', () => {
    const { getByText } = render(<StepList title="Hello" />);
    expect(getByText('Hello')).toBeInTheDocument();
  });

  it('should render each passed list element correctly', () => {
    const { getByText } = render(
      <StepList content="Hello World" list={contentList} />
    );
    expect(getByText('Lorem ipsum')).toBeInTheDocument();
    expect(getByText('Dolor sit amet')).toBeInTheDocument();
  });
});
