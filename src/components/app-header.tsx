"use client";

import React from "react";
import Logo from "./logo";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const routes = [
  {
    label: "Dashboard",
    path: "/app/dashboard",
  },
  {
    label: "Account",
    path: "/app/account",
  },
];

export default function Header() {
  const activePath = usePathname();


  return (
    <header className="flex py-6 justify-between items-center border-b border-white/85">
      <Logo />
      <nav>
        <ul className="flex gap-5 text-sm">
          {routes.map((route) => (
            <li key={route.path}>
              <Link
                className={cn(
                  "rounded-sm px-2 py-1 hover:text-white focus:text-white transition",
                  {
                    'bg-black/10 text-white/70': route.path === activePath
                  }
                )}
                href={route.path}
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
