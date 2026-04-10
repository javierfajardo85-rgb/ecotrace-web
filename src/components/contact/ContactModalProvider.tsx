"use client";

import * as React from "react";

import { ContactInquiryModal } from "@/components/contact/ContactInquiryModal";
import type { ContactInquiryId } from "@/components/contact/contact-inquiry-types";

type ContactModalContextValue = {
  openContactModal: (initialInquiry?: ContactInquiryId) => void;
  closeContactModal: () => void;
};

const ContactModalContext = React.createContext<ContactModalContextValue | null>(
  null,
);

export function ContactModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [defaultInquiryId, setDefaultInquiryId] =
    React.useState<ContactInquiryId>("general");

  const openContactModal = React.useCallback((initialInquiry?: ContactInquiryId) => {
    setDefaultInquiryId(initialInquiry ?? "general");
    setIsOpen(true);
  }, []);

  const closeContactModal = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = React.useMemo(
    () => ({ openContactModal, closeContactModal }),
    [openContactModal, closeContactModal],
  );

  return (
    <ContactModalContext.Provider value={value}>
      {children}
      <ContactInquiryModal
        isOpen={isOpen}
        onClose={closeContactModal}
        defaultInquiryId={defaultInquiryId}
      />
    </ContactModalContext.Provider>
  );
}

export function useContactModal(): ContactModalContextValue {
  const ctx = React.useContext(ContactModalContext);
  if (!ctx) {
    throw new Error("useContactModal must be used within ContactModalProvider");
  }
  return ctx;
}
