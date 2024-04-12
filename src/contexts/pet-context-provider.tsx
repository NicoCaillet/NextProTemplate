"use client";
import { addPet, deletePet, updatePet } from "@/actions/actions";
import { PetEssentials } from "@/lib/types";
import { Pet } from "@prisma/client";
import React, { createContext, useOptimistic, useState } from "react";
import { toast } from "sonner";

type PetContextProviderProps = {
  children: React.ReactNode;
  data: Pet[];
};

type TPetContext = {
  pets: Pet[];
  selectedPetId: Pet["id"] | null;
  handleChangeSelectedPetId: (id: Pet['id']) => void;
  selectedPet: Pet | undefined;
  currentPets: number;
  handleCheckoutPet: (petId: Pet['id']) => Promise<void>;
  handleAddPet: (newPet: PetEssentials) => Promise<void>;
  handleEditPet: (petId: Pet['id'], newPetData: PetEssentials) => Promise<void>;
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  children,
  data,
}: PetContextProviderProps) {
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    data,
    (state, { action, payload }) => {
      switch (action) {
        case "add":
          return [...state, { ...payload, id: Math.random().toString() }];
        case "edit":
          return state.map((pet) => {
            if (pet.id === payload.id) {
              return { ...pet, ...payload.newPetData };
            }
            return pet;
          });
        case "delete":
          return state.filter((pet) => pet.id !== payload);
        default:
          return state;
      }
    }
  );
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const currentPets = optimisticPets.length;

  const handleChangeSelectedPetId = (id: Pet["id"]) => {
    setSelectedPetId(id);
  };

  const handleCheckoutPet = async (petId: Pet["id"]) => {
    setOptimisticPets({ action: "delete", payload: petId });
    await deletePet(petId);
    setSelectedPetId(null);
  };

  const handleAddPet = async (newPet: PetEssentials) => {
    setOptimisticPets({ action: "add", payload: newPet });
    const error = await addPet(newPet);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleEditPet = async (petId: Pet["id"], newPetData: PetEssentials) => {
    setOptimisticPets({ action: "edit", payload: { id: petId, newPetData } });
    const error = await updatePet(petId, newPetData);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
        selectedPetId,
        handleChangeSelectedPetId,
        selectedPet,
        currentPets,
        handleCheckoutPet,
        handleAddPet,
        handleEditPet,
      }}
    >
      {" "}
      {children}{" "}
    </PetContext.Provider>
  );
}
