"use client";
import { Navbar } from "../components/Navbar";
import { Banner } from "../components/Banner";
import { Footer } from "../components/Footer";
import { AIChatbot } from "../components/AIChatbot";
import { useState } from "react";

export default function Home() {
  const [isWalletOpen, setIsWalletOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar toggleWalletSelection={() => setIsWalletOpen(true)} />
      <main className="flex-grow">
        <Banner
          isOpen={isWalletOpen}
          closeWalletSelection={() => setIsWalletOpen(false)}
        />
      </main>
      <Footer />
      <AIChatbot />
    </div>
  );
}
