import { FormControl, Input, WarningOutlineIcon } from 'native-base';

type Props = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  label?: string;
  placeholder?: string;
};

export function FormControlWithInput({ value, onChange, error, label, placeholder }: Props) {
  const isInvalid = error !== undefined && error !== '';
  return (
    <FormControl isInvalid={isInvalid}>
      <FormControl.Label>{label}</FormControl.Label>
      <Input
        placeholder={placeholder}
        accessibilityLabel={label}
        color="light.shade"
        value={value}
        variant="underlined"
        onChangeText={onChange}
        _invalid={{
          borderColor: 'red.500',
        }}
        _focus={{
          borderColor: 'light.accent',
        }}
      />
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {error}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
