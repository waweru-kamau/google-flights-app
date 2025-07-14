import FlightsBackground from "@/assets/svg/FlightsBackground";
import Container from "@/components/ui/Container";
import CustomText from "@/components/ui/CustomText";
import { useColorScheme, View } from "react-native";
import DateRangePicker from "@/components/ui/DateRangePicker";
import { useFormContext } from "react-hook-form";
import LocationRangePicker from "@/components/ui/LocationRangePicker";
import FlightOptions from "@/components/ui/flight/FlightOptions";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { Ionicons } from "@expo/vector-icons";
import FlightList from "@/components/ui/flight/FlightList";
import { useSearchFlights } from "@/hooks/useSearchFlights";
import Spinner from "@/components/Spinner";
import LoadingError from "@/components/ui/LoadingError";
import { useFlight } from "@/context/FlightContext";
import { useEffect } from "react";
import { format, isValid } from "date-fns";
import FlightsLightBackground from "@/assets/svg/FlightsLightBackground";
import Colors from "@/lib/Colors";

export default function index() {
  const {
    watch,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const errorMessage =
    errors?.originAirport?.destinationAirport?.message ||
    errors?.returnDate?.message;
  const { selectedFlights } = useFlight();

  const tripType = watch("trip");

  const fromAirport =
    tripType === "round-trip" && selectedFlights.length > 0
      ? "destinationAirport"
      : "originAirport";
  const toAirport =
    tripType === "round-trip" && selectedFlights.length > 0
      ? "originAirport"
      : "destinationAirport";
  const departureDate =
    tripType === "round-trip" && selectedFlights.length > 0
      ? "returnDate"
      : "departureDate";

  const params = {
    originSkyId: watch(fromAirport)?.skyId || "",
    destinationSkyId: watch(toAirport)?.skyId || "",
    originEntityId: watch(fromAirport)?.entityId || "",
    destinationEntityId: watch(toAirport)?.entityId || "",
    date: isValid(watch(departureDate))
      ? format(watch(departureDate), "yyyy-MM-dd")
      : "",
    // returnDate:
    // watch("trip") === "round-trip" ? format(watch("returnDate"), "yyyy-MM-dd") : undefined,
    adults: watch("adults")?.toString() || "",
    childrens: watch("children")?.toString() || "",
    infants: watch("infants")?.toString() || "",
    cabinClass: watch("cabinClass") || "",
  };

  const {
    data: flightsData,
    isLoading,
    isError,
    error: flightError,
    refetch,
  } = useSearchFlights(params);

  console.log("Flights data", {
    flightsData,
    flightError,
    isError,
    isLoading,
    params,
  });

  const handleSearch = () => {
    if (isValid(watch(departureDate))) {
      refetch();
    }
  };

  useEffect(() => {
    if (selectedFlights.length > 0 && tripType === "round-trip") {
      handleSearch();
    }
  }, [selectedFlights]);

  const theme = useColorScheme() || "light";

  return (
    <>
      <Container className="pl-0 pr-0">
        <View className="w-full h-fit">
          {theme === "light" ? (
            <FlightsLightBackground />
          ) : (
            <FlightsBackground />
          )}
          <View className="absolute bottom-0 left-0 right-0">
            <CustomText variant="h1" className="text-center m-0 p-0">
              Flights
            </CustomText>
          </View>
        </View>
        <FlightOptions />
        <LocationRangePicker />
        <DateRangePicker />
        {errorMessage && (
          <CustomText variant="error" className="px-4 self-center">
            {errorMessage}
          </CustomText>
        )}
        <View className="w-full items-center">
          <View className="absolute bottom-1/2 w-full h-10 border-b border-gray-400 dark:border-gray-600 rounded-xl" />
          <PrimaryButton
            title="Search"
            icon={
              <Ionicons
                name="search"
                size={16}
                color={Colors[theme].invertText}
              />
            }
            onPress={handleSubmit(handleSearch)}
          />
        </View>
        {isLoading && <Spinner />}
        {isError && <LoadingError />}
        {flightsData && !isLoading && !isError && (
          <FlightList flightData={flightsData} />
        )}
      </Container>
    </>
  );
}
