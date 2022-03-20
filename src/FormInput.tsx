import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputProps,
  FormHelperText,
} from '@chakra-ui/react';
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';

export interface FormInputProps<T extends FieldValues> extends InputProps {
  label?: string;
  helperText?: string;
  name: Path<T>;
  errors: FieldErrors<T>;
  register: UseFormRegister<T>;
  options?: Parameters<UseFormRegister<T>>[1];
}

export const FormInput = <T extends FieldValues>({
  //   Custom Props
  helperText,
  // React Hook Form Props
  name,
  errors,
  register,
  options,
  // FormControlProps
  colorScheme,
  isDisabled,
  isInvalid,
  isReadOnly,
  isRequired,
  label,
  size,
  variant,
  // Input Props
  ...props
}: FormInputProps<T>) => {
  const isError = isInvalid || Boolean(errors[name]?.message);

  return (
    <FormControl
      variant={variant}
      colorScheme={colorScheme}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      isRequired={isRequired}
      isInvalid={isError}
      label={label}
      size={size}
    >
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <Input
        id={name}
        size={size}
        variant={variant}
        {...register(name, options)}
        {...props}
      />
      {!isError && helperText && <FormHelperText>{helperText}</FormHelperText>}
      {errors[name]?.message && (
        <FormErrorMessage>{errors[name].message}</FormErrorMessage>
      )}
    </FormControl>
  );
};
