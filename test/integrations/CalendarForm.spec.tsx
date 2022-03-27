import React, { useState } from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { FormDatePicker } from '../../src';

const defaultValues = {
  startDate: new Date(2022, 2, 15),
  endState: new Date(2022, 2, 22),
};

const getMonthAndDate = (date: Date) => `${date.getMonth()}/${date.getDate()}`;

const CalendarForm = () => {
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
      <FormDatePicker
        label="startDate"
        name="startDate"
        control={form.control}
        errors={form.formState.errors}
      />
      <FormDatePicker
        label="endState"
        name="endState"
        control={form.control}
        errors={form.formState.errors}
      />
      <button type="submit">Submit</button>
      {form.formState.isSubmitSuccessful && (
        <>
          <p data-testid="startDate">{getMonthAndDate(formState.startDate)}</p>
          <p data-testid="endDate">{getMonthAndDate(formState.endState)}</p>
        </>
      )}
    </form>
  );
};

describe('CalendarForm', () => {
  it('should successfully submit', async () => {
    const { getByLabelText, getByTestId, getByRole } = render(<CalendarForm />);

    fireEvent.click(getByRole('button'));

    await waitFor(() => {
      expect(getByTestId('startDate')).toHaveTextContent('2/15');
      expect(getByTestId('endDate')).toHaveTextContent('2/22');
    });

    fireEvent.click(getByLabelText('startDate'));

    fireEvent.click(
      getByRole('option', {
        name: 'Choose Sunday, March 27th, 2022',
      })
    );
    fireEvent.click(getByRole('button'));

    await waitFor(() => {
      expect(getByTestId('startDate')).toHaveTextContent('2/27');
      expect(getByTestId('endDate')).toHaveTextContent('2/22');
    });
  });
});
