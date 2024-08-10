import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AmbulanceIcon, ArrowUp } from "lucide-react";
import React from "react";

const exampleQuestions = [
  {
    content: "What is the best way to prevent the spread of COVID-19?",
    icon: <AmbulanceIcon className="text-primary h-8 w-8" />,
  },
  {
    content: "What is the best way to prevent the spread of COVID-19?",
    icon: <AmbulanceIcon className="text-primary h-8 w-8" />,
  },
  {
    content: "What is the best way to prevent the spread of COVID-19?",
    icon: <AmbulanceIcon className="text-primary h-8 w-8" />,
  },
  {
    content: "What is the best way to prevent the spread of COVID-19?",
    icon: <AmbulanceIcon className="text-primary h-8 w-8" />,
  },
];

const Chat = () => {
  return (
    <div className="bg-background w-full h-full">
      <div className="w-full h-full flex flex-col px-8 py-4">
        <div className="w-full h-full">
          <div className="my-auto h-fit w-full flex flex-col items-center gap-4 mt-8">
            <img src="/RMIT_logo_red.png" alt="" className="h-40 w-40" />
            <h1 className="text-2xl font-bold">Precise Medical Information</h1>
            <h1 className="text-xl font-medium opacity-75 mt-8">
              Example questions:
            </h1>
            <div className="grid grid-cols-4 gap-4 px-16">
              {exampleQuestions.map((question) => (
                <Card
                  className="hover:scale-105 transition-all hover:cursor-pointer hover:border-primary"
                  key={question.content}
                >
                  <CardHeader>{question.icon}</CardHeader>
                  <CardContent>
                    <CardDescription className="text-left">
                      {question.content}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-auto relative mx-36">
          <div className="relative">
            <Input
              placeholder="Enter your question here"
              className="rounded-full"
            />
            <div className="rounded-full p-1 bg-secondary absolute right-1 top-1/2 -translate-y-1/2">
              <ArrowUp className="text-primary h-6 w-6" />
            </div>
          </div>
          <p className="text-xs opacity-50 mt-4">
            HealthLight could make mistake. Please contact us to make
            HealthLight better
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
