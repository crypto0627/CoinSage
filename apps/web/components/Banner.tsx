"use client";
import { WalletSelection } from "./WalletSelection";
import { Plus, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { BannerProps } from "../types/ui";

export function Banner({ isOpen, closeWalletSelection }: BannerProps) {
  const account = useAccount();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    setIsConnected(account.status === "connected");
  }, [account.status]);

  return (
    <>
      {isConnected ? (
        <div className="flex h-screen bg-gray-100">
          {/* Left Sidebar */}
          <div className="w-64 bg-gray-900 p-4">
            <button className="w-full flex items-center justify-center gap-2 bg-white text-gray-900 rounded-md p-3 hover:bg-gray-100 transition-colors">
              <Plus className="h-5 w-5" />
              <span>New Chat</span>
            </button>

            <div className="mt-4 space-y-2">
              {/* Saved Chat List */}
              <div className="flex items-center gap-2 text-gray-300 hover:bg-gray-800 rounded-md p-2 cursor-pointer">
                <MessageSquare className="h-4 w-4" />
                <span>Chat History 1</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 hover:bg-gray-800 rounded-md p-2 cursor-pointer">
                <MessageSquare className="h-4 w-4" />
                <span>Chat History 2</span>
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-6">
                {/* AI Response */}
                <div className="flex gap-4 bg-white p-6 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                    AI
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800">
                      Hello! I am CoinSage AI Assistant, pleased to serve you.
                      How may I help you today?
                    </p>
                  </div>
                </div>

                {/* User Message */}
                <div className="flex gap-4 bg-blue-50 p-6 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    You
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800">
                      What is the current price of Bitcoin?
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
                  Send
                </button>
              </div>
            </div>
          </div>

          {isOpen ? (
            <WalletSelection closeWalletSelection={closeWalletSelection} />
          ) : null}
        </div>
      ) : (
        <div className="flex h-screen bg-gray-100 flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">
            Please connect your web3 wallet or create it by web3Auth
          </h1>
          {isOpen ? (
            <WalletSelection closeWalletSelection={closeWalletSelection} />
          ) : null}
        </div>
      )}
    </>
  );
}
