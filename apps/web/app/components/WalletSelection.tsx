import { BarChart2, Send, SwitchCamera, Wallet, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { SendTransaction } from "../../config/sendTransaction";
import { Balance } from "../../config/balance";
import { WriteContract } from "../../config/writeContract";
import { SwitchChain } from "../../config/switchNetwork";

interface WalletSelectionProps {
  closeWalletSelection: () => void;
}

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
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 backdrop-blur-sm"
      onClick={closeWalletSelection}
    >
      <div
        className="w-full max-w-md mx-auto bg-gray-800 rounded-2xl shadow-2xl border border-cyan-500"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-cyan-500">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Web3Auth X Wagmi
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
                <div className="text-lg font-bold text-cyan-400">
                  Connected to {connector?.name}
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
                <div className="mt-6 space-y-4">
                  <WalletAction icon={<Send />} action={<SendTransaction />} />
                  <WalletAction icon={<Wallet />} action={<Balance />} />
                  <WalletAction
                    icon={<BarChart2 />}
                    action={<WriteContract />}
                  />
                  <WalletAction
                    icon={<SwitchCamera />}
                    action={<SwitchChain />}
                  />
                </div>
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
                      {connector.name}
                    </button>
                  ))}
                </div>
                {error && (
                  <div className="mt-4 text-red-400 bg-red-900 bg-opacity-50 p-3 rounded-lg">
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

function WalletAction({
  icon,
  action,
}: {
  icon: React.ReactNode;
  action: React.ReactNode;
}) {
  return (
    <div className="flex items-center space-x-3 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200">
      <div className="text-cyan-400">{icon}</div>
      <div className="flex-grow">{action}</div>
    </div>
  );
}
