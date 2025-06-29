"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingWhatsApp() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "+923218528130"; // Replace with your actual WhatsApp number
    const message = "Hi! I'm interested in your wall decoration services.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40 h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all"
      size="icon"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-6 w-6 text-white" />
    </Button>
  );
}
