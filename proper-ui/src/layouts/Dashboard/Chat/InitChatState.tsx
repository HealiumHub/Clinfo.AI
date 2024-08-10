import React from "react";

import { AmbulanceIcon, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface InitChatStateProps {}

export const ChatFormSchema = z.object({
  message: z.string().min(2),
});

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

const InitChatState = () => {
  const form = useForm<z.infer<typeof ChatFormSchema>>({
    resolver: zodResolver(ChatFormSchema),
    defaultValues: {
      message: "",
    },
  });
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const onSubmit = async (data: z.infer<typeof ChatFormSchema>) => {
    console.log(data);
    await form.reset();
  };

  const handleCardClick = async (question: string) => {
    form.setValue("message", question);
    await form.handleSubmit(onSubmit)();
  };
  return (
    <div className="w-full h-full flex flex-col px-8 py-4">
      <div className="w-full h-full">
        <div className="my-auto h-fit w-full flex flex-col items-center gap-4 mt-8">
          <img src="/RMIT_logo_red.png" alt="" className="h-40 w-40" />
          <h1 className="text-2xl font-bold">Precise Medical Information</h1>
          <h1 className="text-xl font-medium opacity-75 mt-8">
            Example questions:
          </h1>
          <div className="grid grid-cols-4 gap-4 px-16">
            {exampleQuestions.map((question, index) => (
              <Card
                className="hover:scale-105 transition-all hover:cursor-pointer hover:border-primary"
                key={question.content + index}
                onClick={() => handleCardClick(question.content)}
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter your question here"
                      className="rounded-full"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              ref={submitButtonRef}
              disabled={form.getValues("message") === ""}
              type="submit"
              className="transition-all rounded-full h-8 w-8 grid place-items-center bg-secondary absolute right-1 top-1/2 -translate-y-1/2"
            >
              <ArrowUp className="text-primary h-4 w-4" />
            </Button>
          </form>
        </Form>
        <p className="text-xs opacity-50 mt-4">
          HealthLight could make mistake. Please contact us to make HealthLight
          better
        </p>
      </div>
    </div>
  );
};

export default InitChatState;
