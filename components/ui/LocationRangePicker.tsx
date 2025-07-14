import { View, Text, useColorScheme } from "react-native";
import PrimaryButton from "./PrimaryButton";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFormContext } from "react-hook-form";
import Colors from "@/lib/Colors";

const LocationRangePicker = () => {
  const { watch, setValue, clearErrors } = useFormContext();

  const originAirport = watch("originAirport");
  const destinationAirport = watch("destinationAirport");
  const originName = originAirport?.name;
  const destinationName = destinationAirport?.name;

  const handleSwapAirports = () => {
    const originAirport = watch("originAirport");
    const destinationAirport = watch("destinationAirport");
    setValue("originAirport", destinationAirport);
    setValue("destinationAirport", originAirport);
  };

  const theme = useColorScheme() || "light";

  return (
    <View className="flex flex-row px-2 items-center justify-between">
      <View className="basis-5/12">
        <PrimaryButton
          title={originName || "Where from?"}
          variant="bigOutlined"
          textClassName="text-gray-900 dark:text-white"
          onPress={() => {
            clearErrors();
            router.push("/(app)/select-airport/from");
          }}
          icon={
            <Ionicons
              name="location-outline"
              size={12}
              color={Colors[theme].text}
            />
          }
        />
      </View>
      <View className="basis-2/12">
        <PrimaryButton
          title=""
          variant="text"
          onPress={handleSwapAirports}
          icon={
            <Ionicons
              name="swap-horizontal-outline"
              size={20}
              color={Colors[theme].text}
            />
          }
        />
      </View>
      <View className="basis-5/12">
        <PrimaryButton
          title={destinationName || "Where to?"}
          variant="bigOutlined"
          textClassName="text-gray-900 dark:text-white"
          onPress={() => {
            router.push("/(app)/select-airport/to");
            clearErrors();
          }}
          icon={
            <Ionicons
              name="location-outline"
              size={12}
              color={Colors[theme].text}
            />
          }
        />
      </View>
    </View>
  );
};

export default LocationRangePicker;
