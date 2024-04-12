"use server";
import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { petFormSchema, petIdSchema } from "@/lib/validations";
import { auth, signIn, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { checkAuth } from "@/lib/server-utils";

// --- user actions ---
export async function singUp(formData: FormData) {
  const hashedPassword = await bcrypt.hash(
    formData.get("password") as string,
    10
  );

  await prisma.user.create({
    data: {
      email: formData.get("email") as string,
      hashedPassword,
    },
  });

  await signIn("credentials", formData);
}

export async function logIn(formData: FormData) {
  const authData = Object.fromEntries(formData.entries());
  console.log(authData);
  await signIn("credentials", authData);
  redirect("/app/dashboard");
}

export async function logOut() {
  await signOut({ redirectTo: "/" });
}

// --- pet actions ---
export async function addPet(pet: unknown) {
  await sleep(1000);
  const session = await checkAuth();

  const validatedPet = petFormSchema.safeParse(pet);
  if (!validatedPet.success) {
    return {
      message: "Invalid pet data.",
    };
  }

  try {
    await prisma.pet.create({
      data: {
        ...validatedPet.data,
        user: {
          connect: {
            id: session.user?.id,
          },
        },
      },
    });
  } catch (error) {
    return {
      message: "Could not add pet",
    };
  }
  revalidatePath("/app", "layout");
}

export async function updatePet(petId: unknown, newPetData: unknown) {
  // authentication check
  const session = await checkAuth();

  // Validation
  const validatedPet = petFormSchema.safeParse(newPetData);
  const validatedId = petIdSchema.safeParse(petId);

  if (!validatedPet.success || !validatedId.success) {
    return {
      message: "Invalid pet data.",
    };
  }
  // Authorization check
  const pet = await prisma.pet.findUnique({
    where: {
      id: validatedId.data,
    },
  });
  if (!pet) {
    return {
      message: "Pet not found.",
    };
  }
  if (pet.userId !== session.user.id) {
    return {
      message: "Not authorized.",
    };
  }
  // db mutation
  try {
    await prisma.pet.update({
      where: {
        id: validatedId.data,
      },
      data: validatedPet.data,
    });
  } catch (error) {
    return {
      message: "Could not edit pet",
    };
  }
  revalidatePath("/app", "layout");
}

export async function deletePet(petId: unknown) {
  // Auth
  const session = await checkAuth();

  // Validation
  const validatedId = petIdSchema.safeParse(petId);
  if (!validatedId.success) {
    return {
      message: "Invalid pet data.",
    };
  }
  await sleep(1000);

  // Authcheck
  const pet = await prisma.pet.findUnique({
    where: {
      id: validatedId.data,
    },
  });
  if (!pet) {
    return {
      message: "Pet not found.",
    };
  }
  if (pet.userId !== session.user.id) {
    return {
      message: "Not authorized.",
    };
  }

  // mutation
  try {
    await prisma.pet.delete({
      where: {
        id: validatedId.data,
      },
    });
  } catch (error) {
    return {
      message: "Could not edit Pet",
    };
  }
  revalidatePath("/app", "layout");
}

export async function getPetsByUserId() {
  const session = await checkAuth();
  try {
    const pets = await prisma.pet.findMany({
      where: {
        userId: session.user?.id,
      },
    });
    console.log("getting those...", pets);
    return pets;
  } catch (error) {
    throw new Error(`Error fetching pets: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
}
