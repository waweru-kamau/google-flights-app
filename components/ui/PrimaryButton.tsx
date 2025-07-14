import { cn } from "@/lib/utils";
import { Pressable, Text, useColorScheme, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/lib/Colors";

const PrimaryButton = ({
  title,
  onPress,
  variant = "primary",
  className = "",
  textClassName = "",
  icon,
}: {
  title: string;
  onPress: () => void;
  variant?:
    | "primary"
    | "secondary"
    | "outlined"
    | "bigOutlined"
    | "text"
    | "dropdown";
  className?: string;
  textClassName?: string;
  icon?: React.ReactNode;
}) => {
  const theme = useColorScheme() || "light";
  const base = "px-4 py-3 rounded-full items-center justify-between";

  const styles = {
    primary: "bg-blue-600 text-white dark:bg-blue-300 dark:text-gray-900",
    dropdown:
      "flex  px-0 bg-transparent text-gray-900 dark:text-white rounded-md",
    secondary: "bg-blue-600 text-white dark:bg-accentdark",
    outlined: "border border-blue-600 text-blue-600 dark:border-blue-40",
    bigOutlined:
      "w-full rounded-md border border-gray-300 text-blue-600 dark:border-gray-600",
    text: "pl-0 pr-0 pb-0 pt-0 text-blue-600 dark:text-blue-200",
  };

  return (
    <Pressable
      className={cn(
        variant === "dropdown" || variant === "bigOutlined"
          ? "w-full px-2"
          : "",
        // variant !== "text" ? "self-start" : "",
      )}
      onPress={onPress}
    >
      {({ pressed }) => (
        <View
          className={cn(
            base,
            styles[variant],
            pressed ? "opacity-60" : "opacity-100",
            className,
          )}
        >
          <View className="flex-row items-center justify-between gap-1 overflow-hidden">
            {icon && icon}
            <View className="overflow-hidden">
              <Text
                className={cn(
                  "text-base font-medium",
                  variant === "primary"
                    ? "text-white dark:text-gray-900"
                    : "text-blue-600 dark:text-blue-300",
                  textClassName,
                )}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {title}
              </Text>
            </View>
            {variant === "dropdown" && (
              <Ionicons
                name="chevron-down"
                size={12}
                color={Colors[theme].text}
              />
            )}
          </View>
        </View>
      )}
    </Pressable>
  );
};

export default PrimaryButton;
