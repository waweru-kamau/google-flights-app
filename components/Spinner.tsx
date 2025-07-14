import React from "react";
import { ActivityIndicator, View } from "react-native";

const Spinner = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" />
    </View>
  );
};
export default Spinner;
