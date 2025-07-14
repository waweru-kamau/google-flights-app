import { View, Text, useColorScheme } from "react-native";
import PassengerCounter from "../PassengerCounter";
import { Ionicons } from "@expo/vector-icons";
import CustomSelect from "../CustomSelect";
import Colors from "@/lib/Colors";

const FlightOptions = () => {
  const theme = useColorScheme() || "light";
  return (
    <View className="flex flex-row px-2 items-center justify-between">
      <View className="basis-2/5">
        <CustomSelect
          name="trip"
          label="Trip"
          options={[
            { label: "One way", value: "one-way" },
            { label: "Round trip", value: "round-trip" },
          ]}
          icon={
            <Ionicons
              name="swap-horizontal-outline"
              size={12}
              color={Colors[theme].text}
            />
          }
        />
      </View>

      <View className="basis-1/5">
        <PassengerCounter />
      </View>
      <View className="basis-2/5">
        <CustomSelect
          name="cabinClass"
          label="Cabin"
          options={[
            { label: "Economy", value: "economy" },
            { label: "Premium Economy", value: "premium_economy" },
            { label: "Business", value: "business" },
            { label: "First", value: "first" },
          ]}
        />
      </View>
    </View>
  );
};

export default FlightOptions;
