"use client"
import { useSearchContext } from "@/lib/hooks";
import React from "react";

function SearchForm() {
  const { handleChangeSearchQuery } = useSearchContext();

  return (
    <form action="" className="w-full h-full">
      <input
        type="text"
        className="w-full h-full bg-white/20 rounded-md px-5 outline-none transition focus:bg-white/50 hover:bg-white/30 placeholder:text-white/50"
        name=""
        id=""
        onChange={(e) => handleChangeSearchQuery(e.target.value)}
      />
    </form>
  );
}

export default SearchForm;
