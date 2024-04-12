"use client"
import React from "react";
import { usePetContext } from "@/lib/hooks";

function Stats() {
  const { currentPets } = usePetContext();

  return (
    <section>
      <p className="text-2xl font-bold leading-6 text-center">{currentPets}</p>
      <p className="opacity-80">Current guests</p>
    </section>
  );
}

export default Stats;
