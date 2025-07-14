import Spinner from "@/components/Spinner";
import Container from "@/components/ui/Container";
import CustomText from "@/components/ui/CustomText";
import FlightCard from "@/components/ui/flight/FlightCard";
import FlightOptions from "@/components/ui/flight/FlightOptions";
import LoadingError from "@/components/ui/LoadingError";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { useFlight } from "@/context/FlightContext";
import { Leg, useFlightDetails } from "@/hooks/useFlightDetails";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { View, Pressable, Linking } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const FlightDetails = () => {
  const safeInsets = useSafeAreaInsets();
  const { watch } = useFormContext();
  const urlparams = useLocalSearchParams<{
    id: string;
    sessionId: string;
    legs: string;
  }>();

  const adults = watch("adults");
  const childrens = watch("children");
  const infants = watch("infants");
  const params = {
    itineraryId: urlparams.id,
    sessionId: urlparams.sessionId,
    adults,
    childrens,
    infants,
    legs: JSON.parse(urlparams.legs) as Leg[],
  };
  console.log("details params", JSON.stringify(params));
  const { data, isLoading, isError } = useFlightDetails(params);
  const { selectedFlights, clearFlights } = useFlight();

  useFocusEffect(
    useCallback(() => {
      return () => {
        clearFlights();
      };
    }, []),
  );

  useEffect(() => {
    if (selectedFlights.length === 0) {
      router.back();
    }
  }, [selectedFlights]);

  return (
    <Container
      className="pl-0 pr-0"
      edges={[
        "bottom",
        "left",
        "right",
        isLoading || isError ? "top" : "bottom",
      ]}
    >
      {isLoading && <Spinner />}
      {isError && (
        <>
          <Pressable className="p-4" onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>
          <LoadingError />
        </>
      )}
      {!isLoading && !isError && data && (
        <>
          <View className="w-full">
            <Image
              source={data?.destinationImage}
              style={{ width: "100%", height: 250 }}
            />
            <View
              style={{
                position: "absolute",
                backgroundColor: "black",
                opacity: 0.5,
                width: "100%",
                height: "100%",
              }}
            />
          </View>
          <View style={{ marginTop: safeInsets.top, position: "absolute" }}>
            <View className="flex-row w-full items-center justify-between">
              <Pressable
                className="p-4"
                onPress={() => {
                  router.back();
                }}
              >
                <Ionicons name="arrow-back" size={24} color="white" />
              </Pressable>
              <Pressable className="p-4">
                <Ionicons name="share-social" size={24} color="white" />
              </Pressable>
            </View>
            <View className="h-full items-center justify-center">
              <View className="flex-row items-center gap-2 justify-center">
                <CustomText variant="h1" className="text-gray-100">
                  {data?.itinerary.departureCity}
                </CustomText>
                <Ionicons name="arrow-forward" size={24} color="white" />
                <CustomText variant="h1" className="text-gray-100">
                  {data?.itinerary.arrivalCity}
                </CustomText>
              </View>
              <FlightOptions />
            </View>
          </View>
          <View className="px-4 gap-4">
            {selectedFlights &&
              selectedFlights.length > 0 &&
              selectedFlights.map((selectedFlight, index) => (
                <FlightCard
                  isSelected={true}
                  flight={selectedFlight}
                  key={`${selectedFlight?.itineraryId}-${index}`}
                  flightIndex={index}
                />
              ))}

            <CustomText variant="h2">Booking options</CustomText>
            {data?.bookingOptions.map((bookingOption) => (
              <Pressable
                key={bookingOption.name}
                className="border border-gray-300 dark:border-gray-600 rounded-xl p-4"
                onPress={() => Linking.openURL(bookingOption.url)}
              >
                <View className="flex-row justify-between">
                  <CustomText variant="label" className="basis-2/3">
                    {bookingOption.name}
                  </CustomText>
                  <View className="basis-1/3 items-end">
                    <CustomText variant="label">
                      {bookingOption.cost}
                    </CustomText>
                    <PrimaryButton
                      title="Continue"
                      variant="text"
                      onPress={() => Linking.openURL(bookingOption.url)}
                      textClassName="text-xl"
                    />
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </>
      )}
    </Container>
  );
};
export default FlightDetails;
