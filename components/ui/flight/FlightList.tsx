import { View } from "react-native";
import CustomText from "../CustomText";
import { ParsedFlightItinerary } from "@/hooks/useSearchFlights";
import FlightCard from "./FlightCard";
import { useFlight } from "@/context/FlightContext";
import { useFormContext } from "react-hook-form";

const FlightList = ({
  flightData,
}: {
  flightData: ParsedFlightItinerary[];
}) => {
  const { selectedFlights } = useFlight();
  const { watch } = useFormContext();
  const tripType = watch("trip");

  const title =
    tripType === "one-way"
      ? "Top flights"
      : selectedFlights.length === 0
        ? "Top departing flight"
        : "Top returning flight";
  return (
    <View className="px-4 gap-4">
      {selectedFlights.length > 0 &&
        selectedFlights.map((flight, index) => (
          <FlightCard
            isSelected={true}
            flight={flight}
            key={`${flight?.itineraryId}-${index}`}
            flightIndex={index}
          />
        ))}

      <CustomText variant="h2">{title}</CustomText>
      {flightData.map((flight, index) => (
        <FlightCard key={`${flight?.itineraryId}-${index}`} flight={flight} />
      ))}
    </View>
  );
};

export default FlightList;
