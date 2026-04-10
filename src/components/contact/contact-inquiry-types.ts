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
  { id: "general", label: "General Contact" },
  { id: "sales", label: "Contact Sales" },
  { id: "whitepaper", label: "Technical Whitepaper" },
  { id: "partnerships", label: "Strategic Partnerships" },
  { id: "demo", label: "Request Demo" },
] as const;
