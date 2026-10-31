export const GRIEVANCE_OFFICER = {
  name: "Narendra Atkare",
  designation: "Director",
  email: "narendra@unicorntechnologiess.com",
  phone: "+91 99212 24567",
  address:
    "382, Near Trikoni Garden, Shankar Nagar, Nagpur, Maharashtra 440010",
  hours: "Mon–Sat, 10:00 AM – 7:00 PM IST",
};

export const GRIEVANCE_TIMELINES = {
  acknowledge: "within 48 hours",
  resolve: "within 30 days",
  dataMax: "no later than 90 days",
};

export const GRIEVANCE_CATEGORIES = [
  { value: "data_access", label: "Access to my personal data" },
  { value: "data_correction", label: "Correct my personal data" },
  { value: "data_erasure", label: "Delete my personal data" },
  { value: "consent_withdrawal", label: "Withdraw consent / stop messages" },
  { value: "data_misuse", label: "Misuse or breach of my data" },
  { value: "service_complaint", label: "Complaint about a service or payment" },
  { value: "other", label: "Other" },
] as const;
