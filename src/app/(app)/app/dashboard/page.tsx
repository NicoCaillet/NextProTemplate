import Branding from "@/components/branding";
import Stats from "@/components/stats";
import React, { useContext } from "react";
// import SearchForm from "@/components/search-form";
import ContentBlock from "@/components/content-block";
import PetList from "@/components/pet-list";
import PetDetail from "@/components/pet-detail";
// import PetButton from "@/components/pet-button";
import FilteringLayout from "@/components/filters";

export default async function Dashboard() {
  return (
    <main>
      <div className="flex justify-between py-4 items-center text-white ">
        <Branding />
        <Stats />
      </div>
      <ContentBlock className="h-[100px] mb-4 bg-white">
        <FilteringLayout />
      </ContentBlock>
      <div className="grid md:grid-cols-3 md:grid-rows-[45px_1fr] gap-4 grid-rows-[300px_500px] md:h-[700px]">
        {/* <div className="md:row-start-1 md:row-span-1 md:col-start-1  md:col-span-1">
          <SearchForm />
        </div> */}
        <div className="md:row-start-1 overflow-auto md:row-span-full md:col-start-1 md:col-span-1 relative">
          <ContentBlock>
            <PetList />
            {/* <div className="absolute bottom-4 right-3">
              <PetButton actionType="add" />
            </div> */}
          </ContentBlock>
        </div>
        <div className="md:row-start-1 md:row-span-full md:col-start-2 md:col-span-full">
          <ContentBlock>
            <PetDetail />
          </ContentBlock>
        </div>
      </div>
    </main>
  );
}
