import { ParsedFlightItinerary } from "@/hooks/useSearchFlights";
import {
  parseFlightItineraries,
  parseItinerary,
} from "./parsedFlightItineraries";

export interface BookingOption {
  name: string;
  cost: string;
  url: string;
}

export interface FlightDetailParsed {
  itinerary: ParsedFlightItinerary;
  destinationImage: string | null;
  bookingOptions: BookingOption[];
}

export function parseFlightDetails(rawData: any): FlightDetailParsed {
  const itinerary = rawData?.data?.itinerary ?? {};
  const parsedItinerary = parseItinerary(itinerary);
  const destinationImage = itinerary?.destinationImage ?? null;
  const pricingOptions = itinerary?.pricingOptions ?? [];

  const bookingOptions: BookingOption[] = pricingOptions.flatMap(
    (option: any) =>
      option?.agents?.map((agent: any) => ({
        name: `Book with ${agent?.name ?? "unknown agent"}`,
        cost: `$${agent?.price?.toFixed(2) ?? 0}`,
        url: agent?.url ?? "",
      })) ?? [],
  );

  return {
    itinerary: parsedItinerary,
    destinationImage,
    bookingOptions,
  };
}
