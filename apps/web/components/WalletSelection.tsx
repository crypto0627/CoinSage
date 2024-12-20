"use client";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { WalletSelectionProps } from "../types/ui";

export function WalletSelection({
  closeWalletSelection,
}: WalletSelectionProps) {
  const { address, connector, isConnected } = useAccount();
  const { connect, connectors, error } = useConnect();
  const { disconnect } = useDisconnect();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-900/75 backdrop-blur-sm"
      onClick={closeWalletSelection}
    >
      <div
        className="w-full max-w-md mx-auto bg-gray-800 rounded-2xl shadow-2xl border border-cyan-500"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-cyan-500">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            CoinSage 錢包
          </h2>
          <X
            className="h-6 w-6 cursor-pointer text-cyan-400 hover:text-cyan-300 transition-colors"
            aria-hidden="true"
            onClick={closeWalletSelection}
          />
        </div>
        <div className="flex flex-col gap-4 p-6">
          {isClient &&
            (isConnected ? (
              <>
                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold text-cyan-400">
                    Connected to {connector?.name}
                  </div>
                </div>
                <div className="mt-2 text-gray-300 break-all bg-gray-700 p-3 rounded-lg">
                  {address}
                </div>
                <button
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-full hover:from-red-600 hover:to-pink-600 transition duration-300 transform hover:scale-105"
                  onClick={disconnect as any}
                >
                  Disconnect
                </button>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-3">
                  {connectors.map((connector) => (
                    <button
                      key={connector.id}
                      onClick={() => connect({ connector })}
                      className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-full hover:from-cyan-600 hover:to-blue-600 transition duration-300 transform hover:scale-105"
                    >
                      Connect {connector.name}
                    </button>
                  ))}
                </div>
                {error && (
                  <div className="mt-4 text-red-400 bg-red-900/50 p-3 rounded-lg">
                    {error.message}
                  </div>
                )}
              </>
            ))}
        </div>
      </div>
    </div>
  );
}
