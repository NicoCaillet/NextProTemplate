import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <main> 
      <H1 className="text-center">Log in as a Dev</H1>
      <AuthForm type="login" />
      <p className="flex items-center gap-x-1 mt-2">
        No account yet?
        <Link href="/dev/signup" className="text-sm text-bigBlue">
          Sign Up
        </Link>
      </p>
    </main>
  );
}

