import api from "@/lib/api";
import {
  FlightDetailParsed,
  parseFlightDetails,
} from "@/lib/utils/parseFlightDetails";
import { useQuery } from "@tanstack/react-query";

export type Leg = {
  destination: string;
  origin: string;
  date: string;
};

interface FlightDetailsParams {
  itineraryId: string;
  legs: Leg[];
  sessionId: string;
  adults: string;
  childrens?: string;
  infants?: string;
}

export const flightDetails = async (
  params: FlightDetailsParams,
): Promise<FlightDetailParsed> => {
  try {
    const res = await api.get("/v1/flights/getFlightDetails", { params });
    const parsedData = parseFlightDetails(res.data);
    return parsedData;
  } catch (error: any) {
    throw error;
  }
};

export const useFlightDetails = (params: FlightDetailsParams) => {
  return useQuery({
    queryKey: ["flights", params],
    queryFn: () => flightDetails(params),
    retry: 0,
  });
};
