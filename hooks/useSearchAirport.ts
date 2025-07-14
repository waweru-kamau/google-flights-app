import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export interface AirportResponse {
  status: boolean;
  timestamp: number;
  data: Airport[];
}

export interface Airport {
  skyId: string;
  entityId: string;
  presentation: Presentation;
  navigation: Navigation;
}

export interface Navigation {
  entityId: string;
  entityType: string;
  localizedName: string;
  relevantFlightParams: RelevantFlightParams;
  relevantHotelParams: RelevantHotelParams;
}

export interface RelevantFlightParams {
  skyId: string;
  entityId: string;
  flightPlaceType: string;
  localizedName: string;
}

export interface RelevantHotelParams {
  entityId: string;
  entityType: string;
  localizedName: string;
}

export interface Presentation {
  title: string;
  suggestionTitle: string;
  subtitle: string;
}

export const searchAirport = async (params: {
  query: string;
}): Promise<AirportResponse> => {
  try {
    const res = await api.get("/v1/flights/searchAirport", { params });
    return res.data;
  } catch (error: any) {
    throw error;
  }
};

export const useSearchAirport = (params: { query: string }) => {
  return useQuery({
    queryKey: ["airport", params],
    queryFn: () => searchAirport(params),
    enabled: params.query.length > 0,
    retry: 0,
  });
};
