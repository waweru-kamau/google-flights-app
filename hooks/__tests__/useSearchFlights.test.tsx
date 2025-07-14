// __tests__/searchFlights.test.ts
import {
  searchFlights,
  ParsedFlightItinerary,
  SearchFlightsParams,
} from "../path/to/useSearchFlights";
import api from "@/lib/api";
import { parseFlightItineraries } from "@/lib/utils/parsedFlightItineraries";

jest.mock("@/lib/api");
jest.mock("@/lib/utils/parsedFlightItineraries");

describe("searchFlights", () => {
  const mockParams: SearchFlightsParams = {
    originSkyId: "123",
    destinationSkyId: "456",
    originEntityId: "789",
    destinationEntityId: "101",
    date: "2025-07-14",
    cabinClass: "economy",
    adults: "1",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches flight data and returns parsed itineraries", async () => {
    const mockApiResponse = { data: { some: "data" } };
    const mockParsedData: ParsedFlightItinerary[] = [
      {
        itineraryId: "id1",
        departureTime: "10:00",
        departureDate: "2025-07-14",
        departureAirport: "LGW",
        arrivalTime: "14:00",
        arrivalAirport: "JFK",
        departureCity: "London",
        arrivalCity: "New York",
        duration: "4h",
        stops: "Nonstop",
        legs: [],
        flightName: "Flight 1",
        logo: null,
        emission: null,
        cost: "100",
        tripType: "one-way",
      },
    ];

    // @ts-ignore
    api.get.mockResolvedValueOnce(mockApiResponse);
    // @ts-ignore
    parseFlightItineraries.mockReturnValueOnce(mockParsedData);

    const result = await searchFlights(mockParams);

    expect(api.get).toHaveBeenCalledWith("/v2/flights/searchFlights", {
      params: mockParams,
    });
    expect(parseFlightItineraries).toHaveBeenCalledWith(mockApiResponse.data);
    expect(result).toEqual(mockParsedData);
  });

  it("throws error when api call fails", async () => {
    const mockError = new Error("API error");
    // @ts-ignore
    api.get.mockRejectedValueOnce(mockError);

    await expect(searchFlights(mockParams)).rejects.toThrow("API error");
  });
});
