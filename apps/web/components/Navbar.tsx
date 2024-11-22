"use client";
import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useAccount, useDisconnect } from "wagmi";
import { Chain } from "viem";
import { NavbarProps } from "../types/ui";
import { formatAddress } from "../utils/stringify";

export function Navbar({ toggleWalletSelection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [chain, setChain] = useState<Chain | undefined>(undefined);

  const account = useAccount();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (account.status === "connected") {
      setConnected(true);
      setAddress(account.address.toString());
      setChain(account.chain ?? undefined);
    } else {
      setConnected(false);
      setAddress("");
      setChain(undefined);
    }
  }, [account.status]);

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold">CoinSage</span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {connected && (
                <Link
                  href="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                >
                  Profile
                </Link>
              )}
              {connected ? (
                <div className="flex flex-row gap-2">
                  <span
                    className="px-3 py-2 rounded-md text-sm font-medium bg-cyan-600 hover:bg-cyan-500"
                    onClick={toggleWalletSelection}
                  >
                    {formatAddress(address)}
                  </span>
                  <span className="px-3 py-2 rounded-md text-sm font-medium bg-cyan-600 hover:bg-cyan-500">
                    {chain?.name}
                  </span>
                  <span
                    className="px-3 py-2 rounded-md text-sm font-medium bg-cyan-600 hover:bg-cyan-500"
                    onClick={() => disconnect()}
                  >
                    Disconnect
                  </span>
                </div>
              ) : (
                <button
                  onClick={toggleWalletSelection}
                  className="px-3 py-2 rounded-md text-sm font-medium bg-cyan-600 hover:bg-cyan-500"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800">
            {connected && (
              <Link
                href="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
              >
                Profile
              </Link>
            )}
            {connected ? (
              <div className="flex flex-col gap-2">
                <span
                  className="px-3 py-2 rounded-md text-sm font-medium bg-cyan-600 hover:bg-cyan-500"
                  onClick={toggleWalletSelection}
                >
                  {address}
                </span>
                <span className="px-3 py-2 rounded-md text-sm font-medium bg-cyan-600 hover:bg-cyan-500">
                  {chain?.name}
                </span>
                <span
                  className="px-3 py-2 rounded-md text-sm font-medium bg-cyan-600 hover:bg-cyan-500"
                  onClick={() => disconnect()}
                >
                  Disconnect
                </span>
              </div>
            ) : (
              <button
                onClick={toggleWalletSelection}
                className="px-3 py-2 rounded-md text-sm font-medium bg-cyan-600 hover:bg-cyan-500"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
