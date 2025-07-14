import { ParsedFlightItinerary } from "@/hooks/useSearchFlights";
import React, { createContext, useContext, useState, ReactNode } from "react";
export enum FlightDirection {
  OUTBOUND,
  RETURN,
}
export type Flight = ParsedFlightItinerary & {
  direction: FlightDirection;
};

type FlightContextType = {
  selectedFlights: Flight[];
  addFlight: (flight: ParsedFlightItinerary) => void;
  clearFlights: () => void;
  removeFlightAtIndex: (index: number) => void;
};

const FlightContext = createContext<FlightContextType | undefined>(undefined);

export const FlightProvider = ({ children }: { children: ReactNode }) => {
  const [selectedFlights, setSelectedFlights] = useState<Flight[]>([]);

  const addFlight = (flight: ParsedFlightItinerary) => {
    if (selectedFlights.length === 2) {
      setSelectedFlights([
        ...selectedFlights.slice(0, 1),
        { ...flight, direction: FlightDirection.RETURN },
      ]);
    } else if (selectedFlights.length === 0) {
      setSelectedFlights([
        ...selectedFlights,
        { ...flight, direction: FlightDirection.OUTBOUND },
      ]);
    } else {
      setSelectedFlights([
        ...selectedFlights,
        { ...flight, direction: FlightDirection.RETURN },
      ]);
    }
  };

  const removeFlightAtIndex = (index: number) => {
    //if index is 0, remove the outbound flight and add the return flight
    if (index === 0) {
      clearFlights();
    } else {
      setSelectedFlights([
        ...selectedFlights.slice(0, index),
        ...selectedFlights.slice(index + 1),
      ]);
    }
  };

  const clearFlights = () => {
    setSelectedFlights([]);
  };

  return (
    <FlightContext.Provider
      value={{ selectedFlights, addFlight, clearFlights, removeFlightAtIndex }}
    >
      {children}
    </FlightContext.Provider>
  );
};

export const useFlight = (): FlightContextType => {
  const context = useContext(FlightContext);
  if (!context) {
    throw new Error("useFlight must be used within a FlightProvider");
  }
  return context;
};
