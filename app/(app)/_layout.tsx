import React from "react";
import { Stack } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchFlightsSchema } from "@/lib/zodSchema";
import { FlightProvider } from "@/context/FlightContext";

export default function Layout() {
  const methods = useForm({
    resolver: zodResolver(searchFlightsSchema),
    defaultValues: {
      adults: 1,
      children: 0,
      infants: 0,
      originAirport: {
        name: "",
        skyId: "",
        entityId: "",
      },
      destinationAirport: {
        name: "",
        skyId: "",
        entityId: "",
      },
      cabinClass: "economy",
      trip: "round-trip",
    },
  });
  return (
    <FormProvider {...methods}>
      <FlightProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </FlightProvider>
    </FormProvider>
  );
}
