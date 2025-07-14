import * as z from "zod";

const nonEmptyString = (
  message: string = "Must be 1 or more characters long",
) => z.string().min(1, { message });

const booleanWithDefault = (defaultValue: boolean) =>
  z.boolean().default(defaultValue);
const emailSchema = z.string().email({ message: "Invalid email address" });
const passwordSchema = z
  .string()
  .min(8, { message: "Must be 8 or more characters long" });

export const signUpSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirm: passwordSchema,
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const searchFlightsSchema = z
  .object({
    departureDate: z.date(),
    returnDate: z.date().optional(),
    adults: z.number(),
    children: z.number(),
    infants: z.number(),
    originAirport: z.object({
      name: nonEmptyString(),
      skyId: nonEmptyString(),
      entityId: nonEmptyString(),
    }),
    destinationAirport: z.object({
      name: nonEmptyString(),
      skyId: nonEmptyString(),
      entityId: nonEmptyString(),
    }),
    cabinClass: z.enum(["economy", "premium_economy", "business", "first"]),
    trip: z.enum(["round-trip", "one-way"]),
  })
  .refine(
    (data) => {
      if (data.trip === "round-trip" && data.returnDate) {
        return data.returnDate >= data.departureDate;
      }

      if (data.trip === "round-trip" && !data.returnDate) {
        return false;
      }

      return true;
    },
    {
      message: "Return date must be after departure date",
      path: ["returnDate"],
    },
  )
  .refine(
    (data) => {
      if (
        !data.originAirport.name ||
        !data.originAirport.skyId ||
        !data.originAirport.entityId ||
        !data.destinationAirport.name ||
        !data.destinationAirport.skyId ||
        !data.destinationAirport.entityId
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Please select origin and destination airports",
      path: ["originAirport", "destinationAirport"],
    },
  );

export type SignUpFormValues = z.infer<typeof signUpSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
export type SearchFlightsFormValues = z.infer<typeof searchFlightsSchema>;
