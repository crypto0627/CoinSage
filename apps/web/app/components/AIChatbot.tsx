"use client";

import { useState } from "react";
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Input } from "@repo/ui/components/ui/input";
import { MessageCircle, X } from "lucide-react";

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "bot"; content: string }[]
  >([]);
  const [input, setInput] = useState("");
  const toggleChatbot = () => setIsOpen(!isOpen);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { role: "user", content: input }]);
    setInput("");

    // TODO: Implement actual chatbot logic here
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: `You said: ${input}` },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className="w-80 bg-gray-900 border-cyan-500 border-8 rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-cyan-500">
            <CardTitle className="text-sm font-medium text-cyan-400 m-2">
              CoinSage bot
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleChatbot}
              className="text-cyan-400 hover:text-cyan-300"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4 mt-4 h-[300px] overflow-auto scrollbar-thin scrollbar-thumb-cyan-700 scrollbar-track-gray-800">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`rounded-lg p-2 max-w-[80%] ${
                      msg.role === "user"
                        ? "bg-cyan-600 text-white"
                        : "bg-gray-800 text-cyan-300 border border-cyan-700"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex p-2">
            <form
              onSubmit={handleSubmit}
              className="flex w-full justify-between gap-2"
            >
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-gray-800 border-cyan-600 text-cyan-100 placeholder-cyan-400 w-full px-2"
              />
              <Button
                type="submit"
                className="bg-cyan-600 hover:bg-cyan-500 text-white"
              >
                Send
              </Button>
            </form>
          </CardFooter>
        </Card>
      ) : (
        <Button
          onClick={toggleChatbot}
          size="icon"
          className="rounded-full h-12 w-12 bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/50"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
