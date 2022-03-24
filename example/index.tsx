import 'react-app-polyfill/ie11';
import * as ReactDOM from 'react-dom';
import { Button, ChakraProvider, Container, VStack } from '@chakra-ui/react';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormInput, FormSelect } from '../src';

const SALUTATIONS = ['', 'Mr', 'Mrs', 'Ms', 'Dr', 'N/A'];
const GENDERS = ['male', 'female'];

const defaultValues = {
  salutation: SALUTATIONS[0],
  username: '',
  password: '',
  gender: undefined as string | undefined,
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
      <Button type="submit">Submit</Button>
      {form.formState.isSubmitSuccessful && (
        <>
          <p data-testid="result-username">{formState.username}</p>
          <p data-testid="result-password">{formState.password}</p>
          <p data-testid="result-gender">{formState.gender}</p>
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
