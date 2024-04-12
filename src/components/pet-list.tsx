"use client";
import { usePetContext, useSearchContext } from "@/lib/hooks";
import { Pet } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useMemo } from "react";

export default function PetList() {
  const { pets, selectedPetId, handleChangeSelectedPetId } = usePetContext();
  const { searchQuery } = useSearchContext();

  const filteredPets = useMemo(
    () => pets.filter((pet) => pet.name.toLowerCase().includes(searchQuery)),
    [pets, searchQuery]
  );

  return (
    <ul className="bg-white border-b border-light overflow-y-auto">
      {filteredPets.map((pet, i) => (
        <li key={i}>
          <button
            className={cn(
              "flex items-center h-[70px] w-full cursor-pointer px-5 text-base gap-3 hover:bg-[#EFF1F2]",
              {
                "bg-[#EFF1F2]": pet.id === selectedPetId,
              }
            )}
            onClick={() => handleChangeSelectedPetId(pet.id)}
          >
            <Image
              src={pet.imageUrl}
              alt="pet image"
              width={45}
              height={45}
              className="w-[45px] h-[45px] rounded-full object-cover"
            />
            <p className="font-semibold"> {pet.name} </p>
          </button>
        </li>
      ))}
    </ul>
  );
}
