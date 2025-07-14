import { View } from "react-native";
import CustomText from "./CustomText";
import PrimaryButton from "./PrimaryButton";

const LoadingError = ({
  title = "Error",
  message = "Something went wrong",
}: {
  title?: string;
  message?: string;
}) => {
  return (
    <View className="items-center justify-center">
      <CustomText variant="h3">{title}</CustomText>
      <CustomText variant="body" className="mb-4">
        {message}
      </CustomText>
      <PrimaryButton variant="text" title="Reload" onPress={() => {}} />
    </View>
  );
};

export default LoadingError;
