import { z } from "zod";
import { DEFAULT_PET_IMAGE } from "./constants";

export const petIdSchema = z.string().cuid()

export const petFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, { message: "Name is required" })
      .max(100, { message: "Name too long :(" }),
    ownerName: z
      .string()
      .trim()
      .min(3, { message: "Name is required" })
      .max(100, { message: "Name too long :(" }),
    imageUrl: z.union([
      z.literal(""),
      z.string().url({ message: "Image url must be a valid url" }),
    ]),
    age: z.coerce.number().int().positive().max(999),
    notes: z.union([
      z.literal(""),
      z.string().trim().max(600, { message: "Notes are too long" }),
    ]),
  })
  .transform((data) => ({
    ...data,
    imageUrl: data.imageUrl || DEFAULT_PET_IMAGE,
  }));

export type TPetForm = z.infer<typeof petFormSchema>;