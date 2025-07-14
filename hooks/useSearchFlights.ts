import { parseFlightItineraries } from "@/lib/utils/parsedFlightItineraries";
import { useQuery } from "@tanstack/react-query";
import { Leg } from "./useFlightDetails";
import api from "@/lib/api";

interface SearchFlightsParams {
  originSkyId: string;
  destinationSkyId: string;
  originEntityId: string;
  destinationEntityId: string;
  date: string;
  cabinClass: "economy" | "premium_economy" | "business" | "first";
  returnDate?: string;
  adults: string;
  childrens?: string;
  infants?: string;
  sortBy?: string;
  currency?: string;
  market?: string;
  countryCode?: string;
}

export interface ParsedFlightItinerary {
  itineraryId: string | null;
  sessionId?: string | null;
  departureTime: string | null;
  departureDate: string | null;
  departureAirport: string | null;
  arrivalTime: string | null;
  arrivalAirport: string | null;
  departureCity: string | null;
  arrivalCity: string | null;
  duration: string | null;
  stops: string | null;
  legs: Leg[] | null;
  flightName: string | null;
  logo: string | null;
  emission: string | null;
  cost: string | null;
  tripType: "round-trip" | "one-way" | null;
}

export const searchFlights = async (
  params: SearchFlightsParams,
): Promise<ParsedFlightItinerary[]> => {
  try {
    const res = await api.get("/v2/flights/searchFlights", { params });
    const parsedData = parseFlightItineraries(res.data);
    return parsedData;
  } catch (error: any) {
    throw error;
  }
};

export const useSearchFlights = (params: SearchFlightsParams) => {
  return useQuery({
    queryKey: ["flights", params],
    queryFn: () => searchFlights(params),
    enabled: false,
    retry: 0,
  });
};
