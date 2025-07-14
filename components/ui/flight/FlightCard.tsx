import { cn } from "@/lib/utils";
import { View, Pressable, useColorScheme } from "react-native";
import CustomText from "../CustomText";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Colors from "@/lib/Colors";
import { Image } from "expo-image";
import { ParsedFlightItinerary } from "@/hooks/useSearchFlights";
import { router, usePathname } from "expo-router";
import { Flight, FlightDirection, useFlight } from "@/context/FlightContext";
import { useFormContext } from "react-hook-form";

const FlightCard = ({
  flight,
  isSelected,
  flightIndex,
}: {
  flight: ParsedFlightItinerary & Flight;
  isSelected?: boolean;
  flightIndex?: number;
}) => {
  const currentUrl = usePathname();
  const { selectedFlights, addFlight, removeFlightAtIndex } = useFlight();
  const { watch } = useFormContext();
  const tripType = watch("trip");
  const theme = useColorScheme() || "light";

  const handlePress = () => {
    if (isSelected || currentUrl.includes("flight-details")) return;
    addFlight(flight);
    if (
      (tripType === "round-trip" && selectedFlights.length === 1) ||
      tripType === "one-way"
    ) {
      router.push({
        pathname: `/(app)/flight-details/${flight?.itineraryId || ""}`,
        params: {
          sessionId: flight.sessionId,
          legs: JSON.stringify(flight.legs),
        },
      });
    }
  };

  return (
    <Pressable onPress={handlePress} disabled={isSelected}>
      {({ pressed }) => (
        <View
          className={cn(
            "py-4 border border-gray-300 dark:border-gray-600 rounded-xl gap-2",
            pressed && "opacity-50",
          )}
        >
          {isSelected && (
            <View className="p-4 pt-0 border-b border-gray-200 dark:border-gray-600 flex-row justify-between">
              <CustomText variant="h3">
                {` ${flight.direction === FlightDirection.OUTBOUND ? "Departing" : "Return"} flight · ${flight.departureDate}`}
              </CustomText>
              <Pressable onPress={() => removeFlightAtIndex(flightIndex || 0)}>
                <Ionicons name="close" size={24} color="white" />
              </Pressable>
            </View>
          )}
          <View className="px-4 flex-row justify-between">
            <View className="basis-2/3 flex-row items-start justify-between">
              <View className="">
                <CustomText variant="h3">{flight?.departureTime}</CustomText>
                <CustomText variant="caption">
                  {flight?.departureAirport}
                </CustomText>
              </View>
              <FontAwesome
                name="long-arrow-right"
                size={24}
                color={Colors[theme].text}
              />
              <View className="">
                <CustomText variant="h3">{flight.arrivalTime}</CustomText>
                <CustomText variant="caption">
                  {flight.arrivalAirport}
                </CustomText>
              </View>
            </View>
            <View className="items-end basis-1/3">
              <CustomText variant="h3">{flight.cost}</CustomText>
              <CustomText variant="caption">{flight.tripType}</CustomText>
            </View>
          </View>
          <View className="px-4 flex-row">
            <Image source={flight.logo} style={{ width: 24, height: 24 }} />
            <View className="ml-2">
              <CustomText variant="body">
                {`${flight.stops} ·${flight.duration}`}
              </CustomText>
              <CustomText variant="caption">
                {flight.flightName} · {flight.emission}
              </CustomText>
            </View>
          </View>
        </View>
      )}
    </Pressable>
  );
};

export default FlightCard;
