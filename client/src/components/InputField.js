import {
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

export default function InputField({
  register,
  errors,
  name,
  type = 'text',
  mt = '16px',
  setError,
}) {
  return (
    <FormControl isInvalid={errors} id={`${name}-id`} mt={mt}>
      <InputGroup>
        <InputLeftElement />
        <Input
          name={name}
          type={type}
          {...register(`${name}`, {
            required: true,
          })}
          onChange={e => {
            setError(`${name}`, {
              type: 'manual',
              message: `Please Fill in your ${name}`,
            });
            // onChange(e);
          }}
        />
      </InputGroup>
      <FormErrorMessage>{errors && errors.message}</FormErrorMessage>
    </FormControl>
  );
}
