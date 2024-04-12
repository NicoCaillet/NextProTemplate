import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <main>
      <H1 className="text-center">Log In</H1>
      <AuthForm type="login" />

      <p className="flex items-center gap-x-3 mt-2">
        No account yet?
        <Link href="/signup" className="text-sm text-zinc-500">
          Sign Up
        </Link>
      </p>
    </main>
  );
}

