import { ParsedFlightItinerary } from "@/hooks/useSearchFlights";
import { format, differenceInMinutes } from "date-fns";
import { formatDuration } from "./formatDuration";

export const parseItinerary = (
  itinerary: any,
  sessionId?: string,
): ParsedFlightItinerary => {
  const departureLeg = itinerary?.legs?.[0];
  const returnLeg = itinerary?.legs?.[1];

  const segments = departureLeg?.segments ?? [];
  const stopCities = segments
    .slice(0, -1)
    .map(
      (segment: any) =>
        segment.destination?.parent?.name ?? segment.destination?.name,
    )
    .filter(Boolean);

  const stopCount = departureLeg?.stopCount ?? 0;

  let stopsString = "Unknown";
  if (stopCount === 0) {
    stopsString = "Nonstop";
  } else if (stopCount === 1) {
    stopsString = `1 stop in ${stopCities[0] ?? "unknown location"}`;
  } else if (stopCount >= 2) {
    const cities = stopCities.slice(0, 2).join(" and ");
    stopsString = `${stopCount} stops in ${cities}`;
  }

  return {
    itineraryId: itinerary?.id ?? null,
    sessionId,
    departureTime: format(departureLeg?.departure, "h:mm a") ?? null,
    // format departure date as Tue, Jul 20
    departureDate: format(departureLeg?.departure, "ccc, LLL dd") ?? null,
    departureAirport: departureLeg?.origin?.displayCode ?? null,
    arrivalTime: returnLeg?.arrival
      ? format(returnLeg?.arrival, "h:mm a")
      : departureLeg?.arrival
        ? format(departureLeg?.arrival, "h:mm a")
        : null,
    arrivalAirport:
      returnLeg?.destination?.displayCode ??
      departureLeg?.destination?.displayCode ??
      null,
    departureCity: departureLeg?.origin?.city ?? null,
    arrivalCity:
      returnLeg?.destination?.city ?? departureLeg?.destination?.city ?? null,
    duration: formatDuration(
      differenceInMinutes(
        new Date(returnLeg?.arrival ?? departureLeg?.arrival),
        new Date(departureLeg?.departure),
      ),
    ),
    stops: stopsString,
    legs: itinerary.legs.map((leg: any) => ({
      destination: leg?.destination?.id,
      origin: leg?.origin?.id,
      date: format(leg?.departure, "yyyy-MM-dd"),
    })),
    flightName: departureLeg?.carriers?.marketing?.[0]?.name ?? null,
    logo: departureLeg?.carriers?.marketing?.[0]?.logoUrl ?? null,
    emission:
      itinerary?.eco?.ecoContenderDelta > 0
        ? `-${Math.floor(itinerary?.eco?.ecoContenderDelta)}% emissions`
        : "Avg emissions",
    cost: itinerary?.price?.formatted ?? null,
    tripType: itinerary?.legs?.length === 2 ? "round-trip" : "one-way",
  };
};

export const parseFlightItineraries = (
  rawData: any,
): ParsedFlightItinerary[] => {
  const itineraries = rawData?.data?.itineraries ?? [];
  const sessionId = rawData?.data?.context?.sessionId ?? null;
  console.log("SESSION ID", { sessionId });
  return itineraries.map((itinerary: any) =>
    parseItinerary(itinerary, sessionId),
  );
};
