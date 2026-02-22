import * as yup from "yup";

export const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Israel",
  "Netherlands",
  "Spain",
  "Italy",
  "Japan",
  "Singapore",
  "UAE",
] as const;

export const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
] as const;

export const CHECKOUT_STEPS = ["Shipping", "Payment", "Review"] as const;

export const checkoutSchema = yup.object({
  firstName: yup.string().trim().required("First name is required"),
  lastName: yup.string().trim().required("Last name is required"),
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Enter a valid email"),
  phone: yup
    .string()
    .default("")
    .matches(/^\+?[\d\s\-().]{7,}$/, {
      message: "Enter a valid phone number",
      excludeEmptyString: true,
    }),
  address1: yup.string().trim().required("Address is required"),
  address2: yup.string().default(""),
  country: yup.string().required("Country is required"),
  city: yup.string().trim().required("City is required"),
  state: yup.string().default("").when("country", {
    is: "United States",
    then: (s) => s.required("State is required"),
    otherwise: (s) => s.notRequired(),
  }),
  zip: yup.string().trim().required("ZIP / Postal code is required"),
});

export type CheckoutFormData = yup.InferType<typeof checkoutSchema>;
