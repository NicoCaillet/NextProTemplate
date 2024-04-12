import Footer from "@/components/app-footer";
import Header from "@/components/app-header";
import React from "react";
import BackgroundPattern from "@/components/background-pattern";
import PetContextProvider from "@/contexts/pet-context-provider";
import prisma from "@/lib/db";
import { Toaster } from "@/components/ui/sonner";
import SearchContextProvider from "@/contexts/search-context-provider";
import { getPetsByUserId } from "@/actions/actions";
import {auth} from "@/lib/auth";
type LayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  const data = await getPetsByUserId()
  return (
    <>
      <BackgroundPattern />
      <div className="m-auto max-w-[1050px] px-4 flex flex-col min-h-screen">
        <Header />
        <PetContextProvider data={data}>
          <SearchContextProvider>{children}</SearchContextProvider>
        </PetContextProvider>
        <Footer />
      </div>

      <Toaster position="top-right" />
    </>
  );
}
