import React, { useState } from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { FormInput } from '../../src';

const defaultValues = {
  username: '',
  password: '',
};

const LoginForm = () => {
  const [formState, setFormState] = useState(defaultValues);
  const form = useForm({ defaultValues });

  return (
    <form
      onSubmit={
        form.handleSubmit((state) => {
          setFormState(state);
        }) as VoidFunction
      }
    >
      <FormInput
        label="username"
        name="username"
        register={form.register}
        errors={form.formState.errors}
      />
      <FormInput
        type="password"
        label="password"
        name="password"
        register={form.register}
        errors={form.formState.errors}
        options={{
          required: 'password is required',
          min: {
            message: 'password has invalid format',
            value: 6,
          },
        }}
        helperText="Please enter more than 6 digits password"
      />
      <button type="submit">Submit</button>
      {form.formState.isSubmitSuccessful && (
        <>
          <p data-testid="username">{formState.username}</p>
          <p data-testid="password">{formState.password}</p>
        </>
      )}
    </form>
  );
};

describe('LoginForm', () => {
  it('should successfully submit', async () => {
    const { getByLabelText, getByText, getByTestId, getByRole } = render(
      <LoginForm />
    );

    fireEvent.change(getByLabelText('username'), {
      target: { value: 'test@test.com' },
    });
    fireEvent.change(getByLabelText('password'), {
      target: { value: 'password' },
    });

    fireEvent.click(getByRole('button'));

    await waitFor(() => {
      expect(
        getByText('Please enter more than 6 digits password')
      ).toBeInTheDocument();
      expect(getByTestId('username')).toHaveTextContent('test@test.com');
      expect(getByTestId('password')).toHaveTextContent('password');
    });
  });

  it('should fail to submit when password is empty', async () => {
    const { getByLabelText, getByRole, queryByTestId, getByText, queryByText } =
      render(<LoginForm />);

    fireEvent.change(getByLabelText('username'), {
      target: { value: 'test@test.com' },
    });

    fireEvent.click(getByRole('button'));

    await waitFor(() => {
      expect(
        queryByText('Please enter more than 6 digits password')
      ).not.toBeInTheDocument();
      expect(queryByTestId('username')).not.toBeInTheDocument();
      expect(queryByTestId('password')).not.toBeInTheDocument();

      // reference: https://chakra-ui.com/docs/components/form/form-control#props
      expect(getByLabelText('username')).not.toHaveAttribute(
        'aria-invalid',
        'true'
      );
      expect(getByLabelText('password')).toHaveAttribute(
        'aria-invalid',
        'true'
      );
      expect(getByText('password is required')).toBeInTheDocument();
    });
  });
});
