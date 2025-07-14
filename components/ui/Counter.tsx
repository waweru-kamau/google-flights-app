import { FieldValues, UseFormReturn } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import CustomText from "./CustomText";

interface CounterProps {
  label: string;
  name: "adults" | "children" | "infants";
  min?: number;
  max?: number;
  formContext: UseFormReturn<FieldValues, any, FieldValues>;
}

const Counter = ({
  label,
  name,
  min = 0,
  max = 9,
  formContext,
}: CounterProps) => {
  const { setValue, watch } = formContext;
  const count = watch(name) ?? 0;

  const increment = () => {
    if (count < max) setValue(name, count + 1);
  };

  const decrement = () => {
    if (count > min) setValue(name, count - 1);
  };

  return (
    <View className="flex-row justify-between items-center py-2 px-4">
      <Text className="text-white text-base">{label}</Text>
      <View className="flex-row items-center gap-4">
        <Pressable
          onPress={decrement}
          disabled={count <= min}
          className="h-10 w-10 flex items-center justify-center bg-blue-500 dark:bg-gray-800 disabled:bg-gray-400
          dark:disabled:bg-gray-600 rounded-md"
        >
          <Text className="text-white text-xl">−</Text>
        </Pressable>
        <CustomText variant="label">{count}</CustomText>
        <Pressable
          onPress={increment}
          disabled={count >= max}
          className="h-10 w-10 flex items-center justify-center bg-blue-500 dark:bg-gray-800 disabled:bg-gray-400
          dark:disabled:bg-gray-600 rounded-md"
        >
          <Text className="text-white text-xl">+</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Counter;
