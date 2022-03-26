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
  Control,
  Controller,
  ControllerProps,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

export interface FormDatePickerProps<T extends FieldValues>
  extends Omit<ReactDatePickerProps, 'onChange' | 'selected'>,
    Pick<
      InputProps,
      | 'colorScheme'
      | 'isDisabled'
      | 'isInvalid'
      | 'isReadOnly'
      | 'isRequired'
      | 'size'
      | 'variant'
      | 'placeholder'
    > {
  label?: string;
  helperText?: string;
  name: Path<T>;
  errors: FieldErrors<T>;
  control: Control<T>;
  options?: Parameters<UseFormRegister<T>>[1];
}

export const FormDatePicker = <T extends FieldValues>({
  //   Custom Props
  helperText,
  // React Hook Form Props
  name,
  errors,
  control,
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
  placeholder,
  ...props
}: FormDatePickerProps<T>) => {
  const isError = isInvalid || Boolean(errors[name]?.message);

  const render: ControllerProps<T>['render'] = ({ field }) => (
    <ReactDatePicker
      id={name}
      onChange={field.onChange}
      onBlur={field.onBlur}
      placeholderText={placeholder}
      customInput={<Input ref={field.ref} size={size} variant={variant} />}
      selected={field.value}
      {...props}
    />
  );

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
      <Controller
        name={name}
        control={control}
        render={render}
        rules={options}
      />
      {!isError && helperText && <FormHelperText>{helperText}</FormHelperText>}
      {errors[name]?.message && (
        <FormErrorMessage>{errors[name].message}</FormErrorMessage>
      )}
    </FormControl>
  );
};
