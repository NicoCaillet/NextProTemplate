import Logo from "@/components/logo";
import WhiteLogo from "@/components/white-logo";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-[#79DAE8]">
      <div className="flex flex-col relative gap-4 bg-[#ffffff] rounded-xl w-full p-8 min-w-[17.5rem] max-w-[31.25rem]">
        <WhiteLogo/>
        {children}
      </div>
    </div>
  );
}
