import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Form, FormField } from './form';
import { Input } from '../../atoms/input';
import { Button } from '../../atoms/button';

describe('Form', () => {
  it('renders children correctly', () => {
    render(
      <Form onSubmit={() => {}}>
        <FormField label="Name">
          <Input placeholder="Enter name" />
        </FormField>
      </Form>
    );

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument();
  });

  it('handles form submission', () => {
    const handleSubmit = jest.fn();
    render(
      <Form onSubmit={handleSubmit}>
        <FormField label="Name">
          <Input name="username" defaultValue="John Doe" />
        </FormField>
        <Button type="submit">Submit</Button>
      </Form>
    );

    fireEvent.click(screen.getByText('Submit'));
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('applies different sizes correctly', () => {
    const { rerender } = render(
      <Form onSubmit={() => {}} size="sm">
        <div data-testid="content">Content</div>
      </Form>
    );

    expect(screen.getByTestId('content').parentElement).toHaveClass('space-y-3');

    rerender(
      <Form onSubmit={() => {}} size="lg">
        <div data-testid="content">Content</div>
      </Form>
    );

    expect(screen.getByTestId('content').parentElement).toHaveClass('space-y-5');
  });

  it('applies custom className', () => {
    render(
      <Form onSubmit={() => {}} className="custom-class">
        <div>Content</div>
      </Form>
    );

    expect(screen.getByRole('form')).toHaveClass('custom-class');
  });
});

describe('FormField', () => {
  it('renders label and required indicator', () => {
    render(
      <FormField label="Username" required>
        <Input />
      </FormField>
    );

    const label = screen.getByText('Username');
    expect(label).toBeInTheDocument();
    expect(label.parentElement).toContainElement(screen.getByText('*'));
  });

  it('displays error message', () => {
    render(
      <FormField label="Email" error="Invalid email address">
        <Input />
      </FormField>
    );

    expect(screen.getByText('Invalid email address')).toBeInTheDocument();
    expect(screen.getByText('Invalid email address')).toHaveClass('text-red-500');
  });

  it('displays help text when no error', () => {
    render(
      <FormField label="Password" helpText="Must be at least 8 characters">
        <Input type="password" />
      </FormField>
    );

    expect(screen.getByText('Must be at least 8 characters')).toBeInTheDocument();
    expect(screen.getByText('Must be at least 8 characters')).toHaveClass('text-gray-500');
  });

  it('prioritizes error over help text', () => {
    render(
      <FormField
        label="Password"
        error="Password is required"
        helpText="Must be at least 8 characters"
      >
        <Input type="password" />
      </FormField>
    );

    expect(screen.getByText('Password is required')).toBeInTheDocument();
    expect(screen.queryByText('Must be at least 8 characters')).not.toBeInTheDocument();
  });

  it('applies error styles to label', () => {
    render(
      <FormField label="Email" error="Invalid email">
        <Input />
      </FormField>
    );

    expect(screen.getByText('Email')).toHaveClass('text-red-500');
  });

  it('sets up proper aria attributes', () => {
    render(
      <FormField label="Username" helpText="Choose a unique username">
        <Input />
      </FormField>
    );

    const input = screen.getByLabelText('Username');
    const helpText = screen.getByText('Choose a unique username');
    expect(input).toHaveAttribute('aria-describedby', helpText.id);
  });

  // New validation tests
  describe('validation', () => {
    it('validates required fields', async () => {
      const handleError = jest.fn();
      render(
        <FormField
          label="Username"
          rules={{
            required: { value: true, message: 'Username is required' }
          }}
          onError={handleError}
        >
          <Input />
        </FormField>
      );

      const input = screen.getByLabelText('Username');
      await userEvent.type(input, 'a');
      await userEvent.clear(input);

      expect(handleError).toHaveBeenLastCalledWith('Username is required');
    });

    it('validates email format', async () => {
      const handleError = jest.fn();
      render(
        <FormField
          label="Email"
          rules={{
            email: { value: true, message: 'Invalid email format' }
          }}
          onError={handleError}
        >
          <Input type="email" />
        </FormField>
      );

      const input = screen.getByLabelText('Email');
      await userEvent.type(input, 'invalid-email');

      expect(handleError).toHaveBeenLastCalledWith('Invalid email format');

      await userEvent.clear(input);
      await userEvent.type(input, 'valid@email.com');

      expect(handleError).toHaveBeenLastCalledWith(null);
    });

    it('validates minimum length', async () => {
      const handleError = jest.fn();
      render(
        <FormField
          label="Password"
          rules={{
            minLength: { value: 8, message: 'Password must be at least 8 characters' }
          }}
          onError={handleError}
        >
          <Input type="password" />
        </FormField>
      );

      const input = screen.getByLabelText('Password');
      await userEvent.type(input, 'short');

      expect(handleError).toHaveBeenLastCalledWith('Password must be at least 8 characters');

      await userEvent.clear(input);
      await userEvent.type(input, 'longenoughpassword');

      expect(handleError).toHaveBeenLastCalledWith(null);
    });

    it('validates maximum length', async () => {
      const handleError = jest.fn();
      render(
        <FormField
          label="Username"
          rules={{
            maxLength: { value: 10, message: 'Username must be at most 10 characters' }
          }}
          onError={handleError}
        >
          <Input />
        </FormField>
      );

      const input = screen.getByLabelText('Username');
      await userEvent.type(input, 'verylongusername');

      expect(handleError).toHaveBeenLastCalledWith('Username must be at most 10 characters');

      await userEvent.clear(input);
      await userEvent.type(input, 'shortname');

      expect(handleError).toHaveBeenLastCalledWith(null);
    });

    it('validates using custom rules', async () => {
      const handleError = jest.fn();
      render(
        <FormField
          label="Password"
          rules={{
            custom: [{
              validate: (value) => /[A-Z]/.test(value),
              message: 'Password must contain at least one uppercase letter'
            }]
          }}
          onError={handleError}
        >
          <Input type="password" />
        </FormField>
      );

      const input = screen.getByLabelText('Password');
      await userEvent.type(input, 'lowercase');

      expect(handleError).toHaveBeenLastCalledWith('Password must contain at least one uppercase letter');

      await userEvent.clear(input);
      await userEvent.type(input, 'Uppercase');

      expect(handleError).toHaveBeenLastCalledWith(null);
    });

    it('validates multiple rules', async () => {
      const handleError = jest.fn();
      render(
        <FormField
          label="Password"
          rules={{
            required: { value: true, message: 'Password is required' },
            minLength: { value: 8, message: 'Password must be at least 8 characters' },
            custom: [{
              validate: (value) => /[A-Z]/.test(value),
              message: 'Password must contain at least one uppercase letter'
            }]
          }}
          onError={handleError}
        >
          <Input type="password" />
        </FormField>
      );

      const input = screen.getByLabelText('Password');
      
      // Test required
      await userEvent.type(input, ' ');
      await userEvent.clear(input);
      expect(handleError).toHaveBeenLastCalledWith('Password is required');

      // Test minLength
      await userEvent.type(input, 'short');
      expect(handleError).toHaveBeenLastCalledWith('Password must be at least 8 characters');

      // Test custom rule
      await userEvent.clear(input);
      await userEvent.type(input, 'longenoughbutlowercase');
      expect(handleError).toHaveBeenLastCalledWith('Password must contain at least one uppercase letter');

      // Test valid input
      await userEvent.clear(input);
      await userEvent.type(input, 'ValidPassword123');
      expect(handleError).toHaveBeenLastCalledWith(null);
    });
  });
}); 