import { cn } from "@/lib/utils";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { Edges, SafeAreaView } from "react-native-safe-area-context";

export default function Container({
  children,
  className = "",
  edges,
}: {
  children: React.ReactNode;
  className?: string;
  edges?: Edges;
}) {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-primarydark" edges={edges}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className={cn("flex-1 px-4", className)}
          contentContainerClassName="gap-4 pb-4"
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
