import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Checkbox } from './checkbox';

describe('Checkbox', () => {
  it('renders correctly with label', () => {
    render(<Checkbox label="Test checkbox" />);
    expect(screen.getByLabelText('Test checkbox')).toBeInTheDocument();
  });

  it('handles checked state', async () => {
    const handleChange = jest.fn();
    render(<Checkbox label="Test checkbox" onChange={handleChange} />);
    
    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);
    
    expect(handleChange).toHaveBeenCalled();
    expect(checkbox).toBeChecked();
  });

  it('can be disabled', () => {
    render(<Checkbox label="Test checkbox" disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('displays error state correctly', () => {
    render(
      <Checkbox 
        label="Test checkbox" 
        error 
        helperText="Error message"
      />
    );
    
    const errorMessage = screen.getByText('Error message');
    expect(errorMessage).toHaveClass('text-red-500');
  });

  it('handles indeterminate state', () => {
    render(<Checkbox label="Test checkbox" indeterminate />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);
  });

  it('applies different sizes correctly', () => {
    const { rerender } = render(<Checkbox label="Test checkbox" size="sm" />);
    let checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass('h-4', 'w-4');

    rerender(<Checkbox label="Test checkbox" size="md" />);
    checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass('h-5', 'w-5');

    rerender(<Checkbox label="Test checkbox" size="lg" />);
    checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass('h-6', 'w-6');
  });

  it('generates unique ids when not provided', () => {
    render(<Checkbox label="Test checkbox" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox.id).toMatch(/checkbox-[a-z0-9]+/);
  });

  it('uses provided id when available', () => {
    render(<Checkbox label="Test checkbox" id="custom-id" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox.id).toBe('custom-id');
  });

  it('associates helper text with input using aria-describedby', () => {
    render(<Checkbox label="Test checkbox" helperText="Helper text" />);
    const checkbox = screen.getByRole('checkbox');
    const helperText = screen.getByText('Helper text');
    expect(checkbox).toHaveAttribute('aria-describedby', helperText.id);
  });
}); 