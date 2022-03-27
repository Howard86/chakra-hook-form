import 'react-app-polyfill/ie11';
import * as ReactDOM from 'react-dom';
import { Button, ChakraProvider, Container, VStack } from '@chakra-ui/react';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormCheckbox, FormDatePicker, FormInput, FormSelect } from '../src';

const SALUTATIONS = ['', 'Mr', 'Mrs', 'Ms', 'Dr', 'N/A'];
const GENDERS = ['male', 'female'];

const defaultValues = {
  registerDate: new Date(),
  salutation: SALUTATIONS[0],
  username: '',
  password: '',
  gender: undefined as string | undefined,
  remembered: false,
};

const LoginForm = () => {
  const [formState, setFormState] = useState(defaultValues);
  const form = useForm({ defaultValues });

  return (
    <VStack
      as="form"
      spacing={2}
      onSubmit={
        form.handleSubmit((state) => {
          setFormState(state);
        }) as VoidFunction
      }
    >
      <FormDatePicker
        label="registered date"
        name="registerDate"
        control={form.control}
        errors={form.formState.errors}
      />
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
          minLength: {
            message: 'password has invalid format',
            value: 6,
          },
        }}
        helperText="Please enter more than 6 digits password"
      />
      <FormSelect
        name="gender"
        label="gender"
        placeholder="Please select a gender"
        register={form.register}
        errors={form.formState.errors}
      >
        {GENDERS.map((gender) => (
          <option key={gender}>{gender}</option>
        ))}
      </FormSelect>
      <FormCheckbox
        name="remembered"
        errors={form.formState.errors}
        register={form.register}
      >
        Remember email?
      </FormCheckbox>
      <Button type="submit">Submit</Button>
      {form.formState.isSubmitSuccessful && (
        <>
          <p data-testid="result-registeredDate">
            {formState.registerDate.toLocaleDateString()}
          </p>
          <p data-testid="result-username">{formState.username}</p>
          <p data-testid="result-password">{formState.password}</p>
          <p data-testid="result-gender">{formState.gender}</p>
          <p data-testid="result-remembered">
            {formState.remembered
              ? 'will remember email'
              : 'will not keep email'}
          </p>
        </>
      )}
    </VStack>
  );
};

const App = () => (
  <ChakraProvider>
    <Container maxW="container.sm" centerContent>
      <LoginForm />
    </Container>
  </ChakraProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
