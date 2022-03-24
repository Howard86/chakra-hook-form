import React, { useState } from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { FormInput, FormSelect } from '../../src';

const SALUTATIONS = ['', 'Mr', 'Mrs', 'Ms', 'Dr', 'N/A'];
const GENDERS = ['male', 'female'];

const defaultValues = {
  salutation: SALUTATIONS[0],
  username: '',
  password: '',
  gender: undefined as undefined | string,
};

const SignUpForm = () => {
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
      <FormSelect
        label="salutation"
        name="salutation"
        placeholder="salutation"
        register={form.register}
        errors={form.formState.errors}
      >
        {SALUTATIONS.map((salutation) => (
          <option
            data-testid="salutation-option"
            key={salutation}
            value={salutation}
          >
            {salutation}
          </option>
        ))}
      </FormSelect>
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
      <FormSelect
        label="gender"
        name="gender"
        placeholder="gender"
        register={form.register}
        errors={form.formState.errors}
      >
        {GENDERS.map((gender) => (
          <option key={gender} data-testid="gender-option">
            {gender}
          </option>
        ))}
      </FormSelect>
      <button type="submit">Submit</button>
      {form.formState.isSubmitSuccessful && (
        <>
          <p data-testid="salutation">{formState.salutation}</p>
          <p data-testid="username">{formState.username}</p>
          <p data-testid="password">{formState.password}</p>
          <p data-testid="gender">{formState.gender}</p>
        </>
      )}
    </form>
  );
};

describe('SignUpForm', () => {
  it('should successfully submit', async () => {
    const {
      getByLabelText,
      getByText,
      getByTestId,
      getByRole,
      findAllByTestId,
    } = render(<SignUpForm />);

    fireEvent.change(getByLabelText('username'), {
      target: { value: 'test@test.com' },
    });
    fireEvent.change(getByLabelText('password'), {
      target: { value: 'password' },
    });
    fireEvent.change(getByLabelText('salutation'), {
      target: {
        value: SALUTATIONS[4],
      },
    });

    fireEvent.click(getByRole('button'));

    await waitFor(() => {
      expect(
        getByText('Please enter more than 6 digits password')
      ).toBeInTheDocument();
      expect(getByTestId('salutation')).toHaveTextContent(SALUTATIONS[4]);
      expect(getByTestId('username')).toHaveTextContent('test@test.com');
      expect(getByTestId('password')).toHaveTextContent('password');
      expect(getByTestId('gender')).toBeEmptyDOMElement();
    });

    const salutationOptions = (await findAllByTestId(
      'salutation-option'
    )) as HTMLOptionElement[];

    salutationOptions.forEach((option, index) => {
      if (index === 4) {
        expect(option.selected).toBeTruthy();
      } else {
        expect(option.selected).toBeFalsy();
      }
    });

    const genderOptions = (await findAllByTestId(
      'gender-option'
    )) as HTMLOptionElement[];

    genderOptions.forEach((option) => {
      expect(option.selected).toBeFalsy();
    });
  });

  it('should fail to submit when password is empty', async () => {
    const { getByLabelText, getByRole, queryByTestId, getByText, queryByText } =
      render(<SignUpForm />);

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
