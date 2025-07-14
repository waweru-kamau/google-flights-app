import { cn } from "@/lib/utils";
import { Text, TextProps } from "react-native";

type Variant = "h1" | "h2" | "h3" | "body" | "label" | "caption" | "error";

type Props = TextProps & {
  variant?: Variant;
  className?: string;
};

const variantStyles: Record<Variant, string> = {
  h1: "text-5xl tracking-wide font-semibold text-gray-900 dark:text-white",
  h2: "text-3xl font-semibold text-gray-900 dark:text-white",
  h3: "text-2xl font-semibold text-gray-900 dark:text-white",
  body: "text-base text-gray-800 dark:text-white",
  label: "text-xl font-medium text-gray-700 dark:text-white",
  caption: "text-sm text-gray-500 dark:text-gray-400",
  error: "text-sm text-red-600 dark:text-red-400",
};

export default function CustomText({
  children,
  variant = "body",
  className = "",
  ...props
}: Props) {
  return (
    <Text
      className={cn(variantStyles[variant], className)}
      numberOfLines={1}
      ellipsizeMode="tail"
      {...props}
    >
      {children}
    </Text>
  );
}
