import { Button } from "@/components/ui/button";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-card";
import { TypewriterEffect } from "@/components/ui/typewritter";
import { Vortex } from "@/components/ui/vortex";
import { features, heroWords, testimonials } from "./const";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Marquee from "react-fast-marquee";
import { Separator } from "@/components/ui/separator";

const Landing = () => {
  return (
    <div className="relative h-full">
      {/* Hero */}
      <section className="relative h-[36rem] grid place-items-center">
        <Vortex
          backgroundColor="transparent"
          rangeY={800}
          particleCount={200}
          baseHue={120}
          className="w-full h-full flex flex-col items-center justify-center gap-4"
        >
          <div className="">
            <TypewriterEffect words={heroWords} />
          </div>
          <h2 className="opacity-75">
            Backed by Royal Melbourne Institute of Technology Vietnam
          </h2>
          <Button className="mt-8 px-8 py-6 animate-bounce">Get Started</Button>
        </Vortex>
      </section>

      {/* Testinomials */}
      <section>
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="normal"
        />
      </section>

      {/* Problems */}
      <section className="mt-20">
        <h1 className="text-primary font-semibold text-5xl">
          Why HealthLight?
        </h1>
        <div className="grid grid-cols-3 gap-3 mt-4">
          <Card>
            <CardHeader>Hallucination</CardHeader>
            <CardContent>
              Hallucinations are experiences that involve the perception of
              things that are not present in the environment. They can affect
              all five senses, and they can be disturbing or enjoyable.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>Hallucination</CardHeader>
            <CardContent>
              Hallucinations are experiences that involve the perception of
              things that are not present in the environment. They can affect
              all five senses, and they can be disturbing or enjoyable.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>Hallucination</CardHeader>
            <CardContent>
              Hallucinations are experiences that involve the perception of
              things that are not present in the environment. They can affect
              all five senses, and they can be disturbing or enjoyable.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section className="mt-20">
        <h1 className="text-primary font-semibold text-5xl">Features</h1>
        <HoverEffect items={features} />
      </section>

      {/* Trusted by */}
      <section className="mt-20">
        <h1 className="text-primary font-semibold text-3xl">
          Trusted by engineers at
        </h1>
        <div className="flex gap-2">
          <Marquee className="mt-12" autoFill={true}>
            <img src="shopback.png" alt="" className="w-full h-20 px-4" />
            <img src="anz.png" alt="" className="w-full h-20 px-4" />
            <img src="hcltech.png" alt="" className="w-full h-20 px-4" />
            <img src="employmenthero.png" alt="" className="w-full h-20 px-4" />
          </Marquee>
        </div>
      </section>

      {/* Footer */}
      <section className="mt-36">
        <Separator />
        <h1 className="text-primary text-xl font-medium opacity-50 mt-8">
          Created at RMIT Vietnam
        </h1>
      </section>
    </div>
  );
};

export default Landing;
