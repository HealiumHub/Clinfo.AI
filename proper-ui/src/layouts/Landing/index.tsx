import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-card";
import { Separator } from "@/components/ui/separator";
import { TypewriterEffect } from "@/components/ui/typewritter";
import { Vortex } from "@/components/ui/vortex";
import Marquee from "react-fast-marquee";
import { features, heroWords, testimonials } from "./const";
import { EvervaultCard } from "@/components/ui/evervault-card";

const Landing = () => {
  return (
    <div className="relative w-full h-full">
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
      <section className="max-w-6xl mx-auto">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="normal"
        />
      </section>

      {/* Problems */}
      <section className="max-w-6xl mx-auto mt-20">
        <h1 className="text-primary font-semibold text-5xl">
          Why HealthLight?
        </h1>
        <div className="grid grid-cols-3 gap-3 mt-8 -skew-x-3">
          <Card>
            <CardHeader>
              <EvervaultCard text="Hallucination" />
            </CardHeader>
            <CardContent>
              Hallucinations are experiences that involve the perception of
              things that are not present in the environment. They can affect
              all five senses, and they can be disturbing or enjoyable.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <EvervaultCard text="Hallucination" />
            </CardHeader>
            <CardContent>
              Hallucinations are experiences that involve the perception of
              things that are not present in the environment. They can affect
              all five senses, and they can be disturbing or enjoyable.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <EvervaultCard text="Hallucination" />
            </CardHeader>
            <CardContent>
              Hallucinations are experiences that involve the perception of
              things that are not present in the environment. They can affect
              all five senses, and they can be disturbing or enjoyable.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto mt-20">
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
