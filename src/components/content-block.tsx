import React from "react";
import { cn } from "@/lib/utils";

type ContentBlockProps = {
  children: React.ReactNode;
  className?: string;
};

function ContentBlock({ children, className }: ContentBlockProps) {
  return (
    <div
      className={cn(
        "bg-[#F7F8FA] shadow-sm rounded-md overflow-auto h-full w-full",
        className
      )}
    >
      {children}
    </div>
  );
}

export default ContentBlock;
