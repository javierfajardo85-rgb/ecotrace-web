export type ContactInquiryId =
  | "general"
  | "sales"
  | "partnerships"
  | "demo"
  | "whitepaper";

export type ContactInquiryOption = {
  id: ContactInquiryId;
  label: string;
};

export const CONTACT_INQUIRY_OPTIONS: readonly ContactInquiryOption[] = [
  { id: "general", label: "General Inquiry" },
  { id: "demo", label: "Alpha Access" },
  { id: "whitepaper", label: "Whitepaper Access" },
  { id: "partnerships", label: "Strategic Partnerships" },
] as const;
