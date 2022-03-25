import React, { useState } from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { FormCheckbox } from '../../src';

const defaultValues = {
  receivedNotification: true,
  receivedPromotion: false,
};

const ChecklistForm = () => {
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
      <FormCheckbox
        name="receivedNotification"
        register={form.register}
        errors={form.formState.errors}
      >
        Will receive notifications
      </FormCheckbox>
      <FormCheckbox
        name="receivedPromotion"
        register={form.register}
        errors={form.formState.errors}
      >
        Will receive promotions
      </FormCheckbox>
      <button type="submit">Submit</button>
      {form.formState.isSubmitSuccessful && (
        <>
          <p data-testid="receivedNotification">
            {formState.receivedNotification ? 'true' : 'false'}
          </p>
          <p data-testid="receivedPromotion">
            {formState.receivedPromotion ? 'true' : 'false'}
          </p>
        </>
      )}
    </form>
  );
};

describe('ChecklistForm', () => {
  it('should successfully submit', async () => {
    const { getByLabelText, getByTestId, getByRole } = render(
      <ChecklistForm />
    );

    fireEvent.click(getByRole('button'));

    await waitFor(() => {
      expect(getByTestId('receivedNotification')).toHaveTextContent('true');
      expect(getByTestId('receivedPromotion')).toHaveTextContent('false');
    });

    fireEvent.click(getByLabelText('Will receive promotions'));

    fireEvent.click(getByRole('button'));

    await waitFor(() => {
      expect(getByTestId('receivedNotification')).toHaveTextContent('true');
      expect(getByTestId('receivedPromotion')).toHaveTextContent('true');
    });
  });
});
