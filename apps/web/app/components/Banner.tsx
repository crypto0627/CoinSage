import { WalletSelection } from "./WalletSelection";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { BarChart3, Brain, Shield } from "lucide-react";

interface BannerProps {
  isOpen: boolean;
  closeWalletSelection: () => void;
}

export function Banner({ isOpen, closeWalletSelection }: BannerProps) {
  const features = [
    {
      title: "AI-Powered Suggestions",
      description:
        "Get personalized investment suggestions powered by advanced AI algorithms.",
      icon: <Brain className="h-6 w-6" />,
    },
    {
      title: "Real-Time Analytics",
      description:
        "Track your portfolio performance with real-time data and insights.",
      icon: <BarChart3 className="h-6 w-6" />,
    },
    {
      title: "Secure Blockchain Integration",
      description:
        "Connect securely to the Arbitrum Sepolia network for transactions.",
      icon: <Shield className="h-6 w-6" />,
    },
  ];
  return (
    <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Welcome to CoinSage
          </span>
          <span className="block mt-2">Smart Crypto Investments</span>
        </h1>
        <p className="mt-6 text-xl max-w-lg text-gray-300">
          Get AI-powered cryptocurrency investment suggestions and manage your
          portfolio with ease.
        </p>

        {isOpen ? (
          <WalletSelection closeWalletSelection={closeWalletSelection} />
        ) : null}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-10">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {feature.icon}
                  <span className="ml-3">{feature.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
