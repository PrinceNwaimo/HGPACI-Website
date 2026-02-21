<div style={{ color: "red" }}>APP RENDERING</div>
import React from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Toaster } from "@/components/ui/toaster";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <Toaster />
    </div>
  );
}
