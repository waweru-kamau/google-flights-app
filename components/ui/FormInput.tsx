import { TextInput, View } from "react-native";
import CustomText from "./CustomText";
import { Control, useController } from "react-hook-form";

interface TextInputProps extends React.ComponentProps<typeof TextInput> {
  label: string;
  placeholder?: string;
  control: Control<any>;
  name: string;
}

export default function FormInput({
  label,
  placeholder = "",
  control,
  name,
  ...inputProps
}: TextInputProps) {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name });

  return (
    <View className="w-full mb-4 gap-2">
      <CustomText variant="label">{label}</CustomText>
      <TextInput
        className="rounded-md p-4 text-xl border border-gray-300 dark:border-gray-400 text-gray-900 dark:text-white"
        value={`${field.value || ""}`}
        onChangeText={field.onChange}
        placeholder={placeholder}
        {...inputProps}
      />
      {error?.message ? (
        <CustomText variant="error">{error?.message}</CustomText>
      ) : null}
    </View>
  );
}
